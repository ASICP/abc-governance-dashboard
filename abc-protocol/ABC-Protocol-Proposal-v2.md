# Aligned Beacon Commons Protocol (ABC)
**Technical Proposal – Version 2**  
**December 2025** · **ASI Institute**

---

## Executive Summary

The Aligned Beacon Commons Protocol (ABC) is the fully public, radically transparent, token-governed "brother" of ASIP that enables anyone in the world to fund, propose, and vote on AI alignment research bounties and micro-grants using the $ABC governance token on Base.

**One-Sentence Value Proposition:**  
ABC transforms AI safety funding from opaque, centralized gatekeeping into a permanent, on-chain, globally-accessible commons where every dollar, bounty, and research output is publicly verifiable forever.

**Key Differentiators:**
- 100% on-chain transparency (vs 90% private funding status quo)
- $500-$100k micro-grants (vs $250k+ institutional minimums)
- Real-time conviction voting (vs quarterly board decisions)
- Geographic diversity by design (vs US-centric concentration)
- Symbiotic with ASIP institutional pipeline

---

## 1. Problem Statement & Market Gap

### Current AI Safety Funding Crisis

| Problem (2025 Reality) | Impact | ABC Solution |
|------------------------|--------|---------------|
| 90% of AI safety funding is private, US-centric, opaque | Geographic concentration creates geopolitical risk; limits diverse perspectives | 100% on-chain, permanently public, geographically diverse funding commons |
| Academics have no transparent way to earn alignment research funding | Talented researchers outside traditional networks excluded; funding decisions invisible | Direct bounties and micro-grants paid instantly on milestone verification |
| Existing public funding tools lack credibility & reach | Crowdfunding platforms don't integrate with research workflows; no single source of truth | Built on Base + integrated with Aligned Research App |
| No accountability for "who funded what & why" | Duplication of effort; political influence; no learning from past grants | Every dollar, bounty, and funded paper queryable forever on Dune Analytics |

### Market Opportunity

- **Total Addressable Market:** $16.2T AI ecosystem by 2030
- **Serviceable Market:** $500M-$2B in annual AI safety research funding globally
- **Obtainable Market:** $5M+ treasury by Q2 2026 (0.25-1% of safety funding)

---

## 2. ASIP vs ABCP: Complementary Ecosystems

### Comparative Architecture

| Dimension | ASIP | ABC (Brother) |
|-----------|-------------------|----------------------|
| **Funding Source** | Private treasuries, SWFs, institutions | Global retail + crypto-native public |
| **Governance** | Executive Board + 1% SAIT threshold vote | $ABC token (1 token = 1 vote) + regional cohorts |
| **Transparency** | Audited quarterly | Real-time, on-chain, radical |
| **Minimum Grant** | $250k - $5M | $500 - $100k (bounties + micro-grants) |
| **Decision Speed** | Quarterly cycles | 7-day voting periods |
| **Front-end** | Shared Aligned Research App | Same app – new "Commons" tab |
| **Treasury Asset** | SAT (stable commodity basket) | ETH + USDC + $ABC liquidity pools |
| **Target Grantees** | Established labs, universities, multi-year projects | Individual researchers, early-career, rapid experiments |
| **Regulatory Posture** | Compliance-first, securities-aware | Utility-first, DAO-native |

### Symbiotic Relationship

ABCP acts as the **public validation flywheel** that feeds ASIP's institutional pipeline:

1. **Talent Discovery:** ABCP bounties identify high-performing researchers → ASIP grants scale their work
2. **Proof of Concept:** ABCP funds rapid experiments → ASIP funds full implementation
3. **Community Validation:** ABCP voting surfaces community priorities → ASIP board considers for strategic grants
4. **Public Legitimacy:** ABCP transparency demonstrates AI safety demand → ASIP attracts institutional capital

**Flow Example:**
- Researcher completes $10k ABCP bounty on adversarial robustness
- Work cited in 3 papers, 500+ GitHub stars
- ASIP Grant Committee invites $500k multi-year proposal
- Researcher maintains ABCP involvement while scaling via ASIP

---

## 3. $ABC Token Design

### Token Economics

| Parameter | Specification |
|-----------|---------------|
| **Chain** | Base (Ethereum L2) |
| **Standard** | ERC-20 |
| **Total Supply** | 100,000,000 $ABC (fixed, no inflation) |
| **Initial Circulating** | 5,000,000 $ABC (5% at genesis) |
| **Launch Price** | $0.10 (FDV: $10M) |

### Allocation Breakdown

| Allocation | % | Amount | Vesting | Purpose |
|------------|---|--------|---------|---------|
| **Commons Treasury** | 60% | 60M $ABC | 10-year linear unlock (0.5M/month starting Month 13) | Bounty payouts, grants, operational expenses |
| **Liquidity + Early Contributors** | 20% | 20M $ABC | 50% at TGE, 50% 4-year linear | Initial liquidity pools (10M), advisors (5M), early supporters (5M) |
| **ASI2 Strategic Reserve** | 15% | 15M $ABC | 4-year linear with 2-year cliff | Long-term treasury, emergency reserves, cross-protocol initiatives |
| **Public Sale / Genesis Event** | 5% | 5M $ABC | No lockup | Fair launch participants, immediate circulating supply |

### Anti-Dump Mechanics

1. **Team/Advisor Vesting:** 4-year linear unlock with 2-year cliff (none available before Month 24)
2. **Treasury Emissions Control:** 
   - Year 1: 0 emissions (treasury operates on genesis allocation)
   - Year 2+: Maximum 6M $ABC/year (6% annual dilution declining over time)
   - Governed by community vote; can be reduced but not increased
3. **Conviction Voting Lock:** Tokens used for voting must be staked; early unstaking forfeits voting weight
4. **Verifier Slashing:** Staked tokens in verification pools subject to 50% slash for bad faith

### Token Utility (Multi-Dimensional)

1. **Governance Voting**
   - Vote on bounty/grant proposals
   - Weighted by conviction (time-locked staking)
   - Regional cohort representation (prevents US dominance)

2. **Proposal Creation**
   - Threshold: 5,000 $ABC to create bounty proposal (0.005% of supply)
   - Refundable if proposal passes community vote
   - Prevents spam while remaining accessible

3. **Milestone Verification**
   - Stake $ABC to join verifier pool
   - Earn fees from successful verifications
   - Slashed for approving fraudulent submissions

4. **Yield Generation**
   - Stake in verification pools → earn % of bounty payouts
   - Liquidity provision → earn trading fees
   - Future: Delegation rewards for governance participation

---

## 4. Core Mechanics: Money & Research Flow

### End-to-End Process

