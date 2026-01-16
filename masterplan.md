# ABC Governance Dashboard - Master Plan
**Single Source of Truth for ABC Protocol Dashboard Development**

---

## Document Information

| Field | Value |
|-------|-------|
| **Project** | ABC Governance Dashboard |
| **Version** | 1.0 |
| **Last Updated** | January 8, 2026 |
| **Status** | Active Development |
| **Target Launch** | February 15, 2026 (Genesis) |
| **Network** | Ethereum Sepolia (Testnet) → Base (Mainnet) |
| **Repository** | abc-governance-dashboard |

---

## Executive Summary

The ABC Governance Dashboard is a real-time visualization platform for the Aligned Beacon Commons (ABC) Protocol - a token-governed, radically transparent public funding mechanism for AI alignment research. This dashboard serves as the primary interface for monitoring bounties, treasury health, governance participation, and global researcher distribution.

### Core Objectives

1. **Radical Transparency**: Every dollar, vote, and research output visible on-chain
2. **Governance Monitoring**: Real-time conviction voting analytics and participation metrics
3. **Treasury Health**: Track ABC token flows, SAT reserves (stablecoins Year 1), and sustainability runway
4. **Global Impact**: Visualize researcher distribution across 20+ countries
5. **Bounty Lifecycle**: Monitor proposals from creation → voting → active → completion

### Key Differentiators

- **Independent from SAIT Dashboard**: Separate application with shared SAT treasury concept
- **On-chain First**: All critical data stored and queried from smart contracts
- **Dune Analytics Integration**: Third-party verification and advanced queries
- **Geographic Diversity**: Built-in regional cohort visualization
- **Conviction Voting**: Time-weighted governance metrics vs. simple token counts

---

## Project Architecture

### Technology Stack

```yaml
Frontend:
  Framework: React 18.2.0
  Charting: Recharts 2.10.3
  Web3: ethers.js 5.7.2
  Styling: Tailwind CSS 3.4.0
  Build: react-scripts 5.0.1

Blockchain:
  Network: Sepolia (testnet) → Base (production)
  RPC: Alchemy/Infura
  Indexing: The Graph subgraphs

Analytics:
  Primary: Dune Analytics
  Fallback: Direct contract queries

Backend (Future):
  Framework: Flask (Python) - for Research App integration
  Database: SQLite → PostgreSQL
```

### Smart Contract Architecture

The ABC Protocol consists of 5 core smart contracts deployed on Sepolia:

| Contract | Purpose | Key Functions | Priority |
|----------|---------|---------------|----------|
| **ABCToken.sol** | ERC-20 governance token (100M supply) | `transfer()`, `approve()`, `stake()`, `delegate()` | Critical |
| **ABCTreasury.sol** | Manages contributions and fund allocation | `contribute()`, `releaseFunds()`, `addLiquidity()` | Critical |
| **BountyProposal.sol** | Proposal lifecycle and conviction voting | `createProposal()`, `vote()`, `finalize()` | Critical |
| **VerificationPool.sol** | Milestone verification and payouts | `submitWork()`, `verify()`, `slash()` | High |
| **AuthorityScore.sol** | Reputation tracking (optional for v1) | `updateScore()`, `getScore()` | Medium |

### Data Model

```
┌─────────────────────────────────────────────────────────────┐
│                     DATA SOURCES                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ON-CHAIN (Sepolia Contracts)                               │
│  ├── ABC Token balances & transfers                         │
│  ├── Treasury deposits & withdrawals                        │
│  ├── Proposal creation & voting events                      │
│  ├── Bounty states (voting, active, completed, expired)     │
│  ├── Verifier assignments & approvals                       │
│  └── Payout transactions                                    │
│                                                              │
│  DUNE ANALYTICS (Third-Party Queries)                       │
│  ├── Total treasury value (USD)                             │
│  ├── Cumulative researcher payouts by country               │
│  ├── Bounty success rate & completion velocity              │
│  ├── Top 20 voters by conviction                            │
│  ├── Geographic distribution heatmap                        │
│  └── Papers funded this month (with metadata)               │
│                                                              │
│  OFF-CHAIN (Future - Phase 2)                               │
│  ├── Researcher profiles (name, institution, country)       │
│  ├── Bounty justifications (100-300 words)                  │
│  ├── Paper metadata (title, abstract, IPFS hash)            │
│  └── Impact metrics (citations, GitHub stars)               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Dashboard Features & Components

### 1. Overview Cards (Top Section)

**4-card metric summary** - Real-time KPIs updated every 60 seconds

| Metric | Data Source | Calculation | Target Value |
|--------|-------------|-------------|--------------|
| **ABC Price** | DEX LP contract or Oracle | Last trade price from ABC-ETH pool | $0.10+ (launch) |
| **Treasury Value** | ABCTreasury.sol + SAT reserves | `(ABC holdings × price) + (SAT stablecoin reserves)` | $5M+ by Q2 2026 |
| **Active Bounties** | BountyProposal.sol | Count of proposals in "Active" state | 10-20 healthy range |
| **Total Funded Researchers** | VerificationPool.sol | Unique addresses with payouts | 100+ by Q2 2026 |

**Visual Style**: Same card component as SAIT dashboard (`MetricCard`), blue/green/purple color scheme

---

### 2. Bounty Pipeline Funnel

**Purpose**: Visualize proposal lifecycle from submission → completion

```
Proposals Submitted (100)
       ↓
  Voting (30)
       ↓
  Approved & Active (20)
       ↓
  Submitted for Review (12)
       ↓
  Verified & Paid (10)

