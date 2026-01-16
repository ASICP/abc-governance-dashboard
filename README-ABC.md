# ABC Governance Dashboard

Real-time governance dashboard for the **Aligned Beacon Commons (ABC) Protocol** - a token-governed, radically transparent public funding mechanism for AI alignment research.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Network](https://img.shields.io/badge/network-Sepolia-yellow.svg)
![Status](https://img.shields.io/badge/status-Development-orange.svg)

---

## 🎯 Overview

The ABC Governance Dashboard provides real-time visibility into:
- **Treasury Health**: Track ABC tokens, stablecoin reserves (Year 1), and runway metrics
- **Bounty Pipeline**: Monitor proposals from creation → voting → active → completion
- **Conviction Voting**: Visualize governance participation and voting power distribution
- **Verifier Performance**: Leaderboard of top bounty verifiers
- **Geographic Impact**: Global researcher distribution (Phase 2)

### Key Features

✅ **On-chain Data**: All metrics queried directly from smart contracts
✅ **Auto-refresh**: Dashboard updates every 60 seconds
✅ **Dual Dashboard**: Toggle between ABC Protocol and SAIT Token views
✅ **Responsive Design**: Mobile-friendly interface
✅ **Zero Backend**: Pure Web3 integration (no centralized server)

---

## 🏗️ Architecture

### Smart Contracts (Sepolia Testnet)

| Contract | Purpose | Status |
|----------|---------|--------|
| **ABCToken.sol** | ERC-20 governance token (100M supply) | ✅ Implemented |
| **ABCTreasury.sol** | Manages contributions and bounty payouts | ✅ Implemented |
| **BountyProposal.sol** | Proposal lifecycle with conviction voting | ✅ Implemented |
| **VerificationPool.sol** | Bounty verification and verifier rewards | ✅ Implemented |

### Frontend Stack

```
React 18.2.0
├── Recharts 2.10.3 (Charts & Visualizations)
├── ethers.js 5.7.2 (Web3 Integration)
└── Tailwind CSS 3.4.0 (Styling)
```

### Data Flow

```
┌──────────────────┐
│  Smart Contracts │ (Sepolia)
│  (Source of Truth)│
└────────┬─────────┘
         │
         │ RPC Queries
         ▼
┌──────────────────┐
│  Web3 Service    │
│  (abcWeb3Service)│
└────────┬─────────┘
         │
         │ React Hooks
         ▼
┌──────────────────┐
│  Dashboard UI    │
│  (ABCDashboard)  │
└──────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+ and **npm** 8+
- **MetaMask** browser extension (optional for wallet connection)
- **Sepolia testnet ETH** (for deploying contracts)

### 1. Clone Repository

```bash
git clone https://github.com/ASICP/abc-governance-dashboard.git
cd abc-governance-dashboard
```

### 2. Install Dependencies

```bash
# Install dashboard dependencies
npm install

# Install contract dependencies
cd abc-protocol
npm install
cd ..
```

### 3. Configure Environment

```bash
# Copy example environment file
cp .env.example .env.development

# Edit .env.development with your RPC URLs
# REACT_APP_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

### 4. Deploy Smart Contracts (Optional - Skip if using existing deployment)

```bash
cd abc-protocol

# Configure Hardhat with your private key
# Edit hardhat.config.js

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Contract addresses will be saved to deployments/sepolia-latest.json
```

### 5. Update Contract Addresses

```bash
# Copy contract addresses from deployment output
# Update .env.development with deployed addresses:
REACT_APP_ABC_TOKEN_ADDRESS=0x...
REACT_APP_ABC_TREASURY_ADDRESS=0x...
REACT_APP_BOUNTY_PROPOSAL_ADDRESS=0x...
REACT_APP_VERIFICATION_POOL_ADDRESS=0x...
```

### 6. Run Dashboard Locally

```bash
npm start
# Dashboard available at http://localhost:3000
```

---

## 📊 Dashboard Components

### 1. Overview Cards

Four key metrics displayed at the top:
- **ABC Price**: Current token price (from DEX LP or oracle)
- **Treasury Value**: Combined ABC + stablecoin reserves
- **Active Bounties**: Number of proposals in active state
- **Market Cap**: Circulating supply × ABC price

### 2. Treasury Health Panel

Real-time treasury metrics:
- Total treasury value (USD)
- ABC token holdings
- Stablecoin reserves (USDC/USDT)
- Monthly burn rate
- Runway (months of sustainability)

**Runway Indicator**:
- 🟢 Green: 24+ months (healthy)
- 🟡 Yellow: 12-24 months (monitor)
- 🔴 Red: <12 months (critical)

### 3. Bounty Pipeline Funnel

Visualizes proposal lifecycle:
```
Voting → Active → Completed
              ↓
           Expired
```

**Success Rate** = `Completed / (Completed + Expired)`
Target: **75%+**

### 4. ABC Token Allocation Pie Chart

Shows distribution of 100M total supply:
- Circulating (in public hands)
- Treasury (held by ABCTreasury contract)
- Locked Vaults (staking, vesting, etc.)

### 5. Active Bounties List

Recent bounties with:
- Title and description
- Bounty amount (USD)
- Deadline for completion
- Claimed status

### 6. Verifier Leaderboard

Top 10 verifiers ranked by:
- Total verifications completed
- Approval rate (%)
- Earnings from verification rewards

---

## 🔧 Development

### Project Structure

```
abc-governance-dashboard/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── ABCDashboard.jsx       # Main ABC dashboard
│   │   └── GovernanceDashboard.jsx # SAIT dashboard (legacy)
│   ├── services/
│   │   ├── abcWeb3Service.js      # ABC contract queries
│   │   └── web3Service.js         # SAIT contract queries
│   ├── hooks/
│   │   └── useABCDashboard.js     # Custom React hooks
│   ├── config/
│   │   └── contractAbis.js        # Contract ABIs
│   ├── App.js                     # Main app with dashboard toggle
│   └── index.js
├── abc-protocol/
│   ├── contracts/
│   │   ├── ABCToken.sol
│   │   ├── ABCTreasury.sol
│   │   ├── BountyProposal.sol
│   │   └── VerificationPool.sol
│   ├── scripts/
│   │   └── deploy.js              # Deployment script
│   ├── test/                      # Unit tests (TBD)
│   └── hardhat.config.js
├── masterplan.md                  # Single source of truth
└── package.json
```

### Key Files

| File | Purpose |
|------|---------|
| `src/services/abcWeb3Service.js` | All blockchain queries (treasury, bounties, verifiers) |
| `src/hooks/useABCDashboard.js` | React hooks for data fetching with auto-refresh |
| `src/components/ABCDashboard.jsx` | Main dashboard UI with all visualizations |
| `abc-protocol/contracts/ABCTreasury.sol` | Treasury management (contributions, payouts, reserves) |
| `abc-protocol/contracts/BountyProposal.sol` | Proposal lifecycle & conviction voting |
| `abc-protocol/scripts/deploy.js` | Deploy all contracts to Sepolia |

---

## 🧪 Testing

### Run Contract Tests

```bash
cd abc-protocol
npx hardhat test

# Run with coverage
npx hardhat coverage
```

### Manual Testing Checklist

Dashboard functionality:
- [ ] Overview cards display correct values
- [ ] Treasury health updates in real-time
- [ ] Bounty pipeline shows correct counts
- [ ] Token allocation pie chart renders
- [ ] Refresh button works
- [ ] Dashboard toggles between ABC and SAIT

Smart contracts:
- [ ] Can create proposals
- [ ] Can vote with conviction weighting
- [ ] Can finalize proposals
- [ ] Can claim and complete bounties
- [ ] Treasury releases funds correctly

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Dashboard will be live at: https://abc-dashboard.vercel.app
```

### Environment Variables (Vercel)

Add these in Vercel dashboard → Project → Settings → Environment Variables:

```
REACT_APP_NETWORK=sepolia
REACT_APP_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
REACT_APP_ABC_TOKEN_ADDRESS=0x...
REACT_APP_ABC_TREASURY_ADDRESS=0x...
REACT_APP_BOUNTY_PROPOSAL_ADDRESS=0x...
REACT_APP_VERIFICATION_POOL_ADDRESS=0x...
```

### Custom Domain

1. Purchase domain (e.g., `dashboard.abcprotocol.org`)
2. Add domain in Vercel dashboard
3. Update DNS records as instructed

---

## 🔐 Security Considerations

### Smart Contract Security

✅ Uses OpenZeppelin battle-tested contracts
✅ ReentrancyGuard on all state-changing functions
✅ Solidity 0.8+ (overflow protection)
✅ Access control with Ownable
⚠️ **Requires external audit before mainnet**

### Frontend Security

✅ No private keys stored
✅ Read-only contract queries
✅ Sanitized user inputs
⚠️ **Always verify contract addresses**

---

## 🛣️ Roadmap

### Phase 1: Foundation (✅ Complete)
- [x] Smart contract implementation
- [x] Deployment scripts
- [x] Web3 service layer
- [x] Dashboard components
- [x] Auto-refresh data

### Phase 2: Genesis Launch (Feb 8-15, 2026)
- [ ] Deploy to Sepolia testnet
- [ ] End-to-end testing
- [ ] Seed 10 test bounties
- [ ] Launch ABC dashboard publicly
- [ ] Create demo video

### Phase 3: Enhanced Features (Feb 16 - Mar 31, 2026)
- [ ] Dune Analytics integration (6 killer queries)
- [ ] Geographic distribution map
- [ ] Live bounty feed (event stream)
- [ ] Mobile optimization
- [ ] Research App integration

### Phase 4: Mainnet (Q2 2026)
- [ ] Smart contract audit
- [ ] Deploy to Base mainnet
- [ ] Migrate to production dashboard
- [ ] Community onboarding

---

## 📚 Resources

### Documentation
- [Master Plan](./masterplan.md) - Single source of truth
- [ABC Protocol Proposal](./abc-protocol/ABC-Protocol-Proposal-v2.md) - Full specification
- [Hardhat Docs](https://hardhat.org/docs) - Smart contract development
- [Recharts Docs](https://recharts.org/) - Chart library

### Links
- **GitHub**: [abc-governance-dashboard](https://github.com/ASICP/abc-governance-dashboard)
- **Sepolia Etherscan**: https://sepolia.etherscan.io
- **Dune Analytics**: https://dune.com (for third-party queries)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use Prettier for formatting
- Follow Solidity style guide for contracts
- Write descriptive commit messages

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Project Lead**: Mateo Bastidas (mateo@asi2.org)
**Organization**: ASI Institute - Aligned Research Application (ARA)

---

## ❓ FAQ

### Q: Where are the smart contracts deployed?
**A**: Currently on Sepolia testnet. Mainnet deployment (Base) planned for Q2 2026.

### Q: How often does the dashboard update?
**A**: Automatically every 60 seconds. You can also manually refresh.

### Q: What's the difference between ABC and SAIT dashboards?
**A**: ABC Protocol is the new governance system for bounty-based research funding. SAIT is the legacy institutional token. Both share the SAT treasury concept.

### Q: Can I use this dashboard on mobile?
**A**: Yes! The dashboard is fully responsive and works on all screen sizes.

### Q: How do I report bugs?
**A**: Open an issue on [GitHub](https://github.com/ASICP/abc-governance-dashboard/issues) with detailed reproduction steps.

---

## 🎉 Success Metrics (Q2 2026 Targets)

| Metric | Target | Current |
|--------|--------|---------|
| ABC Holders | 2,000+ | TBD |
| Treasury Size | $5M+ | TBD |
| Funded Researchers | 100+ | TBD |
| Countries | 20+ | TBD |
| Bounty Success Rate | 75%+ | TBD |
| Voter Participation | 40%+ | TBD |

---

**Last Updated**: January 8, 2026
**Version**: 1.0.0
**Status**: ✅ Ready for Testnet Deployment

---

**⚠️ Disclaimer**: This dashboard is for informational purposes only and does not constitute financial advice. Always verify contract addresses and transaction details before interacting with smart contracts.
