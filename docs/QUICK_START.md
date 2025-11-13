# SAIT Governance Dashboard - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 16+ installed
- MetaMask wallet
- Basic React knowledge

### Step 1: Clone and Install (2 minutes)

```bash
# Clone your repository
git clone https://github.com/Mbastidas001/SAIToken_v2.git
cd SAIToken_v2/dashboard

# Install dependencies
npm install
```

### Step 2: Configure Contracts (1 minute)

Copy the files from this delivery to your project:

```bash
# Copy dashboard component
cp governance-dashboard.jsx src/components/

# Copy Web3 service
cp web3-service.js src/services/

# Copy contract ABIs
cp contract-abis.js src/config/

# Copy main App
cp App.js src/

# Copy package.json (merge with existing)
# Copy tailwind.config.js
```

### Step 3: Update Contract Addresses (1 minute)

Edit `src/services/web3-service.js`:

```javascript
const CONTRACTS = {
  SAITToken: '0xYourSAITAddress',           // ← Update these
  GovernanceStaking: '0xYourGovAddress',     // ← with your
  AIFundVault: '0xYourAIFundAddress',        // ← deployed
  TreasuryVault: '0xYourTreasuryAddress',    // ← contract
  TeamVault: '0xYourTeamAddress',            // ← addresses
  PartnerVault: '0xYourPartnerAddress',      // ← from
  SAITSATSwap: '0xYourSwapAddress',          // ← testnet or
  GovernanceController: '0xYourCtrlAddress'  // ← mainnet
};
```

### Step 4: Run Dashboard (1 minute)

```bash
npm start
```

Dashboard opens at: **http://localhost:3000**

---

## 📊 What You'll See

### Dashboard Features:

1. **Real-Time Metrics Cards**
   - SAIT price with premium ratio
   - Market capitalization
   - Circulating supply with buyback rate
   - Total treasury value

2. **Interactive Charts**
   - 12-month price history
   - Circulation trends
   - Token allocation pie chart
   - Buyback volume analysis

3. **24-Month Projections**
   - Price forecasts ($150 → $300)
   - SAT reserve growth
   - Circulation changes
   - Buyback runway calculations

4. **Treasury Details**
   - SAIT holdings (30M allocation)
   - SAT reserves with backing details
   - Collateral basket composition
   - Vesting schedules

---

## 🔌 Connect Your Wallet

1. Click **"Connect Wallet"** button (top right)
2. Approve MetaMask connection
3. Switch to correct network (Sepolia/Mainnet)
4. Dashboard loads real blockchain data

**Without wallet:** Dashboard shows Year 1 projections from whitepaper

---

## 💾 Key Files Delivered

### Frontend Components
- **governance-dashboard.jsx** - Main dashboard UI with all visualizations
- **App.js** - Application wrapper with wallet connection
- **web3-service.js** - Blockchain integration service

### Configuration
- **contract-abis.js** - All smart contract interfaces
- **tailwind.config.js** - Styling configuration
- **package.json** - Dependencies and scripts

### Documentation
- **README.md** - Comprehensive documentation
- **DEPLOYMENT_GUIDE.md** - Step-by-step deployment
- **QUICK_START.md** - This file

---

## 🎯 Quick Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'sait-blue': {
        500: '#YOUR_COLOR',  // Primary blue
      }
    }
  }
}
```

### Update Projections

Edit `generateProjections()` in `governance-dashboard.jsx`:

```javascript
// Adjust growth rates
const monthlyGrowth = i <= 12 ? 0.01 : 0.015;  // 1% or 1.5%

// Adjust SAIT sales
const monthlySAITSales = 150000;  // Your target

// Adjust buyback rate
const buybackRate = 0.02;  // 2% monthly
```

### Add New Metrics

In `governance-dashboard.jsx`, add to `calculateMetrics()`:

```javascript
const metrics = {
  // Existing metrics...
  
  // Your new metric
  yourMetric: yourCalculation,
};
```

---

## 🧪 Using Mock Data (Development)

If contracts aren't deployed yet:

1. **Keep mock data enabled** (default)
2. Dashboard shows Year 1 whitepaper projections
3. Perfect for testing UI/UX
4. Switch to real data once contracts are live

---

## 🔧 Troubleshooting

### Dashboard Won't Load
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### MetaMask Not Connecting
1. Check if MetaMask is installed
2. Verify correct network selected
3. Try disconnecting and reconnecting
4. Clear browser cache

### Charts Not Rendering
```bash
# Reinstall recharts
npm uninstall recharts
npm install recharts@2.10.3
```

### Contract Data Not Loading
1. Verify contract addresses in `web3-service.js`
2. Check network matches contracts (Sepolia/Mainnet)
3. Ensure contracts are deployed and verified
4. Check browser console for errors

---

## 📈 Understanding the Data

### Key Metrics Explained

**Premium Ratio**: SAIT Price / SAT Backing ($150)
- 1.0 = Parity (launch price)
- 1.33 = Year 2 target (33% premium)
- 2.0 = Year 3 fair value (100% premium)

**Buyback Runway**: Months of sustainability
```
Runway = (SAT Reserves × $150) / (Monthly Buyback USD)
```

**Market Cap**: Total value of circulating SAIT
```
Market Cap = Circulating SAIT × SAIT Price
```

**Circulating Supply**: SAIT outside of vaults
```
Circulating = Total - (Vaults + Treasury)
```

---

## 🚢 Production Deployment

### Option 1: Vercel (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 2: AWS S3

```bash
# Build
npm run build

# Upload
aws s3 sync build/ s3://your-bucket
```

### Option 3: Docker

```bash
# Build image
docker build -t sait-dashboard .

# Run container
docker run -p 3000:3000 sait-dashboard
```

---

## 📚 Next Steps

1. **Review Full Documentation**
   - Read `README.md` for complete feature list
   - Study `DEPLOYMENT_GUIDE.md` for contract deployment

2. **Deploy Smart Contracts**
   - Follow deployment guide for testnet
   - Test all functions thoroughly
   - Deploy to mainnet when ready

3. **Customize Dashboard**
   - Add your branding
   - Adjust colors and styling
   - Add additional metrics

4. **Connect Real Data**
   - Update contract addresses
   - Configure price oracles
   - Setup monitoring

5. **Launch**
   - Deploy dashboard to production
   - Announce to community
   - Monitor and maintain

---

## 🆘 Need Help?

- **Documentation**: Check README.md and DEPLOYMENT_GUIDE.md
- **GitHub Issues**: https://github.com/Mbastidas001/SAIToken_v2/issues
- **Email Support**: amonroy@asi2.org
- **Discord**: Join the ASIP community

---

## ✅ Deployment Checklist

Before going live:

- [ ] Smart contracts deployed and verified
- [ ] Contract addresses updated in dashboard
- [ ] Dashboard tested on testnet
- [ ] Wallet connection working
- [ ] All charts rendering correctly
- [ ] Mobile responsive verified
- [ ] Security audit completed (for mainnet)
- [ ] Multi-sig treasury setup
- [ ] Monitoring configured
- [ ] Documentation updated
- [ ] Community informed

---

## 🎉 You're Ready!

Your SAIT Governance Dashboard is now configured and ready to use. The dashboard provides:

✅ Real-time blockchain data integration  
✅ Comprehensive treasury analytics  
✅ Forward-looking projections  
✅ Professional visualizations  
✅ Mobile-responsive design  
✅ Web3 wallet integration  

**Happy monitoring!** 🚀

---

*Last Updated: November 2025*  
*Version: 1.0.0*  
*ASIP - Aligned Sovereign Intelligence Protocol*