Success Rate: 10/22 = 45%
```

**Data Source**:
- Query `BountyProposal.sol` for proposal states
- Group by: `Voting`, `Active`, `Completed`, `Expired`, `Disputed`

**Visualization**:
- Funnel chart (or stacked bar chart via Recharts)
- Color coding: Blue (voting) → Green (active) → Gold (completed) → Red (expired)

**Key Metrics**:
- Success rate: `Completed / (Completed + Expired)` - **Target: 75%+**
- Average completion time: `completed_at - claimed_at` - **Target: <30 days**
- Active bounty value: Sum of `proposal_amount_usd` for active bounties

---

### 3. Treasury Health Dashboard

**Two-panel view**: ABC Treasury + SAT Reserves

#### Panel A: ABC Treasury

| Metric | Source | Formula |
|--------|--------|---------|
| ABC Holdings | ABCTreasury.sol | `balanceOf(treasuryAddress)` |
| ABC Value (USD) | Holdings × price | Calculate in frontend |
| % of Total Supply | Holdings / 100M | Percentage bar |
| Monthly Emissions | Smart contract config | 0 (Year 1) → 6M max (Year 2+) |

#### Panel B: SAT Reserves (Stablecoins Year 1)

| Metric | Source | Formula |
|--------|--------|---------|
| Stablecoin Holdings | ABCTreasury.sol | `getStablecoinBalance()` (USDC/USDT) |
| SAT Value (USD) | 1:1 with stablecoins | Direct value |
| Buyback Capacity | Stablecoin reserves / ABC price | How many ABC can be bought back |
| Runway (months) | Stablecoin value / monthly burn | Sustainability metric |

**Note**: Year 1 uses 100% stablecoins for simplicity. Future years will diversify into commodity basket.

**Visualization**:
- Pie chart: Asset allocation (ABC vs Stablecoins vs ETH)
- Line chart: 12-month treasury value history
- Gauge: Runway indicator (Red <6mo, Yellow 6-12mo, Green >12mo)

---

### 4. Conviction Voting Analytics

**Purpose**: Measure governance health and whale concentration

#### Metrics Display

| Metric | Calculation | Target | Status Indicator |
|--------|-------------|--------|------------------|
| **Voter Participation Rate** | `Unique voters / Total eligible holders` | 40%+ | Green if >40% |
| **Avg Conviction Multiplier** | `Average(conviction_score / token_balance)` | 1.2x+ | Shows time commitment |
| **Top 10 Concentration** | `Sum(top 10 votes) / Total votes` | <30% | Red if >30% (whale risk) |
| **Regional Balance** | `% votes per region` | 20-40% each | Check Americas/Europe/APAC |

#### Visualization Components

**1. Voter Distribution Chart** (Histogram)
- X-axis: Conviction score ranges (0-100, 100-500, 500-1000, 1000+)
- Y-axis: Number of voters
- Shows decentralization of voting power

**2. Top 20 Voters Table**
```
Rank | Voter Address | ABC Balance | Conviction Score | Proposals Voted | Profile Type
-----|---------------|-------------|------------------|-----------------|-------------
1    | 0xABC...123   | 500K        | 1,234           | 45              | Institutional
2    | 0xDEF...456   | 250K        | 987             | 38              | Academic
...
```

**3. Regional Cohort Breakdown** (Pie chart)
- Americas: 32%
- Europe: 35%
- Asia-Pacific: 28%
- Africa/Middle East: 5%

**Data Source**:
- On-chain: `BountyProposal.sol` - vote events with conviction weights
- Off-chain (Phase 2): Voter profiles with geographic tags

---

### 5. Researcher Geographic Distribution

**World Map Visualization** - Interactive choropleth showing global reach

#### Data Requirements

**On-chain**:
- Researcher wallet addresses (from payout events)
- Total payout amounts per address

**Off-chain** (Phase 2):
- Researcher profile → country mapping
- Stored in Research App database

**MVP Approach** (Phase 1):
- Manual tagging: Admin assigns countries to top 20 researchers
- Displayed as: "20+ researchers across 12 countries" (text summary)
- Future: Auto-detection via IP/institutional affiliation

#### Metrics per Country

```json
{
  "country": "United States",
  "researcher_count": 15,
  "total_paid_usd": 450000,
  "avg_per_researcher": 30000,
  "bounties_completed": 42,
  "top_domains": ["Mechanistic Interp", "Agent Foundations"]
}
```

**Visualization**:
- World map with color intensity = total funding
- Hover tooltip: Country details
- Goal indicator: "16 of 20 target countries reached ✓"

---

### 6. Bounty Completion Timeline

**Purpose**: Show research output velocity over time

#### Chart Design

**Type**: Stacked area chart (Recharts `<AreaChart>`)

**Data Structure**:
```javascript
[
  { month: "Jan 2026", submitted: 5, active: 3, completed: 2 },
  { month: "Feb 2026", submitted: 8, active: 5, completed: 4 },
  { month: "Mar 2026", submitted: 12, active: 7, completed: 6 },
  ...
]
```

**Color Coding**:
- Submitted: Light blue (#bfdbfe)
- Active: Medium blue (#60a5fa)
- Completed: Dark blue (#2563eb)

**Key Insights**:
- Growth trend: Are completions accelerating?
- Bottlenecks: If "Active" grows but "Completed" stagnates → verifier issue
- Velocity: Completions per month (target: 10+ by Q2 2026)

---

### 7. Live Bounty Feed

**Real-time activity stream** - Shows latest events

#### Event Types

| Event | Icon | Description | Data Source |
|-------|------|-------------|-------------|
| **Proposal Created** | 📝 | New bounty proposed | `ProposalCreated` event |
| **Voting Ended** | 🗳️ | Proposal approved/rejected | `ProposalFinalized` event |
| **Bounty Claimed** | 🎯 | Researcher claims active bounty | `BountyClaimed` event |
| **Work Submitted** | 📄 | Deliverables submitted for review | `WorkSubmitted` event |
| **Payment Released** | 💰 | Researcher paid | `PaymentReleased` event |

#### Feed Item Template

```
💰 Payment Released
Researcher 0xABC...123 received $15,000 for "Adversarial Robustness Dataset"
2 hours ago | View on Etherscan
```

**Implementation**:
- Query last 20 events from all contracts
- Sort by `block.timestamp` descending
- Auto-refresh every 30 seconds
- Click event → opens Etherscan transaction link

---

### 8. Verifier Performance Leaderboard

**Purpose**: Track verification pool quality and speed

#### Metrics per Verifier

| Metric | Calculation | Target |
|--------|-------------|--------|
| **Verifications Completed** | Count of submissions reviewed | 10+ |
| **Approval Rate** | Approvals / Total reviews | 60-80% (not too strict/loose) |
| **Avg Review Time** | Average hours from submission → verdict | <48 hours |
| **Accuracy Score** | Based on consensus agreement | 85%+ |
| **Earnings (USD)** | 1% of verified bounties | Incentive metric |

#### Leaderboard Display

```
Rank | Verifier      | Verifications | Approval Rate | Avg Time | Accuracy | Earnings
-----|---------------|---------------|---------------|----------|----------|----------
1    | 0xVER...001   | 34            | 76%           | 18h      | 94%      | $2,400
2    | 0xVER...002   | 28            | 68%           | 24h      | 88%      | $1,950
3    | 0xVER...003   | 25            | 82%           | 36h      | 91%      | $1,700
```

**Data Source**: `VerificationPool.sol` - verification events and timing data

**Visual Style**: Table with badge icons (🥇🥈🥉 for top 3)

---

## Dune Analytics Integration

### The 6 Killer Queries

Based on the ABC proposal, implement these as embedded Dune dashboards:

#### Query 1: Total Treasury Value

**Purpose**: Real-time treasury health and asset composition

**SQL Pseudo-code**:
```sql
SELECT
  SUM(CASE WHEN token = 'ABC' THEN amount * abc_price ELSE 0 END) AS abc_usd,
  SUM(CASE WHEN token = 'ETH' THEN amount * eth_price ELSE 0 END) AS eth_usd,
  SUM(CASE WHEN token = 'USDC' THEN amount ELSE 0 END) AS usdc_usd,
  SUM(CASE WHEN token = 'USDT' THEN amount ELSE 0 END) AS usdt_usd
