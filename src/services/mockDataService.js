/**
 * Mock Data Service for ABC Dashboard
 * Provides realistic sample data for development/demo when contracts aren't deployed
 */

// Simulate async data fetching
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getMockDashboardData = async () => {
  await delay(500); // Simulate network delay

  return {
    abcPrice: 0.12, // $0.12 (20% premium over launch)
    totalSupply: "100000000",
    circulatingSupply: "12000000", // 12M in circulation
    treasuryABCBalance: "30000000", // 30M in treasury
    stablecoinReserves: "450000", // $450k in USDC/USDT
    treasuryValue: "3600000", // $3.6M total (30M ABC × $0.12 + $450k stablecoins)
    activeBountyCount: 8,
    completedBountyCount: 23,
    marketCap: 1440000, // 12M × $0.12 = $1.44M
    timestamp: Date.now(),
  };
};

export const getMockTreasuryHealth = async () => {
  await delay(300);

  return {
    totalValue: "3600000", // $3.6M
    abcBalance: "30000000",
    abcValue: 3600000, // 30M × $0.12
    stablecoinBalance: "450000",
    stablecoinValue: 450000,
    monthlyBurnRate: "45000", // $45k/month
    runwayMonths: "80", // 80 months runway (very healthy)
    totalContributions: "850000",
    totalPayouts: "345000",
    netPosition: 505000, // $505k net
  };
};

export const getMockBountyPipeline = async () => {
  await delay(300);

  return {
    voting: 5,
    active: 8,
    completed: 23,
    expired: 3,
    successRate: "88.5", // 23/(23+3) = 88.5%
    totalProposals: 39,
  };
};

export const getMockActiveBounties = async (limit = 10) => {
  await delay(400);

  const mockBounties = [
    {
      id: "1",
      proposer: "0xABC123...",
      title: "Adversarial Robustness Dataset for LLMs",
      ipfsHash: "QmXxxx1",
      amount: "25000",
      deadline: "2026-03-15",
      claimedBy: "0xDEF456...",
      isClaimed: true,
    },
    {
      id: "2",
      proposer: "0xBCD234...",
      title: "Mechanistic Interpretability Tools for GPT-4",
      ipfsHash: "QmXxxx2",
      amount: "35000",
      deadline: "2026-04-01",
      claimedBy: "0x0000000000000000000000000000000000000000",
      isClaimed: false,
    },
    {
      id: "3",
      proposer: "0xCDE345...",
      title: "Agent Foundations: Formal Verification Framework",
      ipfsHash: "QmXxxx3",
      amount: "40000",
      deadline: "2026-04-20",
      claimedBy: "0xGHI789...",
      isClaimed: true,
    },
    {
      id: "4",
      proposer: "0xDEF456...",
      title: "Scalable Oversight: Human-AI Collaboration Study",
      ipfsHash: "QmXxxx4",
      amount: "18000",
      deadline: "2026-03-30",
      claimedBy: "0x0000000000000000000000000000000000000000",
      isClaimed: false,
    },
    {
      id: "5",
      proposer: "0xEFG567...",
      title: "Constitutional AI for Multi-Agent Systems",
      ipfsHash: "QmXxxx5",
      amount: "32000",
      deadline: "2026-05-10",
      claimedBy: "0xJKL012...",
      isClaimed: true,
    },
  ];

  return mockBounties.slice(0, limit);
};

export const getMockVerifierLeaderboard = async (limit = 20) => {
  await delay(400);

  const mockVerifiers = [
    {
      rank: 1,
      address: "0xVER001abc123def456",
      verifications: "34",
      approvals: "26",
      rejections: "8",
      approvalRate: "76.5",
      earnings: "2450.00",
      stakedAmount: "75000",
    },
    {
      rank: 2,
      address: "0xVER002def456ghi789",
      verifications: "28",
      approvals: "19",
      rejections: "9",
      approvalRate: "67.9",
      earnings: "1950.00",
      stakedAmount: "60000",
    },
    {
      rank: 3,
      address: "0xVER003ghi789jkl012",
      verifications: "25",
      approvals: "20",
      rejections: "5",
      approvalRate: "80.0",
      earnings: "1700.00",
      stakedAmount: "55000",
    },
    {
      rank: 4,
      address: "0xVER004jkl012mno345",
      verifications: "22",
      approvals: "17",
      rejections: "5",
      approvalRate: "77.3",
      earnings: "1580.00",
      stakedAmount: "52000",
    },
    {
      rank: 5,
      address: "0xVER005mno345pqr678",
      verifications: "19",
      approvals: "14",
      rejections: "5",
      approvalRate: "73.7",
      earnings: "1320.00",
      stakedAmount: "50000",
    },
    {
      rank: 6,
      address: "0xVER006pqr678stu901",
      verifications: "18",
      approvals: "15",
      rejections: "3",
      approvalRate: "83.3",
      earnings: "1280.00",
      stakedAmount: "50000",
    },
    {
      rank: 7,
      address: "0xVER007stu901vwx234",
      verifications: "16",
      approvals: "11",
      rejections: "5",
      approvalRate: "68.8",
      earnings: "1100.00",
      stakedAmount: "50000",
    },
    {
      rank: 8,
      address: "0xVER008vwx234yza567",
      verifications: "15",
      approvals: "12",
      rejections: "3",
      approvalRate: "80.0",
      earnings: "1050.00",
      stakedAmount: "50000",
    },
    {
      rank: 9,
      address: "0xVER009yza567bcd890",
      verifications: "14",
      approvals: "10",
      rejections: "4",
      approvalRate: "71.4",
      earnings: "980.00",
      stakedAmount: "50000",
    },
    {
      rank: 10,
      address: "0xVER010bcd890efg123",
      verifications: "13",
      approvals: "11",
      rejections: "2",
      approvalRate: "84.6",
      earnings: "920.00",
      stakedAmount: "50000",
    },
  ];

  return mockVerifiers.slice(0, limit);
};

export const getMockProposalDetails = async (proposalId) => {
  await delay(300);

  return {
    id: proposalId,
    proposer: "0xABC123def456ghi789",
    title: "Example Bounty Proposal",
    ipfsHash: "QmExampleHash123",
    amount: "25000",
    deadline: new Date("2026-04-15"),
    state: "Active",
    votingDeadline: new Date("2026-02-20"),
    forVotes: "1234567",
    againstVotes: "234567",
    createdAt: new Date("2026-02-01"),
    claimedBy: "0xDEF456ghi789jkl012",
  };
};

export const getMockTotalFundedResearchers = async () => {
  await delay(200);
  return 45; // 45 unique researchers funded so far
};

// Export all mock functions
export default {
  getMockDashboardData,
  getMockTreasuryHealth,
  getMockBountyPipeline,
  getMockActiveBounties,
  getMockVerifierLeaderboard,
  getMockProposalDetails,
  getMockTotalFundedResearchers,
};
