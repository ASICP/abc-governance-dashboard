# Replit Deployment Guide

## Quick Setup

### Step 1: Import from GitHub
1. Go to Replit.com
2. Create new Repl → Import from GitHub
3. Repository: `https://github.com/ASICP/abc-governance-dashboard`
4. Wait for import to complete

### Step 2: Configure Environment Variables (Secrets)

In Replit, go to **Tools → Secrets** and add these environment variables:

```
REACT_APP_NETWORK=sepolia
REACT_APP_CHAIN_ID=11155111

# IMPORTANT: Add your Alchemy API key here
REACT_APP_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY

# Contract Addresses (Sepolia - Deployed 2026-01-15)
REACT_APP_ABC_TOKEN_ADDRESS=0xeD883dff812dAB6C42Ae8Db58860171a780730Dc
REACT_APP_ABC_TREASURY_ADDRESS=0xBE56b2f0cEBC36021c9779b2AB97EF22F7E113Ea
REACT_APP_BOUNTY_PROPOSAL_ADDRESS=0x65b1c05368D89A5Bf6B31ED430604e59067fB682
REACT_APP_VERIFICATION_POOL_ADDRESS=0x82273d0BF498d94B60363e8024fFc9d29E327C18
REACT_APP_AUTHORITY_REGISTRY_ADDRESS=0x6B6d0Ed3939a9e343a7Fc9C56E073268A5f505fA
REACT_APP_RESEARCH_CURATION_ADDRESS=0x003621C2c90F7d746eA59a0CFb52a9032d830E94

# Mock Stablecoins (Sepolia)
REACT_APP_USDC_ADDRESS=0xC3dFB364D72CF09C2E15794F2bcce2298c5bc99a
REACT_APP_USDT_ADDRESS=0x0d6815f58448CF0a588cA3401FB26fE09D2D607A

# Data Mode (false = pure Sepolia live data for production)
REACT_APP_USE_MOCK_DATA=false
```

**CRITICAL:** Replace `YOUR_ALCHEMY_API_KEY` with your actual Alchemy API key!

### Step 3: Install Dependencies

In Replit shell:
```bash
npm install
```

### Step 4: Build for Production

```bash
npm run build
```

### Step 5: Start the App

Replit should auto-detect and run:
```bash
npm start
```

Or you can configure the Run button to use `npm start`.

---

## Alchemy API Key Setup

If you don't have an Alchemy API key:

1. Go to https://alchemy.com
2. Sign up (free tier includes 300M compute units/month)
3. Create a new app:
   - Chain: Ethereum
   - Network: Sepolia
4. Copy your API key
5. Your RPC URL format:
   ```
   https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
   ```

---

## Verifying Deployment

After deployment, check:

1. **Dashboard Loads** - Should see ABC Governance Dashboard
2. **Data Source Indicator** - Should show "⛓️ Live Sepolia" (pure Sepolia mode)
3. **Console Logs** - Check browser console for "⛓️ Using Sepolia data only"
4. **Contract Queries** - Should see real on-chain data (not mock)

---

## Troubleshooting

### Issue: Dashboard shows mock data
- **Fix:** Check `REACT_APP_USE_MOCK_DATA=false` in Replit Secrets

### Issue: CORS errors
- **Fix:** Verify Alchemy API key is correct in Replit Secrets

### Issue: Contract errors
- **Fix:** Verify all contract addresses are correct in Replit Secrets

### Issue: Build fails
- **Fix:** Run `npm install` first, then `npm run build`

---

## Production Recommendations

1. **RPC Provider:** Alchemy (better than Ankr for production)
2. **Data Mode:** `REACT_APP_USE_MOCK_DATA=false` (pure Sepolia)
3. **Monitoring:** Check browser console for errors
4. **Updates:** Pull from GitHub when you push new changes

---

**Status:** Ready for deployment
**Repository:** https://github.com/ASICP/abc-governance-dashboard
**Network:** Sepolia Testnet