```
┌─────────────────────────────────────────────────────────────────┐
│ STEP 1: CONTRIBUTION                                            │
├─────────────────────────────────────────────────────────────────┤
│ Donor sends ETH/USDC → Smart Contract                           │
│ • 50% → $ABC-ETH LP (perpetual liquidity)                       │
│ • 50% → Treasury (available for bounties)                       │
│ • Donor receives receipt NFT (on-chain provenance)              │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2: PROPOSAL CREATION                                       │
├─────────────────────────────────────────────────────────────────┤
│ Anyone creates bounty/micro-grant proposal                      │
│ • Title, description, amount (≤$100k), deliverables, deadline   │
│ • Requires 5,000 $ABC stake (refunded if passes)                │
│ • Proposal published on-chain + indexed in Research App         │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 3: CONVICTION VOTING (7-day period)                        │
├─────────────────────────────────────────────────────────────────┤
│ $ABC holders vote weighted by conviction score                  │
│ • Conviction = tokens × sqrt(days staked)                       │
│ • Regional cohorts ensure geographic diversity                  │
│ • Quadratic voting prevents whale dominance                     │
│ • Proposals need >50% approval + quorum (10% of circulating)    │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 4: ACTIVE STATE                                            │
├─────────────────────────────────────────────────────────────────┤
│ Winning proposals enter "Active Bounties" registry              │
│ • Researcher claims bounty (on-chain registration)              │
│ • Funds escrowed in smart contract                              │
│ • Deadline countdown visible on dashboard                       │
│ • Updates posted to Research App (optional)                     │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 5: SUBMISSION & VERIFICATION                               │
├─────────────────────────────────────────────────────────────────┤
│ Researcher submits deliverables                                 │
│ • Upload to IPFS (PDF, code, datasets)                          │
│ • Metadata logged on-chain (hash, timestamp)                    │
│ • Independent verifier pool (3-5 staked $ABC holders)           │
│ • 72-hour review period                                         │
│ • Majority approval required                                    │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 6: INSTANT PAYOUT                                          │
├─────────────────────────────────────────────────────────────────┤
│ Smart contract releases funds to researcher                     │
│ • USDC/ETH sent to researcher wallet (instant)                  │
│ • Verifiers earn 1% of bounty as reward                         │
│ • PDF + metadata indexed in Research App                        │
│ • NFT achievement badge minted to researcher                    │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 7: PERMANENT RECORD                                        │
├─────────────────────────────────────────────────────────────────┤
│ All events emitted to Base blockchain                           │
│ • Contribution event                                            │
│ • Proposal created event                                        │
│ • Vote events (aggregated)                                      │
│ • Payout event                                                  │
│ • Dune Analytics dashboard updates in real-time                 │
│ • Queryable forever, no central database                        │
└─────────────────────────────────────────────────────────────────┘
```

### Smart Contract Architecture (Pseudo-code)

```solidity
// Core ABC Protocol Contracts

contract ABCTreasury {
    // Receives ETH/USDC contributions
    // Splits 50/50 into LP and treasury
    // Emits Contribution events
    
    function contribute(uint256 amount) external payable {
        require(amount >= MIN_CONTRIBUTION, "Below minimum");
        
        uint256 lpAmount = amount / 2;
        uint256 treasuryAmount = amount / 2;
        
        // Add to Aerodrome/Alien Base LP
        addLiquidity(lpAmount);
        
        // Add to treasury
        treasury += treasuryAmount;
        
        // Mint receipt NFT
        mintReceiptNFT(msg.sender, amount);
        
        emit Contribution(msg.sender, amount, block.timestamp);
    }
}

contract BountyProposal {
    // Manages bounty lifecycle
    // Conviction voting mechanism
    // Escrow + payout logic
    
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string ipfsHash; // Full proposal on IPFS
        uint256 amount;
        uint256 deadline;
        ProposalState state;
        mapping(address => Vote) votes;
    }
    
    function createProposal(
        string memory title,
        string memory ipfsHash,
        uint256 amount
    ) external {
        require(abcToken.balanceOf(msg.sender) >= PROPOSAL_STAKE, "Insufficient stake");
        require(amount <= MAX_BOUNTY_SIZE, "Exceeds max");
        
        // Lock proposal stake
        abcToken.transferFrom(msg.sender, address(this), PROPOSAL_STAKE);
        
        // Create proposal
        uint256 proposalId = nextProposalId++;
        proposals[proposalId] = Proposal({
            id: proposalId,
            proposer: msg.sender,
            title: title,
            ipfsHash: ipfsHash,
            amount: amount,
            deadline: block.timestamp + VOTING_PERIOD,
            state: ProposalState.Voting
        });
        
        emit ProposalCreated(proposalId, msg.sender, amount);
    }
    
    function vote(uint256 proposalId, bool support) external {
        Proposal storage prop = proposals[proposalId];
        require(prop.state == ProposalState.Voting, "Not in voting");
        require(block.timestamp < prop.deadline, "Voting ended");
        
        // Calculate conviction score
        uint256 stakeAmount = getStakedBalance(msg.sender);
        uint256 stakeDuration = getStakeDuration(msg.sender);
        uint256 conviction = stakeAmount * sqrt(stakeDuration);
        
        // Apply quadratic voting
        uint256 voteWeight = sqrt(conviction);
        
        // Regional cohort weighting
        uint256 finalWeight = applyRegionalWeight(msg.sender, voteWeight);
        
        prop.votes[msg.sender] = Vote({
            support: support,
            weight: finalWeight,
            timestamp: block.timestamp
        });
        
        emit VoteCast(proposalId, msg.sender, support, finalWeight);
    }
    
    function finalizeProposal(uint256 proposalId) external {
        Proposal storage prop = proposals[proposalId];
        require(block.timestamp >= prop.deadline, "Voting active");
        require(prop.state == ProposalState.Voting, "Already finalized");
        
        // Tally votes
        (uint256 forVotes, uint256 againstVotes) = tallyVotes(proposalId);
        uint256 totalVotes = forVotes + againstVotes;
        uint256 quorum = (abcToken.totalSupply() * QUORUM_PERCENTAGE) / 100;
        
        if (totalVotes >= quorum && forVotes > againstVotes) {
            prop.state = ProposalState.Active;
            // Refund proposer stake
            abcToken.transfer(prop.proposer, PROPOSAL_STAKE);
            emit ProposalApproved(proposalId);
        } else {
            prop.state = ProposalState.Rejected;
            // Burn proposal stake
            abcToken.burn(PROPOSAL_STAKE);
            emit ProposalRejected(proposalId);
        }
    }
}

contract VerificationPool {
    // Verifiers stake $ABC
    // Review submissions
    // Earn fees or get slashed
    
    struct Submission {
        uint256 bountyId;
        address researcher;
        string ipfsHash;
        uint256 timestamp;
        address[] verifiers;
        mapping(address => bool) approvals;
    }
    
    function submitWork(uint256 bountyId, string memory ipfsHash) external {
        require(bounties[bountyId].claimedBy == msg.sender, "Not claimer");
        require(bounties[bountyId].state == BountyState.Active, "Not active");
        
        // Create submission
        uint256 submissionId = nextSubmissionId++;
        submissions[submissionId] = Submission({
            bountyId: bountyId,
            researcher: msg.sender,
            ipfsHash: ipfsHash,
            timestamp: block.timestamp,
            verifiers: assignVerifiers(bountyId) // Random 3-5 from pool
        });
        
        emit WorkSubmitted(bountyId, submissionId, msg.sender, ipfsHash);
    }
    
    function verify(uint256 submissionId, bool approve) external {
        Submission storage sub = submissions[submissionId];
        require(isVerifier(msg.sender, sub.verifiers), "Not assigned");
        require(!sub.approvals[msg.sender], "Already verified");
        
        sub.approvals[msg.sender] = approve;
        
        // Check if threshold met (majority of verifiers)
        if (countApprovals(submissionId) >= sub.verifiers.length / 2 + 1) {
            // Release payment
            releaseBounty(sub.bountyId, sub.researcher);
            
            // Reward verifiers (1% of bounty split among them)
            rewardVerifiers(sub.verifiers, sub.bountyId);
            
            emit VerificationComplete(submissionId, true);
        }
    }
    
    function slashVerifier(address verifier, uint256 submissionId) external {
        // Callable by governance if fraud proven
        // Slash 50% of staked $ABC
        uint256 slashAmount = verifierStakes[verifier] / 2;
        verifierStakes[verifier] -= slashAmount;
        abcToken.burn(slashAmount);
        
        emit VerifierSlashed(verifier, slashAmount, submissionId);
    }
}
```

