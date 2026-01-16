# MERIDIAN Protocol v1.0

**Technical Specification & Implementation Guide**

**Version:** 1.0  
**Date:** December 2025  
**Authors:** Mateo Bastidas, ASI Institute  
**Status:** Ready for Development

----------

## Table of Contents

1.  [Executive Summary]
2.  [Problem Statement]
3.  [Solution: MERIDIAN Protocol]
4.  [Token Economics (MRD)]
5.  [Curation Mechanism]
6.  [Authority Score System}
7.  [Curator Incentives]
8.  [Integration with ASIP]
9.  [Technical Architecture]
10.  [Go-to-Market Strategy]
11.  [Launch Roadmap]
12.  [Appendices]

----------

## Executive Summary

### Mission Statement


### Mission Statement

**In the information swamps of research publications, some proliferate more than others.**

Currently, research quality signals emerge through inefficient individual scouting—researchers discussing papers via LinkedIn, internal chats, and private channels. Quality is determined by author reputation, institutional prestige, and insider networks rather than rigorous distributed evaluation. This creates opaque, non-scalable knowledge dissemination where breakthrough papers from unknown researchers go unnoticed while mediocre work from elite institutions gets amplified base on previous reputation.

**MERIDIAN Protocol transforms informal curation into a formal, incentivized, transparent economy** where researchers earn rewards for evaluating papers they already read, building verifiable reputations through on-chain Authority Scores, and creating convergent quality signals that benefit the entire AI alignment ecosystem.

----------

### One-Sentence Value Proposition

MERIDIAN enables researchers to earn money and build professional reputation by curating AI alignment research they already read, creating convergent quality signals that guide the field and inform grant decisions through a transparent, on-chain reputation system.

----------

### The Three-Part Ecosystem

```
┌─────────────────────────────────────────────────┐
│          RESEARCH HUB (Infrastructure)          │
│  Aggregates all AI alignment research           │
│  Free, open-source, comprehensive index         │
└────────────────┬────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────┐
│       MERIDIAN PROTOCOL (Curation Layer)        │
│  MRD token enables distributed expert curation  │
│  Independent evaluations converge on quality    │
│  Authority Scores = verifiable expertise        │
└────────────────┬────────────────────────────────┘
                 ↓
┌─────────────────────────────────────────────────┐
│         ASIP GRANT GOVERNANCE (Funding Layer)   │
│  Uses MERIDIAN signals to inform grants         │
│  Recruits Grant Committee from top curators     │
│  Better allocation through quality signals      │
└─────────────────────────────────────────────────┘
```
----------

## Problem Statement

### Current State: Inefficient Information Flow

**Volume Crisis**

-   3-15 AI alignment papers published daily
-   1,000+ papers per year across arXiv, Alignment Forum, conferences
-   Researchers spend 10-20 hours/week just staying current

**Signal Fragmentation**

-   Quality discussions happen in private Slack channels
-   LinkedIn posts reach small networks, initially and through network affects the papers are disseminated at a grander scale but with delay
-   Internal lab discussions invisible to field
-   Knowledge confined to institutions/cliques

**Grant Allocation Challenges**

-   ASIP Grant Board evaluates applications without field-level quality signals, with internal discernment and a grant committee filter, where the final pass is through SAIT token holders voting on research funding.
-   Hard to verify "proven track record in research evaluation"
-   Grant Committee recruitment limited to personal / GTM networks, can be more democratic and publicly open in the research community.
-   No objective measure of research judgment quality

**Researcher Pain Points**

-   Already reading papers, forming opinions on quality
-   No compensation for expertise they share informally
-   No professional credential for their curation work
-   Career advancement doesn't reflect research taste

----------


### Market Gaps

| Gap | Impact | MERIDIAN Solution |
|-----|--------|-------------------|
| **No economic incentive for curation** | Researchers do this unpaid, limiting participation | Earn MRD tokens for accurate predictions (10-20% ROI) |
| **Informal reputation is unverifiable** | "I'm good at evaluating research" can't be proven | Authority Score = on-chain, auditable track record |
| **Quality signals are private** | Field coordination suffers, duplicate work | Public MERIDIAN scores on Research Hub for all papers |
| **Grant boards lack objective data on selection outside of their internal collective discernment** | Political/reputation-based committee selection | Grant Committee recruitment weighted with proven curators scores (Authority >2500) |
| **No feedback loop** | Curators never know if they were right | Validation phase shows long-term accuracy, adjusts reputation |

----------

## Solution: MERIDIAN Protocol

### Core Concept

**MERIDIAN is a Distributed Oracle Network for Research Quality**

Like blockchain oracles bring real-world data on-chain, MERIDIAN curators bring research quality signals to the ecosystem through:

1.  **Independent evaluation** (no coordination bias)
2.  **Economic stakes** (skin in the game)
3.  **Convergence algorithm** (distributed expertise → consensus)
4.  **Time-based validation** (predictions verified by reality)

----------

### How It Works (Simple Flow)

```
STEP 1: PAPER PUBLISHED
↓
Researcher uploads to arXiv
↓
Auto-imported to Research Hub within 24 hours

STEP 2: CURATION WINDOW OPENS (30 days)
↓
Curators see paper in their specialized domain feed
↓
Curator stakes 50 MRD (~$5-50 depending on market price)
↓
Predicts quality: Breakthrough / Valuable / Incremental / Noise
↓
Writes 100-300 word justification (mandatory)
↓
Submits prediction on-chain (can't see others' predictions yet)

STEP 3: INDEPENDENT CONVERGENCE (30 days)
↓
Multiple curators evaluate same paper independently
↓
Example results: 10 curators total
  - 7 predicted "Valuable"
  - 2 predicted "Breakthrough"  
  - 1 predicted "Incremental"
↓
Consensus emerges: "Valuable" (70% agreement)
↓
MERIDIAN Score calculated: 7.4/10

STEP 4: REWARDS DISTRIBUTED (Day 31)
↓
Curators who predicted "Valuable":
  - Earn 60 MRD (return stake + 10 MRD profit = 20% gain)
  - Authority Score +10 points
↓
Curators who predicted early (first 25%):
  - Earn 2x bonus = 70 MRD total
  - Authority Score +20 points
↓
Curators who predicted wrong:
  - Lose 10 MRD (returned 40 MRD of 50 staked)
  - Authority Score -5 points

STEP 5: LONG-TERM VALIDATION (6-24 months)
↓
Researchers rate paper usefulness (1-5 stars)
↓
Citations accumulate over time
↓
Papers build on this work (or don't)
↓
Validate curator predictions retrospectively
↓
Authority Scores adjusted:
  - Curators who correctly identified breakthrough early: +50 bonus
  - Curators who overrated incremental work: -20 penalty
↓
System learns curator accuracy patterns over time

STEP 6: SIGNALS PROPAGATE
↓
Research Hub displays: "MERIDIAN Score: 7.4/10 (10 curators)"
↓
Researchers use scores to prioritize reading
↓
ASIP Grant Board sees: "Applicant has 3 papers rated 8+, Authority Score 1,847"
↓
Grant Committee recruitment: "12 curators with Authority >2500 available"

```

