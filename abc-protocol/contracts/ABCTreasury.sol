// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ABCTreasury
 * @dev Treasury contract for ABC Protocol managing contributions, reserves, and bounty payouts
 * Year 1 uses stablecoins (USDC/USDT) for simplicity
 */
contract ABCTreasury is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // State variables
    IERC20 public immutable abcToken;
    IERC20 public immutable usdc; // Primary stablecoin
    IERC20 public immutable usdt; // Secondary stablecoin

    address public bountyProposalContract;
    address public verificationPoolContract;

    uint256 public totalContributions;
    uint256 public totalPayouts;

    // Minimum contribution amount (in USD, 18 decimals)
    uint256 public constant MIN_CONTRIBUTION = 10 * 10**6; // $10 (USDC has 6 decimals)

    // Track contributions per address
    mapping(address => uint256) public contributions;

    // Track monthly burn rate for runway calculations
    struct MonthlyStats {
        uint256 totalPaid;
        uint256 bountyCount;
        uint256 timestamp;
    }
    mapping(uint256 => MonthlyStats) public monthlyStats; // month index => stats

    // Events
    event Contribution(address indexed contributor, uint256 amount, address token, uint256 timestamp);
    event LiquidityAdded(uint256 abcAmount, uint256 ethAmount, uint256 timestamp);
    event FundsReleased(address indexed recipient, uint256 amount, uint256 bountyId, uint256 timestamp);
    event BountyContractUpdated(address indexed newContract);
    event VerificationContractUpdated(address indexed newContract);

    /**
     * @dev Constructor
     * @param _abcToken Address of ABC token contract
     * @param _usdc Address of USDC stablecoin
     * @param _usdt Address of USDT stablecoin
     * @param initialOwner Address of initial owner
     */
    constructor(
        address _abcToken,
        address _usdc,
        address _usdt,
        address initialOwner
    ) Ownable(initialOwner) {
        require(_abcToken != address(0), "Invalid ABC token");
        require(_usdc != address(0), "Invalid USDC");
        require(_usdt != address(0), "Invalid USDT");

        abcToken = IERC20(_abcToken);
        usdc = IERC20(_usdc);
        usdt = IERC20(_usdt);
    }

    /**
     * @dev Contribute stablecoins to treasury
     * @param amount Amount to contribute (in stablecoin decimals)
     * @param token Address of stablecoin (USDC or USDT)
     */
    function contribute(uint256 amount, address token) external nonReentrant {
        require(amount >= MIN_CONTRIBUTION, "Below minimum contribution");
        require(token == address(usdc) || token == address(usdt), "Invalid token");

        IERC20 stablecoin = IERC20(token);

        // Transfer stablecoins to treasury
        stablecoin.safeTransferFrom(msg.sender, address(this), amount);

        // Track contribution
        contributions[msg.sender] += amount;
        totalContributions += amount;

        emit Contribution(msg.sender, amount, token, block.timestamp);
    }

    /**
     * @dev Contribute ETH and add to liquidity pool (50/50 split)
     * In production, this would integrate with DEX for ABC-ETH LP
     */
    function contributeETH() external payable nonReentrant {
        require(msg.value > 0, "No ETH sent");

        uint256 lpAmount = msg.value / 2;
        uint256 treasuryAmount = msg.value - lpAmount;

        // In production: Add lpAmount to ABC-ETH liquidity pool
        // For MVP: Keep in contract

        contributions[msg.sender] += msg.value;
        totalContributions += msg.value;

        emit Contribution(msg.sender, msg.value, address(0), block.timestamp);
        emit LiquidityAdded(0, lpAmount, block.timestamp); // 0 ABC for MVP
    }

    /**
     * @dev Release funds for approved bounties
     * Can only be called by authorized contracts
     * @param recipient Address to receive payout
     * @param amount Amount to pay (in USDC)
     * @param bountyId ID of the bounty being paid
     */
    function releaseFunds(
        address recipient,
        uint256 amount,
        uint256 bountyId
    ) external nonReentrant {
        require(
            msg.sender == bountyProposalContract || msg.sender == verificationPoolContract,
            "Unauthorized"
        );
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");

        // Check treasury has sufficient stablecoins
        uint256 usdcBalance = usdc.balanceOf(address(this));
        require(usdcBalance >= amount, "Insufficient treasury funds");

        // Transfer USDC to recipient
        usdc.safeTransfer(recipient, amount);

        // Track payout
        totalPayouts += amount;

        // Update monthly stats for burn rate tracking
        uint256 currentMonth = block.timestamp / 30 days;
        monthlyStats[currentMonth].totalPaid += amount;
        monthlyStats[currentMonth].bountyCount += 1;
        monthlyStats[currentMonth].timestamp = block.timestamp;

        emit FundsReleased(recipient, amount, bountyId, block.timestamp);
    }

    /**
     * @dev Get total treasury value in USD
     * @return Total value combining all stablecoins
     */
    function getTreasuryValue() external view returns (uint256) {
        uint256 usdcBalance = usdc.balanceOf(address(this));
        uint256 usdtBalance = usdt.balanceOf(address(this));

        // For Year 1: 1:1 with stablecoins
        // Future: Add commodity basket valuation
        return usdcBalance + usdtBalance;
    }

    /**
     * @dev Get stablecoin balance (USDC + USDT)
     * @return Combined stablecoin balance
     */
    function getStablecoinBalance() external view returns (uint256) {
        return usdc.balanceOf(address(this)) + usdt.balanceOf(address(this));
    }

    /**
     * @dev Get ABC token balance held by treasury
     * @return ABC token balance
     */
    function getABCBalance() external view returns (uint256) {
        return abcToken.balanceOf(address(this));
    }

    /**
     * @dev Calculate monthly burn rate (average of last 3 months)
     * @return Average monthly burn rate in USD
     */
    function getMonthlyBurnRate() external view returns (uint256) {
        uint256 currentMonth = block.timestamp / 30 days;
        uint256 totalBurn = 0;
        uint256 monthsWithData = 0;

        // Look back 3 months
        for (uint256 i = 0; i < 3; i++) {
            if (currentMonth >= i) {
                uint256 monthIndex = currentMonth - i;
                if (monthlyStats[monthIndex].totalPaid > 0) {
                    totalBurn += monthlyStats[monthIndex].totalPaid;
                    monthsWithData++;
                }
            }
        }

        if (monthsWithData == 0) return 0;
        return totalBurn / monthsWithData;
    }

    /**
     * @dev Calculate treasury runway in months
     * @return Months of runway at current burn rate
     */
    function getRunwayMonths() external view returns (uint256) {
        uint256 treasuryValue = usdc.balanceOf(address(this)) + usdt.balanceOf(address(this));
        uint256 burnRate = this.getMonthlyBurnRate();

        if (burnRate == 0) return type(uint256).max; // Infinite runway if no burns
        return treasuryValue / burnRate;
    }

    /**
     * @dev Get monthly statistics for a specific month
     * @param monthIndex Month to query (block.timestamp / 30 days)
     * @return stats Monthly statistics
     */
    function getMonthlyStats(uint256 monthIndex) external view returns (MonthlyStats memory) {
        return monthlyStats[monthIndex];
    }

    /**
     * @dev Set bounty proposal contract address (only owner)
     * @param _bountyContract Address of bounty proposal contract
     */
    function setBountyProposalContract(address _bountyContract) external onlyOwner {
        require(_bountyContract != address(0), "Invalid address");
        bountyProposalContract = _bountyContract;
        emit BountyContractUpdated(_bountyContract);
    }

    /**
     * @dev Set verification pool contract address (only owner)
     * @param _verificationContract Address of verification pool contract
     */
    function setVerificationPoolContract(address _verificationContract) external onlyOwner {
        require(_verificationContract != address(0), "Invalid address");
        verificationPoolContract = _verificationContract;
        emit VerificationContractUpdated(_verificationContract);
    }

    /**
     * @dev Emergency withdraw function (only owner)
     * For emergency situations only - requires governance approval
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        require(token != address(0), "Invalid token");
        IERC20(token).safeTransfer(owner(), amount);
    }

    /**
     * @dev Receive ETH
     */
    receive() external payable {
        contributions[msg.sender] += msg.value;
        totalContributions += msg.value;
        emit Contribution(msg.sender, msg.value, address(0), block.timestamp);
    }
}
