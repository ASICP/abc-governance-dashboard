# SAIT Token Ecosystem - Complete Deployment Guide

## Overview

This guide walks through deploying the entire SAIT token ecosystem, including smart contracts and the governance dashboard.

## Prerequisites

### Development Tools
- Node.js v16+ and npm/yarn
- Hardhat or Truffle for contract deployment
- MetaMask wallet with testnet funds
- Git for version control

### Accounts Needed
- **Deployer Account**: Admin wallet for initial deployment
- **Treasury Account**: Multi-sig wallet for treasury operations
- **Team Account**: For team token vesting
- **Partner Account**: For partner allocations

### Testnet ETH
Get testnet tokens from:
- **Sepolia**: https://sepoliafaucet.com/
- **Goerli**: https://goerlifaucet.com/
- **Mumbai (Polygon)**: https://faucet.polygon.technology/

## Phase 1: Smart Contract Deployment

### Step 1: Setup Hardhat Project

```bash
# Clone your repository
git clone https://github.com/Mbastidas001/SAIToken_v2.git
cd SAIToken_v2

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Step 2: Configure Environment Variables

Edit `.env`:

```env
# Network RPC URLs
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
POLYGON_RPC_URL=https://polygon-rpc.com

# Private Keys (NEVER commit these!)
DEPLOYER_PRIVATE_KEY=your_deployer_private_key
TREASURY_ADDRESS=0xYourTreasuryMultisigAddress
TEAM_ADDRESS=0xYourTeamAddress

# Etherscan API Keys (for verification)
ETHERSCAN_API_KEY=your_etherscan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key