----------

### The Convergence Mechanism

**Why "MERIDIAN"?**

Like geographic meridian lines that independently span the globe but converge at the poles, MERIDIAN curators work independently but their expert judgments converge toward truth.

**Mathematical Convergence**:

```
Multiple independent experts → Aggregate predictions → Truth emerges

n curators evaluate paper P
Each curator i predicts quality score Q_i (0-10)
Weight by Authority Score: W_i

Convergence Score = Σ(Q_i × W_i) / ΣW_i
Confidence = 1 - (Standard Deviation / Mean)

High confidence (low deviation) = strong consensus
Low confidence (high deviation) = controversial/unclear

```

**Economic Convergence**:

-   Curators who converge toward consensus earn money
-   Curators who diverge lose money
-   Over time, only accurate evaluators remain profitable
-   Market mechanism discovers truth through economic selection

----------


## Token Economics (MRD)

### Token Specifications

| Parameter | Value |
|-----------|-------|
| **Name** | MERIDIAN Token |
| **Ticker** | MRD |
| **Standard** | ERC-20 |
| **Chain** | Base (Ethereum L2) |
| **Total Supply** | 50,000,000 MRD (fixed, no inflation post-emission) |
| **Decimals** | 18 |
| **Initial Price** | $0.10 per MRD |
| **Fully Diluted Valuation** | $5,000,000 |

---

### Supply Allocation

| Allocation | % | Amount (MRD) | Vesting Schedule | Purpose |
|------------|---|--------------|------------------|---------|
| **Curator Rewards Pool** | 50% | 25,000,000 | 5-year emission (see schedule below) | Reward accurate curators |
| **Founding Curators** | 15% | 7,500,000 | 50% at TGE, 50% linear over 12 months | Bootstrap initial curator pool (150 × 50K each) |
| **ASI Institute** | 20% | 10,000,000 | 6-month cliff, 24-month linear vest | Protocol development, operations, team |
| **Institutional Partners** | 10% | 5,000,000 | No lockup | Seed partnerships (In alignment with ASIP GTM) |
| **Liquidity & Treasury** | 5% | 2,500,000 | Immediate | DEX liquidity pools, emergency reserves |

**Total at TGE (Launch)**: ~8.75M MRD circulating (17.5%)
- Founding Curators: 3.75M (50% of 7.5M)
- Institutional Partners: 5M (100%)

---

### Emission Schedule (Curator Rewards Pool)

| Year | MRD Emitted | Monthly Emission | Papers Supported* | Curator Reviews Supported** |
|------|-------------|------------------|-------------------|----------------------------|
| **Year 1** | 8,000,000 | ~667,000 | ~1,100/month | ~13,300/month |
| **Year 2** | 6,000,000 | ~500,000 | ~830/month | ~10,000/month |
| **Year 3** | 5,000,000 | ~417,000 | ~695/month | ~8,300/month |
| **Year 4** | 4,000,000 | ~333,000 | ~555/month | ~6,700/month |
| **Year 5** | 2,000,000 | ~167,000 | ~280/month | ~3,300/month |
| **Total** | 25,000,000 | - | - | - |

*Assumes 10 curators per paper × 60 MRD rewards per paper = 600 MRD/paper  
**Assumes 50 MRD stake per review

**Post-Year 5**: No new emissions
- System becomes deflationary through:
  - Wrong predictions burned (10 MRD per wrong call)
  - Transaction fees (0.5% of stakes)
  - Inactive curator decay (5% monthly on dormant accounts)

---

### Token Utility

**1. Curation Staking (Primary)**
- Stake 50 MRD to evaluate a paper
- Required to participate in curation
- Locks tokens during evaluation period (30 days)
- Returned with profit/penalty based on accuracy

**2. Authority Score Accumulation**
- Each curation action affects Authority Score
- Higher Authority = weighted influence in consensus
- Career credential (on-chain reputation)

**3. Governance (Protocol Parameters)**
- Vote on protocol changes:
  - Stake amounts (currently 50 MRD)
  - Reward percentages (currently 20% profit)
  - Penalty rates (currently 20% loss)
  - Emission schedule adjustments
- Voting weight = MRD staked × time locked

**4. Grant Committee Eligibility**
- High Authority Score (>2500) unlocks eligibility
- ASIP Grant Board can appoint from this pool
- Proven evaluation expertise verified on-chain

**5. Future Utility (Roadmap)**
- Curator delegation (stake MRD to delegate your voting to expert)
- Domain specialization badges (stake MRD to signal expertise)
- Premium features (early access to papers, advanced analytics)

---

### Pricing Strategy & Value Accrual

**Launch Price**: $0.10 per MRD

**Price Drivers**:

1. **Curator Demand** (Buy Pressure)
   - Need MRD to curate papers (50 MRD minimum)
   - Active curators hold 500-2000 MRD ($50-200 at $0.10)
   - 250 active curators × 1000 MRD avg = 250K MRD demand

2. **Deflationary Mechanics** (Supply Reduction)
   - Wrong predictions: 10 MRD burned per mistake
   - If 30% of predictions wrong: ~4K MRD burned/month
   - 48K MRD/year burned = 0.1% annual deflation (grows over time)

3. **Authority Score Value** (Hold Incentive)
   - Higher Authority requires sustained curation
   - Selling MRD = losing ability to curate = losing Authority
   - Top curators hold tokens for career reasons, not speculation

4. **Network Effects** (Adoption)
   - More papers curated → more MERIDIAN scores
   - More researchers trust scores → more grant boards use signals
   - More valuable to be curator → higher MRD demand

**Conservative Price Projections**:
- **Year 1**: $0.10 - $0.30 (3x from launch)
- **Year 2**: $0.30 - $0.80 (2.7x from Year 1)
- **Year 3**: $0.80 - $2.00 (2.5x from Year 2)

**Utility Token - nonspeculative**
----------

## Curation Mechanism

### Paper Evaluation Process

#### Phase 1: Paper Indexing (Automated)

**Sources**:

-   arXiv (AI alignment tags: cs.AI, cs.LG, cs.CY with "alignment", "safety", "interpretability")
-   Alignment Forum (API integration, auto-import posts tagged "research")
-   Conference proceedings (NeurIPS, ICML, ICLR safety tracks)
-   Direct submissions (researchers can submit, costs 100 MRD to filter spam)

**Indexing Pipeline**:

```
New paper published → Detected within 24h → 
Metadata extracted (title, authors, abstract, domain) →
Added to Research Hub → Appears in curator feeds →
Curation window opens (30 days from publication)

```

----------

#### Phase 2: Curator Evaluation (Independent)