FROM sepolia.erc20_transfers
WHERE to_address = '0xABCTreasuryAddress'
```

**Visualization**: Multi-metric card + pie chart (asset breakdown)

---

#### Query 2: Cumulative Payouts by Country

**Purpose**: Geographic diversity proof

**Data Requirements**:
- On-chain: Payout events with researcher addresses
- Off-chain: Address → country mapping (Phase 2)

**Visualization**: World map choropleth + ranked table

**Target Metric**: 20+ countries by Q2 2026

---

#### Query 3: Bounty Success Rate

**Purpose**: Operational health

**SQL Pseudo-code**:
```sql
WITH bounty_states AS (
  SELECT state, COUNT(*) AS count
  FROM abc.bounties
  GROUP BY state
)
SELECT
  (SELECT count FROM bounty_states WHERE state = 'Completed') AS completed,
  (SELECT count FROM bounty_states WHERE state = 'Expired') AS expired,
  (completed / (completed + expired)) * 100 AS success_rate
```

**Visualization**: Funnel chart + KPI card

**Target Metric**: 75%+ success rate

---

#### Query 4: Top 20 Voters by Conviction

**Purpose**: Governance participation and whale monitoring

**SQL Pseudo-code**:
```sql
SELECT
  voter_address,
  COUNT(DISTINCT proposal_id) AS proposals_voted,
  SUM(vote_weight) AS total_conviction,
  MAX(vote_timestamp) AS last_vote
