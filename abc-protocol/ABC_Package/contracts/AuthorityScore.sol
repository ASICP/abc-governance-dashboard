// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AuthorityScore
 * @dev On-chain reputation tracking based on curation accuracy and bounty completion quality.
 */
contract AuthorityScore is Ownable {
    
    struct CuratorStats {
        uint256 authorityScore;
        uint256 totalPredictions;
        uint256 correctPredictions;
        uint256 totalBounties;
        uint256 successfulBounties;
        string primaryDomain;
        uint256 lastActivityTimestamp;
    }

    // Mapping from curator address to their stats
    mapping(address => CuratorStats) public curatorStats;

    // Address of the CommonsCore contract authorized to update scores
    address public commonsCore;

    event ScoreUpdated(address indexed curator, uint256 newScore, string activityType);
    event CommonsCoreUpdated(address indexed newCoreAddress);

    modifier onlyCommonsCore() {
        require(msg.sender == commonsCore, "AuthorityScore: caller is not CommonsCore");
        _;
    }

    constructor(address initialOwner) Ownable(initialOwner) {}

    /**
     * @dev Sets the CommonsCore contract address.
     * Only owner can call this.
     */
    function setCommonsCore(address _commonsCore) external onlyOwner {
        require(_commonsCore != address(0), "Invalid address");
        commonsCore = _commonsCore;
        emit CommonsCoreUpdated(_commonsCore);
    }

    /**
     * @dev Updates a curator's Authority Score.
     * Can only be called by CommonsCore.
     */
    function updateScore(
        address curator,
        bool correct,
        bool early,
        uint8 deviation, // 0 = exact, 1 = partial, >=2 = wrong
        string memory /* domain */, // Domain logic simplified for MVP or stored off-chain/hashed
        bool isBounty // flag to distinguish bounty vs curation
    ) external onlyCommonsCore {
        CuratorStats storage stats = curatorStats[curator];

        // 1. Calculate base points
        int256 points = 0;
        if (isBounty) {
             // Logic for bounty updates
             points = correct ? int256(100) : int256(-50); // Simplified: correct=success, false=failed
             if (early) points += 50; // High quality bonus re-used logic
        } else {
            // Logic for curation updates
            if (correct) {
                points = 10;
            } else if (deviation == 1) {
                points = 5;
            } else {
                points = -5;
            }
        }

        // 2. Apply conviction multiplier (Early bird)
        // Only apply multiplier to positive points to avoid amplifying penalties unfairly?
        // Spec says "Points * multiplier". If penalty is -5, 2x is -10. Let's follow simple logic.
        if (early && points > 0) {
            points *= 2;
        }

        // 3. Apply recency decay
        // Formula: score * (0.95 ^ months_inactive)
        // Simplified decay for Solidity (avoid fractional powers): linear approx or step function
        // For MVP/first draft: 5% decay per 30 days.
        uint256 timeDiff = block.timestamp > stats.lastActivityTimestamp ? block.timestamp - stats.lastActivityTimestamp : 0;
        uint256 monthsInactive = timeDiff / 30 days;
        
        uint256 decayedScore = stats.authorityScore;
        if (monthsInactive > 0) {
            // Apply 5% decay per month iteratively (expensive) or approx
            // Simple approach: reduce by 5% * months (capped at 100%)
            uint256 decayPercent = monthsInactive * 5;
            if (decayPercent > 100) decayPercent = 100;
            decayedScore = decayedScore * (100 - decayPercent) / 100;
        }

        // 4. Update Score
        int256 newScoreInt = int256(decayedScore) + points;
        if (newScoreInt < 0) {
            stats.authorityScore = 0;
        } else {
            stats.authorityScore = uint256(newScoreInt);
        }

        stats.lastActivityTimestamp = block.timestamp;

        // 5. Update Counts
        if (isBounty) {
            stats.totalBounties++;
            if (correct) stats.successfulBounties++;
        } else {
            stats.totalPredictions++;
            if (correct) stats.correctPredictions++;
        }

        emit ScoreUpdated(curator, stats.authorityScore, isBounty ? "BOUNTY" : "CURATION");
    }

    function getScore(address curator) external view returns (uint256) {
        return curatorStats[curator].authorityScore;
    }

    function getCuratorStats(address curator) external view returns (CuratorStats memory) {
        return curatorStats[curator];
    }
}
