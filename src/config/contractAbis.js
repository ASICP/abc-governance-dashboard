// Complete ABI definitions for SAIT ecosystem contracts
// These should match your deployed Solidity contracts

export const SAIT_TOKEN_ABI = [
  // ERC20 Standard
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  
  // SAIT-specific functions
  "function getCirculatingSupply() view returns (uint256)",
  "function getCurrentQuarter() view returns (uint256)",
  "function getQuarterlyLimit() view returns (uint256)",
  "function quarterlyReleased(uint256 quarter) view returns (uint256)",
  "function canReleaseTokens(uint256 amount) view returns (bool)",
  
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event QuarterlyRelease(uint256 indexed quarter, uint256 amount, address indexed vault)",
];

export const VAULT_ABI = [
  // Vault management
  "function lockedAmount() view returns (uint256)",
  "function vestedAmount() view returns (uint256)",
  "function releasedAmount() view returns (uint256)",
  "function getVaultBalance() view returns (uint256)",
  "function beneficiary() view returns (address)",
  "function vestingStart() view returns (uint256)",
  "function vestingDuration() view returns (uint256)",
  "function cliffDuration() view returns (uint256)",
  
  // Vesting functions
  "function calculateVestedAmount() view returns (uint256)",
  "function calculateReleasableAmount() view returns (uint256)",
  "function release() returns (uint256)",
  "function releaseTokens(uint256 amount)",
  
  // Events
  "event TokensReleased(address indexed beneficiary, uint256 amount)",
  "event VestingScheduleUpdated(uint256 vestingStart, uint256 duration)",
];

export const GOVERNANCE_STAKING_ABI = [
  // Staking functions
  "function stake(uint256 amount)",
  "function unstake(uint256 amount)",
  "function getStake(address account) view returns (uint256)",
  "function totalStaked() view returns (uint256)",
  
  // Voting power (quadratic)
  "function getVotingPower(address account) view returns (uint256)",
  "function calculateVotingPower(uint256 staked) pure returns (uint256)",
  
  // Delegation
  "function delegate(address delegatee)",
  "function delegates(address account) view returns (address)",
  "function getDelegatedVotingPower(address account) view returns (uint256)",
  
  // Governance proposals
  "function proposalCount() view returns (uint256)",
  "function proposals(uint256 id) view returns (tuple(uint256 id, address proposer, string description, uint256 startTime, uint256 endTime, uint256 forVotes, uint256 againstVotes, bool executed))",
  "function createProposal(string description)",
  "function vote(uint256 proposalId, bool support, uint256 amount)",
  "function executeProposal(uint256 proposalId)",
  "function hasVoted(address voter, uint256 proposalId) view returns (bool)",
  
  // Events
  "event Staked(address indexed user, uint256 amount)",
  "event Unstaked(address indexed user, uint256 amount)",
  "event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate)",
  "event ProposalCreated(uint256 indexed id, address indexed proposer, string description)",
  "event VoteCast(address indexed voter, uint256 indexed proposalId, bool support, uint256 weight)",
  "event ProposalExecuted(uint256 indexed proposalId)",
];

export const SAITSAT_SWAP_ABI = [
  // Swap functions
  "function swap(uint256 saitAmount)",
  "function getSwapRate() view returns (uint256)",
  "function calculateSATAmount(uint256 saitAmount) view returns (uint256)",
  "function calculateSAITAmount(uint256 satAmount) view returns (uint256)",
  
  // Buyback mechanism
  "function triggerBuyback(uint256 saitAmount) returns (bool)",
  "function getBuybackRate() view returns (uint256)",
  "function setBuybackRate(uint256 newRate)",
  "function calculateTWAP(uint256 period) view returns (uint256)",
  
  // Treasury tracking
  "function totalSAITSwapped() view returns (uint256)",
  "function totalSATReceived() view returns (uint256)",
  "function treasurySAITBalance() view returns (uint256)",
  "function treasurySATBalance() view returns (uint256)",
  
  // Compliance checks
  "function isAuthorized(address organization) view returns (bool)",
  "function authorizeOrganization(address organization)",
  "function revokeOrganization(address organization)",
  "function complianceEvents(uint256 id) view returns (tuple(address organization, uint256 saitAmount, uint256 satAmount, uint256 timestamp, bytes32 complianceHash))",
  
  // Rate limiting
  "function rateLimits(address organization) view returns (uint256 lastSwap, uint256 swapCount)",
  "function checkRateLimit(address organization) view returns (bool)",
  
  // Events
  "event TokensSwapped(address indexed user, uint256 saitAmount, uint256 satAmount, uint256 timestamp)",
  "event BuybackExecuted(address indexed organization, uint256 saitAmount, uint256 satAmount, uint256 twapPrice)",
  "event ComplianceEventTriggered(address indexed organization, bytes32 complianceHash, uint256 saitAmount)",
  "event OrganizationAuthorized(address indexed organization, uint256 timestamp)",
  "event OrganizationRevoked(address indexed organization, uint256 timestamp)",
  "event BuybackRateUpdated(uint256 oldRate, uint256 newRate)",
];