---

## 5. Revised Launch Timeline

| Phase | Date | Milestone | Deliverables | Success Criteria |
|-------|------|-----------|--------------|------------------|
| **Phase 0: Foundation** | Dec 20-31, 2025 | Finalize smart contracts, audit scope, Genesis $ABC allocation | - Solidity contracts complete<br>- Audit engagement signed<br>- Genesis allocation spreadsheet<br>- Treasury multi-sig setup | Contracts pass internal security review |
| **Phase 1: Deployment** | Jan 6-Feb 7, 2026 | Deploy contracts on Base + integrate Aligned Research App | - Base mainnet deployment<br>- Aerodrome/Alien Base LP contracts<br>- Research App "Commons" tab<br>- Dune Analytics queries configured | Smart contracts deployed, LP live |
| **Phase 2: Genesis** | **Feb 15, 2026** | Genesis $ABC distribution + liquidity launch | - 5M $ABC public sale<br>- 10M $ABC LP deployment<br>- Governance portal live<br>- First 10 verifiers onboarded | $1M+ TVL, 500+ $ABC holders |
| **Phase 3: First Bounties** | Feb 20, 2026 | First 5 live bounties (curated) | - 5 bounties live (total $50k)<br>- Curated from Q4 2025 interest list<br>- Voting tutorials published<br>- Discord support channel active | 3+ bounties receive votes, 100+ unique voters |
| **Phase 4: Public Launch** | Mar 1, 2026 | Dune dashboard live, open proposal creation | - 6 killer queries live on Dune<br>- Open bounty creation (anyone with 5k $ABC)<br>- First unsolicited proposals<br>- KPI tracking dashboard | 20+ proposals submitted, 10+ reach voting |
| **Phase 5: Scale** | Mar-Jun 2026 | Grow treasury to $5M+, 100+ funded researchers | - $5M treasury milestone<br>- 100+ unique researcher payouts<br>- 20+ countries represented<br>- 2000+ $ABC holders | Q2 2026 success metrics achieved |

### Critical Path Dependencies

1. **Smart Contract Audit** (Jan 6-20)
   - Blocks Phase 2 launch
   - Mitigation: Start audit engagement in December, parallel track development

2. **Liquidity Bootstrap** (Feb 1-14)
   - Need $500k+ initial liquidity for healthy trading
   - Mitigation: ASI2 commits $250k, presale $250k minimum

3. **Verifier Onboarding** (Jan 20-Feb 10)
   - Need 10+ trusted verifiers before first bounties
   - Mitigation: Recruit from existing ASIP network, AI safety community

4. **Dune Integration** (Feb 1-28)
   - Blocks transparent metrics dashboard
   - Mitigation: Start Dune query development in January, parallel with deployment

---

## 6. Technical Architecture

### Base Blockchain Integration Plan

**Why Base?**
1. **EVM Compatibility:** Reuse existing ASIP Sepolia contracts with minimal changes
2. **Low Fees:** $0.01-0.10 per transaction (vs $5-50 on Ethereum mainnet)
3. **Speed:** 2-second block times (vs 12 seconds on Ethereum)
4. **Coinbase Integration:** Native fiat on-ramps, institutional credibility
5. **Ecosystem:** Growing DeFi ecosystem (Aerodrome DEX, Alien Base)

**Migration from Sepolia to Base:**
```javascript
// Deployment checklist

1. Contract Updates
   - Update chain ID: 8453 (Base mainnet)
   - Configure Base RPC endpoints
   - Update block explorer (Basescan)
   - Adjust gas settings (Base uses different gas model)

2. Dependency Adjustments
   - Oracle integration: Chainlink on Base
   - DEX integration: Aerodrome (Solidly fork) or Alien Base
   - Bridge contracts: Base native bridge for ETH/USDC

3. Infrastructure
   - Deploy to Base via Foundry/Hardhat
   - Configure multi-sig on Base (Gnosis Safe)
   - Set up Base indexers for event tracking
   - Configure IPFS pinning service (Pinata/Infura)

4. Testing Strategy
   - Deploy to Base Goerli testnet (Jan 6-15)
   - Run 2-week testnet with 50+ test transactions
   - Audit contracts on testnet (parallel with mainnet audit)
   - Migrate to Base mainnet only after audit clear

5. Monitoring
   - Tenderly for transaction monitoring
   - Dune Analytics for on-chain metrics
   - Blocknative for mempool monitoring
   - AlertManager for contract health checks
```

**Smart Contract Summary:**