FROM abc.proposal_votes
GROUP BY voter_address
ORDER BY total_conviction DESC
LIMIT 20
```

**Visualization**: Ranked table with profile badges

**Target Metric**: Top 10 hold <30% of total voting power

---

#### Query 5: Safety Impact Efficiency

**Purpose**: ROI per $1k spent

**Methodology** (Phase 2 - requires off-chain impact data):
```
Safety Impact Score = (self_reported × 0.2) +
                      (peer_review_avg × 0.4) +
                      (log(citations + 1) × 15) +
                      (log(adoption + 1) × 10)

Efficiency = Safety Impact Score / (Payout USD / 1000)
```

**Visualization**: Scatter plot (X=payout, Y=impact, size=efficiency)

**Target Metric**: 10+ impact per $1k (vs 5-8 traditional grants)

---

#### Query 6: Papers Funded This Month

**Purpose**: Research output showcase

**Data Requirements**:
- On-chain: Completion events with bounty IDs
- Off-chain: Paper metadata (title, IPFS hash, DOI)

**Visualization**: Card grid with thumbnails

**MVP**: Text list with links
**Future**: Auto-generated cover images + social share buttons

---

### Dune Dashboard Embedding

**Implementation**:

```javascript
// Embed Dune chart in React component
<iframe
  src="https://dune.com/embeds/query-12345"
  width="100%"
  height="400"
  frameBorder="0"
  title="ABC Treasury Value"
