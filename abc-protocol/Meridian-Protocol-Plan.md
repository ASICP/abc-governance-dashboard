# MERIDIAN PROTOCOL
## Sepolia Testnet Deployment  
### 1-Week Implementation Plan

**December 8-14, 2025**  
**ASI Institute | Aligned Research Application (ARA) Integration**

---

## EXECUTIVE SUMMARY

This project plan delivers a functional MERIDIAN Protocol implementation on Ethereum Sepolia testnet within 7 days (December 8-14, 2025). The protocol enables distributed expert curation of AI alignment research through economic incentives, creating convergent quality signals that inform ASIP grant decisions.

### Project Objectives

- **Deploy core smart contracts** (MRD Token, Curation, Authority Score) to Sepolia testnet
- **Integrate contracts** with deployed ARA frontend (https://hubt1.asi2.org)
- **Enable end-to-end curation workflow**: stake MRD → predict quality → calculate consensus → distribute rewards
- **Implement all three ASIP integration points** (grant applications, committee recruitment, research prioritization)
- **Test with 20 sample papers** and 3-5 simulated curators

### Success Metrics

| Metric | Target |
|--------|--------|
| Smart Contracts Deployed | 3 contracts verified on Sepolia Etherscan |
| Test Coverage | ≥80% unit test coverage via Hardhat |
| ARA Integration | Web3 wallet connection + curation submission functional |
| E2E Validation | 2-3 complete curation cycles tested |
| Documentation | Contract addresses, ABIs, API endpoints documented |

### 7-Day Timeline Overview

| Day | Date | Key Milestones |
|-----|------|----------------|
| **Day 1** | Dec 8 (Mon) | Environment setup, contract scaffolding, Hardhat configuration |
| **Day 2** | Dec 9 (Tue) | Complete smart contract development + unit tests (80% coverage) |
| **Day 3** | Dec 10 (Wed) | Deploy to Sepolia, verify on Etherscan, start ARA backend integration |
| **Day 4** | Dec 11 (Thu) | ARA frontend Web3 integration, seed 20 test papers, basic dashboard |
| **Day 5** | Dec 12 (Fri) | E2E testing with 3-5 simulated curators, bug fixes |
| **Day 6** | Dec 13 (Sat) | Documentation, ASIP integration APIs, demo preparation |
| **Day 7** | Dec 14 (Sun) | Final verification, handoff documentation, deployment report |

---

## TECHNICAL ARCHITECTURE

### Smart Contract Stack

Three core contracts form the foundation of MERIDIAN Protocol, designed for Base/Sepolia EVM compatibility.

#### 1. MRDToken.sol (ERC-20 Utility Token)

Standard ERC-20 implementation with minting for testnet distribution. Production will use fixed supply of 50M MRD.

| Feature | Implementation |
|---------|----------------|
| Standard | OpenZeppelin ERC-20 base contract |
| Supply | Testnet: 1M MRD (mintable), Mainnet: 50M fixed |
| Functions | transfer(), approve(), transferFrom(), mint() [testnet only] |
| Security | ReentrancyGuard, SafeMath (built into Solidity 0.8+) |

#### 2. CurationStaking.sol (Core Prediction Mechanism)

Manages paper curation lifecycle: staking, predictions, consensus calculation, and reward distribution.

| Function | Description |
|----------|-------------|
| **stakeMRD()** | Curator stakes 50 MRD + submits quality prediction (0-4 tier) |
| **calculateConsensus()** | Weighted average by Authority Score → MERIDIAN Score (0-10) |
| **distributeRewards()** | Winners: +20% profit (60 MRD), Losers: -20% penalty (40 MRD) |
| **getPaperScore()** | Query MERIDIAN Score + consensus tier for any paper |

**Quality Tiers (Prediction Categories):**

| Tier | Score Range | Definition |
|------|-------------|------------|
| **Breakthrough** | 9-10 | Novel contribution, opens new research direction |
| **Valuable** | 7-8 | Solid work, advances field incrementally |
| **Incremental** | 4-6 | Minor contribution, limited novelty |
| **Noise** | 1-3 | Flawed, misleading, or insignificant |

#### 3. AuthorityScore.sol (Reputation System)

On-chain reputation tracking based on accuracy, conviction, recency, and domain specialization.

| Component | Formula |
|-----------|---------|
| Accuracy Points | Correct: +10, Partial: +5, Wrong: -5 |
| Conviction Multiplier | Early (first 25%): 2x, Middle: 1x, Late: 0.75x |
| Recency Factor | 0.95 ^ (months since prediction) |
| Domain Weight | Specialist (≥70% in one domain): 1.5x, Generalist: 1.0x |

**Authority Tiers:**

| Tier | Score Range | Badge | Key Benefits |
|------|-------------|-------|--------------|
| **Bronze** | 100-500 | 🥉 | Basic curator status |
| **Silver** | 500-1000 | 🥈 | Listed on website |
| **Gold** | 1000-2000 | 🥇 | Curator spotlight |
| **Platinum** | 2000-3000 | 💎 | **Grant Committee eligible** |
| **Diamond** | 3000+ | 💠 | **Auto Grant Committee consideration** |

---

## ARA INTEGRATION ARCHITECTURE

The Aligned Research Application (ARA) serves as the user-facing frontend for MERIDIAN Protocol. Integration requires Web3 connectivity, backend API endpoints, and data synchronization between off-chain metadata and on-chain predictions.

### Current ARA Status

| Component | Details |
|-----------|---------|
| Deployment URL | https://hubt1.asi2.org/static/login.html |
| GitHub Repository | https://github.com/ASICP/asi-research-hub |
| Frontend Stack | React, Next.js (requires verification) |
| Backend Stack | Flask (Python) per project documents |
| Database | SQLite for off-chain metadata (papers, justifications) |

### Integration Requirements

#### 1. Web3 Frontend Integration

- **Wallet Connection**: Add MetaMask/WalletConnect support using ethers.js or wagmi library
- **Network Configuration**: Switch to Sepolia testnet automatically (Chain ID: 11155111)
- **Contract Interaction**: Initialize contract instances with deployed addresses and ABIs
- **Transaction Handling**: Sign and submit transactions for staking and predictions

#### 2. Backend API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| /api/papers | GET | List all papers with metadata (title, authors, abstract) |
| /api/papers/:id | GET | Get single paper details + MERIDIAN Score (query from contract) |
| /api/papers | POST | Admin: Seed new paper metadata (manual for MVP) |
| /api/curators/:address | GET | Get curator's Authority Score, predictions, earnings (from contract) |
| /api/asip/top-curators | GET | ASIP Integration: Query curators with Authority >2000 for Grant Committee |

#### 3. Data Flow Architecture

| Data Type | Storage Location | Rationale |
|-----------|------------------|-----------|
| **Paper Metadata** | ARA Database (SQLite) | Too large/mutable for blockchain |
| **Curator Predictions** | On-Chain (Contract) | Immutable, verifiable |
| **MERIDIAN Scores** | On-Chain (Contract) | Consensus must be verifiable |
| **Authority Scores** | On-Chain (Contract) | Reputation must be provable |
| **Justifications** (100-300 words) | ARA Database | Too expensive for on-chain storage |

---

## ASIP INTEGRATION POINTS

MERIDIAN Protocol informs ASIP grant decisions through three main mechanisms, providing objective, verifiable data to enhance the grant allocation process.

### Integration Point 1: Enhanced Grant Applications

Researchers applying for ASIP grants can include their MERIDIAN Authority Score as a verifiable credential in the "Team & Qualifications" section.

**Traditional Grant Application:**
- Publications and citations
- Letters of recommendation
- Previous grants and awards

**MERIDIAN-Enhanced Application:**
- All traditional credentials (above)
- **Authority Score: 1,847 (Gold Tier, Top 12% globally)**
- Papers Curated: 156 with 71% accuracy rate
- Domain Specialization: Mechanistic Interpretability (89% focus)
- Verifiable on-chain: meridian-protocol.org/curator/0x...

### Integration Point 2: Grant Committee Recruitment

ASIP Board uses MERIDIAN to identify and appoint qualified experts to the Grant Committee. Per ASIP Governance, committee members must have a "proven track record in research evaluation"—MERIDIAN provides objective, on-chain proof.

**Traditional Recruitment Process:**
- Reputation-based (personal networks)
- Hard to verify "proven track record"
- Limited candidate pool
- Time-consuming search

**MERIDIAN-Enabled Recruitment:**
- **Query**: Find curators with Authority >2000 in "Agent Foundations" domain
- **Results**: 8 qualified candidates with verifiable track records
- **Review**: On-chain data shows 74% accuracy, 312 papers curated, 24 months active
- **Interview**: Focus on fit and availability, not verification

**API Endpoint for Board Access:**

| Parameter | Value |
|-----------|-------|
| Endpoint | GET /api/asip/top-curators |
| Query Params | ?domain=agent-foundations&minAuthority=2000&minAccuracy=70 |
| Response | List of curator addresses, Authority Scores, accuracy rates, papers curated |
| Authentication | API key required (ASIP Board access only) |

### Integration Point 3: Strategic Research Prioritization

ASIP Board conducts annual strategic planning to define Key Performance Indicators (KPIs) and priorities for grant funding (50M SAIT AI Fund). MERIDIAN provides objective field-level quality signals to inform these decisions.

**Example Use Case: Q2 2026 Strategic Planning**

Board Question: *"Where should we focus $10M in grants this quarter?"*

**MERIDIAN Data Analysis (6-month window):**

| Domain | Papers | Avg Quality | Strategic Insight |
|--------|--------|-------------|-------------------|
| Mechanistic Interp. | 180 | 6.8/10 | Crowded, declining quality |
| **Agent Foundations** | **12** | **7.9/10** | **Neglected, high quality ✓** |
| Governance & Policy | 45 | 5.2/10 | Low quality, moderate interest |
| Scalable Oversight | 67 | 7.1/10 | Healthy, growing |

**Board Decision**: Allocate 30% of grants to Agent Foundations (vs. 10% previous quarter) based on MERIDIAN signal showing neglected but high-quality research area.

---

## DETAILED IMPLEMENTATION SCHEDULE

### Day 1 (Monday, Dec 8): Environment Setup & Contract Scaffolding

**Estimated Effort**: 8 hours | **Team**: All developers

#### Morning (0-4 hours): Development Environment

- Install Hardhat: `npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox`
- Configure for Sepolia: hardhat.config.js with Alchemy/Infura RPC endpoint
- Get test ETH from Sepolia faucets (Alchemy, Infura, or Chainlink)
- Install OpenZeppelin: `npm install @openzeppelin/contracts`
- Setup test framework: Chai, Mocha (included in hardhat-toolbox)

#### Afternoon (4-8 hours): Contract Scaffolding

- Create MRDToken.sol skeleton (inherit OpenZeppelin ERC20.sol)
- Create CurationStaking.sol with function stubs (stakeMRD, calculateConsensus, distributeRewards)
- Create AuthorityScore.sol with function stubs (updateScore, getScore, getCuratorStats)
- Setup deployment script: scripts/deploy.js
- Initialize basic test files: test/MRDToken.test.js, test/Curation.test.js, test/Authority.test.js

#### Deliverables (EOD):

| Deliverable | Status |
|-------------|--------|
| Hardhat environment configured for Sepolia | ✓ Complete |
| 3 contract skeletons with function signatures | ✓ Complete |
| Deployment script + test file structure | ✓ Complete |
| Test wallets funded with Sepolia ETH | ✓ Complete |

---

### Day 2 (Tuesday, Dec 9): Smart Contract Development & Unit Testing

**Estimated Effort**: 10-12 hours | **Team**: Solidity developer (primary), Backend dev (support)

#### Morning (0-5 hours): Core Contract Logic

**MRDToken.sol** (2 hours):
- Implement constructor with initial supply (1M MRD for testnet)
- Add mint() function (testnet only) with onlyOwner modifier
- Basic transfer, approve, transferFrom (inherited from OpenZeppelin)

**CurationStaking.sol** (3 hours):
- Implement stakeMRD(uint256 paperID, uint8 tier) function:
  - Require 50 MRD approval
  - Transfer MRD from curator to contract
  - Store prediction: mapping(uint256 => Prediction[]) paperPredictions
  - Emit PredictionSubmitted event
  - Lock tokens with timestamp (block.timestamp + 30 days for production, 5 minutes for MVP)
- Data structures:
  ```solidity
  struct Prediction {
      address curator;
      uint8 tier;  // 0=Noise, 1=Incremental, 2=Valuable, 3=Breakthrough
      uint256 stake;
      uint256 timestamp;
      bool claimed;
  }
  ```

#### Afternoon (5-10 hours): Consensus & Rewards

**CurationStaking.sol continued**:
- Implement calculateConsensus(uint256 paperID) function:
  - Aggregate all predictions for paper
  - Query AuthorityScore.sol for each curator's score
  - Weighted average: `score = sum(tier_i * authority_i) / sum(authority_i)`
  - Map score (0-3) to scale (0-10): multiply by 3.33
  - Determine consensus tier (most common prediction weighted by Authority)
  - Store consensus: mapping(uint256 => Consensus) paperConsensus
  - Emit ConsensusReached event
  
- Implement distributeRewards(uint256 paperID) function:
  - Require consensus calculated
  - For each prediction:
    - If tier matches consensus: return 60 MRD (50 stake + 10 reward)
    - If tier is one-off consensus: return 55 MRD (partial credit)
    - If tier is two+ off consensus: return 40 MRD (penalty)
  - Update Authority Score contract for each curator
  - Mark predictions as claimed
  - Emit RewardsDistributed event

**AuthorityScore.sol** (2-3 hours):
- Implement updateScore(address curator, bool correct, bool early, uint8 deviation) function:
  - Base points: +10 correct, +5 partial (deviation==1), -5 wrong (deviation>=2)
  - Conviction multiplier: early (first 25% of curators) = 2x, otherwise 1x
  - Add to curator's running score
  - Apply 5% monthly decay to all scores (simulate with block.timestamp)
  - Emit ScoreUpdated event

- Implement getScore(address curator) view function
- Implement getCuratorStats(address curator) view function (total predictions, accuracy rate, domain focus)

#### Evening (10-12 hours): Unit Testing (80% Coverage Target)

**Test Files:**
- **test/MRDToken.test.js**:
  - Deploy contract, verify initial supply
  - Test mint() function (only owner can mint)
  - Test transfer, approve, transferFrom
  - Test edge cases (transfer to zero address, insufficient balance)

- **test/CurationStaking.test.js**:
  - Deploy MRD + Curation contracts
  - Test stakeMRD: approve 50 MRD, submit prediction, verify storage
  - Test calculateConsensus: simulate 5 curators, verify weighted average
  - Test distributeRewards: verify correct amounts for winners/losers
  - Test early bird bonus (2x multiplier)
  - Test edge cases (consensus before 30 days, double-claiming)

- **test/AuthorityScore.test.js**:
  - Test updateScore: verify points added correctly
  - Test conviction multiplier (early vs late)
  - Test recency decay (simulate time passage)
  - Test getScore and getCuratorStats queries

**Coverage Command**: `npx hardhat coverage`  
**Target**: ≥80% line coverage (use `solidity-coverage` plugin)

#### Deliverables (EOD):

| Deliverable | Status |
|-------------|--------|
| MRDToken.sol fully functional | ✓ Complete |
| CurationStaking.sol with staking, consensus, rewards | ✓ Complete |
| AuthorityScore.sol with score calculation | ✓ Complete |
| Unit tests passing with ≥80% coverage | ✓ Complete |

---

### Day 3 (Wednesday, Dec 10): Deployment & ARA Backend Integration

**Estimated Effort**: 10 hours | **Team**: Solidity dev (deployment), Backend dev (API)

#### Morning (0-4 hours): Sepolia Deployment

**Deployment Script** (scripts/deploy.js):
```javascript
const { ethers } = require("hardhat");

async function main() {
  // Deploy MRD Token
  const MRDToken = await ethers.getContractFactory("MRDToken");
  const mrd = await MRDToken.deploy();
  await mrd.waitForDeployment();
  console.log("MRDToken deployed to:", await mrd.getAddress());
  
  // Deploy Authority Score
  const AuthorityScore = await ethers.getContractFactory("AuthorityScore");
  const authority = await AuthorityScore.deploy();
  await authority.waitForDeployment();
  console.log("AuthorityScore deployed to:", await authority.getAddress());
  
  // Deploy Curation Staking (pass MRD and Authority addresses)
  const CurationStaking = await ethers.getContractFactory("CurationStaking");
  const curation = await CurationStaking.deploy(
    await mrd.getAddress(),
    await authority.getAddress()
  );
  await curation.waitForDeployment();
  console.log("CurationStaking deployed to:", await curation.getAddress());
  
  // Mint test MRD for testing (1M tokens)
  await mrd.mint(deployer.address, ethers.parseEther("1000000"));
  console.log("Minted 1M test MRD");
  
  // Save deployment addresses to file
  const fs = require('fs');
  fs.writeFileSync(
    'deployment-addresses.json',
    JSON.stringify({
      MRDToken: await mrd.getAddress(),
      AuthorityScore: await authority.getAddress(),
      CurationStaking: await curation.getAddress(),
      network: "sepolia",
      timestamp: new Date().toISOString()
    }, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

**Deploy to Sepolia**:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**Verify on Etherscan**:
```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```
Repeat for all 3 contracts.

#### Afternoon (4-10 hours): ARA Backend Integration

**Setup** (1 hour):
- Clone ARA repo: `git clone https://github.com/ASICP/asi-research-hub.git`
- Review existing Flask backend structure
- Install web3.py: `pip install web3 --break-system-packages`

**Create Contract Integration Module** (3 hours):  
File: `backend/meridian_contracts.py`

```python
from web3 import Web3
import json

# Connect to Sepolia via Alchemy/Infura
w3 = Web3(Web3.HTTPProvider('https://sepolia.infura.io/v3/YOUR_KEY'))

# Load contract ABIs and addresses
with open('deployment-addresses.json') as f:
    addresses = json.load(f)

with open('artifacts/contracts/MRDToken.sol/MRDToken.json') as f:
    mrd_abi = json.load(f)['abi']
    
# ... load other ABIs similarly ...

mrd_contract = w3.eth.contract(address=addresses['MRDToken'], abi=mrd_abi)
curation_contract = w3.eth.contract(address=addresses['CurationStaking'], abi=curation_abi)
authority_contract = w3.eth.contract(address=addresses['AuthorityScore'], abi=authority_abi)

def get_paper_score(paper_id):
    """Query MERIDIAN Score from contract"""
    consensus = curation_contract.functions.paperConsensus(paper_id).call()
    return {
        'score': consensus[0] / 10,  # Convert 0-100 to 0-10
        'tier': consensus[1],
        'curator_count': consensus[2],
        'confidence': consensus[3]
    }

def get_curator_authority(address):
    """Query Authority Score from contract"""
    return authority_contract.functions.getScore(address).call()

def get_curator_stats(address):
    """Get detailed curator statistics"""
    stats = authority_contract.functions.getCuratorStats(address).call()
    return {
        'authority_score': stats[0],
        'total_predictions': stats[1],
        'correct_predictions': stats[2],
        'accuracy': stats[2] / stats[1] if stats[1] > 0 else 0
    }
```

**Update API Endpoints** (3 hours):  
File: `backend/api/papers.py`

```python
from flask import Blueprint, jsonify, request
from meridian_contracts import get_paper_score, get_curator_authority, get_curator_stats

papers_bp = Blueprint('papers', __name__)

@papers_bp.route('/api/papers/<int:paper_id>', methods=['GET'])
def get_paper(paper_id):
    # Get off-chain metadata from SQLite
    paper = db.query('SELECT * FROM papers WHERE id = ?', [paper_id])
    
    # Get on-chain MERIDIAN Score
    try:
        meridian_score = get_paper_score(paper_id)
        paper['meridian_score'] = meridian_score['score']
        paper['consensus_tier'] = meridian_score['tier']
        paper['curator_count'] = meridian_score['curator_count']
    except:
        paper['meridian_score'] = None  # Not yet curated
    
    return jsonify(paper)

@papers_bp.route('/api/curators/<address>', methods=['GET'])
def get_curator(address):
    try:
        stats = get_curator_stats(address)
        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@papers_bp.route('/api/asip/top-curators', methods=['GET'])
def get_top_curators():
    """ASIP Integration: Query top curators for Grant Committee"""
    min_authority = request.args.get('minAuthority', 2000, type=int)
    domain = request.args.get('domain', None)
    
    # Query database for curators matching criteria
    curators = db.query('''
        SELECT address, authority_score, accuracy, domain_focus
        FROM curator_stats
        WHERE authority_score >= ?
        ORDER BY authority_score DESC
    ''', [min_authority])
    
    # Filter by domain if specified
    if domain:
        curators = [c for c in curators if c['domain_focus'] == domain]
    
    return jsonify(curators)
```

**Seed Test Papers** (1 hour):
- Manually add 20 test papers to SQLite database
- Use arXiv AI alignment papers from past 6 months
- Store: ID, title, authors, abstract, arXiv URL, domain tag

#### Deliverables (EOD):

| Deliverable | Status |
|-------------|--------|
| 3 contracts deployed to Sepolia | ✓ Complete |
| Contracts verified on Sepolia Etherscan | ✓ Complete |
| ARA backend contract integration module | ✓ Complete |
| API endpoints querying on-chain data | ✓ Complete |
| 20 test papers seeded in database | ✓ Complete |

---

### Day 4 (Thursday, Dec 11): ARA Frontend Web3 Integration

**Estimated Effort**: 10-12 hours | **Team**: Frontend developer (primary), Backend dev (support)

#### Morning (0-5 hours): Web3 Wallet Connection

**Install Dependencies**:
```bash
npm install ethers@6 wagmi viem @rainbow-me/rainbowkit
```

**Create Web3 Provider** (2 hours):  
File: `frontend/providers/Web3Provider.tsx`

```typescript
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const { chains, publicClient } = configureChains(
  [sepolia],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
});

export function Web3Provider({ children }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
```

**Connect Button Component** (1 hour):  
File: `frontend/components/ConnectButton.tsx`

```typescript
import { useConnect, useAccount, useDisconnect } from 'wagmi';

export function ConnectButton() {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  
  if (isConnected) {
    return (
      <div>
        Connected: {address.slice(0, 6)}...{address.slice(-4)}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }
  
  return (
    <button onClick={() => connect({ connector: connectors[0] })}>
      Connect Wallet
    </button>
  );
}
```

**Integrate into ARA** (2 hours):
- Wrap main App component with Web3Provider
- Add ConnectButton to header/navbar
- Add network switcher (force Sepolia)
- Display connection status

#### Afternoon (5-12 hours): Curation Submission Interface

**Contract Hooks** (3 hours):  
File: `frontend/hooks/useContracts.ts`

```typescript
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import MRDTokenABI from '../abis/MRDToken.json';
import CurationStakingABI from '../abis/CurationStaking.json';
import { addresses } from '../config/contracts';

export function useStakeMRD(paperID: number, tier: number) {
  // Step 1: Approve 50 MRD
  const { config: approveConfig } = usePrepareContractWrite({
    address: addresses.MRDToken,
    abi: MRDTokenABI,
    functionName: 'approve',
    args: [addresses.CurationStaking, ethers.parseEther('50')],
  });
  
  const { write: approve, isLoading: isApproving } = useContractWrite(approveConfig);
  
  // Step 2: Stake MRD
  const { config: stakeConfig } = usePrepareContractWrite({
    address: addresses.CurationStaking,
    abi: CurationStakingABI,
    functionName: 'stakeMRD',
    args: [paperID, tier],
  });
  
  const { write: stake, isLoading: isStaking } = useContractWrite(stakeConfig);
  
  return { approve, stake, isApproving, isStaking };
}

export function useAuthorityScore(address: string) {
  const { data: score } = useContractRead({
    address: addresses.AuthorityScore,
    abi: AuthorityScoreABI,
    functionName: 'getScore',
    args: [address],
  });
  
  return score;
}
```

**Curation Form Component** (2 hours):  
File: `frontend/components/CurationForm.tsx`

```typescript
import { useState } from 'react';
import { useStakeMRD } from '../hooks/useContracts';

export function CurationForm({ paperID }) {
  const [tier, setTier] = useState(2); // Default: Valuable
  const [justification, setJustification] = useState('');
  const { approve, stake, isApproving, isStaking } = useStakeMRD(paperID, tier);
  
  const handleSubmit = async () => {
    // Step 1: Approve MRD
    await approve?.();
    
    // Step 2: Submit prediction on-chain
    await stake?.();
    
    // Step 3: Save justification off-chain (to ARA backend)
    await fetch('/api/justifications', {
      method: 'POST',
      body: JSON.stringify({ paperID, justification }),
    });
  };
  
  return (
    <div>
      <h3>Curate Paper</h3>
      <select value={tier} onChange={(e) => setTier(Number(e.target.value))}>
        <option value={3}>Breakthrough (9-10)</option>
        <option value={2}>Valuable (7-8)</option>
        <option value={1}>Incremental (4-6)</option>
        <option value={0}>Noise (1-3)</option>
      </select>
      <textarea
        placeholder="Justification (100-300 words)"
        value={justification}
        onChange={(e) => setJustification(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={isApproving || isStaking}>
        {isApproving ? 'Approving...' : isStaking ? 'Submitting...' : 'Submit Prediction (50 MRD)'}
      </button>
    </div>
  );
}
```

**Dashboard Component** (2 hours):  
File: `frontend/components/CuratorDashboard.tsx`

```typescript
import { useAccount } from 'wagmi';
import { useAuthorityScore } from '../hooks/useContracts';

export function CuratorDashboard() {
  const { address } = useAccount();
  const authorityScore = useAuthorityScore(address);
  
  // Fetch stats from backend
  const [stats, setStats] = useState(null);
  useEffect(() => {
    if (address) {
      fetch(`/api/curators/${address}`)
        .then(res => res.json())
        .then(setStats);
    }
  }, [address]);
  
  return (
    <div>
      <h2>Your Curator Dashboard</h2>
      <p>Authority Score: {authorityScore?.toString() || 'Loading...'}</p>
      <p>Total Predictions: {stats?.total_predictions || 0}</p>
      <p>Accuracy: {(stats?.accuracy * 100).toFixed(1)}%</p>
      {/* More stats... */}
    </div>
  );
}
```

**Integrate into Paper List** (1 hour):
- Add "Curate" button next to each paper
- Open CurationForm modal on click
- Display MERIDIAN Score if paper already curated
- Show curator count and consensus tier

#### Deliverables (EOD):

| Deliverable | Status |
|-------------|--------|
| Web3 wallet connection functional | ✓ Complete |
| Users can approve and stake 50 MRD | ✓ Complete |
| Curation form submits predictions on-chain | ✓ Complete |
| Dashboard displays Authority Score from contract | ✓ Complete |
| Paper list shows MERIDIAN Scores | ✓ Complete |

---

### Day 5 (Friday, Dec 12): End-to-End Testing & Bug Fixes

**Estimated Effort**: 10-12 hours | **Team**: All developers

#### Morning (0-5 hours): E2E Testing Setup

**Create Test Wallets** (1 hour):
- Generate 5 test wallets (MetaMask)
- Fund each with 0.05 Sepolia ETH (from faucet)
- Distribute 500 MRD to each wallet (from deployer account via contract mint)

**Test Scenario 1: Single Paper Curation** (2 hours):
1. Curator 1 connects wallet to ARA
2. Views paper list, selects Paper #1
3. Clicks "Curate", submits prediction: **Valuable** (tier 2)
4. Approves 50 MRD, then stakes
5. Verify transaction on Sepolia Etherscan
6. Check contract state: prediction stored correctly
7. Verify ARA displays "1 curator" for Paper #1

**Test Scenario 2: Multi-Curator Consensus** (2 hours):
1. Curators 2-5 each curate Paper #1:
   - Curator 2: **Valuable** (tier 2)
   - Curator 3: **Breakthrough** (tier 3)
   - Curator 4: **Valuable** (tier 2)
   - Curator 5: **Incremental** (tier 1)
2. After 5th prediction, manually trigger consensus calculation:
   - Call `curation.calculateConsensus(1)` from deployer account
   - Or wait for automated trigger (if implemented)
3. Verify consensus:
   - Expected tier: **Valuable** (3 of 5 curators)
   - MERIDIAN Score: ~7.5/10 (weighted average)
4. Trigger reward distribution:
   - Call `curation.distributeRewards(1)`
5. Verify payouts:
   - Curators 2, 4 (Valuable): receive 60 MRD each
   - Curator 3 (Breakthrough, one-off): receive 55 MRD
   - Curator 5 (Incremental, two-off): receive 40 MRD
6. Verify Authority Scores updated correctly

#### Afternoon (5-10 hours): Bug Fixes & Edge Cases

**Common Issues to Address**:

1. **Gas Estimation Failures**:
   - Increase gas limit in transaction calls
   - Add error handling for out-of-gas

2. **Approval Issues**:
   - Users forget to approve before staking
   - Add UI check: "Approve first" button if allowance < 50 MRD

3. **Network Mismatch**:
   - User on wrong network (e.g., mainnet instead of Sepolia)
   - Add automatic network switch prompt

4. **Consensus Calculation**:
   - Division by zero if no predictions
   - Add require check: `require(predictions.length >= 1)`

5. **Frontend State Management**:
   - Stale data after transaction
   - Add loading states, refresh on transaction confirmation

**Testing Checklist**:
- [ ] Can connect/disconnect wallet
- [ ] Can switch to Sepolia network
- [ ] Can approve 50 MRD
- [ ] Can submit prediction on-chain
- [ ] Prediction appears in contract storage
- [ ] Multiple curators can curate same paper
- [ ] Consensus calculation works correctly
- [ ] Rewards distributed accurately
- [ ] Authority Scores update properly
- [ ] MERIDIAN Scores display in ARA
- [ ] Dashboard shows correct stats

#### Evening (10-12 hours): Additional Testing

**Test Scenario 3: Early Bird Bonus** (1 hour):
- Curator 1 curates Paper #2 (first 25% = early)
- 4 more curators curate Paper #2 (regular)
- Verify Curator 1 gets 2x conviction multiplier in Authority Score

**Test Scenario 4: ASIP Integration API** (1 hour):
- Query `/api/asip/top-curators?minAuthority=100`
- Verify returns list of qualified curators
- Test domain filtering: `?domain=mechanistic-interp`
- Verify authentication (API key required)

#### Deliverables (EOD):

| Deliverable | Status |
|-------------|--------|
| 2-3 complete curation cycles tested | ✓ Complete |
| All critical bugs identified and fixed | ✓ Complete |
| Consensus calculation verified accurate | ✓ Complete |
| Reward distribution verified accurate | ✓ Complete |
| ASIP integration API tested | ✓ Complete |

---

### Day 6 (Saturday, Dec 13): Documentation & ASIP Integration

**Estimated Effort**: 8 hours | **Team**: All developers

#### Morning (0-4 hours): Technical Documentation

**Contract Documentation** (2 hours):  
File: `docs/CONTRACTS.md`

```markdown
# MERIDIAN Protocol Smart Contracts

## Deployment Addresses (Sepolia Testnet)

- **MRDToken**: 0x... (verify link)
- **CurationStaking**: 0x... (verify link)
- **AuthorityScore**: 0x... (verify link)

## MRDToken.sol

ERC-20 utility token for curation staking.

### Functions

- `mint(address to, uint256 amount)`: Mint test MRD (testnet only, owner only)
- `transfer(address to, uint256 amount)`: Standard ERC-20 transfer
- `approve(address spender, uint256 amount)`: Approve spending

### Usage

```javascript
// Approve 50 MRD for staking
await mrd.approve(curationAddress, ethers.parseEther('50'));
```

## CurationStaking.sol

Core curation mechanism.

### Functions

- `stakeMRD(uint256 paperID, uint8 tier)`: Submit prediction (requires 50 MRD approval)
- `calculateConsensus(uint256 paperID)`: Calculate weighted consensus (callable by anyone after lock period)
- `distributeRewards(uint256 paperID)`: Distribute rewards to curators (callable after consensus)
- `getPaperScore(uint256 paperID)`: Query MERIDIAN Score and consensus tier

### Quality Tiers

0 = Noise, 1 = Incremental, 2 = Valuable, 3 = Breakthrough

### Usage

```javascript
// Submit prediction
await curation.stakeMRD(1, 2); // Paper 1, tier Valuable

// After 30 days (or 5 min in MVP)
await curation.calculateConsensus(1);
await curation.distributeRewards(1);
```

## AuthorityScore.sol

On-chain reputation tracking.

### Functions

- `getScore(address curator)`: Get current Authority Score
- `getCuratorStats(address curator)`: Get detailed stats (total predictions, accuracy, etc.)
- `updateScore(address curator, ...)`: Update score (internal, called by CurationStaking)

### Usage

```javascript
// Query Authority Score
const score = await authority.getScore(curatorAddress);
console.log(`Authority: ${score}`);
```
```

**API Documentation** (2 hours):  
File: `docs/API.md`

```markdown
# ARA Backend API

## Papers

### GET /api/papers

List all papers.

**Query Params**:
- `domain` (optional): Filter by domain (e.g., "mechanistic-interp")
- `minScore` (optional): Minimum MERIDIAN Score (0-10)

**Response**:
```json
[
  {
    "id": 1,
    "title": "Constitutional AI for Agent Alignment",
    "authors": ["Author A", "Author B"],
    "abstract": "...",
    "domain": "agent-foundations",
    "meridian_score": 7.9,
    "curator_count": 10
  }
]
```

### GET /api/papers/:id

Get single paper with MERIDIAN Score.

**Response**:
```json
{
  "id": 1,
  "title": "...",
  "meridian_score": 7.9,
  "consensus_tier": "Valuable",
  "curator_count": 10,
  "confidence": 0.85
}
```

## Curators

### GET /api/curators/:address

Get curator stats.

**Response**:
```json
{
  "authority_score": 1847,
  "total_predictions": 156,
  "correct_predictions": 111,
  "accuracy": 0.71,
  "domain_focus": "mechanistic-interp",
  "tier": "Gold"
}
```

## ASIP Integration

### GET /api/asip/top-curators

Query top curators for Grant Committee.

**Auth**: API key required (header: `X-API-Key: ...`)

**Query Params**:
- `minAuthority` (default: 2000): Minimum Authority Score
- `minAccuracy` (default: 0.70): Minimum accuracy rate
- `domain` (optional): Filter by domain expertise

**Response**:
```json
[
  {
    "address": "0x...",
    "authority_score": 2456,
    "accuracy": 0.74,
    "papers_curated": 312,
    "domain_focus": "agent-foundations",
    "years_active": 2
  }
]
```
```

#### Afternoon (4-8 hours): ASIP Integration & Demo Preparation

**ASIP Board Access Setup** (2 hours):
- Generate API key for ASIP Board
- Add authentication middleware to `/api/asip/*` endpoints
- Create sample query scripts for Board members
- Document how to use API in `docs/ASIP-INTEGRATION.md`

**Demo Preparation** (3 hours):
- Create demo video/walkthrough (5-10 minutes)
- Prepare demo script:
  1. Connect wallet to ARA
  2. Browse papers, view MERIDIAN Scores
  3. Submit curation prediction
  4. Show consensus calculation
  5. Display Authority Score dashboard
  6. Query ASIP integration API
- Prepare slide deck (10-15 slides):
  - Problem statement
  - Solution overview
  - Technical architecture
  - Live demo
  - Next steps (Phase 2)

**Final Testing** (1 hour):
- Test all critical paths one more time
- Verify Sepolia Etherscan links work
- Check all documentation links
- Ensure demo environment stable

#### Deliverables (EOD):

| Deliverable | Status |
|-------------|--------|
| Contract documentation complete | ✓ Complete |
| API documentation complete | ✓ Complete |
| ASIP integration guide published | ✓ Complete |
| Demo video/walkthrough ready | ✓ Complete |
| Slide deck finalized | ✓ Complete |

---

### Day 7 (Sunday, Dec 14): Final Verification & Handoff

**Estimated Effort**: 6 hours | **Team**: All developers

#### Morning (0-3 hours): Final Verification

**Contract Verification Checklist**:
- [ ] All 3 contracts verified on Sepolia Etherscan
- [ ] Contract addresses documented in README
- [ ] ABIs exported to frontend
- [ ] No critical security issues (run Slither static analysis)
- [ ] Test coverage ≥80% (run `npx hardhat coverage`)

**ARA Integration Checklist**:
- [ ] Web3 connection works on Sepolia
- [ ] Users can approve and stake MRD
- [ ] Predictions stored on-chain correctly
- [ ] MERIDIAN Scores display accurately
- [ ] Authority Scores query from contract
- [ ] Dashboard shows live data
- [ ] ASIP API endpoints functional

**Testing Checklist**:
- [ ] At least 2 complete curation cycles tested
- [ ] Multiple curators on same paper tested
- [ ] Consensus calculation verified
- [ ] Reward distribution verified
- [ ] Authority Score updates verified
- [ ] No blockers or critical bugs

#### Afternoon (3-6 hours): Handoff Documentation

**Deployment Report** (2 hours):  
File: `DEPLOYMENT-REPORT.md`

```markdown
# MERIDIAN Protocol Sepolia Deployment Report

**Date**: December 14, 2025  
**Network**: Ethereum Sepolia Testnet  
**Team**: ASI Institute

## Deployment Summary

All three core contracts successfully deployed and verified on Sepolia.

### Contract Addresses

| Contract | Address | Etherscan Link |
|----------|---------|----------------|
| MRDToken | 0x... | [View Contract](https://sepolia.etherscan.io/address/0x...) |
| CurationStaking | 0x... | [View Contract](https://sepolia.etherscan.io/address/0x...) |
| AuthorityScore | 0x... | [View Contract](https://sepolia.etherscan.io/address/0x...) |

### Test Results

- **Unit Tests**: 47 passing, 0 failing
- **Test Coverage**: 83% (target: ≥80%)
- **E2E Tests**: 3 complete curation cycles tested
- **Bug Fixes**: 8 issues identified and resolved

### Performance Metrics

- **Average Gas (stakeMRD)**: 125,000 gas (~$0.01 at current prices)
- **Average Gas (calculateConsensus)**: 180,000 gas (~$0.02)
- **Average Gas (distributeRewards)**: 220,000 gas (~$0.03)

### Test Data

- **Papers Seeded**: 20 AI alignment papers
- **Test Curators**: 5 wallets with 500 MRD each
- **Papers Curated**: 3 papers with full consensus cycles
- **Total Predictions**: 15 predictions submitted

## Success Criteria Met

✅ Smart Contracts Deployed: 3/3 verified on Sepolia Etherscan  
✅ Test Coverage: 83% (≥80% target)  
✅ ARA Integration: Web3 wallet connection + curation submission functional  
✅ E2E Validation: 3 complete curation cycles tested  
✅ Documentation: Contract addresses, ABIs, API endpoints documented  

## Known Limitations (MVP Scope)

- Consensus calculation requires manual trigger (not automated)
- Lock period reduced to 5 minutes for testing (production: 30 days)
- No IPFS integration for justifications (stored in SQLite)
- No long-term validation (citations, researcher ratings)
- No domain specialization bonus in Authority Score (simplified formula)

## Next Steps (Phase 2)

1. Deploy to Base mainnet
2. Implement automated consensus triggers (Chainlink Automation)
3. Add IPFS for decentralized justification storage
4. Integrate arXiv API for automatic paper imports
5. Add long-term validation mechanisms
6. Recruit 20-30 founding curators for closed beta
```

**README.md Updates** (1 hour):
- Add deployment addresses to main README
- Add "Quick Start" guide for developers
- Add links to documentation
- Add demo video embed

**GitHub Repository Cleanup** (1 hour):
- Commit all code to GitHub
- Create release tag: `v0.1.0-sepolia-mvp`
- Upload deployment artifacts (ABIs, addresses)
- Update repository description

#### Deliverables (EOD):

| Deliverable | Status |
|-------------|--------|
| All contracts verified on Etherscan | ✓ Complete |
| Deployment report published | ✓ Complete |
| README updated with deployment info | ✓ Complete |
| GitHub repository cleaned and tagged | ✓ Complete |
| Handoff documentation complete | ✓ Complete |

---

## RISK MITIGATION

### High-Priority Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Timeline Slippage** | High | High | Prioritize core flow; defer non-essentials like justifications storage |
| **Sepolia Network Issues** | Medium | Medium | Use multiple faucets; fallback to local Ganache if needed |
| **Integration Bugs** | Medium | Medium | Use ethers.js v6; test incrementally |
| **Security Vulnerabilities** | High | Low | Use OpenZeppelin contracts; run Slither static analysis |

### Contingency Plans

**If delayed by Day 4**:
- Deploy contracts first (Day 1-3)
- Simplify ARA integration: basic API only
- Extend to 8-9 days if needed

**If Sepolia faucet fails**:
- Use alternative faucets (Alchemy, Chainlink, Paradigm)
- Deploy to local Hardhat network for testing
- Bridge small ETH from mainnet if urgent

**If critical bug found on Day 6-7**:
- Fix critical bugs only
- Document known issues for Phase 2
- Deliver working MVP with disclaimers

---

## POST-MVP ROADMAP

### Phase 2: Base Mainnet Deployment (Q1 2026)

**Timeline**: January-March 2026  
**Effort**: 4-6 weeks

**Key Enhancements**:
- Deploy to Base mainnet (production)
- Add automated consensus triggers (Chainlink Automation)
- Integrate IPFS for decentralized storage
- Implement full Authority Score formula (domain weight, recency decay)
- Add long-term validation (citations via Google Scholar API)
- Recruit 20-30 founding curators for closed beta

### Phase 3: Public Launch (Q2 2026)

**Timeline**: April-June 2026  
**Effort**: 8-12 weeks

**Key Enhancements**:
- Integrate arXiv API for automatic paper imports
- Build Dune Analytics dashboards
- Launch curator rewards program (MRD emissions)
- Scale to 150-200 curators
- First ASIP grant cycle using MERIDIAN signals

---

## TEAM ROLES & RESPONSIBILITIES

| Role | Primary Responsibilities | Days |
|------|-------------------------|------|
| **Solidity Developer** | Smart contract development, testing, deployment | 1-3, 5-7 |
| **Backend Developer** | ARA API integration, contract queries, database | 3-7 |
| **Frontend Developer** | Web3 integration, UI components, dashboard | 4-7 |
| **Project Manager** | Coordination, documentation, testing | 1-7 |

---

## BUDGET & RESOURCES

### Infrastructure Costs (Testnet)

| Item | Cost | Notes |
|------|------|-------|
| Sepolia ETH | $0 | Free from faucets |
| Alchemy/Infura API | $0 | Free tier (≤25K requests/day) |
| GitHub LFS Storage | $0 | Within free limits |
| Total | **$0** | Testnet deployment is free |

### Production Costs (Estimated for Phase 2)

| Item | Cost | Notes |
|------|------|-------|
| Smart Contract Audit | $50-100K | Trail of Bits, OpenZeppelin, or Consensys Diligence |
| Base Deployment Gas | ~$50 | Low L2 fees |
| Alchemy/Infura Pro | $49/month | Higher rate limits |
| IPFS Pinning (Pinata) | $20/month | 1GB storage |
| Total (Year 1) | **~$51K** | Mostly audit |

---

## SUCCESS CRITERIA SUMMARY

| Criterion | Target | Status |
|-----------|--------|--------|
| Smart Contracts Deployed | 3 contracts | ✅ On track |
| Contracts Verified | Sepolia Etherscan | ✅ On track |
| Test Coverage | ≥80% | ✅ On track |
| ARA Integration | Wallet + Curation functional | ✅ On track |
| E2E Tests | 2-3 cycles | ✅ On track |
| Documentation | Complete | ✅ On track |
| ASIP Integration | API endpoints working | ✅ On track |

---

## APPENDICES

### Appendix A: Glossary

**Authority Score**: On-chain reputation metric calculated from curator accuracy, weighted by conviction, recency, and domain specialization.

**Convergence**: The process by which independent curator predictions aggregate into consensus quality signals.

**Curation**: The act of evaluating a research paper by staking MRD tokens and predicting its quality tier.

**Curator**: A researcher who evaluates papers on MERIDIAN Protocol, earning rewards for accurate predictions.

**MERIDIAN Score**: Aggregated quality rating for a paper (0-10 scale) based on weighted curator consensus.

**MRD**: MERIDIAN utility token used for curation staking and governance.

**Sepolia**: Ethereum testnet used for development and testing before mainnet deployment.

### Appendix B: Useful Commands

**Hardhat**:
```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Run coverage
npx hardhat coverage

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Verify contract
npx hardhat verify --network sepolia <ADDRESS> <CONSTRUCTOR_ARGS>
```

**Web3 Queries**:
```javascript
// Query MERIDIAN Score
const score = await curation.getPaperScore(1);

// Query Authority Score
const authority = await authority.getScore("0x...");

// Query curator stats
const stats = await authority.getCuratorStats("0x...");
```

### Appendix C: Contact Information

**Project Lead**: Mateo Bastidas (mateo@asi2.org)  
**GitHub Repository**: https://github.com/ASICP/asi-research-hub  
**ARA Deployment**: https://hubt1.asi2.org  
**Documentation**: [docs folder in repo]

---

**Document Version**: 1.0  
**Last Updated**: December 6, 2025  
**Status**: Ready for Implementation

---

*This project plan is designed for a 7-day Sepolia testnet deployment. For production deployment to Base mainnet, refer to the Post-MVP Roadmap section.*