| Contract | Purpose | Key Functions | Gas Estimate (Base) |
|----------|---------|---------------|---------------------|
| **ABCTreasury** | Receive contributions, manage funds | `contribute()`, `addLiquidity()`, `releaseFunds()` | ~100k gas (~$0.02) |
| **ABCToken** | ERC-20 governance token | `transfer()`, `approve()`, `stake()` | ~50k gas (~$0.01) |
| **BountyProposal** | Proposal lifecycle + voting | `createProposal()`, `vote()`, `finalize()` | ~150k gas (~$0.03) |
| **VerificationPool** | Milestone verification | `submitWork()`, `verify()`, `slash()` | ~120k gas (~$0.025) |
| **GovernanceTimelock** | 24-hour timelock for admin actions | `schedule()`, `execute()`, `cancel()` | ~80k gas (~$0.015) |
| **EmergencyPause** | Circuit breaker for exploits | `pause()`, `unpause()` | ~50k gas (~$0.01) |

**Infrastructure Stack:**

```yaml
# Infrastructure components

Blockchain:
  - Layer: Base (Ethereum L2)
  - RPC: Alchemy Base endpoints
  - Indexer: The Graph (Base subgraph)

Storage:
  - Proposals: IPFS (via Pinata)
  - Research outputs: IPFS + Arweave (permanent)
  - Metadata: On-chain events

Frontend:
  - Framework: Next.js 14 (App Router)
  - Wallet: RainbowKit + Wagmi v2
  - State: Zustand + React Query
  - UI: Tailwind + shadcn/ui

Analytics:
  - On-chain: Dune Analytics
  - Application: Mixpanel
  - Error tracking: Sentry

APIs:
  - Price feeds: Coinbase API
  - Notifications: Push Protocol
  - Metadata: OpenGraph for research papers
```

---

## 7. Dune Analytics: The 6 Killer Queries

### Query 1: Total Value in Commons Treasury

**Purpose:** Real-time treasury health and asset composition

**SQL Pseudo-code:**
```sql
-- Total Treasury Value (USD & $ABC)

WITH treasury_balance AS (
    SELECT 
        SUM(CASE WHEN token = 'ETH' THEN amount * eth_price ELSE 0 END) AS eth_usd,
        SUM(CASE WHEN token = 'USDC' THEN amount ELSE 0 END) AS usdc_usd,
        SUM(CASE WHEN token = 'ABC' THEN amount * abc_price ELSE 0 END) AS abc_usd
    FROM base.erc20_transfers
    WHERE to_address = '0xABCTreasuryAddress'
),
treasury_metrics AS (
    SELECT 
        eth_usd + usdc_usd + abc_usd AS total_usd,
        (abc_usd / (eth_usd + usdc_usd + abc_usd)) * 100 AS abc_percentage,
        COUNT(DISTINCT from_address) AS unique_contributors
    FROM treasury_balance
)
SELECT * FROM treasury_metrics;
```

**Visualization:** Multi-metric card
- Total Treasury: $5.2M (target by Mar 2026)
- Asset breakdown: Pie chart (ETH 40%, USDC 45%, $ABC 15%)
- Growth chart: 7-day/30-day treasury growth rate

---

### Query 2: Cumulative $ Paid to Researchers (by Country)

**Purpose:** Geographic diversity and researcher reach

**SQL Pseudo-code:**
```sql
-- Researcher Payouts by Country

WITH researcher_payouts AS (
    SELECT 
        researcher_address,
        SUM(payout_amount_usd) AS total_received,
        COUNT(DISTINCT bounty_id) AS bounties_completed,
        MAX(payout_timestamp) AS last_payout
    FROM abc.bounty_payouts
    GROUP BY researcher_address
),
researcher_locations AS (
    SELECT 
        rp.researcher_address,
        rl.country_code,
        rl.country_name,
        rp.total_received,
        rp.bounties_completed
    FROM researcher_payouts rp
    LEFT JOIN abc.researcher_profiles rl 
        ON rp.researcher_address = rl.wallet_address
)
SELECT 
    country_name,
    COUNT(DISTINCT researcher_address) AS researcher_count,
    SUM(total_received) AS total_paid_usd,
    AVG(total_received) AS avg_per_researcher,
    SUM(bounties_completed) AS total_bounties
FROM researcher_locations
WHERE country_name IS NOT NULL
GROUP BY country_name
ORDER BY total_paid_usd DESC;
```

**Visualization:** Interactive world map
- Choropleth by total paid (darker = more funding)
- Hover: Country details (researcher count, avg payout, top bounty categories)
- Goal: 20+ countries by Q2 2026

---

### Query 3: Active vs Completed Bounties (Success Rate %)

**Purpose:** Operational health and completion velocity

**SQL Pseudo-code:**
```sql
-- Bounty Pipeline & Success Metrics

WITH bounty_states AS (
    SELECT 
        bounty_id,
        proposal_title,
        proposal_amount_usd,
        state, -- 'Voting', 'Active', 'Completed', 'Expired', 'Disputed'
        created_at,
        claimed_at,
        completed_at,
        deadline
    FROM abc.bounties
),
state_summary AS (
    SELECT 
        state,
        COUNT(*) AS count,
        SUM(proposal_amount_usd) AS total_value_usd
    FROM bounty_states
    GROUP BY state
),
completion_metrics AS (
    SELECT 
        COUNT(*) FILTER (WHERE state = 'Completed') AS completed,
        COUNT(*) FILTER (WHERE state = 'Active') AS active,
        COUNT(*) FILTER (WHERE state = 'Expired') AS expired,
        (COUNT(*) FILTER (WHERE state = 'Completed')::FLOAT / 
         NULLIF(COUNT(*) FILTER (WHERE state IN ('Completed', 'Expired')), 0)) * 100 AS success_rate,
        AVG(EXTRACT(EPOCH FROM (completed_at - claimed_at)) / 86400) FILTER (WHERE state = 'Completed') AS avg_completion_days
    FROM bounty_states
)
SELECT * FROM completion_metrics;
```

**Visualization:** Funnel chart + KPI cards
- Proposals submitted → Voted approved → Claimed → Completed
- Success rate: 75%+ target (industry standard for bug bounties: 60-70%)
- Avg completion time: 30 days target
- Active bounties: 10-20 healthy range

---

### Query 4: Top 20 $ABC Voters (Whales + Academics)

**Purpose:** Governance participation and whale/academic split