/>
```

**Fallback Strategy**: If Dune API is down, query contracts directly using ethers.js

---

## Smart Contract Specifications

### 1. ABCToken.sol (Already Implemented)

**Status**: ✅ Contract exists at `/abc-protocol/contracts/ABCToken.sol`

**Key Functions**:
```solidity
function totalSupply() external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
function transfer(address to, uint256 amount) external returns (bool);
function approve(address spender, uint256 amount) external returns (bool);
```

**Dashboard Queries**:
- Total supply: `ABCToken.totalSupply()` → Should always return 100,000,000
- Treasury balance: `ABCToken.balanceOf(treasuryAddress)`
- Circulating supply: `totalSupply - treasuryBalance - lockedVaults`

---

### 2. ABCTreasury.sol (TO BE DEVELOPED)

**Core Functionality**:

```solidity
contract ABCTreasury {
    // Track contributions
    mapping(address => uint256) public contributions;
    uint256 public totalContributions;

    // Track stablecoin reserves (Year 1 simplification)
    uint256 public stablecoinReserves; // USDC/USDT

    // Contribution function
    function contribute() external payable {
        require(msg.value >= MIN_CONTRIBUTION, "Below minimum");

        uint256 lpAmount = msg.value / 2;
        uint256 treasuryAmount = msg.value / 2;

        // Add to DEX liquidity pool
        addLiquidity(lpAmount);

        // Track treasury
        contributions[msg.sender] += treasuryAmount;
        totalContributions += treasuryAmount;

        emit Contribution(msg.sender, msg.value, block.timestamp);
    }

    // Release funds for approved bounties
    function releaseFunds(address recipient, uint256 amount) external onlyBountyContract {
        require(stablecoinReserves >= amount, "Insufficient funds");
        // Transfer stablecoins to recipient
        emit FundsReleased(recipient, amount, block.timestamp);
    }

    // Query functions for dashboard
    function getTreasuryValue() external view returns (uint256) {
        return stablecoinReserves;
    }

    function getStablecoinBalance() external view returns (uint256) {
        return stablecoinReserves;
    }
}
```

**Dashboard Queries**:
- Total treasury value: `getTreasuryValue()`
- Stablecoin reserves: `getStablecoinBalance()`
- Runway calculation: Frontend computes based on burn rate

---

### 3. BountyProposal.sol (TO BE DEVELOPED)

**Proposal States**:
```solidity
enum ProposalState { Voting, Active, Completed, Expired, Disputed }

struct Proposal {
    uint256 id;
    address proposer;
    string title;
    string ipfsHash; // Full proposal on IPFS
    uint256 amount;  // In USD equivalent
    uint256 deadline;
    ProposalState state;
    uint256 votingDeadline;
}
```

**Key Functions**:

```solidity
function createProposal(
    string memory title,
    string memory ipfsHash,
    uint256 amount
) external returns (uint256 proposalId) {
    require(abcToken.balanceOf(msg.sender) >= PROPOSAL_STAKE, "Need 5,000 ABC");

    // Lock stake
    abcToken.transferFrom(msg.sender, address(this), PROPOSAL_STAKE);

    // Create proposal
    uint256 id = nextProposalId++;
    proposals[id] = Proposal({
        id: id,
        proposer: msg.sender,
        title: title,
        ipfsHash: ipfsHash,
        amount: amount,
        deadline: 0,
        state: ProposalState.Voting,
        votingDeadline: block.timestamp + VOTING_PERIOD
    });

    emit ProposalCreated(id, msg.sender, amount, title);
    return id;
}

function vote(uint256 proposalId, bool support) external {
    require(proposals[proposalId].state == ProposalState.Voting, "Not voting");
    require(block.timestamp < proposals[proposalId].votingDeadline, "Ended");

    // Calculate conviction score
    uint256 stakeAmount = getStakedBalance(msg.sender);
    uint256 stakeDuration = getStakeDuration(msg.sender);
    uint256 conviction = stakeAmount * sqrt(stakeDuration);

    // Apply quadratic voting
    uint256 voteWeight = sqrt(conviction);

    votes[proposalId][msg.sender] = Vote({
        support: support,
        weight: voteWeight,
        timestamp: block.timestamp
    });

    emit VoteCast(proposalId, msg.sender, support, voteWeight);
}

function finalizeProposal(uint256 proposalId) external {
    Proposal storage prop = proposals[proposalId];
    require(block.timestamp >= prop.votingDeadline, "Voting active");

    (uint256 forVotes, uint256 againstVotes) = tallyVotes(proposalId);

    if (forVotes > againstVotes && forVotes >= QUORUM) {
        prop.state = ProposalState.Active;
        // Refund proposer stake
        abcToken.transfer(prop.proposer, PROPOSAL_STAKE);
        emit ProposalApproved(proposalId);
    } else {
        prop.state = ProposalState.Rejected;
        emit ProposalRejected(proposalId);
    }
}

// Dashboard query functions
function getProposalsByState(ProposalState state) external view returns (uint256[] memory) {
    // Return array of proposal IDs in given state
}