**Curator Workflow**:

1.  **Domain Feed**
    
    -   Curator logs into Research Hub
    -   Sees papers in their specialized domains (e.g., "Mechanistic Interpretability")
    -   Filters: New papers (0-2 curations), Under-curated (3-5 curations), Popular (5+ curations)
2.  **Paper Review**
    
    -   Curator reads paper (or at minimum: abstract, intro, conclusion)
    -   AI-generated summary available (optional, to speed triage)
    -   Related papers shown (helps contextualize contribution)
3.  **Prediction Submission**
    
    -   Select quality tier:
        -   **Breakthrough** (9-10/10): Novel contribution, opens new research direction
        -   **Valuable** (7-8/10): Solid work, advances field incrementally
        -   **Incremental** (4-6/10): Minor contribution, limited novelty
        -   **Noise** (1-3/10): Flawed, misleading, or insignificant
    -   Write justification (100-300 words):
        -   What is the main contribution?
        -   Why is this important (or not)?
        -   How does it compare to related work?
        -   What are strengths/weaknesses?
    -   Stake 50 MRD (locked for 30 days)
    -   Submit on-chain (irreversible)
4.  **Prediction Privacy**
    
    -   Curator CANNOT see others' predictions until they submit
    -   Prevents bandwagon voting
    -   Ensures independent judgment

----------

#### Phase 3: Convergence Calculation (Algorithmic)

**After 30 days** (or once 10+ curators evaluate):

**Step 1: Aggregate Predictions**

```
Paper X evaluated by 12 curators:
- 8 predicted "Valuable" (7-8/10)
- 3 predicted "Breakthrough" (9-10/10)
- 1 predicted "Incremental" (4-6/10)

Weighted average (by Authority Score):
Curator A: Valuable (7.5), Authority 2000 → 7.5 × 2000 = 15,000
Curator B: Valuable (8.0), Authority 1500 → 8.0 × 1500 = 12,000
Curator C: Breakthrough (9.0), Authority 3000 → 9.0 × 3000 = 27,000
... (repeat for all 12)

Total weighted sum = 92,000
Total Authority = 11,500
Convergence Score = 92,000 / 11,500 = 8.0/10

```

**Step 2: Determine Consensus Category**

-   8.0/10 → "Valuable" tier
-   Consensus strength: 8/12 = 67% agreement (moderate consensus)

**Step 3: Identify Winners/Losers**

-   **Winners** (predicted "Valuable"): 8 curators
    
    -   Earn: 60 MRD (return 50 + earn 10)
    -   Early birds (first 3 to submit): 70 MRD (2x bonus)
-   **Partial Credit** (predicted "Breakthrough"): 3 curators
    
    -   One tier away from consensus = partial credit
    -   Earn: 55 MRD (return 50 + earn 5)
-   **Losers** (predicted "Incremental"): 1 curator
    
    -   Two tiers away from consensus = penalty
    -   Lose: Return only 40 MRD (lost 10 MRD)

**Step 4: Publish Results**

-   MERIDIAN Score: 8.0/10 displayed on Research Hub
-   Curator predictions made public (with justifications)
-   Consensus category: "Valuable"
-   Confidence level: 67% (moderate)

----------

#### Phase 4: Long-Term Validation (6-24 months)

**Researcher Feedback**:

-   Researchers who read paper can rate usefulness (1-5 stars)
-   Only verified researchers (linked ORCiD or institutional email)
-   Ratings aggregated: "Avg Researcher Rating: 4.2/5"

**Citation Tracking**:

-   Papers that cite this work tracked automatically
-   Build-upon count: "12 papers built on this work"
-   Citation context analyzed (positive vs negative citations)

**Retrospective Validation**:

```
After 12 months:
- Paper has 47 citations (high)
- Avg researcher rating: 4.5/5 (very useful)
- 8 papers explicitly built on methods (strong impact)

Validation: Curators who predicted "Breakthrough" were closer to truth
→ Authority Score adjustments:
  - 8 curators who said "Valuable": +10 bonus (good call)
  - 3 curators who said "Breakthrough": +50 bonus (excellent foresight)
  - 1 curator who said "Incremental": -20 penalty (missed the impact)

```

**This feedback loop improves curator calibration over time.**

----------

### Curation Economics (Curator Perspective)

**Example: Active Curator (20 papers/month)**

**Assumptions**:
- MRD price: $0.50
- Accuracy rate: 70% (good performance)
- Early submission rate: 30% (curator is fast)

**Monthly Activity**:

| Action | Count | MRD Staked | Outcome | MRD Earned | Net MRD |
|--------|-------|------------|---------|------------|---------|
| Correct predictions | 14 | 50 each | Win | 60 each | +140 |
| Correct + Early | 4 | 50 each | Win + Bonus | 70 each | +80 |
| Wrong predictions | 6 | 50 each | Lose | 40 returned | -60 |
| **Total** | **20** | **1000** | - | - | **+160** |

**Monthly Earnings**: 160 MRD × $0.50 = **$80 profit**

**ROI**: 160/1000 = 16% monthly return on staked capital

**Annualized**: ~$960/year for part-time work (5-10 hours/week)

---

**Example: Professional Curator (50 papers/month)**

**Assumptions**:
- MRD price: $1.00 (Year 2 pricing)
- Accuracy rate: 75% (expert performance)
- Early submission rate: 40%

**Monthly Activity**:

| Action | Count | MRD Staked | Outcome | MRD Earned | Net MRD |
|--------|-------|------------|---------|------------|---------|
| Correct predictions | 28 | 50 each | Win | 60 each | +280 |
| Correct + Early | 10 | 50 each | Win + Bonus | 70 each | +200 |
| Wrong predictions | 12 | 50 each | Lose | 40 returned | -120 |
| **Total** | **50** | **2500** | - | - | **+360** |

**Monthly Earnings**: 360 MRD × $1.00 = **$360 profit**

**Annualized**: ~$4,320/year for dedicated part-time work (15-20 hours/week)

**Plus**: Authority Score of ~3,500+ (Diamond tier) = Grant Committee eligible

----------

## Authority Score System

### Purpose

Authority Score is an **on-chain, verifiable, objective measure of research evaluation expertise**. It serves three functions:

1.  **Professional Credential**: "MERIDIAN Authority Score: 2,340 (Top 5%)" on CV
2.  **Weighted Voting**: Higher Authority = more influence in consensus calculations
3.  **Grant Committee Pipeline**: Authority >2500 = eligible for ASIP Grant Committee appointment

----------


### Calculation Algorithm

**Base Formula**:
```
Authority Score = Σ (Accuracy Points × Conviction Multiplier × Recency Factor × Domain Weight)
```

**Component Breakdown**:

#### 1. Accuracy Points (Base)