**SQL Pseudo-code:**
```sql
-- Top Voters by Conviction-Weighted Participation

WITH voter_activity AS (
    SELECT 
        voter_address,
        COUNT(DISTINCT proposal_id) AS proposals_voted,
        SUM(vote_weight) AS total_conviction,
        AVG(vote_weight) AS avg_conviction,
        MAX(vote_timestamp) AS last_vote
    FROM abc.proposal_votes
    GROUP BY voter_address
),
voter_profiles AS (
    SELECT 
        va.voter_address,
        va.proposals_voted,
        va.total_conviction,
        va.avg_conviction,
        vp.profile_type, -- 'Institutional', 'Academic', 'Individual', 'Anonymous'
        vp.institution_name,
        ab.balance AS current_abc_balance
    FROM voter_activity va
    LEFT JOIN abc.voter_profiles vp ON va.voter_address = vp.wallet_address
    LEFT JOIN abc.token_balances ab ON va.voter_address = ab.address
)
SELECT 
    voter_address,
    profile_type,
    institution_name,
    proposals_voted,
    total_conviction,
    current_abc_balance,
    (current_abc_balance / 100000000.0) * 100 AS pct_of_supply
FROM voter_profiles
ORDER BY total_conviction DESC
LIMIT 20;
```

**Visualization:** Ranked table with profile badges
- Rank | Voter | Type | Institution | Proposals Voted | Total Conviction | $ABC Balance
- Color coding: Blue (institutional), Green (academic), Grey (individual)
- Whale concentration metric: % of votes from top 10 (target: <30%)
- Academic participation: % of votes from verified academics (target: >40%)

---

### Query 5: Safety Impact Score per $1k Spent (Novel Injected Metric)

**Purpose:** Efficiency metric for capital allocation

**Methodology:**
1. **Safety Impact Score (0-100):** Post-bounty survey sent to grantees
   - Self-reported: "Rate this work's impact on AI safety" (0-10)
   - Peer-reviewed: 3 community reviewers rate (0-10 each, averaged)
   - Citation index: Papers citing this work (weighted by journal impact factor)
   - Adoption index: GitHub stars, downloads, production deployments
   - Combined formula: `(self_score * 0.2) + (peer_avg * 0.4) + (log(citations + 1) * 15) + (log(adoption + 1) * 10)`

2. **Cost:** Bounty payout amount in USD

3. **Efficiency:** `Safety_Impact_Score / (Payout_USD / 1000)`

**SQL Pseudo-code:**
```sql
-- Safety Impact Efficiency Metric

WITH bounty_impacts AS (
    SELECT 
        b.bounty_id,
        b.proposal_title,
        b.payout_amount_usd,
        bi.self_reported_score,
        bi.peer_review_avg,
        bi.citation_count,
        bi.adoption_metric,
        -- Compute composite score
        (bi.self_reported_score * 0.2) + 
        (bi.peer_review_avg * 0.4) + 
        (LOG(bi.citation_count + 1) * 15) + 
        (LOG(bi.adoption_metric + 1) * 10) AS safety_impact_score
    FROM abc.bounties b
    LEFT JOIN abc.bounty_impact_metrics bi ON b.bounty_id = bi.bounty_id
    WHERE b.state = 'Completed' AND bi.impact_assessment_complete = TRUE
),
efficiency_metrics AS (
    SELECT 
        bounty_id,
        proposal_title,
        payout_amount_usd,
        safety_impact_score,
        safety_impact_score / (payout_amount_usd / 1000.0) AS impact_per_1k_usd
    FROM bounty_impacts
    WHERE safety_impact_score IS NOT NULL
)
SELECT 
    AVG(impact_per_1k_usd) AS avg_impact_per_1k,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY impact_per_1k_usd) AS median_impact_per_1k,
    MAX(impact_per_1k_usd) AS best_efficiency,
    MIN(impact_per_1k_usd) AS worst_efficiency
FROM efficiency_metrics;
```

**Visualization:** Scatter plot + benchmarking
- X-axis: Payout amount ($500-$100k log scale)
- Y-axis: Safety impact score (0-100)
- Dot size: Impact per $1k (efficiency)
- Benchmark line: Industry average (estimated 5-8 impact per $1k for traditional grants)
- ABCP target: 10+ impact per $1k (50% more efficient than traditional funding)

---

### Query 6: Papers Funded This Month (Live Covers + Links)

**Purpose:** Research output showcase and public accountability

**SQL Pseudo-code:**
```sql
-- Recent Research Outputs

WITH recent_completions AS (
    SELECT 
        b.bounty_id,
        b.proposal_title,
        b.researcher_address,
        b.payout_amount_usd,
        b.completed_at,
        ro.paper_title,
        ro.paper_ipfs_hash,
        ro.paper_doi,
        ro.paper_arxiv_id,
        ro.cover_image_url
    FROM abc.bounties b
    LEFT JOIN abc.research_outputs ro ON b.bounty_id = ro.bounty_id
    WHERE b.completed_at >= DATE_TRUNC('month', CURRENT_DATE)
        AND b.state = 'Completed'
),
researcher_info AS (
    SELECT 
        rc.bounty_id,
        rc.proposal_title,
        rc.paper_title,
        rc.paper_ipfs_hash,
        rc.paper_doi,
        rc.paper_arxiv_id,
        rc.cover_image_url,
        rc.payout_amount_usd,
        rp.researcher_name,
        rp.institution,
        rp.country_name
    FROM recent_completions rc
    LEFT JOIN abc.researcher_profiles rp ON rc.researcher_address = rp.wallet_address
)
SELECT * FROM researcher_info
ORDER BY completed_at DESC;
```

**Visualization:** Card grid with thumbnails
- Paper cover image (auto-generated if not provided)
- Title + researcher name + institution
- Funding amount + completion date
- Links: IPFS (primary), DOI (if published), arXiv (if available)
- Social share buttons
- Monthly archive page (January 2026 → 12 papers funded, February 2026 → ...)

---

### Additional Dune Queries (Bonus)

**Query 7: Conviction Voting Distribution**
- Purpose: Ensure healthy distribution of voting power
- Metric: Gini coefficient of conviction-weighted votes
- Target: <0.6 (less concentrated than Bitcoin mining)

**Query 8: Regional Cohort Balance**
- Purpose: Prevent geographic capture
- Metric: % of votes from Americas, Europe, Asia-Pacific
- Target: Each region 20-40% (no single region >50%)

**Query 9: Verifier Performance**
- Purpose: Quality control for verification pool
- Metrics: Avg verification time, approval rate, slash count
- Leaderboard: Top 10 verifiers by accuracy + speed

**Query 10: Treasury Runway**
- Purpose: Sustainability tracking
- Metric: Months of runway at current burn rate
- Target: 24+ months (2-year runway minimum)

---

## 8. Governance Safeguards

### Multi-Layer Security Model

1. **Emergency Pause Mechanism**
   - **Authority:** 3-of-5 multisig (ASI2 core + 2 AI safety researchers)
   - **Scope:** Can pause bounty creation, payouts, voting (NOT $ABC transfers)
   - **Duration:** 72-hour automatic unpause unless extended by governance vote
   - **Transparency:** All pause events logged on-chain with rationale