function getProposal(uint256 id) external view returns (Proposal memory) {
    return proposals[id];
}
```

**Dashboard Queries**:
- Active bounties: `getProposalsByState(ProposalState.Active)`
- Voting proposals: `getProposalsByState(ProposalState.Voting)`
- Completed: `getProposalsByState(ProposalState.Completed)`
- Success rate: Calculate from event logs

---

### 4. VerificationPool.sol (TO BE DEVELOPED)

**Verification Workflow**:

```solidity
struct Submission {
    uint256 bountyId;
    address researcher;
    string ipfsHash; // Deliverables on IPFS
    uint256 timestamp;
    address[] verifiers;
    uint8 approvalCount;
    bool paid;
}

function submitWork(uint256 bountyId, string memory ipfsHash) external {
    require(bounties[bountyId].claimedBy == msg.sender, "Not claimer");

    uint256 submissionId = nextSubmissionId++;
    submissions[submissionId] = Submission({
        bountyId: bountyId,
        researcher: msg.sender,
        ipfsHash: ipfsHash,
        timestamp: block.timestamp,
        verifiers: assignVerifiers(bountyId), // Random 3-5 verifiers
        approvalCount: 0,
        paid: false
    });

    emit WorkSubmitted(bountyId, submissionId, msg.sender, ipfsHash);
}

function verify(uint256 submissionId, bool approve) external {
    Submission storage sub = submissions[submissionId];
    require(isAssignedVerifier(msg.sender, sub.verifiers), "Not assigned");

    if (approve) {
        sub.approvalCount++;
    }

    // Check if majority reached
    uint256 requiredApprovals = (sub.verifiers.length / 2) + 1;
    if (sub.approvalCount >= requiredApprovals && !sub.paid) {
        releaseBounty(sub.bountyId, sub.researcher);
        sub.paid = true;
        emit VerificationComplete(submissionId, true);
    }
}

function getVerifierStats(address verifier) external view returns (
    uint256 totalVerifications,
    uint256 approvalRate,
    uint256 avgReviewTime,
    uint256 earnings
) {
    // Aggregate verifier performance metrics
}
```

**Dashboard Queries**:
- Verifier leaderboard: `getVerifierStats()` for all verifiers
- Pending verifications: Count submissions with `paid == false`

---

## Development Roadmap

### Phase 1: Foundation (Jan 6 - Feb 7, 2026)

**Week 1-2 (Jan 6-20): Smart Contract Development**

| Task | Owner | Deliverable | Priority |
|------|-------|-------------|----------|
| Implement ABCTreasury.sol | Solidity Dev | Contract + unit tests | P0 |
| Implement BountyProposal.sol | Solidity Dev | Contract + unit tests | P0 |
| Implement VerificationPool.sol | Solidity Dev | Contract + unit tests | P1 |
| Deploy to Sepolia testnet | Solidity Dev | Verified contracts on Etherscan | P0 |
| Create deployment script | Solidity Dev | Hardhat deployment automation | P0 |

**Week 3-4 (Jan 20 - Feb 7): Dashboard Development**

| Task | Owner | Deliverable | Priority |
|------|-------|-------------|----------|
| Setup React app structure | Frontend Dev | Component tree + routing | P0 |
| Build Overview Cards component | Frontend Dev | 4-card metrics display | P0 |
| Build Treasury Health panel | Frontend Dev | 2-panel treasury view | P0 |
| Build Bounty Pipeline funnel | Frontend Dev | Funnel chart component | P1 |
| Build Conviction Voting charts | Frontend Dev | Distribution + top voters | P1 |
| Implement Web3 integration | Frontend Dev | ethers.js queries to contracts | P0 |
| Setup auto-refresh (60s) | Frontend Dev | useEffect polling | P1 |

**Deliverables by Feb 7**:
- ✅ 3 core contracts deployed on Sepolia
- ✅ Dashboard with 5 main visualizations
- ✅ Real-time data from blockchain
- ✅ Responsive design (mobile-friendly)

---

### Phase 2: Genesis Launch (Feb 8-15, 2026)

**Week 1 (Feb 8-14): Testing & Polish**

| Task | Owner | Deliverable | Priority |
|------|-------|-------------|----------|
| End-to-end testing | QA | Test report + bug fixes | P0 |
| Seed 10 test bounties | Product | Sample data in contracts | P1 |
| Create demo video | Marketing | 5-min walkthrough | P1 |
| Write user guide | Docs | Dashboard navigation guide | P1 |
| Performance optimization | Frontend Dev | Load time <2s | P1 |

**Genesis Launch (Feb 15, 2026)**:
- Public dashboard live at `dashboard.abcprotocol.org`
- Genesis $ABC distribution event
- First 5 curated bounties go live
- Dune Analytics dashboard published

---

### Phase 3: Iteration & Scale (Feb 16 - Mar 31, 2026)

**Post-Launch Enhancements**

| Feature | Timeline | Priority |
|---------|----------|----------|
| Dune Analytics integration (6 queries) | Week 1-2 | P0 |
| Geographic distribution map | Week 2-3 | P1 |
| Verifier performance leaderboard | Week 3-4 | P1 |
| Live bounty feed (real-time events) | Week 4-5 | P2 |
| Mobile app (React Native) | Month 2-3 | P3 |
| Research App integration | Month 2-3 | P2 |

---

## Success Metrics

### Q2 2026 Targets (Aligned with ABC Proposal)

| Metric | Target | Measurement Method | Dashboard Location |
|--------|--------|-------------------|-------------------|
| **ABC Holders** | 2,000+ | Unique addresses with balance >100 ABC | Overview card |
| **Treasury Size** | $5M+ | Sum of ABC + Stablecoins + ETH value | Treasury panel |
| **Funded Researchers** | 100+ | Unique payout recipients | Overview card |
| **Countries Represented** | 20+ | Geographic distribution map | World map |
| **Total Payouts** | $2M+ | Cumulative bounty payouts (USD) | Dune Query 2 |
| **Bounty Success Rate** | 75%+ | Completed / (Completed + Expired) | Funnel chart |
| **Voter Participation** | 40%+ | Votes cast / Eligible voters | Conviction analytics |
| **Active Bounties** | 10-20 | Proposals in Active state | Overview card |

---

## Technical Implementation Details

### Web3 Integration Pattern

```javascript
// services/web3Service.js

