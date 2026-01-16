# ABC Dashboard - Hybrid Mode Implementation

## Overview

The ABC Dashboard now supports **Hybrid Mode** - combining mock baseline data with live Sepolia blockchain data.

---

## How It Works

### Hybrid Mode (`REACT_APP_USE_MOCK_DATA=true`)

**Mock Data as Baseline:**
- 23 completed bounties (historical/seed data)
- 8 active bounties (sample research projects)
- Treasury values and metrics
- Top 10 verifier leaderboard

**+ Sepolia Live Data:**
- New bounties created on Sepolia are **added** to the counts
- Example: If Sepolia has 2 new active bounties → Dashboard shows 8 + 2 = **10 active bounties**
- Real contract state overlays mock baseline

**Result:** Dashboard always has data to show, and grows as real activity happens on Sepolia.

---

### Pure Sepolia Mode (`REACT_APP_USE_MOCK_DATA=false`)

**Only Real Data:**
- Queries Sepolia contracts directly
- Shows only on-chain data
- No mock baseline

**Use this when:** You want to see pure blockchain state without any seed data.

---

## Data Source Indicator

The dashboard header shows which mode is active:

- 🔄 **Mock + Sepolia** - Hybrid mode active
- ⛓️ **Live Sepolia** - Pure Sepolia mode
- 📊 **Mock Data** - No contract addresses configured
- ⚠️ **Mock (Sepolia unavailable)** - Contracts unreachable, using mock only

---

## Contract Addresses (Sepolia)

Deployed on **2026-01-15**:

```
ABCToken:              0xeD883dff812dAB6C42Ae8Db58860171a780730Dc
Treasury:              0xBE56b2f0cEBC36021c9779b2AB97EF22F7E113Ea
BountyRegistry:        0x65b1c05368D89A5Bf6B31ED430604e59067fB682
ExpertCourtVerifier:   0x82273d0BF498d94B60363e8024fFc9d29E327C18
AuthorityRegistry:     0x6B6d0Ed3939a9e343a7Fc9C56E073268A5f505fA
ResearchCuration:      0x003621C2c90F7d746eA59a0CFb52a9032d830E94
```

---

## Configuration

### Development (.env.development)
```env
REACT_APP_USE_MOCK_DATA=true  # Hybrid mode
```

### Production (.env.production)
```env
REACT_APP_USE_MOCK_DATA=false  # Pure Sepolia
```

---

## Benefits

### Why Hybrid Mode?

1. **Always Shows Data** - Dashboard never looks empty
2. **Real Activity Visible** - New Sepolia bounties appear immediately
3. **Testing Friendly** - Can test UI with rich mock data while contracts populate
4. **Smooth Transition** - Gradually shift from mock to real as ecosystem grows

### Production Recommendation

- **Launch Week**: Use hybrid mode (mock baseline + Sepolia)
- **Week 2+**: Monitor real activity
- **When sufficient real data**: Switch to pure Sepolia mode

---

## Technical Implementation

### Key Files Modified

1. **src/services/abcWeb3Service.js**
   - Added `useHybridMode()` function
   - Modified `getDashboardData()` to merge mock + Sepolia
   - Graceful fallback on Sepolia errors

2. **src/components/DataSourceIndicator.jsx**
   - New component showing data source
   - Visual indicator in dashboard header

3. **src/components/ABCDashboard.jsx**
   - Displays data source indicator
   - Shows combined data seamlessly

---

## Example Scenarios

### Scenario 1: Fresh Deployment
```
Mock Data:    8 active bounties, 23 completed
Sepolia Data: 0 bounties (just deployed)
Dashboard:    8 active, 23 completed (all from mock)
Indicator:    🔄 Mock + Sepolia
```

### Scenario 2: First Real Bounty
```
Mock Data:    8 active bounties
Sepolia Data: 1 new active bounty
Dashboard:    9 active bounties (8 mock + 1 real)
Indicator:    🔄 Mock + Sepolia
```

### Scenario 3: Growing Ecosystem
```
Mock Data:    8 active, 23 completed
Sepolia Data: 5 active, 12 completed
Dashboard:    13 active, 35 completed
Indicator:    🔄 Mock + Sepolia
```

### Scenario 4: Pure Sepolia
```
Mock Data:    (disabled)
Sepolia Data: 15 active, 50 completed
Dashboard:    15 active, 50 completed (all real)
Indicator:    ⛓️ Live Sepolia
```

---

## Switching Modes

### Enable Hybrid Mode
```bash
# Edit .env.development or .env.production
REACT_APP_USE_MOCK_DATA=true

# Restart dashboard
npm start
```

### Disable Hybrid Mode (Pure Sepolia)
```bash
# Edit .env.development or .env.production
REACT_APP_USE_MOCK_DATA=false

# Restart dashboard
npm start
```

---

## FAQ

**Q: Will mock data confuse users?**
A: The data source indicator clearly shows mode. Plus, mock data represents realistic baseline.

**Q: When should we switch to pure Sepolia?**
A: When you have sufficient real on-chain activity (20+ bounties, active treasury, etc.)

**Q: Can we customize the mock baseline?**
A: Yes! Edit `src/services/mockDataService.js` to change mock values.

**Q: What if Sepolia is down?**
A: Dashboard gracefully falls back to mock data with "Mock (Sepolia unavailable)" indicator.

**Q: Does this affect contract deployment?**
A: No - contracts are independent. This only affects dashboard display logic.

---

## Monitoring

Check browser console for these messages:

```
🔄 Using hybrid mode: Mock baseline + Sepolia live data
✅ Successfully queried Sepolia contracts
⚠️ Sepolia query failed, using mock data only
⛓️ Using Sepolia data only
```

---

**Status:** ✅ Hybrid Mode Implemented
**Ready For:** GitHub push & Replit deployment
**Recommended Launch Mode:** Hybrid (true)