2. **Proposal Threshold Evolution**
   - **Year 1:** 5,000 $ABC (0.005% of supply) to create proposal
   - **Year 2:** 50,000 $ABC (0.05%) if spam becomes issue
   - **Year 3+:** Governed by community vote (target: balance accessibility vs quality)
   - **Rationale:** Low barrier initially to bootstrap participation, increase if needed

3. **Regional Voting Cohorts**
   - **Americas:** US, Canada, LATAM (target: 30-35% of votes)
   - **Europe:** EU, UK, Switzerland, Norway (target: 30-35%)
   - **Asia-Pacific:** Singapore, China, India, Australia, Japan (target: 25-30%)
   - **Africa/Middle East:** UAE, KSA, South Africa, Egypt (target: 5-10%)
   - **Mechanism:** Votes weighted by cohort to prevent single-region dominance
   - **Implementation:** Researcher profile self-selects region, verified via IP/institutional affiliation

4. **Verifier Slashing**
   - **Bad Faith Actions:** Approving fraudulent submissions, colluding with researchers, accepting bribes
   - **Penalty:** 50% of staked $ABC slashed (burned, not redistributed)
   - **Process:** Dispute → Community investigation (7 days) → Governance vote (simple majority) → Execution
   - **Appeal:** Slashed verifier can appeal once with new evidence

5. **Quadratic Voting Implementation**
   - **Formula:** `Vote_Weight = sqrt(ABC_Balance * Conviction_Multiplier)`
   - **Conviction_Multiplier:** `1 + (Stake_Days / 365)` (caps at 2x after 1 year)
   - **Example:** 
     - Alice: 100k $ABC, 6 months staked → Weight = sqrt(100k * 1.5) ≈ 387
     - Bob: 1M $ABC, 1 month staked → Weight = sqrt(1M * 1.08) ≈ 1,039
     - Bob has 10x the tokens but only 2.7x the vote weight
   - **Prevents:** Whale dominance while still rewarding long-term commitment

---

## 9. Success Metrics & KPIs

### Q2 2026 Targets (Aligned with ASIP GTM)

| Metric | Target | Measurement Method | Strategic Rationale |
|--------|--------|-------------------|---------------------|
| **$ABC Holders** | 2,000+ | Unique addresses with balance > 100 $ABC | Demonstrates broad community adoption |
| **Treasury Size** | $5M+ | Sum of ETH + USDC + $ABC liquidity value | Proves funding sustainability + institutional confidence |
| **Unique Funded Researchers** | 100+ | Distinct wallet addresses receiving bounty payouts | Shows global researcher participation |
| **Countries Represented** | 20+ | Distinct countries in researcher profiles (self-reported + verified) | Geographic diversity = credibility for ASIP SWF pitch |
| **Total On-Chain Payouts** | $2M+ | Cumulative bounty payouts (USD equivalent) | Research output volume |
| **Aligned Research App Users** | 5,000+ | Registered academics in app (both ASIP + ABCP tabs) | Platform network effects |
| **Bounty Success Rate** | 75%+ | (Completed / (Completed + Expired)) × 100 | Operational efficiency |
| **Avg Voter Participation** | 40%+ | (Votes Cast / Eligible Voters) per proposal | Governance health |
| **Safety Impact Score** | 8.5+ | Average score across completed bounties | Research quality |

### Why These Numbers Matter for ASIP

**Public Proof Slides for SWF Pitch:**
1. "ABCP funded 100+ researchers across 20+ countries in 6 months"
   - Demonstrates global demand for AI safety funding
   - Validates ASIP's thesis about geographic diversification

2. "$5M treasury proves public willingness to fund AI alignment"
   - Retail + crypto-native capital is real and measurable
   - De-risks ASIP institutional raise ("public already committed")

3. "75%+ bounty success rate shows operational excellence"
   - ASIP will inherit same governance rigor
   - Professional management team proven at scale

4. "20+ countries → ASIP can leverage ABCP network for due diligence"
   - ABCP becomes global research talent scout
   - ASIP grants scale ABCP-validated researchers

---

## 10. Blueprint Projects: Successful Models to Learn From

### 1. Gitcoin Grants (Quadratic Funding Pioneer)

**What They Did Right:**
- Pioneered quadratic funding for public goods (2019-present)
- $50M+ distributed to open-source projects
- Proven model: Community votes + matching pool amplifies impact
- Sybil resistance: Gitcoin Passport (decentralized identity)

**What ABCP Borrows:**
- Quadratic voting mechanism (reduces whale influence)
- Milestone-based grant structure
- Public transparency dashboards
- Community-driven proposal curation

**What ABCP Improves:**
- Conviction voting (time-weighted stakes vs one-time votes)
- On-chain verification (vs centralized Gitcoin review)
- Domain-specific (AI safety only vs general OSS)
- Geographic diversity built-in (regional cohorts)

**Key Metrics to Track:**
- Gitcoin avg grant: $5k-$20k → ABCP avg bounty: $10k-$50k (higher per-researcher impact)
- Gitcoin rounds: Quarterly → ABCP: Continuous (faster capital deployment)

---

### 2. MakerDAO Governance (Sophisticated DAO Mechanics)

**What They Did Right:**
- $5B+ TVL governed by MKR token holders
- Mature governance process (2017-present): Signal votes → Executive votes → Timelock execution
- Professional risk teams + community voting
- Emergency shutdown mechanism (never used, but trusted)

**What ABCP Borrows:**
- Two-stage governance (proposal → execution)
- Professional oversight (ASI2 multisig + community vote)
- Transparent on-chain voting
- Delegate system for passive holders

**What ABCP Improves:**
- Conviction voting (MakerDAO is 1 token = 1 vote, whale-dominated)
- Faster execution (7-day votes vs 30+ day MakerDAO cycles)
- Domain expertise (AI safety verifiers vs generalist MKR holders)

**Key Metrics to Track:**
- MakerDAO voter participation: 5-15% → ABCP target: 40%+ (conviction mechanism incentivizes participation)
- MakerDAO execution time: 30-60 days → ABCP: 7-14 days (speed critical for research)

---

### 3. Bug Bounties (Immunefi, HackerOne)

**What They Did Right:**
- Immunefi: $100M+ paid to security researchers (2020-present)
- Clear scope, instant payouts, transparent leaderboards
- Verifier pools (triagers + core devs)
- Reputation systems incentivize quality submissions

**What ABCP Borrows:**
- Bounty model (vs grant application bureaucracy)
- Rapid verification (72-hour target)
- Verifier incentives (% of bounty)
- Submission quality scoring

