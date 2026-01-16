/**
 * Custom React Hook for ABC Dashboard Data
 * Manages data fetching, loading states, and auto-refresh
 */

import { useState, useEffect, useCallback } from 'react';
import abcWeb3Service from '../services/abcWeb3Service';

export const useABCDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Initialize Web3 if not already done
      if (!abcWeb3Service.isInitialized()) {
        abcWeb3Service.initializeWeb3();
      }

      // Fetch all dashboard data in parallel
      const [
        dashboardData,
        treasuryHealth,
        bountyPipeline,
      ] = await Promise.all([
        abcWeb3Service.getDashboardData(),
        abcWeb3Service.getTreasuryHealth(),
        abcWeb3Service.getBountyPipeline(),
      ]);

      setData({
        ...dashboardData,
        treasury: treasuryHealth,
        pipeline: bountyPipeline,
      });

      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refresh: fetchData,
  };
};

export const useActiveBounties = (limit = 10) => {
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        setLoading(true);
        if (!abcWeb3Service.isInitialized()) {
          abcWeb3Service.initializeWeb3();
        }

        const activeBounties = await abcWeb3Service.getActiveBounties(limit);
        setBounties(activeBounties);
        setError(null);
      } catch (err) {
        console.error('Error fetching active bounties:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBounties();

    // Refresh every 2 minutes
    const interval = setInterval(fetchBounties, 120000);
    return () => clearInterval(interval);
  }, [limit]);

  return { bounties, loading, error };
};

export const useVerifierLeaderboard = (limit = 20) => {
  const [verifiers, setVerifiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerifiers = async () => {
      try {
        setLoading(true);
        if (!abcWeb3Service.isInitialized()) {
          abcWeb3Service.initializeWeb3();
        }

        const leaderboard = await abcWeb3Service.getVerifierLeaderboard(limit);
        setVerifiers(leaderboard);
        setError(null);
      } catch (err) {
        console.error('Error fetching verifier leaderboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVerifiers();

    // Refresh every 5 minutes
    const interval = setInterval(fetchVerifiers, 300000);
    return () => clearInterval(interval);
  }, [limit]);

  return { verifiers, loading, error };
};
