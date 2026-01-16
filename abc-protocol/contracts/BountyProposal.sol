// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title BountyProposal
 * @dev Manages bounty proposal lifecycle with conviction voting
 * Proposals go through: Voting -> Active -> Completed/Expired
 */
contract BountyProposal is Ownable, ReentrancyGuard {

    IERC20 public immutable abcToken;
    address public treasuryContract;

    // Proposal states
    enum ProposalState { Voting, Active, Completed, Expired, Disputed }

    // Proposal structure
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string ipfsHash; // Full proposal details on IPFS
        uint256 amount; // In USD (6 decimals for USDC)
        uint256 deadline; // Deadline for completion
        ProposalState state;
        uint256 votingDeadline;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 createdAt;
        address claimedBy;
    }

    // Vote structure
    struct Vote {
        bool support;
        uint256 weight; // Conviction-weighted vote
        uint256 timestamp;
    }

    // Staking information for conviction calculation
    struct StakeInfo {
        uint256 amount;
        uint256 stakedAt;
    }

    // Constants
    uint256 public constant PROPOSAL_STAKE = 5000 * 10**18; // 5,000 ABC
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant QUORUM_PERCENTAGE = 10; // 10% of total supply
    uint256 public constant MAX_BOUNTY_AMOUNT = 100000 * 10**6; // $100k

    // State
    uint256 public nextProposalId = 1;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => Vote)) public votes;
    mapping(address => StakeInfo) public stakes;

    // Events
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        string title,
        uint256 amount,
        uint256 votingDeadline
    );
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        bool support,
        uint256 weight
    );
    event ProposalApproved(uint256 indexed proposalId);
    event ProposalRejected(uint256 indexed proposalId);
    event BountyClaimed(uint256 indexed proposalId, address indexed researcher);
    event BountyCompleted(uint256 indexed proposalId);
    event BountyExpired(uint256 indexed proposalId);
    event ABCStaked(address indexed staker, uint256 amount);
    event ABCUnstaked(address indexed staker, uint256 amount);

    constructor(address _abcToken, address initialOwner) Ownable(initialOwner) {
        require(_abcToken != address(0), "Invalid ABC token");
        abcToken = IERC20(_abcToken);
    }

    /**
     * @dev Stake ABC tokens for conviction voting
     * @param amount Amount of ABC to stake
     */
    function stakeABC(uint256 amount) external nonReentrant {
        require(amount > 0, "Invalid amount");

        abcToken.transferFrom(msg.sender, address(this), amount);

        if (stakes[msg.sender].amount == 0) {
            stakes[msg.sender] = StakeInfo({
                amount: amount,
                stakedAt: block.timestamp
            });
        } else {
            stakes[msg.sender].amount += amount;
        }

        emit ABCStaked(msg.sender, amount);
    }

    /**
     * @dev Unstake ABC tokens
     * @param amount Amount to unstake
     */
    function unstakeABC(uint256 amount) external nonReentrant {
        require(stakes[msg.sender].amount >= amount, "Insufficient stake");

        stakes[msg.sender].amount -= amount;
        abcToken.transfer(msg.sender, amount);

        emit ABCUnstaked(msg.sender, amount);
    }

    /**
     * @dev Create a new bounty proposal
     * @param title Proposal title
     * @param ipfsHash IPFS hash of full proposal details
     * @param amount Bounty amount in USD (6 decimals)
     */
    function createProposal(
        string memory title,
        string memory ipfsHash,
        uint256 amount
    ) external nonReentrant returns (uint256) {
        require(abcToken.balanceOf(msg.sender) >= PROPOSAL_STAKE, "Insufficient ABC for stake");
        require(amount > 0 && amount <= MAX_BOUNTY_AMOUNT, "Invalid amount");
        require(bytes(title).length > 0, "Empty title");
        require(bytes(ipfsHash).length > 0, "Empty IPFS hash");

        // Lock proposal stake
        abcToken.transferFrom(msg.sender, address(this), PROPOSAL_STAKE);

        uint256 proposalId = nextProposalId++;

        proposals[proposalId] = Proposal({
            id: proposalId,
            proposer: msg.sender,
            title: title,
            ipfsHash: ipfsHash,
            amount: amount,
            deadline: 0,
            state: ProposalState.Voting,
            votingDeadline: block.timestamp + VOTING_PERIOD,
            forVotes: 0,
            againstVotes: 0,
            createdAt: block.timestamp,
            claimedBy: address(0)
        });

        emit ProposalCreated(
            proposalId,
            msg.sender,
            title,
            amount,
            block.timestamp + VOTING_PERIOD
        );

        return proposalId;
    }

    /**
     * @dev Vote on a proposal with conviction weighting
     * @param proposalId Proposal to vote on
     * @param support True for yes, false for no
     */
    function vote(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.state == ProposalState.Voting, "Not in voting");
        require(block.timestamp < proposal.votingDeadline, "Voting ended");
        require(votes[proposalId][msg.sender].weight == 0, "Already voted");

        // Calculate conviction score
        uint256 conviction = calculateConviction(msg.sender);
        require(conviction > 0, "No voting power");

        // Apply quadratic voting
        uint256 voteWeight = sqrt(conviction);

        // Record vote
        votes[proposalId][msg.sender] = Vote({
            support: support,
            weight: voteWeight,
            timestamp: block.timestamp
        });

        // Update vote totals
        if (support) {
            proposal.forVotes += voteWeight;
        } else {
            proposal.againstVotes += voteWeight;
        }

        emit VoteCast(proposalId, msg.sender, support, voteWeight);
    }

    /**
     * @dev Finalize proposal after voting period
     * @param proposalId Proposal to finalize
     */
    function finalizeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.state == ProposalState.Voting, "Not in voting");
        require(block.timestamp >= proposal.votingDeadline, "Voting still active");

        uint256 totalVotes = proposal.forVotes + proposal.againstVotes;
        uint256 quorum = (abcToken.totalSupply() * QUORUM_PERCENTAGE) / 100;

        if (totalVotes >= quorum && proposal.forVotes > proposal.againstVotes) {
            // Proposal approved
            proposal.state = ProposalState.Active;
            proposal.deadline = block.timestamp + 90 days; // 90 days to complete

            // Refund proposer stake
            abcToken.transfer(proposal.proposer, PROPOSAL_STAKE);

            emit ProposalApproved(proposalId);
        } else {
            // Proposal rejected - stake burned
            proposal.state = ProposalState.Expired;

            emit ProposalRejected(proposalId);
        }
    }

    /**
     * @dev Claim an active bounty
     * @param proposalId Bounty to claim
     */
    function claimBounty(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.state == ProposalState.Active, "Not active");
        require(proposal.claimedBy == address(0), "Already claimed");

        proposal.claimedBy = msg.sender;

        emit BountyClaimed(proposalId, msg.sender);
    }

    /**
     * @dev Mark bounty as completed (called by VerificationPool)
     * @param proposalId Bounty ID
     */
    function completeBounty(uint256 proposalId) external {
        require(msg.sender == owner() || msg.sender == treasuryContract, "Unauthorized");

        Proposal storage proposal = proposals[proposalId];
        require(proposal.state == ProposalState.Active, "Not active");

        proposal.state = ProposalState.Completed;

        emit BountyCompleted(proposalId);
    }

    /**
     * @dev Mark bounty as expired if deadline passed
     * @param proposalId Bounty ID
     */
    function expireBounty(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.state == ProposalState.Active, "Not active");
        require(block.timestamp > proposal.deadline, "Not expired yet");

        proposal.state = ProposalState.Expired;

        emit BountyExpired(proposalId);
    }

    /**
     * @dev Calculate conviction score for voter
     * @param voter Address of voter
     * @return Conviction score (tokens * sqrt(days staked))
     */
    function calculateConviction(address voter) public view returns (uint256) {
        StakeInfo memory stake = stakes[voter];
        if (stake.amount == 0) return 0;

        uint256 stakeDuration = block.timestamp - stake.stakedAt;
        uint256 daysStaked = stakeDuration / 1 days;

        // Conviction = tokens × sqrt(days)
        return stake.amount * sqrt(daysStaked);
    }

    /**
     * @dev Get proposals by state
     * @param state State to filter by
     * @return Array of proposal IDs
     */
    function getProposalsByState(ProposalState state) external view returns (uint256[] memory) {
        uint256 count = 0;

        // Count proposals with this state
        for (uint256 i = 1; i < nextProposalId; i++) {
            if (proposals[i].state == state) {
                count++;
            }
        }

        // Build array
        uint256[] memory proposalIds = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 1; i < nextProposalId; i++) {
            if (proposals[i].state == state) {
                proposalIds[index] = i;
                index++;
            }
        }

        return proposalIds;
    }

    /**
     * @dev Get proposal details
     * @param proposalId Proposal ID
     * @return Proposal struct
     */
    function getProposal(uint256 proposalId) external view returns (Proposal memory) {
        return proposals[proposalId];
    }

    /**
     * @dev Set treasury contract address
     * @param _treasury Treasury contract address
     */
    function setTreasuryContract(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Invalid address");
        treasuryContract = _treasury;
    }

    /**
     * @dev Square root function (Babylonian method)
     * @param x Input value
     * @return y Square root
     */
    function sqrt(uint256 x) internal pure returns (uint256 y) {
        if (x == 0) return 0;
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}