**What ABCP Improves:**
- On-chain transparency (Immunefi is centralized)
- Community governance (vs platform decides payouts)
- Permanent research outputs (vs temporary vulnerability disclosures)
- Academic focus (vs purely security)

**Key Metrics to Track:**
- Immunefi avg bounty: $5k-$50k (critical bugs) → ABCP: $10k-$100k (similar range)
- Immunefi payout time: 7-30 days → ABCP: Instant (smart contract escrow)

---

### 4. Optimism Retro Public Goods Funding (RetroPGF)

**What They Did Right:**
- $30M+ distributed to Ethereum public goods (2022-present)
- Retroactive funding (pay for results, not promises)
- Badgeholder voting (curated expert voters)
- Impact = Profit philosophy

**What ABCP Borrows:**
- Retroactive elements (bounties awarded after completion)
- Expert verifier pools (similar to badgeholders)
- Public goods focus
- Transparent impact metrics

**What ABCP Improves:**
- Continuous funding (vs quarterly rounds)
- Conviction voting (vs equal-weight badgeholder votes)
- On-chain verification (vs centralized RetroPGF process)
- AI safety specificity (vs general Ethereum ecosystem)

**Key Metrics to Track:**
- RetroPGF rounds: Quarterly (every 4 months) → ABCP: Rolling (proposals anytime)
- RetroPGF avg grant: $50k-$200k → ABCP: $10k-$100k (more grants, lower avg size)

---

### 5. Protocol Guild (Long-term Incentive Alignment)

**What They Did Right:**
- $10M+ vesting to Ethereum core developers (2022-present)
- Time-weighted vesting (longer contribution = more reward)
- Opt-in membership (self-sovereign participation)
- Split contracts (automated distribution)

**What ABCP Borrows:**
- Time-weighted incentives (conviction voting = Protocol Guild vesting philosophy)
- Automated smart contract payouts
- Transparent membership
- Long-term alignment over speculation

**What ABCP Improves:**
- Broader participation (any researcher vs core devs only)
- Bounty flexibility (vs fixed vesting schedule)
- Governance voting (vs passive recipients)

---

### Comparison Matrix: ABCP vs Blueprint Projects

| Project | Funding Model | Governance | Avg Grant Size | Payout Speed | Transparency | ABCP Advantage |
|---------|---------------|------------|----------------|--------------|--------------|----------------|
| **Gitcoin Grants** | Quadratic funding, quarterly rounds | Community votes + matching pool | $5k-$20k | 30-60 days | High (on-chain matching) | Conviction voting, continuous funding, AI-specific |
| **MakerDAO** | Protocol revenue → governance treasury | Token-weighted voting | N/A (protocol ops) | 30-60 days | High (on-chain votes) | Faster execution, conviction > token balance, domain expertise |
| **Immunefi** | Bounty payouts from protocols | Centralized platform | $5k-$50k | 7-30 days | Medium (private triaging) | 100% on-chain, community governance, permanent research |
| **Optimism RetroPGF** | Retroactive public goods funding | Badgeholder voting | $50k-$200k | Quarterly | High (public votes) | Continuous vs quarterly, conviction voting, AI-specific |
| **Protocol Guild** | Vesting to core contributors | Opt-in membership | N/A (vesting) | 4-year vest | High (on-chain vesting) | Immediate bounties vs long vesting, broader participation |

---

## 11. Risks & Mitigation Strategies

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Smart contract exploit** | Medium | Critical | - Multi-stage audits (Tier 1 firm + community)<br>- Bug bounty program ($100k max)<br>- Gradual TVL ramp (start <$1M)<br>- Emergency pause mechanism |
| **Base network downtime** | Low | High | - Monitor Base status 24/7<br>- Pause proposals during downtime<br>- Multi-chain expansion (Year 2: add Optimism) |
| **Oracle manipulation** | Low | Medium | - Chainlink price feeds (industry standard)<br>- TWAP for treasury valuations<br>- Multi-oracle fallback (Pyth, API3) |
| **IPFS pinning failure** | Medium | Low | - Redundant pinning (Pinata + Infura)<br>- Arweave backup for critical outputs<br>- Researcher required to self-host |

### Governance Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Whale dominance** | High | High | - Quadratic voting (sqrt of balance)<br>- Conviction multiplier caps (2x max)<br>- Regional cohort weighting<br>- Monitor Gini coefficient (<0.6 target) |
| **Voter apathy** | Medium | Medium | - Conviction incentives (longer stake = more weight)<br>- Delegation system (passive holders delegate)<br>- Milestone notifications<br>- Verifier rewards (1% of bounty) |
| **Spam proposals** | High | Low | - 5,000 $ABC proposal stake (refunded if passes)<br>- Threshold increases if spam persists<br>- Community downvoting burns spam stake |
| **Verifier collusion** | Low | High | - Random verifier assignment (3-5 per bounty)<br>- Stake slashing (50% penalty for bad faith)<br>- Reputation system (historical accuracy)<br>- Bounty dispute process |

### Market Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **$ABC price volatility** | High | Medium | - Treasury denominated in USDC (not $ABC)<br>- Bounties paid in USDC/ETH<br>- $ABC only for governance, not payments<br>- LP incentives stabilize liquidity |
| **Low initial liquidity** | Medium | High | - $500k initial LP (ASI2 + presale)<br>- Aerodrome/Alien Base liquidity mining<br>- Gradual unlock (5% at TGE)<br>- Market maker partnership (optional) |
| **Treasury depletion** | Low | Critical | - Diversified funding sources (donations + $ABC LP fees)<br>- Conservative burn rate ($300k/year ops)<br>- 24-month runway minimum<br>- Emergency fundraise authority |

### Operational Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Researcher fraud** | Medium | Medium | - Milestone-based payouts (not upfront)<br>- Independent verifier pools (3-5 reviewers)<br>- Reputation system (historical performance)<br>- Dispute resolution process |
| **Verifier quality decline** | Medium | Medium | - Minimum stake requirement (50k $ABC)<br>- Performance tracking (accuracy + speed)<br>- Periodic re-credentialing<br>- Community can vote to remove underperformers |
| **Team/ASI2 abandonment** | Low | Critical | - Decentralized governance (community can fork)<br>- Open-source contracts (permissionless deployment)<br>- Treasury multi-sig (3-of-5, not single entity)<br>- Succession plan for core contributors |

---

## 12. Financial Projections (Conservative)

### Year 1 (2026)

