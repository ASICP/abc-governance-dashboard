// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IABCTreasury {
    function releaseFunds(address recipient, uint256 amount, uint256 bountyId) external;
}

interface IBountyProposal {
    function completeBounty(uint256 proposalId) external;
    function proposals(uint256) external view returns (
        uint256 id,
        address proposer,
        string memory title,
        string memory ipfsHash,
        uint256 amount,
        uint256 deadline,
        uint8 state,
        uint256 votingDeadline,
        uint256 forVotes,
        uint256 againstVotes,
        uint256 createdAt,
        address claimedBy
    );
}

/**
 * @title VerificationPool
 * @dev Manages bounty submission verification and payouts
 * Verifiers stake ABC and earn rewards for accurate reviews
 */
contract VerificationPool is Ownable, ReentrancyGuard {

    IERC20 public immutable abcToken;
    IABCTreasury public treasury;
    IBountyProposal public bountyProposal;

    // Submission structure
    struct Submission {
        uint256 bountyId;
        address researcher;
        string ipfsHash; // Deliverables on IPFS
        uint256 timestamp;
        address[] verifiers;
        uint8 approvalCount;
        uint8 rejectionCount;
        bool paid;
        bool processed;
    }

    // Verifier stats
    struct VerifierStats {
        uint256 totalVerifications;
        uint256 approvals;
        uint256 rejections;
        uint256 earnings; // In USDC
        uint256 stakedAmount;
        uint256 stakedAt;
    }

    // Constants
    uint256 public constant MIN_VERIFIER_STAKE = 50000 * 10**18; // 50,000 ABC
    uint256 public constant VERIFICATION_REWARD_PERCENTAGE = 1; // 1% of bounty
    uint256 public constant REVIEW_PERIOD = 72 hours;
    uint8 public constant REQUIRED_VERIFIERS = 3;

    // State
    uint256 public nextSubmissionId = 1;
    mapping(uint256 => Submission) public submissions;
    mapping(address => VerifierStats) public verifierStats;
    mapping(uint256 => mapping(address => bool)) public hasVerified; // submissionId => verifier => voted
    address[] public verifierList;

    // Events
    event VerifierStaked(address indexed verifier, uint256 amount);
    event VerifierUnstaked(address indexed verifier, uint256 amount);
    event WorkSubmitted(
        uint256 indexed submissionId,
        uint256 indexed bountyId,
        address indexed researcher,
        string ipfsHash
    );
    event VerificationCast(
        uint256 indexed submissionId,
        address indexed verifier,
        bool approved
    );
    event VerificationComplete(uint256 indexed submissionId, bool approved);
    event PaymentReleased(
        uint256 indexed bountyId,
        address indexed researcher,
        uint256 amount
    );
    event VerifierRewarded(address indexed verifier, uint256 amount);

    constructor(
        address _abcToken,
        address _treasury,
        address _bountyProposal,
        address initialOwner
    ) Ownable(initialOwner) {
        require(_abcToken != address(0), "Invalid ABC token");
        require(_treasury != address(0), "Invalid treasury");
        require(_bountyProposal != address(0), "Invalid bounty proposal");

        abcToken = IERC20(_abcToken);
        treasury = IABCTreasury(_treasury);
        bountyProposal = IBountyProposal(_bountyProposal);
    }

    /**
     * @dev Stake ABC to become a verifier
     * @param amount Amount of ABC to stake
     */
    function stakeAsVerifier(uint256 amount) external nonReentrant {
        require(amount >= MIN_VERIFIER_STAKE, "Below minimum stake");

        abcToken.transferFrom(msg.sender, address(this), amount);

        if (verifierStats[msg.sender].stakedAmount == 0) {
            // New verifier
            verifierStats[msg.sender] = VerifierStats({
                totalVerifications: 0,
                approvals: 0,
                rejections: 0,
                earnings: 0,
                stakedAmount: amount,
                stakedAt: block.timestamp
            });
            verifierList.push(msg.sender);
        } else {
            // Existing verifier adding more stake
            verifierStats[msg.sender].stakedAmount += amount;
        }

        emit VerifierStaked(msg.sender, amount);
    }

    /**
     * @dev Unstake ABC (only if not assigned to active verifications)
     * @param amount Amount to unstake
     */
    function unstakeVerifier(uint256 amount) external nonReentrant {
        require(verifierStats[msg.sender].stakedAmount >= amount, "Insufficient stake");

        verifierStats[msg.sender].stakedAmount -= amount;
        abcToken.transfer(msg.sender, amount);

        emit VerifierUnstaked(msg.sender, amount);
    }

    /**
     * @dev Submit work for a bounty
     * @param bountyId Bounty ID
     * @param ipfsHash IPFS hash of deliverables
     */
    function submitWork(uint256 bountyId, string memory ipfsHash) external nonReentrant returns (uint256) {
        require(bytes(ipfsHash).length > 0, "Empty IPFS hash");

        // Get bounty details from BountyProposal contract
        (
            ,
            ,
            ,
            ,
            ,
            ,
            uint8 state,
            ,
            ,
            ,
            ,
            address claimedBy
        ) = bountyProposal.proposals(bountyId);

        require(state == 1, "Bounty not active"); // State 1 = Active
        require(claimedBy == msg.sender, "Not bounty claimer");

        uint256 submissionId = nextSubmissionId++;

        // Assign random verifiers
        address[] memory assignedVerifiers = assignVerifiers();

        submissions[submissionId] = Submission({
            bountyId: bountyId,
            researcher: msg.sender,
            ipfsHash: ipfsHash,
            timestamp: block.timestamp,
            verifiers: assignedVerifiers,
            approvalCount: 0,
            rejectionCount: 0,
            paid: false,
            processed: false
        });

        emit WorkSubmitted(submissionId, bountyId, msg.sender, ipfsHash);

        return submissionId;
    }

    /**
     * @dev Verify a submission
     * @param submissionId Submission to verify
     * @param approve True to approve, false to reject
     */
    function verify(uint256 submissionId, bool approve) external nonReentrant {
        Submission storage sub = submissions[submissionId];
        require(!sub.processed, "Already processed");
        require(isAssignedVerifier(msg.sender, sub.verifiers), "Not assigned");
        require(!hasVerified[submissionId][msg.sender], "Already verified");
        require(block.timestamp <= sub.timestamp + REVIEW_PERIOD, "Review period ended");

        // Record verification
        hasVerified[submissionId][msg.sender] = true;
        verifierStats[msg.sender].totalVerifications++;

        if (approve) {
            sub.approvalCount++;
            verifierStats[msg.sender].approvals++;
        } else {
            sub.rejectionCount++;
            verifierStats[msg.sender].rejections++;
        }

        emit VerificationCast(submissionId, msg.sender, approve);

        // Check if majority reached
        uint8 totalVotes = sub.approvalCount + sub.rejectionCount;
        uint8 requiredMajority = (REQUIRED_VERIFIERS / 2) + 1;

        if (sub.approvalCount >= requiredMajority) {
            // Approved - release payment
            processApprovedSubmission(submissionId);
        } else if (sub.rejectionCount >= requiredMajority) {
            // Rejected
            sub.processed = true;
            emit VerificationComplete(submissionId, false);
        }
    }

    /**
     * @dev Process approved submission and release funds
     * @param submissionId Submission ID
     */
    function processApprovedSubmission(uint256 submissionId) internal {
        Submission storage sub = submissions[submissionId];
        require(!sub.paid, "Already paid");

        // Get bounty amount
        (
            ,
            ,
            ,
            ,
            uint256 amount,
            ,
            ,
            ,
            ,
            ,
            ,
        ) = bountyProposal.proposals(sub.bountyId);

        // Release funds from treasury
        treasury.releaseFunds(sub.researcher, amount, sub.bountyId);

        // Mark as paid
        sub.paid = true;
        sub.processed = true;

        // Calculate and distribute verifier rewards (1% of bounty)
        uint256 totalReward = (amount * VERIFICATION_REWARD_PERCENTAGE) / 100;
        uint256 rewardPerVerifier = totalReward / sub.verifiers.length;

        for (uint256 i = 0; i < sub.verifiers.length; i++) {
            if (hasVerified[submissionId][sub.verifiers[i]]) {
                verifierStats[sub.verifiers[i]].earnings += rewardPerVerifier;
                emit VerifierRewarded(sub.verifiers[i], rewardPerVerifier);
            }
        }

        // Mark bounty as completed in BountyProposal contract
        bountyProposal.completeBounty(sub.bountyId);

        emit VerificationComplete(submissionId, true);
        emit PaymentReleased(sub.bountyId, sub.researcher, amount);
    }

    /**
     * @dev Assign random verifiers to a submission
     * @return Array of assigned verifier addresses
     */
    function assignVerifiers() internal view returns (address[] memory) {
        require(verifierList.length >= REQUIRED_VERIFIERS, "Insufficient verifiers");

        address[] memory assigned = new address[](REQUIRED_VERIFIERS);

        // Simple pseudo-random assignment (use Chainlink VRF in production)
        uint256 seed = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao)));

        for (uint8 i = 0; i < REQUIRED_VERIFIERS; i++) {
            uint256 index = (seed + i) % verifierList.length;
            assigned[i] = verifierList[index];
        }

        return assigned;
    }

    /**
     * @dev Check if address is assigned verifier
     * @param verifier Address to check
     * @param verifiers Array of assigned verifiers
     * @return True if assigned
     */
    function isAssignedVerifier(address verifier, address[] memory verifiers) internal pure returns (bool) {
        for (uint256 i = 0; i < verifiers.length; i++) {
            if (verifiers[i] == verifier) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Get verifier statistics
     * @param verifier Verifier address
     * @return stats Verifier statistics
     */
    function getVerifierStats(address verifier) external view returns (VerifierStats memory) {
        return verifierStats[verifier];
    }

    /**
     * @dev Get submission details
     * @param submissionId Submission ID
     * @return Submission struct
     */
    function getSubmission(uint256 submissionId) external view returns (Submission memory) {
        return submissions[submissionId];
    }

    /**
     * @dev Get total number of verifiers
     * @return Count of active verifiers
     */
    function getVerifierCount() external view returns (uint256) {
        return verifierList.length;
    }

    /**
     * @dev Get all verifiers
     * @return Array of verifier addresses
     */
    function getAllVerifiers() external view returns (address[] memory) {
        return verifierList;
    }
}