import { ethers } from 'ethers';
import ABCTokenABI from '../config/abis/ABCToken.json';
import ABCTreasuryABI from '../config/abis/ABCTreasury.json';
import BountyProposalABI from '../config/abis/BountyProposal.json';

const CONTRACTS = {
  ABCToken: '0x...', // Deployed address on Sepolia
  ABCTreasury: '0x...',
  BountyProposal: '0x...',
  VerificationPool: '0x...',
};

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_SEPOLIA_RPC_URL
);

// Initialize contracts
const abcToken = new ethers.Contract(
  CONTRACTS.ABCToken,
  ABCTokenABI,
  provider
);

const treasury = new ethers.Contract(
  CONTRACTS.ABCTreasury,
  ABCTreasuryABI,
  provider
);

const bountyContract = new ethers.Contract(
  CONTRACTS.BountyProposal,
  BountyProposalABI,
  provider
);

// Query functions
export const getDashboardData = async () => {
  try {
    // Parallel queries for efficiency
    const [
      totalSupply,
      treasuryBalance,
      stablecoinReserves,
      activeBounties,
      completedBounties
    ] = await Promise.all([
      abcToken.totalSupply(),
      abcToken.balanceOf(CONTRACTS.ABCTreasury),
      treasury.getStablecoinBalance(),
      bountyContract.getProposalsByState(1), // Active
      bountyContract.getProposalsByState(2)  // Completed
    ]);

    return {
      totalSupply: ethers.utils.formatEther(totalSupply),
      treasuryBalance: ethers.utils.formatEther(treasuryBalance),
      stablecoinReserves: stablecoinReserves.toNumber(),
      activeBountyCount: activeBounties.length,
      completedBountyCount: completedBounties.length,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

export const getABCPrice = async () => {
  // Query from DEX LP or price oracle
  // For MVP: Can use fixed $0.10 or Dune API
  return 0.10; // USD
};

export const getTreasuryValue = async () => {
  const [abcBalance, stablecoinReserves, abcPrice] = await Promise.all([
    abcToken.balanceOf(CONTRACTS.ABCTreasury),
    treasury.getStablecoinBalance(),
    getABCPrice()
  ]);

  const abcValue = parseFloat(ethers.utils.formatEther(abcBalance)) * abcPrice;
  const stablecoinValue = stablecoinReserves.toNumber(); // 1:1 with USD

  return {
    totalValue: abcValue + stablecoinValue,
    abcValue,
    stablecoinValue,
    abcBalance: ethers.utils.formatEther(abcBalance),
    stablecoinBalance: stablecoinReserves.toNumber()
  };
};
```

### Component Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── ABCDashboard.jsx          # Main dashboard container
│   │   ├── OverviewCards.jsx         # 4-card metrics
│   │   ├── TreasuryHealth.jsx        # Treasury + Stablecoin panels
│   │   ├── BountyPipeline.jsx        # Funnel chart
│   │   ├── ConvictionVoting.jsx      # Voting analytics
│   │   ├── GeographicMap.jsx         # World map (Phase 2)
│   │   ├── VerifierLeaderboard.jsx   # Verifier stats
│   │   └── LiveBountyFeed.jsx        # Event stream
│   ├── Charts/
│   │   ├── FunnelChart.jsx
│   │   ├── WorldMap.jsx
│   │   └── ConvictionDistribution.jsx
│   └── Common/
│       ├── MetricCard.jsx            # Reusable card component
│       ├── LoadingSpinner.jsx
│       └── ErrorBoundary.jsx
├── services/
│   ├── web3Service.js               # Contract queries
│   ├── duneService.js               # Dune API calls
│   └── priceService.js              # Price oracle
├── config/
│   ├── contracts.js                 # Contract addresses
│   └── abis/                        # Contract ABIs
├── hooks/
│   ├── useDashboardData.js          # Main data hook
│   ├── useBounties.js
│   └── useTreasury.js
└── App.js
```

---

## Deployment & Operations

### Environment Configuration

**Development (.env.development)**:
```env
REACT_APP_NETWORK=sepolia
REACT_APP_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
REACT_APP_ABC_TOKEN_ADDRESS=0x...
REACT_APP_ABC_TREASURY_ADDRESS=0x...
REACT_APP_BOUNTY_PROPOSAL_ADDRESS=0x...
REACT_APP_DUNE_API_KEY=your_dune_key
```

**Production (.env.production)**:
```env
REACT_APP_NETWORK=base
REACT_APP_BASE_RPC_URL=https://base-mainnet.infura.io/v3/YOUR_KEY
REACT_APP_ABC_TOKEN_ADDRESS=0x...
REACT_APP_ABC_TREASURY_ADDRESS=0x...
REACT_APP_BOUNTY_PROPOSAL_ADDRESS=0x...
REACT_APP_DUNE_API_KEY=your_dune_key
```

### Build & Deployment

**Local Development**:
```bash
npm install
npm start  # Runs on http://localhost:3001
```

**Production Build**:
```bash
npm run build
# Outputs to build/ directory
```

**Vercel Deployment** (Recommended):
```bash
npm install -g vercel
vercel --prod
# Dashboard live at abc-governance-dashboard.vercel.app
```

**Custom Domain**: `dashboard.abcprotocol.org`

---

## Appendix: Key Formulas

### Treasury Runway

```
Runway (months) = Total Treasury Value (USD) / Monthly Burn Rate (USD)

Where:
- Total Treasury Value = (ABC holdings × ABC price) + Stablecoin reserves
- Monthly Burn Rate = Average monthly bounty payouts + operational expenses
- Target: ≥24 months (2-year runway minimum)
```

### Bounty Success Rate

```
Success Rate (%) = (Completed Bounties / (Completed + Expired)) × 100

Example:
- Completed: 85
- Expired: 15
- Success Rate = (85 / 100) × 100 = 85%
```

### Conviction Score

```
Conviction = Token Balance × sqrt(Stake Duration in Days)

Example:
- Alice: 100,000 ABC staked for 180 days
- Conviction = 100,000 × sqrt(180) = 100,000 × 13.42 = 1,342,000

Vote Weight = sqrt(Conviction) = sqrt(1,342,000) = 1,158
```

---

## Quick Start for Developers

**1. Clone Repository**:
```bash
git clone https://github.com/ASICP/abc-governance-dashboard.git
cd abc-governance-dashboard
```

**2. Install Dependencies**:
```bash
npm install
```

**3. Configure Environment**:
```bash
cp .env.example .env.development
# Edit .env.development with your Sepolia RPC URL and contract addresses
```

**4. Run Development Server**:
```bash
npm start
# Dashboard available at http://localhost:3001
```

**5. Deploy Contracts (if needed)**:
```bash
cd abc-protocol
npx hardhat run scripts/deploy.js --network sepolia
# Copy deployed addresses to dashboard .env file
```

---

**End of Master Plan**

This document is the single source of truth for the ABC Governance Dashboard. All team members should reference this document for requirements, specifications, and timelines.

**Next Steps**:
1. Review and approve master plan with stakeholders
2. Create GitHub project board with tasks from roadmap
3. Begin smart contract development (Jan 6, 2026)
4. Schedule weekly sync meetings

**Live Dashboard Target**: February 15, 2026 🚀