# Initial Parameters
TOTAL_SUPPLY=100000000000000000000000000  # 100M * 10^18
QUARTERLY_LIMIT=1750000000000000000000000  # 1.75M * 10^18 (7% of 100M / 4)
```

### Step 3: Create Deployment Script

Create `scripts/deploy.js`:

```javascript
const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  console.log("Starting SAIT Token Ecosystem Deployment...\n");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString(), "\n");

  // Configuration from .env
  const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS;
  const TEAM_ADDRESS = process.env.TEAM_ADDRESS;
  const TOTAL_SUPPLY = process.env.TOTAL_SUPPLY;
  const QUARTERLY_LIMIT = process.env.QUARTERLY_LIMIT;

  // 1. Deploy SAIT Token
  console.log("1. Deploying SAITToken...");
  const SAITToken = await ethers.getContractFactory("SAITToken");
  const saitToken = await SAITToken.deploy(TOTAL_SUPPLY, QUARTERLY_LIMIT);
  await saitToken.deployed();
  console.log("✓ SAITToken deployed to:", saitToken.address);

  // 2. Deploy Governance Staking
  console.log("\n2. Deploying GovernanceStaking...");
  const GovernanceStaking = await ethers.getContractFactory("GovernanceStaking");
  const governance = await GovernanceStaking.deploy(saitToken.address);
  await governance.deployed();
  console.log("✓ GovernanceStaking deployed to:", governance.address);

  // 3. Deploy AI Fund Vault (50M SAIT)
  console.log("\n3. Deploying AIFundVault...");
  const aiFundAmount = ethers.utils.parseEther("50000000"); // 50M
  const AIFundVault = await ethers.getContractFactory("Vault");
  const aiFundVault = await AIFundVault.deploy(
    saitToken.address,
    TREASURY_ADDRESS, // beneficiary
    0, // No cliff for AI fund
    0  // Milestone-based, not time-based
  );
  await aiFundVault.deployed();
  console.log("✓ AIFundVault deployed to:", aiFundVault.address);

  // Transfer 50M SAIT to AI Fund Vault
  await saitToken.transfer(aiFundVault.address, aiFundAmount);
  console.log("✓ Transferred 50M SAIT to AIFundVault");

  // 4. Deploy Treasury Vault (30M SAIT)
  console.log("\n4. Deploying TreasuryVault...");
  const treasuryAmount = ethers.utils.parseEther("30000000"); // 30M
  const TreasuryVault = await ethers.getContractFactory("Vault");
  const treasuryVault = await TreasuryVault.deploy(
    saitToken.address,
    TREASURY_ADDRESS,
    0, // No cliff
    0  // Direct treasury control
  );
  await treasuryVault.deployed();
  console.log("✓ TreasuryVault deployed to:", treasuryVault.address);

  await saitToken.transfer(treasuryVault.address, treasuryAmount);
  console.log("✓ Transferred 30M SAIT to TreasuryVault");

  // 5. Deploy Team Vault (15M SAIT)
  console.log("\n5. Deploying TeamVault...");
  const teamAmount = ethers.utils.parseEther("15000000"); // 15M
  const TeamVault = await ethers.getContractFactory("Vault");
  const teamVault = await TeamVault.deploy(
    saitToken.address,
    TEAM_ADDRESS,
    15768000, // 6 months cliff (in seconds)
    94608000  // 3 years vesting (in seconds)
  );
  await teamVault.deployed();
  console.log("✓ TeamVault deployed to:", teamVault.address);

  await saitToken.transfer(teamVault.address, teamAmount);
  console.log("✓ Transferred 15M SAIT to TeamVault");

  // 6. Deploy Partner Vault (5M SAIT)
  console.log("\n6. Deploying PartnerVault...");
  const partnerAmount = ethers.utils.parseEther("5000000"); // 5M
  const PartnerVault = await ethers.getContractFactory("Vault");
  const partnerVault = await PartnerVault.deploy(
    saitToken.address,
    TREASURY_ADDRESS, // Partners managed by treasury
    15768000, // 6 months cliff
    63072000  // 2 years vesting
  );
  await partnerVault.deployed();
  console.log("✓ PartnerVault deployed to:", partnerVault.address);

  await saitToken.transfer(partnerVault.address, partnerAmount);
  console.log("✓ Transferred 5M SAIT to PartnerVault");

  // 7. Deploy SAIT/SAT Swap
  console.log("\n7. Deploying SAITSATSwap...");
  const SAITSATSwap = await ethers.getContractFactory("SAITSATSwap");
  const swap = await SAITSATSwap.deploy(
    saitToken.address,
    treasuryVault.address
  );
  await swap.deployed();
  console.log("✓ SAITSATSwap deployed to:", swap.address);

  // 8. Deploy Governance Controller
  console.log("\n8. Deploying GovernanceController...");
  const GovernanceController = await ethers.getContractFactory("GovernanceController");
  const controller = await GovernanceController.deploy(
    saitToken.address,
    governance.address
  );
  await controller.deployed();
  console.log("✓ GovernanceController deployed to:", controller.address);

  // 9. Setup Permissions
  console.log("\n9. Setting up permissions...");
  
  // Grant roles to Governance Controller
  const GOVERNANCE_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("GOVERNANCE_ROLE"));
  await saitToken.grantRole(GOVERNANCE_ROLE, controller.address);
  console.log("✓ Granted GOVERNANCE_ROLE to Controller");

  // Grant compliance role to swap contract
  const COMPLIANCE_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("COMPLIANCE_ROLE"));
  await controller.grantRole(COMPLIANCE_ROLE, swap.address);
  console.log("✓ Granted COMPLIANCE_ROLE to Swap contract");

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("DEPLOYMENT SUMMARY");
  console.log("=".repeat(60));
  console.log("\nContract Addresses:");
  console.log("------------------");
  console.log("SAITToken:            ", saitToken.address);
  console.log("GovernanceStaking:    ", governance.address);
  console.log("AIFundVault:          ", aiFundVault.address);
  console.log("TreasuryVault:        ", treasuryVault.address);
  console.log("TeamVault:            ", teamVault.address);
  console.log("PartnerVault:         ", partnerVault.address);
  console.log("SAITSATSwap:          ", swap.address);
  console.log("GovernanceController: ", controller.address);

  console.log("\nToken Distribution:");
  console.log("------------------");
  console.log("AI Fund Vault:   50,000,000 SAIT");
  console.log("Treasury Vault:  30,000,000 SAIT");
  console.log("Team Vault:      15,000,000 SAIT");
  console.log("Partner Vault:    5,000,000 SAIT");
  console.log("Total:          100,000,000 SAIT");

  // Save deployment addresses
  const deploymentData = {
    network: hre.network.name,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: {
      SAITToken: saitToken.address,
      GovernanceStaking: governance.address,
      AIFundVault: aiFundVault.address,
      TreasuryVault: treasuryVault.address,
      TeamVault: teamVault.address,
      PartnerVault: partnerVault.address,
      SAITSATSwap: swap.address,
      GovernanceController: controller.address
    }
  };

  const fs = require('fs');
  const path = require('path');
  const outputPath = path.join(__dirname, `../deployments/${hre.network.name}.json`);
  
  // Create deployments directory if it doesn't exist
  if (!fs.existsSync(path.join(__dirname, '../deployments'))) {
    fs.mkdirSync(path.join(__dirname, '../deployments'));
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(deploymentData, null, 2));
  console.log(`\n✓ Deployment data saved to: ${outputPath}`);
  
  console.log("\n" + "=".repeat(60));
  console.log("Next Steps:");
  console.log("1. Verify contracts on Etherscan");
  console.log("2. Update dashboard contract addresses");
  console.log("3. Test all functions on testnet");
  console.log("4. Setup multi-sig for treasury");
  console.log("=".repeat(60) + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Step 4: Deploy to Testnet

```bash
# Deploy to Sepolia testnet
npx hardhat run scripts/deploy.js --network sepolia

# Or deploy to Mumbai (Polygon testnet)
npx hardhat run scripts/deploy.js --network mumbai
```

### Step 5: Verify Contracts on Etherscan

```bash
# Verify SAIT Token
npx hardhat verify --network sepolia <SAIT_TOKEN_ADDRESS> "100000000000000000000000000" "1750000000000000000000000"

# Verify other contracts (repeat for each)
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

## Phase 2: Dashboard Deployment

### Step 1: Setup Dashboard Project

```bash
# Navigate to dashboard directory
cd dashboard

# Install dependencies
npm install

# Create production .env
cp .env.example .env.production
```

### Step 2: Configure Contract Addresses

Edit `src/web3-service.js` with your deployed addresses:

```javascript
const CONTRACTS = {
  SAITToken: '0xYourDeployedSAITTokenAddress',
  GovernanceStaking: '0xYourGovernanceAddress',
  AIFundVault: '0xYourAIFundVaultAddress',
  TreasuryVault: '0xYourTreasuryVaultAddress',
  TeamVault: '0xYourTeamVaultAddress',
  PartnerVault: '0xYourPartnerVaultAddress',
  SAITSATSwap: '0xYourSwapAddress',
  GovernanceController: '0xYourControllerAddress'
};
```

### Step 3: Build Dashboard

```bash
npm run build
```

### Step 4: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Alternative: Deploy to AWS S3

```bash
# Build for production
npm run build

# Upload to S3
aws s3 sync build/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Phase 3: Post-Deployment Configuration

### 1. Setup Multi-Sig Wallet (Gnosis Safe)

Visit https://gnosis-safe.io/ and:
1. Create new Safe
2. Add 3-5 signers
3. Set threshold (e.g., 3 of 5)
4. Transfer treasury ownership to Safe

### 2. Initialize Price Oracle

```javascript
// If using Chainlink
const priceFeed = await ethers.getContractAt(
  "AggregatorV3Interface",
  CHAINLINK_PRICE_FEED_ADDRESS
);

// Configure in swap contract
await swap.setPriceOracle(priceFeed.address);
```

### 3. Authorize Initial Organizations

```javascript
// Authorize organizations for compliance buybacks
const organizations = [
  "0xUniversity1Address",
  "0xResearchLab2Address",
  "0xAICompany3Address"
];

for (const org of organizations) {
  await swap.authorizeOrganization(org);
  console.log(`Authorized: ${org}`);
}
```

### 4. Setup Monitoring

Create `monitoring/alerts.js`:

```javascript
const { ethers } = require('ethers');
const nodemailer = require('nodemailer');

// Monitor for large transactions
saitToken.on('Transfer', async (from, to, amount) => {
  const amountInSAIT = ethers.utils.formatEther(amount);
  
  if (parseFloat(amountInSAIT) > 100000) { // Alert if > 100k SAIT
    await sendAlert({
      type: 'LARGE_TRANSFER',
      from,
      to,
      amount: amountInSAIT
    });
  }
});

// Monitor buyback events
swap.on('BuybackExecuted', async (org, saitAmount, satAmount) => {
  await sendAlert({
    type: 'BUYBACK',
    organization: org,
    saitAmount: ethers.utils.formatEther(saitAmount),
    satAmount: ethers.utils.formatEther(satAmount)
  });
});
```

## Phase 4: Testing Checklist

### Smart Contract Tests

- [ ] Token transfers work correctly
- [ ] Quarterly limits enforced
- [ ] Vesting schedules working
- [ ] Governance voting functional
- [ ] Buyback mechanism operates correctly
- [ ] Access controls properly configured
- [ ] Emergency pause works

### Dashboard Tests

- [ ] Wallet connection works
- [ ] Real-time data loads correctly
- [ ] Charts render properly
- [ ] Projections calculate accurately
- [ ] Mobile responsive
- [ ] All links functional

### Integration Tests

- [ ] Dashboard reads contract data
- [ ] Transactions execute from dashboard
- [ ] Events trigger UI updates
- [ ] Error handling works
- [ ] Loading states display

## Phase 5: Mainnet Deployment

### Pre-Mainnet Checklist

- [ ] All contracts audited by reputable firm
- [ ] Testnet deployment successful for 30+ days
- [ ] Community testing completed
- [ ] Legal review completed
- [ ] Multi-sig treasury setup
- [ ] Insurance coverage arranged
- [ ] Bug bounty program launched

### Mainnet Deployment Steps

1. **Final Security Review**
   ```bash
   npm run security-check
   npm run audit
   ```

2. **Deploy to Mainnet**
   ```bash
   npx hardhat run scripts/deploy.js --network mainnet
   ```

3. **Verify All Contracts**
   ```bash
   ./scripts/verify-all.sh mainnet
   ```

4. **Transfer Ownership to Multi-Sig**
   ```bash
   npx hardhat run scripts/transfer-ownership.js --network mainnet
   ```

5. **Announce Deployment**
   - Update website with contract addresses
   - Publish security audit reports
   - Announce on social media
   - Update documentation

## Maintenance & Monitoring

### Daily Tasks
- Monitor transaction volumes
- Check treasury balances
- Review governance proposals
- Scan for security alerts

### Weekly Tasks
- Review vault vesting schedules
- Analyze buyback metrics
- Check oracle price feeds
- Update dashboard projections

### Monthly Tasks
- Generate financial reports
- Conduct security reviews
- Update documentation
- Community governance calls

## Emergency Procedures

### If Contract Bug Discovered

1. **Immediate Actions**
   ```javascript
   // Pause all contracts
   await controller.pause();
   ```

2. **Communication**
   - Notify community immediately
   - Post on official channels
   - Contact exchanges if listed

3. **Resolution**
   - Deploy patched contracts
   - Migrate user funds if necessary
   - Conduct post-mortem

### If Price Oracle Fails

1. **Fallback to Manual Pricing**
   ```javascript
   await swap.setPriceManually(currentPrice);
   ```

2. **Fix Oracle Connection**
3. **Resume Automated Pricing**

## Support Resources

- **Documentation**: https://docs.asip.org
- **Discord**: https://discord.gg/asip
- **GitHub**: https://github.com/Mbastidas001/SAIToken_v2
- **Email**: amonroy@asi2.org

## Conclusion

Following this deployment guide ensures a secure, well-tested launch of the SAIT token ecosystem. Remember:

- Test extensively on testnet first
- Never rush to mainnet
- Security audits are essential
- Community involvement is key
- Maintain transparent communication

Good luck with your deployment!
