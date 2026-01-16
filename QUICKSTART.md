# ABC Dashboard - Quick Start Guide

Get the dashboard running in **5 minutes** with mock data!

---

## ⚡ Super Quick Start

```bash
# 1. Install dependencies (one-time setup)
npm install

# 2. Start the dashboard
npm start

# Dashboard opens automatically at http://localhost:3000
# Toggle to "ABC Protocol" tab in the top navigation
```

That's it! The dashboard will run with realistic mock data until your dev team provides contract addresses.

---

## 📋 What You'll See

When you open the dashboard, you'll see:

✅ **4 Overview Cards**
- ABC Price: $0.12 (with 20% premium indicator)
- Treasury Value: $3.6M
- Active Bounties: 8
- Market Cap: $1.44M

✅ **Treasury Health Panel**
- 80-month runway (very healthy - green indicator)
- $450k in stablecoin reserves
- 30M ABC tokens in treasury
- Monthly burn rate tracking

✅ **Bounty Pipeline**
- 5 proposals in voting
- 8 active bounties
- 23 completed bounties
- 88.5% success rate

✅ **Active Bounties List**
- 5 sample research bounties with realistic amounts
- Claimed/available status
- Deadlines and IPFS hashes

✅ **Top 10 Verifier Leaderboard**
- Realistic verification stats
- Approval rates
- Earnings from verification rewards

✅ **Auto-Refresh**
- Data refreshes every 60 seconds
- Manual refresh button available
- Last updated timestamp displayed

---

## 🔄 Switching to Real Contract Data

When your dev team provides the deployed contract addresses:

### Option 1: Update Environment File (Recommended)

```bash
# Edit .env.development
REACT_APP_USE_MOCK_DATA=false
REACT_APP_ABC_TOKEN_ADDRESS=0xYourDeployedTokenAddress
REACT_APP_ABC_TREASURY_ADDRESS=0xYourDeployedTreasuryAddress
REACT_APP_BOUNTY_PROPOSAL_ADDRESS=0xYourDeployedBountyAddress
REACT_APP_VERIFICATION_POOL_ADDRESS=0xYourDeployedVerificationAddress

# Restart the dashboard
npm start
```

### Option 2: Quick Swap Script

```bash
# We'll create a script to swap addresses quickly
npm run swap-contracts
```

---

## 🎛️ Dashboard Controls

### Top Navigation
- **ABC Protocol / SAIT Token** toggle
  - Switch between the two dashboards
  - ABC defaults to mock data until contracts deployed
  - SAIT uses existing mock data

- **Last Updated** timestamp
  - Shows when data was last refreshed
  - Click "Refresh" button to update immediately

- **Connect Wallet** (optional)
  - Not required for viewing dashboard
  - Will be used for governance interactions in Phase 2

---

## 🐛 Troubleshooting

### Issue: Dashboard won't start

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue: "Module not found" errors

```bash
# Make sure you're in the root directory
cd abc-governance-dashboard

# Check if dependencies are installed
npm install
```

### Issue: Charts not rendering

```bash
# Recharts might need manual installation
npm install recharts@2.10.3 --save
```

### Issue: Mock data not showing

```bash
# Verify .env.development has this line:
REACT_APP_USE_MOCK_DATA=true

# Restart the dev server
npm start
```

---

## 📱 Mobile Testing

The dashboard is fully responsive! Test on:

```bash
# Your computer's local network
# Find your local IP: ifconfig (Mac/Linux) or ipconfig (Windows)
# Access from phone: http://192.168.X.X:3000
```

---

## 🚀 Next Steps

### Before Sunday (Solo Testnet Deploy)

If your dev team hasn't deployed by Sunday, you can deploy to a local testnet:

```bash
cd abc-protocol

# Start local Hardhat node
npx hardhat node

# In another terminal, deploy contracts
npx hardhat run scripts/deploy.js --network localhost

# Contract addresses will be printed to console
# Update .env.development with these addresses
```

### When Dev Team Deploys to Sepolia

1. They'll provide 4 contract addresses
2. Update `.env.development` with the addresses
3. Set `REACT_APP_USE_MOCK_DATA=false`
4. Restart dashboard
5. Done! Now showing real on-chain data

---

## 🎨 Customization

### Change Theme Colors

Edit `src/components/ABCDashboard.jsx`:

```javascript
// Header gradient
from-blue-600 to-purple-600  // Change these Tailwind classes

// Card colors
bg-blue-100 text-blue-800    // Overview cards
bg-green-100 text-green-800  // Active bounties
```

### Adjust Refresh Interval

Edit `src/hooks/useABCDashboard.js`:

```javascript
const interval = setInterval(() => {
  fetchData();
}, 60000); // Change 60000 to your desired milliseconds
```

### Add More Mock Bounties

Edit `src/services/mockDataService.js`:

```javascript
const mockBounties = [
  // Add more bounty objects here
  {
    id: "6",
    title: "Your New Bounty Title",
    amount: "45000",
    // ... etc
  }
];
```

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────┐
│         .env.development                     │
│  REACT_APP_USE_MOCK_DATA=true               │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│     abcWeb3Service.js                        │
│  ✓ Checks useMockData()                     │
│  ✓ Returns mock data if true                │
│  ✓ Returns real contract data if false      │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│     useABCDashboard.js (React Hook)          │
│  ✓ Fetches data every 60s                   │
│  ✓ Manages loading/error states             │
│  ✓ Provides refresh function                │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│     ABCDashboard.jsx (UI Component)          │
│  ✓ Renders all visualizations               │
│  ✓ Shows metrics, charts, tables            │
│  ✓ Auto-updates when data changes           │
└─────────────────────────────────────────────┘
```

---

## 💡 Pro Tips

1. **Keep the dev server running** while you work
   - It has hot-reload, so changes appear instantly
   - No need to restart for most code changes

2. **Open browser console** (F12) to see:
   - "📊 Using mock data mode" confirmation message
   - Any errors or warnings
   - Network requests (when using real contracts)

3. **Test both dashboards**
   - Toggle between ABC and SAIT to compare
   - Both work simultaneously
   - ABC uses mock data, SAIT uses its own mock data

4. **Share screenshots** with your team
   - Dashboard looks production-ready with mock data
   - Great for demos and design feedback

---

## 📞 Need Help?

If you run into issues:

1. Check the browser console for error messages
2. Verify `.env.development` is configured correctly
3. Make sure you ran `npm install` first
4. Try clearing cache and restarting

---

## ✨ What's Working Right Now

✅ Full dashboard UI rendering
✅ All 8 components displaying data
✅ Auto-refresh every 60 seconds
✅ Responsive design (mobile-friendly)
✅ Toggle between ABC and SAIT dashboards
✅ Realistic mock data that looks production-ready
✅ Easy contract address swap (just edit .env)
✅ No blockchain connection required (yet)

---

**Ready to see it? Run `npm start` and open http://localhost:3000** 🚀

The dashboard will automatically use mock data until you provide contract addresses. Toggle to "ABC Protocol" in the top nav and enjoy exploring the fully functional interface!