| Outcome | Points | Rationale |
|---------|--------|-----------|
| **Correct prediction** | +10 | Matched consensus tier |
| **Partial credit** (one tier off) | +5 | Close but not perfect |
| **Wrong prediction** (two+ tiers off) | -5 | Penalize poor judgment |
| **Contrarian correct** (minority at time, majority later) | +30 | Reward foresight |

#### 2. Conviction Multiplier (Timing Bonus)

| Timing | Multiplier | Rationale |
|--------|------------|-----------|
| **Early bird** (first 25% of curators) | 2x | Reward initiative + confidence |
| **Middle** (25-75% of curators) | 1x | Standard |
| **Late** (last 25% of curators) | 0.75x | Slight penalty for bandwagoning |

#### 3. Recency Factor (Decay)
```
Recency Factor = 0.95 ^ (months since prediction)

Example:
- Prediction made 1 month ago: 0.95^1 = 0.95
- Prediction made 6 months ago: 0.95^6 = 0.74
- Prediction made 12 months ago: 0.95^12 = 0.54
```

**Why decay?**
- Keeps curators active (dormant accounts lose Authority)
- Recent accuracy more relevant than old performance
- Prevents resting on laurels

#### 4. Domain Weight (Specialization Bonus)
```
If curator has 70%+ of predictions in one domain:
  Domain Weight = 1.5x

If curator spread across multiple domains:
  Domain Weight = 1.0x
```

**Why specialization bonus?**
- Rewards deep expertise over generalist spam
- Encourages curators to focus where they're strongest
- Creates domain-specific expert pools



----------

### Example Calculation

**Curator Profile: Dr. Sarah Chen**

**Activity over 6 months**:

-   100 correct predictions (matched consensus)
-   20 early correct predictions (first 25%)
-   5 contrarian correct predictions (minority→majority)
-   30 wrong predictions
-   85% of predictions in "Mechanistic Interpretability" domain

**Calculation**:

```
Base Accuracy Points:
  100 correct × 10 = 1,000
  20 early correct × 10 × 2 = 400
  5 contrarian correct × 30 = 150
  30 wrong × -5 = -150
  Total Base = 1,400

Domain Specialization:
  85% in one domain → 1.5x multiplier
  1,400 × 1.5 = 2,100

Recency Decay (avg 3 months old):
  0.95^3 = 0.857
  2,100 × 0.857 = 1,800

Final Authority Score: 1,800 (Gold Tier)

```

----------


### Authority Tiers & Benefits

| Tier | Score Range | % of Curators | Badge | Benefits |
|------|-------------|---------------|-------|----------|
| **Bronze** | 100-500 | 40% | 🥉 | • Basic curator status<br>• Learning phase<br>• Standard rewards |
| **Silver** | 500-1000 | 30% | 🥈 | • Enhanced grant applications<br>• Listed on website<br>• Community recognition |
| **Gold** | 1000-2000 | 20% | 🥇 | • Curator spotlight features<br>• Consulting opportunities<br>• Speaking invitations |
| **Platinum** | 2000-3000 | 8% | 💎 | • Grant Committee eligible<br>• Institutional partnerships<br>• Premium support |
| **Diamond** | 3000+ | 2% | 💠 | • Automatic Grant Committee consideration<br>• Thought leader status<br>• Protocol governance input |

---

### Authority Score Transparency

**All data publicly queryable**:
- Dune Analytics dashboard: "Top 100 Curators by Authority"
- Individual curator pages: "View all predictions, accuracy rate, domain focus"
- Historical charts: "Authority Score over time"
- Comparison tools: "Compare curator A vs B performance"

**No gaming possible**:
- All predictions on-chain (immutable)
- Consensus calculated algorithmically (no human discretion)
- Decay prevents dormant farming
- Domain weight requires sustained focus
----------

## Curator Incentives


### The Multi-Layered Incentive Stack

Since MERIDIAN curators are **not on the Grant Board** and **don't decide funding**, their incentives are entirely:

#### 1. Direct Economic Rewards (Immediate)

**Token Earnings**:
- Stake 50 MRD → Earn up to 70 MRD (40% profit if early + correct)
- Monthly potential: $50-$500 depending on activity and accuracy
- Annual potential: $600-$6,000 for part-time work

**Career-Stage Appeal**:

| Researcher Type | Current Situation | MRD Value |
|-----------------|-------------------|-----------|
| PhD Student | $30-40K stipend | Extra $1,200/year = 3-4% income boost |
| Postdoc | $50-65K salary | Extra $2,400/year = valuable supplement |
| Junior Faculty | $80-120K salary | Extra $1,500/year = consulting-level hourly rate |
| Independent | Variable income | Flexible earning based on time invested |
----------

#### 2. Professional Reputation (Career Capital)

**Authority Score as Credential**:

**On Academic CV**:

```
Research Evaluation & Peer Review
• MERIDIAN Protocol Curator (2025-2027)
  - Authority Score: 2,340 (Top 5% globally)
  - Evaluated 234 AI alignment papers with 73% accuracy
  - Specialized domain: Mechanistic Interpretability
  - Verifiable: meridian-protocol.org/curator/0x...

```

**In Grant Applications**:

```
Team Qualifications (ASIP Grant Application)
PI: Dr. Sarah Chen
• Published 6 papers in mechanistic interpretability
• MERIDIAN Authority Score: 2,340 (Platinum Tier)
  - 234 papers curated, 73% convergence rate
  - Early predictor of 3 breakthrough papers
  - Active field contributor (verifiable on-chain)

```

**In Job Applications**:

-   "Demonstrated research judgment through MERIDIAN curation"
-   "Top 5% curator globally in AI alignment research evaluation"
-   Interviewers can verify claims on-chain (unlike traditional "I'm good at peer review" claims)

----------

#### 3. Grant Application Advantage (ASIP-Specific)

**How MERIDIAN Enhances Grant Applications**:

**Without MERIDIAN**:

-   Grant Board sees: Publications, citations, letters of rec
-   Hard to distinguish: Many applicants have similar credentials
-   Evaluation: Subjective, based on reputation and networks

**With MERIDIAN Profile**:

-   Grant Board sees: All of above + Authority Score 1,847 + track record
-   Can verify: 156 papers curated, 71% accuracy, 3 early "breakthrough" calls
-   Evaluation: Objective data point supplements subjective review

**Not automatic approval**, but signals:

-    Active in field (not just publishing, also engaging with literature)
-    Good research judgment (71% accuracy)
-    Contributing to public good (curating openly)
-    Alignment with mission (improving field coordination)

----------

#### 4. Grant Committee Pathway (Future Opportunity)

**From Governance Doc** (Section 3.2):

> "Grant Committee Members: Proven track record in research evaluation"

**Traditional Path** (Opaque):

-   Board member knows someone
-   Reputation-based selection
-   Hard to verify "evaluation expertise"
-   Small pool of candidates

**MERIDIAN Path** (Transparent):