export const GOVERNANCE_CONTROLLER_ABI = [
  // Protocol governance
  "function protocolParameters(bytes32 key) view returns (uint256)",
  "function setParameter(bytes32 key, uint256 value)",
  "function getParameter(bytes32 key) view returns (uint256)",
  
  // Emergency controls
  "function pause()",
  "function unpause()",
  "function paused() view returns (bool)",
  "function emergencyWithdraw(address token, uint256 amount)",
  
  // Access control
  "function hasRole(bytes32 role, address account) view returns (bool)",
  "function grantRole(bytes32 role, address account)",
  "function revokeRole(bytes32 role, address account)",
  "function getRoleAdmin(bytes32 role) view returns (bytes32)",
  
  // Milestone management
  "function milestones(uint256 id) view returns (tuple(uint256 id, address project, string description, uint256 requiredScore, uint256 actualScore, bool verified, uint256 timestamp))",
  "function verifyMilestone(uint256 milestoneId, bytes32 proofHash, uint256 score) returns (bool)",
  "function getMilestoneStatus(uint256 milestoneId) view returns (bool)",
  
  // Events
  "event ParameterUpdated(bytes32 indexed key, uint256 oldValue, uint256 newValue)",
  "event Paused(address account)",
  "event Unpaused(address account)",
  "event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)",
  "event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)",
  "event MilestoneVerified(uint256 indexed milestoneId, uint256 score, bytes32 proofHash)",
];

// SAT Token ABI (for reference)
export const SAT_TOKEN_ABI = [
  // ERC20 Standard
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  
  // SAT-specific functions
  "function mint(address to, uint256 amount)",
  "function burn(uint256 amount)",
  "function getCollateralValue() view returns (uint256)",
  "function getBackingRatio() view returns (uint256)",
  
  // Collateral management
  "function depositCollateral(address token, uint256 amount)",
  "function withdrawCollateral(address token, uint256 amount)",
  "function getCollateralBalance(address token) view returns (uint256)",
  "function getBasketComposition() view returns (address[] memory tokens, uint256[] memory weights)",
  
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Minted(address indexed to, uint256 amount, uint256 collateralValue)",
  "event Burned(address indexed from, uint256 amount, uint256 collateralReturned)",
  "event CollateralDeposited(address indexed token, uint256 amount)",
  "event CollateralWithdrawn(address indexed token, uint256 amount)",
];

// Contract roles (for access control)
export const ROLES = {
  DEFAULT_ADMIN_ROLE: "0x0000000000000000000000000000000000000000000000000000000000000000",
  MINTER_ROLE: "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6",
  PAUSER_ROLE: "0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a",
  GOVERNANCE_ROLE: "0x71f3d55856e4058ed06ee057d79ada615f65cdf5f9ee88181b914225088f834f",
  COMPLIANCE_ROLE: "0x7f2b44de27f683c5aeb5a1b0cf0b5c87b8bbf4e4e8d1d3e4e5e6e7e8e9eaebec",
};

// Helper function to get contract instance
export const getContract = (address, abi, providerOrSigner) => {
  const { ethers } = require('ethers');
  return new ethers.Contract(address, abi, providerOrSigner);
};

// Export all ABIs as a single object
export const CONTRACT_ABIS = {
  SAITToken: SAIT_TOKEN_ABI,
  Vault: VAULT_ABI,
  GovernanceStaking: GOVERNANCE_STAKING_ABI,
  SAITSATSwap: SAITSAT_SWAP_ABI,
  GovernanceController: GOVERNANCE_CONTROLLER_ABI,
  SATToken: SAT_TOKEN_ABI,
};

export default CONTRACT_ABIS;