| Quarter | Treasury Target | $ABC Holders | Bounties Paid | Avg Bounty Size | Researchers Funded |
|---------|-----------------|--------------|---------------|-----------------|-------------------|
| **Q1** | $1M | 500 | $100k | $10k | 10 |
| **Q2** | $5M | 2,000 | $500k | $15k | 35 |
| **Q3** | $8M | 3,500 | $1M | $20k | 50 |
| **Q4** | $12M | 5,000 | $2M | $25k | 80 |
| **Total** | $12M | 5,000 | $3.6M | ~$20k | 175 |

### Funding Sources Breakdown (Year 1)

| Source | Amount | % of Total |
|--------|--------|-----------|
| **Direct Donations** (ETH/USDC) | $6M | 50% |
| **$ABC LP Fees** (trading volume fees) | $2M | 17% |
| **ASI2 Strategic Allocation** | $3M | 25% |
| **Ecosystem Grants** (Base, Optimism) | $1M | 8% |
| **Total** | $12M | 100% |

### Expense Breakdown (Year 1)

| Category | Q1 | Q2 | Q3 | Q4 | Total |
|----------|----|----|----|----|-------|
| **Bounty Payouts** | $100k | $500k | $1M | $2M | $3.6M |
| **Ops Team** (5 FTE) | $100k | $150k | $200k | $250k | $700k |
| **Infrastructure** (Base, Dune, IPFS) | $20k | $30k | $40k | $50k | $140k |
| **Marketing** (conferences, content) | $30k | $50k | $70k | $100k | $250k |
| **Audits + Legal** | $100k | $50k | $50k | $50k | $250k |
| **Reserves** (not spent) | - | - | - | - | $7M+ |
| **Total Spent** | $350k | $780k | $1.36M | $2.45M | $4.94M |

**Net Position End of Year 1:** $12M raised - $4.94M spent = **$7M+ reserves** (healthy 2+ year runway)

---

## 13. Closing: The Beacon is Lit

### Why ABCP Matters Beyond Money

ABCP is not another crowdfund. It is infrastructure for permanent, transparent, global coordination on humanity's most critical challenge: safe AI development.

**Three Irreversible Advantages:**

1. **Permanence:** Every bounty, vote, and research output is on-chain forever. This is not a platform that can shut down, be acquired, or change terms. It is a protocol—code that runs as long as Base exists.

2. **Radical Transparency:** No other AI safety funding mechanism publishes every decision in real-time. ABCP's Dune dashboard makes DARPA, NSF, and private foundations look like black boxes.

3. **Global Legitimacy:** ABCP proves that AI safety funding demand exists beyond US institutions. When ASIP pitches SWFs in UAE, Singapore, or Norway, ABCP is the public proof: "20+ countries, 100+ researchers, $5M+ committed—alignment research is a global priority."

### The Commons is Open

February 15, 2026. Genesis block. The first permanent, token-coordinated, radically transparent public treasury for AI alignment research goes live.

Researchers in Lagos can earn $10k for a robustness dataset.  
PhD students in Singapore can propose interpretability bounties.  
Anonymous contributors can fund alignment research without intermediaries.

Every dollar tracked on-chain.  
Every vote weighted by conviction, not wealth.  
Every paper indexed forever.

**This is not a pilot. This is infrastructure.**

The beacon is lit.  
Let's ship it.

---

## Appendix A: Glossary

- **$ABC:** Aligned Beacon Commons governance token (ERC-20 on Base)
- **ABCP:** Aligned Beacon Commons Protocol (this proposal)
- **ASIP:** Aligned Sovereign Intelligence Protocol (institutional big brother)
- **Base:** Ethereum Layer 2 blockchain (Coinbase-developed)
- **Bounty:** Research task with defined deliverables and payment
- **Conviction Voting:** Time-weighted voting (longer stake = more influence)
- **LP:** Liquidity Pool (DEX trading pair, e.g., $ABC-ETH)
- **Micro-grant:** Small grant ($500-$5k) for rapid experiments
- **Quadratic Voting:** Vote weight = sqrt(token balance) to reduce whale power
- **Regional Cohort:** Geographic voting bloc (Americas, Europe, APAC)
- **SAT:** Safe Asset Token (ASIP's treasury reserve, $150 commodity basket)
- **SAIT:** Safe AI Token (ASIP's governance token)
- **Verifier Pool:** Staked $ABC holders who review bounty submissions
- **TWAP:** Time-Weighted Average Price (manipulation-resistant price oracle)

---

## Appendix B: Key Contacts & Resources

### Team

- **Project Leads:** A. Monroy and M. Bastidas (ASI Institute)– [contact info]
- **Smart Contracts:** [Lead developer] – [contact]
- **Community:** [Community manager] – Discord / X

### Technical

- **GitHub:** github.com/asi2/abc-protocol
- **Docs:** docs.abcprotocol.org
- **Dune Dashboard:** dune.com/asi2/abc-protocol
- **Base Explorer:** basescan.org

### Social

- **X (Twitter):** @ABCProtocol
- **Discord:** discord.gg/abcprotocol
- **Forum:** forum.abcprotocol.org

---

## Appendix C: Next Steps (Action Items)

### Immediate (Dec 2025)

- [ ] Finalize smart contract architecture (reuse ASIP Sepolia code)
- [ ] Engage audit firm (target: Trail of Bits, OpenZeppelin, or Halborn)
- [ ] Design Genesis allocation (5M $ABC public sale structure)
- [ ] Set up ASI2 treasury multi-sig (3-of-5 on Base)
- [ ] Draft Dune Analytics queries (6 killer queries + extras)

### Pre-Launch (Jan 2026)

- [ ] Deploy to Base Goerli testnet (2-week testing period)
- [ ] Complete audit + remediate findings
- [ ] Deploy to Base mainnet (contracts + multi-sig)
- [ ] Integrate Aligned Research App "Commons" tab
- [ ] Configure Aerodrome/Alien Base LP contracts

### Launch (Feb 15, 2026)

- [ ] Genesis $ABC sale ($500k target)
- [ ] Deploy initial liquidity ($500k in $ABC-ETH LP)
- [ ] Onboard first 10 verifiers (from ASIP network)
- [ ] Launch governance portal (vote.abcprotocol.org)
- [ ] Publish first 5 curated bounties ($50k total)

### Post-Launch (Feb-Mar 2026)

- [ ] Open unsolicited proposal creation (5k $ABC threshold)
- [ ] Go live with Dune dashboard (6 killer queries)
- [ ] Host virtual launch event (500+ attendees target)
- [ ] Publish monthly transparency report (March 1)
- [ ] Begin outreach to AI safety researchers globally

---

**Document Version:** 2.0  
**Last Updated:** December 2025  
**Status:** Ready for Review  
**Next Review:** December 10, 2026

---

*Prepared for ASI Institute | Aligned Sovereign Intelligence Protocol*