-   Board queries: "Show curators with Authority >2500 in agent foundations"
-   Results: 8 candidates with on-chain track records
-   Board reviews: Years active, accuracy rates, domain focus
-   Shortlist 3-5, interview, appoint

**Curator Perspective**:

-   "If I build Authority to 2500+, I become eligible"
-   "Platinum tier = Grant Committee consideration"
-   "Diamond tier = automatic consideration"
-   Clear path from curator → Grant Committee

**Current Status**: Curators not on Grant Board (avoiding conflict of interest)

**Future**: Top curators may be appointed to Grant Committee (not Board)

----------

#### 5. Information Advantage (Intellectual Capital)

**See the Field Before It's Public**:

**Early Access**:

-   All papers aggregated in one feed (save 5-10 hours/week scouting)
-   See emerging trends before they're mainstream
-   AI-generated summaries for quick triage
-   Related papers automatically linked

**Competitive Intelligence**:

-   "8 curators rated 'multi-agent alignment' breakthrough in past month"
-   "Only 2 papers in this area, but high-quality signal"
-   **Insight**: Emerging hot area, low competition → good dissertation topic

**Network Intelligence**:

-   See what other top curators are rating highly
-   Understand field consensus before it's formalized
-   Identify gaps (neglected areas) and opportunities

**Value for Career**:

-   PhD students: Better dissertation topics
-   Postdocs: Smart lab/position choices
-   Faculty: Better grant proposals
-   All: 6-month information lead = career advantage

----------

#### 6. Network Effects & Community (Social Capital)

**Join Elite Curator Community**:

**Private Discord/Forum**:

-   Access to other expert curators
-   Domain-specific channels
-   Weekly "What are you reading?" threads
-   Quarterly virtual meetups

**Collaboration Opportunities**:

-   "I saw your excellent curation of my paper—want to collaborate?"
-   Co-author relationships emerge
-   Research partnerships
-   Cross-institutional connections

**Institutional Recognition**:

-   Listed publicly on MERIDIAN website as curator
-   "Featured Curator" spotlight (Platinum+ tier)
-   Speaking opportunities at MERIDIAN events
-   Association with ASI Institute brand

**Professional Community**:

-   Not alone in reading papers—part of global network
-   Peer recognition from other experts
-   Mentorship (senior curators help junior)
-   Belongs to something larger

----------

#### 7. Mission Alignment & Impact (Intrinsic Motivation)

**For Researchers Who Care About AI Alignment**:

**Direct Field Impact**:

-   Help quality research get recognized
-   Prevent bad research from misleading field
-   Surface neglected but important work
-   Shape what community focuses on

**The Pitch**:

> "You already read AI alignment papers. You already form opinions on quality. Right now, those opinions stay in your head or private Slack channels.
> 
> MERIDIAN lets you contribute that expertise to improve field coordination—and you get paid for it.
> 
> Your curation helps:
> 
> -   Researchers find quality work faster
> -   Grant committees allocate funds better
> -   The field converge on truth
> 
> Plus you build verifiable reputation and earn money. It's work you're already doing, just formalized and rewarded."

**Natural Alignment with Current Proceedings**:

-   Many AI alignment researchers are altruistic
-   Already contributing to field (LessWrong posts, peer review)
-   MERIDIAN formalizes + compensates that contribution
-   Adding economic incentive makes it easier to justify time

----------


### Incentive Stack Summary

**Curators participate for a combination of**:

| Incentive Category | Time Horizon | Value Type | Appeal |
|-------------------|--------------|------------|--------|
| **Economic** | Immediate | Money | $50-500/month |
| **Reputation** | Medium-term | Career | CV credential |
| **Grant Advantage** | Medium-term | Opportunity | Better ASIP applications |
| **Committee Path** | Long-term | Governance | Eligibility for Grant Committee |
| **Information** | Immediate | Intelligence | Field insights |
| **Community** | Medium-term | Network | Collaborations |
| **Mission** | Intrinsic | Impact | Field contribution |

**Most curators motivated by 3-4 of these simultaneously**

