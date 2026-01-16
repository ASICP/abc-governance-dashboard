/**
 * ABC Protocol Web3 Service
 * Handles all blockchain queries for the ABC Governance Dashboard
 */

import { ethers } from 'ethers';
import mockDataService from './mockDataService';

// Contract ABIs (simplified - will be replaced with full ABIs after compilation)
const ABCTOKEN_ABI = [
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)"
];

const ABCTREASURY_ABI = [
  "function getTreasuryValue() view returns (uint256)",
  "function getStablecoinBalance() view returns (uint256)",
  "function getABCBalance() view returns (uint256)",
  "function getMonthlyBurnRate() view returns (uint256)",
  "function getRunwayMonths() view returns (uint256)",
  "function totalContributions() view returns (uint256)",
  "function totalPayouts() view returns (uint256)"
];

const BOUNTYPROPOSAL_ABI = [
  "function nextProposalId() view returns (uint256)",
  "function getProposalsByState(uint8) view returns (uint256[])",
  "function getProposal(uint256) view returns (tuple(uint256 id, address proposer, string title, string ipfsHash, uint256 amount, uint256 deadline, uint8 state, uint256 votingDeadline, uint256 forVotes, uint256 againstVotes, uint256 createdAt, address claimedBy))",
  "function QUORUM_PERCENTAGE() view returns (uint256)"
];

const VERIFICATIONPOOL_ABI = [
  "function getVerifierCount() view returns (uint256)",
  "function getVerifierStats(address) view returns (tuple(uint256 totalVerifications, uint256 approvals, uint256 rejections, uint256 earnings, uint256 stakedAmount, uint256 stakedAt))",
  "function getAllVerifiers() view returns (address[])",
  "function getSubmission(uint256) view returns (tuple(uint256 bountyId, address researcher, string ipfsHash, uint256 timestamp, address[] verifiers, uint8 approvalCount, uint8 rejectionCount, bool paid, bool processed))"
];

// Contract addresses (loaded from environment)
const CONTRACTS = {
  ABCToken: process.env.REACT_APP_ABC_TOKEN_ADDRESS,
  ABCTreasury: process.env.REACT_APP_ABC_TREASURY_ADDRESS,
  BountyProposal: process.env.REACT_APP_BOUNTY_PROPOSAL_ADDRESS,
  VerificationPool: process.env.REACT_APP_VERIFICATION_POOL_ADDRESS,
};

// Provider setup
let provider;
let contracts = {};

// Check if we should use hybrid mode (mock + Sepolia)
const isHybridMode = () => {
  return process.env.REACT_APP_USE_MOCK_DATA === 'true';
};

// Check if contracts are configured
const hasContractAddresses = () => {
  return CONTRACTS.ABCToken && CONTRACTS.ABCTreasury && CONTRACTS.BountyProposal;
};

/**
 * Initialize Web3 provider and contracts
 */
export const initializeWeb3 = () => {
  // Initialize even in hybrid mode if we have addresses
  if (!hasContractAddresses()) {
    console.log('📊 Using mock data only (no contract addresses configured)');
    return null;
  }

  if (isHybridMode()) {
    console.log('🔄 Using hybrid mode: Mock baseline + Sepolia live data');
  } else {
    console.log('⛓️ Using Sepolia data only');
  }
  const network = process.env.REACT_APP_NETWORK || 'sepolia';
  const rpcUrl = network === 'sepolia'
    ? process.env.REACT_APP_SEPOLIA_RPC_URL
    : process.env.REACT_APP_BASE_RPC_URL;

  if (!rpcUrl) {
    console.warn('RPC URL not configured, using default Sepolia');
    provider = new ethers.providers.JsonRpcProvider('https://rpc.sepolia.org');
  } else {
    provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  }

  // Initialize contract instances
  if (CONTRACTS.ABCToken) {
    contracts.abcToken = new ethers.Contract(CONTRACTS.ABCToken, ABCTOKEN_ABI, provider);
  }
  if (CONTRACTS.ABCTreasury) {
    contracts.treasury = new ethers.Contract(CONTRACTS.ABCTreasury, ABCTREASURY_ABI, provider);
  }
  if (CONTRACTS.BountyProposal) {
    contracts.bountyProposal = new ethers.Contract(CONTRACTS.BountyProposal, BOUNTYPROPOSAL_ABI, provider);
  }
  if (CONTRACTS.VerificationPool) {
    contracts.verificationPool = new ethers.Contract(CONTRACTS.VerificationPool, VERIFICATIONPOOL_ABI, provider);
  }

  return provider;
};

