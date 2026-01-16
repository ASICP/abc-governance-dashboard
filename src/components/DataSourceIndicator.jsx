import React from 'react';

/**
 * DataSourceIndicator - Shows whether data is from mock, Sepolia, or hybrid
 */
const DataSourceIndicator = ({ dataSource }) => {
  if (!dataSource) return null;

  const indicators = {
    'mock-only': {
      color: 'bg-yellow-100 text-yellow-800',
      icon: '📊',
      text: 'Mock Data'
    },
    'hybrid': {
      color: 'bg-blue-100 text-blue-800',
      icon: '🔄',
      text: 'Mock + Sepolia'
    },
    'sepolia': {
      color: 'bg-green-100 text-green-800',
      icon: '⛓️',
      text: 'Live Sepolia'
    },
    'mock-fallback': {
      color: 'bg-orange-100 text-orange-800',
      icon: '⚠️',
      text: 'Mock (Sepolia unavailable)'
    },
    'error-fallback': {
      color: 'bg-red-100 text-red-800',
      icon: '❌',
      text: 'Mock (Error)'
    }
  };

  const indicator = indicators[dataSource] || indicators['mock-only'];

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${indicator.color}`}>
      <span className="mr-1">{indicator.icon}</span>
      {indicator.text}
    </div>
  );
};

export default DataSourceIndicator;
