import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useABCDashboard, useActiveBounties, useVerifierLeaderboard } from '../hooks/useABCDashboard';

/**
 * ABC Governance Dashboard - Main Component
 * Displays real-time metrics for the ABC Protocol
 */
const ABCDashboard = () => {
  const { data, loading, error, lastUpdated, refresh } = useABCDashboard();
  const { bounties: activeBounties } = useActiveBounties(5);
  const { verifiers: topVerifiers } = useVerifierLeaderboard(10);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-700">Loading ABC Protocol Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-800 mb-2">Error Loading Dashboard</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Calculate additional metrics
  const circulatingPercent = data ? (parseFloat(data.circulatingSupply) / parseFloat(data.totalSupply)) * 100 : 0;
  const treasuryPercent = data ? (parseFloat(data.treasuryABCBalance) / parseFloat(data.totalSupply)) * 100 : 0;

  // Treasury allocation data for pie chart
  const allocationData = data ? [
    { name: 'Circulating', value: parseFloat(data.circulatingSupply), color: '#3b82f6' },
    { name: 'Treasury', value: parseFloat(data.treasuryABCBalance), color: '#10b981' },
    { name: 'Locked Vaults', value: parseFloat(data.totalSupply) - parseFloat(data.circulatingSupply) - parseFloat(data.treasuryABCBalance), color: '#f59e0b' },
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">ABC Governance Dashboard</h1>
              <p className="text-blue-100">Aligned Beacon Commons Protocol - Real-time Metrics</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end space-x-3 mb-3">
                <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="font-semibold">Live Data (Sepolia)</span>
                </div>
                <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-mono text-sm">
                  Contract: {process.env.REACT_APP_ABC_TOKEN_ADDRESS || '0xeD883dff812dAB6C42Ae8Db58860171a780730Dc'}
                </div>
              </div>
              <div>
                <p className="text-sm text-blue-200">Last Updated</p>
                <p className="text-lg font-semibold">{lastUpdated ? lastUpdated.toLocaleTimeString() : '--:--'}</p>
                <button
                  onClick={refresh}
                  className="mt-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm"
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="ABC Price"
          value={`$${data?.abcPrice?.toFixed(2) || '0.00'}`}
          subtitle="Launch Price: $0.10"
          trend={data?.abcPrice > 0.10 ? `+${((data.abcPrice - 0.10) / 0.10 * 100).toFixed(1)}%` : '0%'}
          positive={data?.abcPrice >= 0.10}
        />
        <MetricCard
          title="Treasury Value"
          value={`$${data?.treasury?.totalValue ? (parseFloat(data.treasury.totalValue) / 1000000).toFixed(2) : '0'}M`}
          subtitle={`Stablecoins: $${data?.treasury?.stablecoinValue ? (parseFloat(data.treasury.stablecoinValue) / 1000000).toFixed(2) : '0'}M`}
          positive={true}
        />
        <MetricCard
          title="Active Bounties"
          value={data?.activeBountyCount || 0}
          subtitle={`Completed: ${data?.completedBountyCount || 0}`}
          trend={`${data?.pipeline?.successRate || 0}% success rate`}
        />
        <MetricCard
          title="Market Cap"
          value={`$${data?.marketCap ? (data.marketCap / 1000000).toFixed(2) : '0'}M`}
          subtitle={`Circulating: ${data?.circulatingSupply ? (parseFloat(data.circulatingSupply) / 1000000).toFixed(1) : '0'}M ABC`}
          positive={true}
        />
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Treasury Health Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Treasury Health</h2>

          {/* Treasury Metrics */}
          <div className="space-y-3 mb-6">
            <DetailRow label="Total Value" value={`$${data?.treasury?.totalValue ? (parseFloat(data.treasury.totalValue) / 1000000).toFixed(2) : '0'}M`} />
            <DetailRow label="ABC Holdings" value={`${data?.treasury?.abcBalance ? (parseFloat(data.treasury.abcBalance) / 1000000).toFixed(2) : '0'}M ABC`} />
            <DetailRow label="Stablecoin Reserves" value={`$${data?.treasury?.stablecoinBalance ? (parseFloat(data.treasury.stablecoinBalance) / 1000000).toFixed(2) : '0'}M`} />
            <DetailRow label="Monthly Burn Rate" value={`$${data?.treasury?.monthlyBurnRate ? (parseFloat(data.treasury.monthlyBurnRate) / 1000).toFixed(0) : '0'}k`} />
            <DetailRow
              label="Runway"
              value={`${data?.treasury?.runwayMonths || 0} months`}
              highlight={parseInt(data?.treasury?.runwayMonths || 0) >= 24}
            />
          </div>

          {/* Runway Gauge */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Runway Status</p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${parseInt(data?.treasury?.runwayMonths || 0) >= 24 ? 'bg-green-500' : parseInt(data?.treasury?.runwayMonths || 0) >= 12 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min((parseInt(data?.treasury?.runwayMonths || 0) / 24) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Target: 24+ months</p>
          </div>
        </div>

        {/* ABC Token Allocation */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">ABC Token Allocation</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${(value / 1000000).toFixed(2)}M ABC`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {allocationData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {(item.value / 1000000).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bounty Pipeline */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Bounty Pipeline</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <PipelineCard label="Voting" count={data?.pipeline?.voting || 0} color="bg-blue-100 text-blue-800" />
          <PipelineCard label="Active" count={data?.pipeline?.active || 0} color="bg-green-100 text-green-800" />
          <PipelineCard label="Completed" count={data?.pipeline?.completed || 0} color="bg-purple-100 text-purple-800" />
          <PipelineCard label="Expired" count={data?.pipeline?.expired || 0} color="bg-red-100 text-red-800" />
          <PipelineCard label="Success Rate" count={`${data?.pipeline?.successRate || 0}%`} color="bg-yellow-100 text-yellow-800" />
        </div>

        {/* Active Bounties List */}
        {activeBounties.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Recent Active Bounties</h3>
            <div className="space-y-2">
              {activeBounties.map(bounty => (
                <div key={bounty.id} className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100">
                  <div>
                    <p className="font-medium text-gray-800">{bounty.title}</p>
                    <p className="text-sm text-gray-500">Amount: ${parseFloat(bounty.amount).toFixed(0)} | Deadline: {bounty.deadline}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bounty.isClaimed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {bounty.isClaimed ? 'Claimed' : 'Available'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Verifier Leaderboard */}
      {topVerifiers.length > 0 && (
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Top Verifiers</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Verifications</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Approval Rate</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Earnings</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topVerifiers.map(verifier => (
                  <tr key={verifier.address} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      {verifier.rank <= 3 ? ['🥇', '🥈', '🥉'][verifier.rank - 1] : verifier.rank}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono">{verifier.address.slice(0, 10)}...</td>
                    <td className="px-4 py-3 text-sm">{verifier.verifications}</td>
                    <td className="px-4 py-3 text-sm">{verifier.approvalRate}%</td>
                    <td className="px-4 py-3 text-sm">${parseFloat(verifier.earnings).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto mt-8 bg-blue-50 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Real-time Blockchain Data:</strong> This dashboard displays live data from ABC Protocol smart contracts on Sepolia testnet. Data refreshes every 60 seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const MetricCard = ({ title, value, subtitle, trend, positive }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
    <p className="text-sm text-gray-600 mb-1">{title}</p>
    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-xs text-gray-500 mb-2">{subtitle}</p>
    {trend && (
      <span className={`text-xs font-semibold ${positive ? 'text-green-600' : 'text-gray-600'}`}>
        {trend}
      </span>
    )}
  </div>
);

const DetailRow = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-gray-600">{label}:</span>
    <span className={`text-sm font-semibold ${highlight ? 'text-green-600' : 'text-gray-900'}`}>{value}</span>
  </div>
);

const PipelineCard = ({ label, count, color }) => (
  <div className={`${color} rounded-lg p-4 text-center`}>
    <p className="text-2xl font-bold">{count}</p>
    <p className="text-xs font-medium">{label}</p>
  </div>
);

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-semibold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default ABCDashboard;