/**
 * Get ABC token price (mock for MVP - replace with DEX oracle)
 */
export const getABCPrice = async () => {
  // For MVP: Return fixed launch price
  // In production: Query from DEX LP or Chainlink oracle
  return 0.10; // $0.10
};

/**
 * Get dashboard overview data
 */
export const getDashboardData = async () => {
  // Pure mock mode if no contracts
  if (!hasContractAddresses()) {
    return mockDataService.getMockDashboardData();
  }

  // Get mock data as baseline
  const mockData = await mockDataService.getMockDashboardData();

  // Hybrid mode: Use mock as baseline, overlay Sepolia data
  if (isHybridMode()) {
    try {
      if (!contracts.abcToken || !contracts.treasury || !contracts.bountyProposal) {
        console.warn('Contracts not initialized, using mock data only');
        return { ...mockData, dataSource: 'mock-only' };
      }

      // Try to fetch Sepolia data
      const sepoliaActiveBounties = await contracts.bountyProposal.getProposalsByState?.(1).catch(() => []);
      const sepoliaCompletedBounties = await contracts.bountyProposal.getProposalsByState?.(2).catch(() => []);

      // Merge: Mock baseline + Sepolia new data
      return {
        ...mockData,
        // Add Sepolia bounties to mock baseline
        activeBountyCount: mockData.activeBountyCount + (sepoliaActiveBounties?.length || 0),
        completedBountyCount: mockData.completedBountyCount + (sepoliaCompletedBounties?.length || 0),
        timestamp: Date.now(),
        dataSource: 'hybrid', // Flag to indicate hybrid mode
      };
    } catch (sepoliaError) {
      console.warn('Sepolia query failed, using mock data only:', sepoliaError.message);
      return { ...mockData, dataSource: 'mock-fallback' };
    }
  }

  // Pure Sepolia mode (when REACT_APP_USE_MOCK_DATA=false)
  try {
    if (!contracts.abcToken || !contracts.treasury || !contracts.bountyProposal) {
      throw new Error('Contracts not initialized. Call initializeWeb3() first.');
    }

    const [
      totalSupply,
      treasuryABCBalance,
      stablecoinReserves,
      treasuryValue,
      activeBounties,
      completedBounties,
      abcPrice,
    ] = await Promise.all([
      contracts.abcToken.totalSupply(),
      contracts.treasury.getABCBalance(),
      contracts.treasury.getStablecoinBalance(),
      contracts.treasury.getTreasuryValue(),
      contracts.bountyProposal.getProposalsByState(1),
      contracts.bountyProposal.getProposalsByState(2),
      getABCPrice(),
    ]);

    const circulatingSupply = totalSupply - treasuryABCBalance;

    return {
      abcPrice,
      totalSupply: ethers.utils.formatEther(totalSupply),
      circulatingSupply: ethers.utils.formatEther(circulatingSupply),
      treasuryABCBalance: ethers.utils.formatEther(treasuryABCBalance),
      stablecoinReserves: ethers.utils.formatUnits(stablecoinReserves, 6),
      treasuryValue: ethers.utils.formatUnits(treasuryValue, 6),
      activeBountyCount: activeBounties.length,
      completedBountyCount: completedBounties.length,
      marketCap: parseFloat(ethers.utils.formatEther(circulatingSupply)) * abcPrice,
      timestamp: Date.now(),
      dataSource: 'sepolia',
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // Fallback to mock data on error
    return { ...mockData, dataSource: 'error-fallback', error: error.message };
  }
};

/**
 * Get treasury health metrics
 */
export const getTreasuryHealth = async () => {
  // Use mock data if contracts not deployed
  if (!hasContractAddresses() || isHybridMode()) {
    return mockDataService.getMockTreasuryHealth();
  }

  try {
    const [
      treasuryValue,
      abcBalance,
      stablecoinBalance,
      monthlyBurnRate,
      runwayMonths,
      totalContributions,
      totalPayouts,
      abcPrice,
    ] = await Promise.all([
      contracts.treasury.getTreasuryValue(),
      contracts.treasury.getABCBalance(),
      contracts.treasury.getStablecoinBalance(),
      contracts.treasury.getMonthlyBurnRate(),
      contracts.treasury.getRunwayMonths(),
      contracts.treasury.totalContributions(),
      contracts.treasury.totalPayouts(),
      getABCPrice(),
    ]);

    const abcValue = parseFloat(ethers.utils.formatEther(abcBalance)) * abcPrice;
    const stablecoinValue = parseFloat(ethers.utils.formatUnits(stablecoinBalance, 6));

    return {
      totalValue: parseFloat(ethers.utils.formatUnits(treasuryValue, 6)),
      abcBalance: ethers.utils.formatEther(abcBalance),
      abcValue,
      stablecoinBalance: ethers.utils.formatUnits(stablecoinBalance, 6),
      stablecoinValue,
      monthlyBurnRate: ethers.utils.formatUnits(monthlyBurnRate, 6),
      runwayMonths: runwayMonths.toString(),
      totalContributions: ethers.utils.formatUnits(totalContributions, 6),
      totalPayouts: ethers.utils.formatUnits(totalPayouts, 6),
      netPosition: parseFloat(ethers.utils.formatUnits(totalContributions, 6)) - parseFloat(ethers.utils.formatUnits(totalPayouts, 6)),
    };
  } catch (error) {
    console.error('Error fetching treasury health:', error);
    throw error;
  }
};

/**
 * Get bounty pipeline data
 */
export const getBountyPipeline = async () => {
  // Use mock data if contracts not deployed
  if (!hasContractAddresses() || isHybridMode()) {
    return mockDataService.getMockBountyPipeline();
  }

  try {
    const [voting, active, completed, expired] = await Promise.all([
      contracts.bountyProposal.getProposalsByState(0), // Voting
      contracts.bountyProposal.getProposalsByState(1), // Active
      contracts.bountyProposal.getProposalsByState(2), // Completed
      contracts.bountyProposal.getProposalsByState(3), // Expired
    ]);

    const totalProcessed = completed.length + expired.length;
    const successRate = totalProcessed > 0
      ? (completed.length / totalProcessed) * 100
      : 0;

    return {
      voting: voting.length,
      active: active.length,
      completed: completed.length,
      expired: expired.length,
      successRate: successRate.toFixed(1),
      totalProposals: voting.length + active.length + completed.length + expired.length,
    };
  } catch (error) {
    console.error('Error fetching bounty pipeline:', error);
    throw error;
  }
};

/**
 * Get active bounties with details
 */
export const getActiveBounties = async (limit = 10) => {
  // Use mock data if contracts not deployed
  if (!hasContractAddresses() || isHybridMode()) {
    return mockDataService.getMockActiveBounties(limit);
  }

  try {
    const activeBountyIds = await contracts.bountyProposal.getProposalsByState(1);
    const bountyPromises = activeBountyIds.slice(0, limit).map(id =>
      contracts.bountyProposal.getProposal(id)
    );

    const bounties = await Promise.all(bountyPromises);

    return bounties.map(b => ({
      id: b.id.toString(),
      proposer: b.proposer,
      title: b.title,
      ipfsHash: b.ipfsHash,
      amount: ethers.utils.formatUnits(b.amount, 6),
      deadline: new Date(Number(b.deadline) * 1000).toLocaleDateString(),
      claimedBy: b.claimedBy,
      isClaimed: b.claimedBy !== ethers.constants.AddressZero,
    }));
  } catch (error) {
    console.error('Error fetching active bounties:', error);
    return [];
  }
};

/**
 * Get verifier leaderboard
 */
export const getVerifierLeaderboard = async (limit = 20) => {
  // Use mock data if contracts not deployed
  if (!hasContractAddresses() || isHybridMode()) {
    return mockDataService.getMockVerifierLeaderboard(limit);
  }

  try {
    const verifiers = await contracts.verificationPool.getAllVerifiers();
    const statsPromises = verifiers.slice(0, limit).map(addr =>
      contracts.verificationPool.getVerifierStats(addr).then(stats => ({
        address: addr,
        ...stats
      }))
    );

    const allStats = await Promise.all(statsPromises);

    // Sort by total verifications
    const sorted = allStats.sort((a, b) =>
      Number(b.totalVerifications) - Number(a.totalVerifications)
    );

    return sorted.map((stat, index) => ({
      rank: index + 1,
      address: stat.address,
      verifications: stat.totalVerifications.toString(),
      approvals: stat.approvals.toString(),
      rejections: stat.rejections.toString(),
      approvalRate: stat.totalVerifications > 0
        ? ((Number(stat.approvals) / Number(stat.totalVerifications)) * 100).toFixed(1)
        : '0',
      earnings: ethers.utils.formatUnits(stat.earnings, 6),
      stakedAmount: ethers.utils.formatEther(stat.stakedAmount),
    }));
  } catch (error) {
    console.error('Error fetching verifier leaderboard:', error);
    return [];
  }
};

/**
 * Get proposal details by ID
 */
export const getProposalDetails = async (proposalId) => {
  // Use mock data if contracts not deployed
  if (!hasContractAddresses() || isHybridMode()) {
    return mockDataService.getMockProposalDetails(proposalId);
  }

  try {
    const proposal = await contracts.bountyProposal.getProposal(proposalId);

    return {
      id: proposal.id.toString(),
      proposer: proposal.proposer,
      title: proposal.title,
      ipfsHash: proposal.ipfsHash,
      amount: ethers.utils.formatUnits(proposal.amount, 6),
      deadline: new Date(Number(proposal.deadline) * 1000),
      state: ['Voting', 'Active', 'Completed', 'Expired', 'Disputed'][proposal.state],
      votingDeadline: new Date(Number(proposal.votingDeadline) * 1000),
      forVotes: proposal.forVotes.toString(),
      againstVotes: proposal.againstVotes.toString(),
      createdAt: new Date(Number(proposal.createdAt) * 1000),
      claimedBy: proposal.claimedBy,
    };
  } catch (error) {
    console.error('Error fetching proposal details:', error);
    throw error;
  }
};

/**
 * Get total funded researchers (unique payout recipients)
 * This queries historical events - for MVP, returns estimate
 */
export const getTotalFundedResearchers = async () => {
  // Use mock data if contracts not deployed
  if (!hasContractAddresses() || isHybridMode()) {
    return mockDataService.getMockTotalFundedResearchers();
  }

  try {
    // For MVP: Return completed bounties count as proxy
    // In production: Query PaymentReleased events and count unique recipients
    const completedBounties = await contracts.bountyProposal.getProposalsByState(2);
    return completedBounties.length; // Simplified - assumes 1 researcher per bounty
  } catch (error) {
    console.error('Error fetching funded researchers:', error);
    return 0;
  }
};

// Export initialized state
export const isInitialized = () => {
  return provider !== undefined && Object.keys(contracts).length > 0;
};

export default {
  initializeWeb3,
  getDashboardData,
  getTreasuryHealth,
  getBountyPipeline,
  getActiveBounties,
  getVerifierLeaderboard,
  getProposalDetails,
  getTotalFundedResearchers,
  getABCPrice,
  isInitialized,
};