**Key Insight**: Incentives work WITHOUT being on Grant Board
- Economic + Reputation + Information = enough for most
- Grant Committee pathway = aspirational goal
- No conflict of interest (curators evaluate research, don't allocate grants)

----------


## Integration with ASIP

### The Separation of Concerns

**MERIDIAN ≠ ASIP**

| Aspect | MERIDIAN | ASIP |
|--------|----------|------|
| **What it does** | Research curation | Grant funding |
| **Who uses it** | Researchers (curators) | Institutions (funders) |
| **Token** | MRD (utility) | SAIT (governance) |
| **Governance** | Protocol rules | Treasury + grants |
| **Output** | Quality signals | Funded projects |
| **Scale** | Thousands of curators | Hundreds of institutions |

**But**: MERIDIAN **informs** ASIP through three integration points

----------

### Integration Point 1: Enhanced Grant Applications

**Traditional ASIP Grant Application** (Section 4.2 of Governance Doc):

Required Sections:

1.  Abstract
2.  Research Plan
3.  **Team & Qualifications** ← MERIDIAN enhances this
4.  Budget Justification
5.  Impact & Dissemination
6.  Ethics & Safety

**MERIDIAN Enhancement**:

```
Section 3: Team & Qualifications

PI: Dr. Sarah Chen, Assistant Professor, Stanford University

Traditional Info:
• PhD in Computer Science, UC Berkeley (2020)
• 6 publications in mechanistic interpretability
• 347 citations (Google Scholar)
• Prior grant: NSF CAREER Award ($500K)

MERIDIAN Profile (Optional):
• Authority Score: 1,847 (Gold Tier, Top 12% globally)
• Papers Curated: 156 (2025-2026)
• Accuracy Rate: 71% convergence with consensus
• Domain: Mechanistic Interpretability (89% focus)
• Notable: Early predictor of 3 breakthrough papers
• Track Record:
  - Correctly identified interpretability breakthrough 8 months before field consensus
  - Curated 12 papers that became highly cited (>100 citations)
  - Active contributor to field knowledge coordination
• Verifiable: https://meridian-protocol.org/curator/0xA1B2C3...

```

**Grant Board Perspective**:

-    Verifiable (can click link, see on-chain data)
-    Objective (not self-reported, algorithmically calculated)
-    Relevant (shows research judgment quality)
-    Differentiating (most applicants won't have this)

**Impact**:

-   Not automatic approval
-   But strong supplementary signal
-   "This researcher is actively engaged + has good taste"

----------

### Integration Point 2: Grant Committee Recruitment

**From Governance Doc** (Section 3.3):

> **Grant Committee Composition**:
> 
> -   Up to 9 voting members
> -   Expertise Requirements: Technical expertise, evaluation experience, objectivity
> -   Appointment Authority: Board appoints (majority vote)
> -   Selection Criteria: Proven track record in grant evaluation

**The Problem** (Traditional Approach):

-   "Proven track record" hard to verify
-   Limited pool (personal networks)
-   Political/reputation-based
-   Time-consuming search

**MERIDIAN Solution**:

**Step 1: Board Defines Requirements**

```
We need Grant Committee member for:
- Domain: Agent Foundations
- Expertise Level: PhD or equivalent
- Evaluation Experience: Must have track record

```

**Step 2: Query MERIDIAN**

```
SELECT curators WHERE:
  - Authority Score > 2000 (Platinum tier)
  - Domain = "Agent Foundations" (>70% focus)
  - Years Active >= 2
  - Accuracy >= 70%

Results: 8 candidates

```

**Step 3: Board Reviews Candidates**

**Example: Candidate Profile**

```
Dr. James Liu
Authority Score: 2,456 (Platinum, Top 7%)

Track Record:
• 312 papers curated (2024-2026)
• 74% convergence accuracy
• Domain: Agent Foundations (81% focus)
• Notable predictions:
  - Early correct on "Constitutional AI for Agent Alignment" (10 months ahead)
  - Identified flaw in popular paper that was later retracted
  - Consistently accurate on technical papers (82% in sub-domain)

Activity:
• Active: 24 months
• Avg: 13 papers/month
• Consistency: No gaps >3 months

Verifiable: https://meridian-protocol.org/curator/0xD4E5F6...

```

**Step 4: Board Interviews Top 3-5**

-   Already vetted by on-chain performance
-   Focus interview on fit, availability, conflicts
-   Much faster than traditional search

**Step 5: Board Appoints**

-   Per governance doc (majority vote)
-   MERIDIAN provided objective candidates
-   Board makes final decision

**Result**: Grant Committee composition over time becomes 50-75% MERIDIAN curators

----------

### Integration Point 3: Strategic Research Priorities

**From Governance Doc** (Section 9.1):

> **KPI Development**: Board conducts annual strategic planning, identifies priorities, proposes KPIs

**The Challenge**:

-   What research areas should ASIP prioritize for grants?
-   Which domains are neglected vs crowded?
-   What does the field actually value?

**MERIDIAN Data Informs Strategy**:

**Example: Q2 2026 ASIP Strategic Planning**

**Question**: "Where should we focus $10M in grants this quarter?"

**MERIDIAN Analysis**:

```sql
-- Query Research Hub data (past 6 months)
SELECT 
  domain,
  COUNT(*) as papers_published,
  AVG(meridian_score) as avg_quality,
  COUNT(DISTINCT curators) as curator_interest
FROM papers
WHERE published_date > '2025-10-01'
GROUP BY domain
ORDER BY curator_interest DESC

```
**Results**:

| Domain | Papers | Avg Quality | Curator Interest | Insight |
|--------|--------|-------------|------------------|---------|
| Mechanistic Interpretability | 180 | 6.8 | 145 | Crowded, declining quality |
| Agent Foundations | 12 | 7.9 | 89 | **Neglected, high quality** |
| Governance & Policy | 45 | 5.2 | 34 | Low quality, moderate interest |
| Scalable Oversight | 67 | 7.1 | 112 | Healthy, growing |

**Board Insight**:
- Agent Foundations: Only 12 papers but 7.9 avg quality + high curator interest
- **This signals**: Important area, not enough research happening
- **Decision**: Allocate 30% of grants to agent foundations (vs 10% previous quarter)

**MERIDIAN Provides**:
- Objective field-level data
- Quality signals (not just volume)
- Interest signals (curator engagement)
- Trend analysis (growing vs declining)

**Board still decides**, but informed by ecosystem data

----------

### Integration Summary

```
MERIDIAN → ASIP Flow:

1. Curator builds Authority Score through accurate curation
   ↓
2. Researcher applies for ASIP grant, includes MERIDIAN profile
   ↓
3. Grant Board sees verifiable track record, prioritizes application
   ↓
4. Board needs Grant Committee member, queries MERIDIAN for candidates
   ↓
5. Top curator appointed to Grant Committee
   ↓
6. Grant Committee uses MERIDIAN scores to evaluate proposals
   ↓
7. Board sets strategic priorities using MERIDIAN field data
   ↓
8. Cycle repeats: Better grants → Better research → Better curation

```

**The Flywheel**:

-   Quality curation → Quality signals
-   Quality signals → Better grant decisions
-   Better grants → Better research
-   Better research → More to curate
-   **System improves over time**

----------

## Technical Architecture

### Smart Contract Stack

**Blockchain**: Base (Ethereum L2)

-   Low gas fees (~$0.01 per transaction)
-   Fast finality (~2 seconds)
-   Growing DeFi ecosystem
-   Coinbase-backed (credibility)

**Contracts Required**:

```
1. MRDToken.sol (ERC-20)
   └─ Standard token with transfer, approve, etc.

2. CurationStaking.sol
   ├─ Stake MRD to curate paper
   ├─ Lock tokens for 30 days
   ├─ Store prediction + justification
   └─ Handle rewards/penalties

3. ConvergenceEngine.sol
   ├─ Aggregate curator predictions
   ├─ Calculate weighted consensus
   ├─ Determine winners/losers
   └─ Distribute MRD rewards

4. AuthorityScore.sol
   ├─ Track all curator actions
   ├─ Calculate Authority Score
   ├─ Handle decay mechanism
   └─ Query functions (top curators, etc.)

5. Governance.sol
   ├─ MRD holder voting on protocol changes
   ├─ Time-locked proposals
   └─ Parameter updates (stake amounts, etc.)

6. Treasury.sol
   ├─ Hold curator rewards pool
   ├─ Emit according to schedule
   └─ Handle emergency reserves

```

----------

### Data Architecture

**On-Chain** (Immutable, Verifiable):

-   Curator predictions (paper ID, quality tier, stake amount)
-   Consensus results (MERIDIAN score, winning tier)
-   Rewards distributed (who earned what)
-   Authority Scores (current scores, historical changes)
-   Governance votes

**Off-Chain** (Scalable, Flexible):

-   Paper metadata (title, authors, abstract, PDF link)
-   Curator justifications (text, too expensive on-chain)
-   Researcher ratings (usefulness scores)
-   Citation tracking (external APIs)
-   AI-generated summaries

**Hybrid** (On-Chain References, Off-Chain Content):

-   Paper indexed on-chain with IPFS hash
-   Justifications stored on IPFS, hash on-chain
-   Verifiable but scalable

----------

### Research Hub Integration

**Frontend Stack**:

```
Research Hub (Web App)
├─ Next.js / React (UI framework)
├─ Wagmi / Viem (Wallet connection)
├─ TanStack Query (Data fetching)
├─ Tailwind CSS (Styling)
└─ Dune Analytics API (On-chain data)

```

**Key Pages**:

1.  **Browse Papers**
    
    -   Filter by domain, date, MERIDIAN score
    -   Sort by highest-rated, most-curated, newest
    -   Display: Title, authors, score, curator count
2.  **Paper Detail**
    
    -   Full metadata, abstract, PDF link
    -   MERIDIAN Score (large, prominent)
    -   Curator predictions (list of who said what)
    -   Justifications (readable text)
    -   Researcher ratings (aggregate stars)
3.  **Curator Dashboard**
    
    -   Your Authority Score + tier
    -   Papers to curate (domain feed)
    -   Your predictions (pending, completed)
    -   Earnings this month
    -   Leaderboards (top curators)
4.  **Leaderboards**
    
    -   Top 100 curators by Authority
    -   Top papers by MERIDIAN score
    -   Most active domains
    -   Recent breakthroughs
5.  **Analytics**
    
    -   Dune dashboards embedded
    -   Curator stats, domain trends
    -   Network health metrics

----------

### APIs & Integrations

**External Data Sources**:

-   **arXiv API**: Auto-import new papers
-   **Alignment Forum API**: Sync research posts
-   **Google Scholar**: Citation tracking
-   **ORCiD**: Researcher verification
-   **IPFS**: Decentralized storage

**Internal APIs**:

-   **MERIDIAN GraphQL**: Query papers, curators, scores
-   **Webhook Events**: Notify on new papers, consensus, rewards
-   **REST Endpoints**: Grant Board integration (query curators, scores)

----------

### Security Considerations

**Smart Contract Risks**:

-   **Reentrancy**: Use OpenZeppelin ReentrancyGuard
-   **Oracle Manipulation**: Consensus is internal (no external oracle)
-   **Front-running**: Predictions encrypted until submission window closes
-   **Admin Keys**: Multi-sig (3-of-5) for protocol upgrades

**Audits Required**:

-   Pre-launch: Tier 1 audit (Trail of Bits, OpenZeppelin, Consensys Diligence)
-   Cost: $50-100K
-   Timeline: 4-6 weeks

**Bug Bounty**:

-   Immunefi program
-   Critical: $100K
-   High: $25K
-   Medium: $5K

----------

## Go-to-Market Strategy

### Target Audience (Same as ASIP)

**Primary**: Academic researchers in AI alignment

**Geographic Focus**:

-   United States (universities, labs)
-   Switzerland (ETH Zurich, EPFL)
-   United Kingdom (Oxford, Cambridge, DeepMind)
-   Singapore (NUS, NTU)
-   Norway (University of Oslo, NTNU)

**Institutional Focus**:

-   Universities with AI safety programs (see ASIP GTM appendix)
-   Research labs (DeepMind, Anthropic, OpenAI)
-   Independent researchers (active on Alignment Forum, LessWrong)

----------

### Value Propositions by Persona

**PhD Students**:

-   "Earn $50-100/month for reading papers you already read"
-   "Build verifiable expertise credential for job market"
-   "Get 6-month information lead on emerging research areas"

**Postdocs**:

-   "Authority Score helps faculty applications"
-   "Network with other top researchers globally"
-   "Enhanced ASIP grant applications"

**Junior Faculty**:

-   "Grant Committee pathway (Platinum tier)"
-   "Shape field priorities through curation"
-   "Consulting opportunities from high Authority Score"

**Independent Researchers**:

-   "Flexible income from expertise"
-   "Connect to academic community without institution"
-   "Reputation credential despite no affiliation"

----------

### Distribution Channels

#### 1. Direct Outreach (Primary)

**University Partnerships**:

-   Approach AI safety labs at Stanford, Berkeley, MIT, Oxford, etc.
-   Pitch: "Your PhD students can earn money + build reputation"
-   Ask: Faculty endorses MERIDIAN to their lab (10-20 students)
-   Offer: Lab gets institutional curator status (branded, enhanced features)

**Success Metric**: 10 university labs × 15 students = 150 founding curators

----------

#### 2. Institutional Partnerships

**AI Labs** (DeepMind, Anthropic, OpenAI):

-   Pitch: "Your researchers can shape field priorities + build external reputation"
-   Offer: Institutional curator allocation (10K MRD pool), branded presence
-   Ask: 5-10 researchers commit 2 hours/week to curation

**Success Metric**: 3 labs × 7 researchers = 21 high-Authority founding curators

----------

#### 3. Community (Alignment Forum, LessWrong)

**Content Strategy**:

-   Post: "Introducing MERIDIAN: Get Paid for Curating AI Alignment Research"
-   AMA: Weekly "Ask Me Anything" with founding curators
-   Case Studies: "How I Earned $150/month Curating Papers I Already Read"

**Engagement**:

-   Discord server for curators
-   Weekly digest: "Top MERIDIAN Papers This Week"
-   Highlight top curators

**Success Metric**: 500+ Discord members, 50-100 active curators from community

----------

#### 4. Conferences

**Target Events**:

-   NeurIPS (December 2025): Pre-launch buzz
-   ICLR (May 2026): Post-launch showcase
-   AI Alignment conferences (various)

**Activities**:

-   Booth: Demo Research Hub + MERIDIAN curation
-   Talks: "MERIDIAN: Distributed Curation for AI Alignment"
-   Workshops: "How to Build Authority Score"

**Success Metric**: 100+ curator signups per conference

----------

#### 5. Influencers / Thought Leaders

**Target**:

-   Eliezer Yudkowsky, Stuart Russell (AI safety leaders)
-   Top Alignment Forum contributors
-   AI safety Twitter accounts (10K+ followers)

**Ask**:

-   Try MERIDIAN, provide feedback
-   Tweet about experience
-   Optional: "Featured Curator" spotlight

**Success Metric**: 3-5 thought leaders using + endorsing MERIDIAN

----------

### Messaging Framework

**Problem**: "You're already reading AI alignment papers. You're already forming opinions on quality. But that expertise dies in private channels."

**Solution**: "MERIDIAN lets you contribute that expertise publicly—and get paid for it."

**Benefit**: "Earn money, build verifiable reputation, help the field converge on quality."

**Call to Action**: "Join 150+ founding curators. Start earning today."

----------

### Launch Sequence

**Phase 0: Pre-Launch (Dec 2025 - Jan 2026)**

-   Recruit 20-30 founding curators (personal outreach)
-   Deploy contracts to testnet
-   Build Research Hub integration
-   Seed 500 papers for initial curation

**Phase 1: Closed Beta (Feb 2026)**

-   20-30 founding curators only
-   Curate 100 papers
-   Test convergence algorithm
-   Refine UX based on feedback

**Phase 2: Institutional Launch (Mar 2026)**

-   Onboard 3-5 institutional partners (DeepMind, universities)
-   Scale to 50-75 curators
-   Curate 500 papers
-   Launch Dune dashboards

**Phase 3: Public Launch (Apr 2026)**

-   Open applications to public
-   Announce on Alignment Forum, LessWrong, Twitter
-   Target: 150-200 curators by end of month
-   First ASIP grant cycle uses MERIDIAN signals

**Phase 4: Growth (May-Dec 2026)**

-   Scale to 250+ curators
-   Curate 2000+ papers
-   First Grant Committee appointments from MERIDIAN
-   Establish as field standard

----------

## Launch Roadmap

### Q4 2025 (Pre-Launch Development)

**December 2025**:

**Week 1-2** (Dec 1-14):

-   [ ] Finalize MERIDIAN v1.0 specification (this document)
-   [ ] Technical architecture review with dev team
-   [ ] Smart contract development begins
-   [ ] Research Hub UI/UX design

**Week 3-4** (Dec 15-31):

-   [ ] Smart contracts 50% complete
-   [ ] Recruit 10 founding curators (personal outreach)
-   [ ] Seed Research Hub with 500 papers
-   [ ] Begin front-end development (Research Hub integration)

----------

### Q1 2026 (Development & Closed Beta)

**January 2026**:

**Week 1-2** (Jan 1-14):

-   [ ] Smart contracts complete (v1)
-   [ ] Deploy to Base testnet
-   [ ] Internal testing (ASI team)
-   [ ] Recruit 10 more founding curators (20 total)

**Week 3-4** (Jan 15-31):

-   [ ] Audit kickoff (Trail of Bits or OpenZeppelin)
-   [ ] Front-end alpha complete
-   [ ] Founding curator onboarding materials
-   [ ] MRD allocation finalized (7.5M to founding curators)

**February 2026**:

**Week 1-2** (Feb 1-14):

-   [ ] Audit in progress (findings remediation)
-   [ ] Testnet stress testing
-   [ ] Closed beta begins (20 founding curators)
-   [ ] First 50 papers curated (test convergence)

**Week 3-4** (Feb 15-28):

-   [ ] Audit complete + remediation
-   [ ] Deploy to Base mainnet
-   [ ] MRD distribution to founding curators
-   [ ] Closed beta continues (target: 100 papers curated)

**March 2026**:

**Week 1-2** (Mar 1-14):

-   [ ] Institutional outreach (DeepMind, Anthropic, universities)
-   [ ] Sign 3 institutional partners
-   [ ] Onboard institutional curators (30 more curators)
-   [ ] Total curators: 50

**Week 3-4** (Mar 15-31):

-   [ ] Refine convergence algorithm based on data
-   [ ] Dune Analytics dashboards go live
-   [ ] 500 papers curated (beta complete)
-   [ ] Prepare public launch materials

----------

## Appendices

### Appendix A: Glossary

**Authority Score**: On-chain reputation metric calculated from curator accuracy, weighted by conviction, recency, and domain specialization.

**Convergence**: The process by which independent curator predictions aggregate into consensus quality signals.

**Curation**: The act of evaluating a research paper by staking MRD tokens and predicting its quality tier.

**Curator**: A researcher who evaluates papers on MERIDIAN Protocol, earning rewards for accurate predictions.

**Domain**: A specialized area of AI alignment research (e.g., Mechanistic Interpretability, Agent Foundations).

**Grant Committee**: Body that evaluates ASIP grant applications; top MERIDIAN curators become eligible for appointment.

**MERIDIAN Score**: Aggregated quality rating for a paper (0-10 scale) based on weighted curator consensus.

**MRD**: MERIDIAN utility token used for curation staking and governance.

**Research Hub**: Open-source platform aggregating all AI alignment research, powered by MERIDIAN curation.

**Validation**: Long-term process (6-24 months) where curator predictions are verified against actual research impact.

----------

### Appendix C: FAQ

**Q: How is MERIDIAN different from peer review?** A: Peer review is formal, slow, and gatekeeping (accept/reject). MERIDIAN is open, fast, and signaling (quality scores). Everyone can curate, results are public, and it complements (not replaces) peer review.

**Q: Can curators game the system?** A: Hard to game because: (1) Predictions are independent/encrypted until submission, (2) Long-term validation adjusts Authority, (3) Domain specialization prevents spam, (4) Losing money on wrong predictions is costly.

**Q: What if curators collude?** A: Economic incentives discourage collusion—if you predict wrong to help a friend, you lose money. Also, validation phase catches systematic bias over time.

**Q: Why do I need MRD tokens? Why not just vote?** A: Staking MRD creates skin-in-the-game. Wrong predictions cost you money, so you're incentivized to be accurate. Free voting = no accountability.

**Q: How do you prevent Sybil attacks (one person, many accounts)?** A: Authority Score requires sustained accurate curation over time. New accounts start at zero Authority, so one person creating 100 accounts doesn't help—they'd need to accurately curate for months on each account.

**Q: What if the ASIP Grant Board doesn't use MERIDIAN signals?** A: MERIDIAN still provides value to curators (money, reputation, information). But integration with ASIP is designed from the start to maximize Board usage.

**Q: Can I sell my Authority Score?** A: No. Authority Score is non-transferable and tied to your wallet address. You can't sell your reputation (it's earned, not bought).

**Q: What happens if a paper is later retracted?** A: Validation phase catches this. Curators who rated it highly lose Authority points retrospectively. System learns from mistakes.

----------

### Appendix D: Research Citations

**Relevant Literature**:

-   Prediction Markets: Hanson, R. (2007). "Logarithmic Market Scoring Rules for Modular Combinatorial Information Aggregation"
-   Reputation Systems: Resnick, P. et al. (2000). "Reputation Systems"
-   Token Economics: Vitalik Buterin (2017). "On Medium-of-Exchange Token Valuations"
-   Decentralized Curation: Ocean Protocol, SingularityNET documentation

----------

### Appendix E: Contact & Resources

**Team**:

-   Lead: Mateo Bastidas (mateo@asi2.org)

----------

## Closing Statement

**MERIDIAN Protocol transforms the informal, scattered curation work that AI alignment researchers already do into a formal, incentivized, transparent economy.**

By enabling researchers to earn money and build verifiable reputations while evaluating papers they already read, MERIDIAN creates convergent quality signals that:

-   Help researchers navigate the information flood
-   Inform ASIP Grant Board allocation decisions
-   Provide an objective pipeline for Grant Committee recruitment
-   Coordinate the field around high-quality research

**This is not a funding platform**—ASIP handles grants.  
**This is not a replacement for peer review**—it complements formal processes.

**This is infrastructure for distributed expertise to converge on truth.**

Like meridian lines that independently span the globe but converge at the poles, MERIDIAN curators work independently but their expert judgments converge toward quality research publications.

**The result**: A self-organizing, self-correcting, economically sustainable system for research quality signals that benefits the entire AI alignment ecosystem.

----------

**Version 1.0 Complete**  
**Ready for Technical Review**  
**Next Steps**: Development kickoff, smart contract architecture, curator recruitment

----------

_Document prepared by Mateo Bastidas, ASI Institute_  
_December 2025_


----------


