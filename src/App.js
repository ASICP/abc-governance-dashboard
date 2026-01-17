import React, { useState, useEffect } from 'react';
import ABCDashboard from './components/ABCDashboard';
import web3Service from './services/web3Service';
import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(true);

  useEffect(() => {
    checkWalletConnection();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed. Please install MetaMask to use this dashboard.');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    } catch (err) {
      console.error('Error checking wallet connection:', err);
    }
  };

  const connectWallet = async () => {
    try {
      setError(null);
      await web3Service.initialize();
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setIsConnected(true);
      setUseMockData(false); // Switch to real data once connected
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setUseMockData(true);
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="App">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h1 className="text-xl font-bold text-gray-900">ASIP Governance</h1>
                  <p className="text-xs text-gray-500">Aligned Sovereign Intelligence Protocol</p>
                </div>
              </div>

              {/* Dashboard Toggle */}
              <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  className="px-4 py-2 text-sm font-medium rounded transition-all bg-white text-blue-600 shadow-sm cursor-default"
                >
                  ABC Protocol
                </button>
                <a
                  href="https://govdash.asi2.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-medium rounded transition-all text-gray-600 hover:text-gray-900 hover:bg-white/50 flex items-center space-x-1"
                >
                  <span>SAIT Token</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Live Data Indicator and Contract */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="font-semibold text-sm">Live Data (Sepolia)</span>
              </div>
              <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-mono text-sm">
                Contract: 0xeD883dff812dAB6C42Ae8Db58860171a780730Dc
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto mt-4 px-4">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard */}
      <ABCDashboard />

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">About ASIP</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                The Aligned Sovereign Intelligence Protocol provides perpetual, non-dilutive funding 
                for AI safety research through transparent governance and treasury-backed economics.
              </p>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/Mbastidas001/SAIToken_v2" className="text-xs text-blue-600 hover:text-blue-800">
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a href="#whitepaper" className="text-xs text-blue-600 hover:text-blue-800">
                    ASIP White Paper
                  </a>
                </li>
                <li>
                  <a href="#economics" className="text-xs text-blue-600 hover:text-blue-800">
                    SAIT/SAT Economics
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact</h3>
              <p className="text-xs text-gray-600 mb-2">
                For questions or support:
              </p>
              <a href="mailto:amonroy@asi2.org" className="text-xs text-blue-600 hover:text-blue-800">
                amonroy@asi2.org
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              © 2025 ASIP. All rights reserved. | 
              <span className="ml-2">
                Dashboard Version 1.0.0
              </span>
            </p>
            <p className="text-xs text-center text-gray-400 mt-2">
              This dashboard is for informational purposes only. Not financial advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
