// ContractLibraryPage.jsx
// Page 2 - Contract Library & Memory
// Features:
// - Portfolio snapshot with metrics
// - List of all analyzed contracts
// - Search and filter functionality
// - Portfolio-wide Q&A

import React, { useState } from 'react'
import { Search, Filter, TrendingUp, AlertCircle } from 'lucide-react'
import RiskBadge from '../components/RiskBadge'

const ContractLibraryPage = () => {
  const [contracts, setContracts] = useState([
    // Mock data - will be replaced with API data
    {
      id: 1,
      name: 'AWS Service Agreement',
      vendor: 'Amazon Web Services',
      riskLevel: 'medium',
      riskScore: 12,
      value: '$50,000',
      uploadDate: '2025-11-08',
      expiryDate: '2026-03-15',
      needsReview: false,
    },
    {
      id: 2,
      name: 'Salesforce CRM License',
      vendor: 'Salesforce',
      riskLevel: 'low',
      riskScore: 5,
      value: '$120,000',
      uploadDate: '2025-11-07',
      expiryDate: '2026-06-30',
      needsReview: false,
    },
    {
      id: 3,
      name: 'Office Lease Agreement',
      vendor: 'Property Management Co',
      riskLevel: 'high',
      riskScore: 18,
      value: '$180,000/yr',
      uploadDate: '2025-11-07',
      expiryDate: '2025-12-23',
      needsReview: true,
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterRisk, setFilterRisk] = useState('all')

  // Portfolio metrics
  const totalContracts = contracts.length
  const averageRisk = contracts.reduce((sum, c) => sum + c.riskScore, 0) / totalContracts
  const needsReview = contracts.filter(c => c.needsReview).length
  const totalValue = contracts.reduce((sum, c) => {
    const value = parseInt(c.value.replace(/[^0-9]/g, ''))
    return sum + value
  }, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contract Library</h1>
        <p className="text-gray-600 mt-1">
          All your analyzed contracts with portfolio insights
        </p>
      </div>

      {/* Portfolio snapshot */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          label="Total Contracts"
          value={totalContracts}
          icon="📄"
        />
        <MetricCard
          label="Average Risk"
          value={averageRisk.toFixed(1)}
          subValue="/20"
          icon="⚖️"
        />
        <MetricCard
          label="Needs Review"
          value={needsReview}
          icon="⚠️"
          alert={needsReview > 0}
        />
        <MetricCard
          label="Total Value"
          value={`$${(totalValue / 1000).toFixed(0)}K`}
          subValue="/year"
          icon="💰"
        />
      </div>

      {/* Search and filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contracts by name, vendor, or terms..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <select
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
        </select>
      </div>

      {/* Contracts list */}
      <div className="space-y-3">
        {contracts.map((contract) => (
          <ContractCard key={contract.id} contract={contract} />
        ))}
      </div>

      {/* Portfolio Q&A section */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">
          Ask About Your Portfolio
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="e.g., Which contracts have unlimited liability?"
            className="flex-1 input-field"
          />
          <button className="btn-primary">Ask</button>
        </div>
        <div className="mt-4 space-y-2">
          <SuggestedPortfolioQuestion text="Which contracts auto-renew?" />
          <SuggestedPortfolioQuestion text="Show me all high-risk agreements" />
          <SuggestedPortfolioQuestion text="What's our total annual spend?" />
        </div>
      </div>
    </div>
  )
}

// Sub-components
const MetricCard = ({ label, value, subValue, icon, alert }) => (
  <div className={`card ${alert ? 'border-yellow-300 bg-yellow-50' : ''}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">
          {value}
          {subValue && <span className="text-sm text-gray-500">{subValue}</span>}
        </p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </div>
)

const ContractCard = ({ contract }) => (
  <div className="card hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-gray-900">{contract.name}</h3>
          {contract.needsReview && (
            <span className="flex items-center gap-1 text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
              <AlertCircle className="w-3 h-3" />
              Expires soon
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{contract.vendor}</p>
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <span>Value: {contract.value}</span>
          <span>•</span>
          <span>Expires: {contract.expiryDate}</span>
          <span>•</span>
          <span>Uploaded: {contract.uploadDate}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <RiskBadge level={contract.riskLevel} score={contract.riskScore} />
        <div className="flex gap-2">
          <button className="text-sm text-primary-600 hover:underline">
            View Analysis
          </button>
          <button className="text-sm text-primary-600 hover:underline">
            Chat
          </button>
        </div>
      </div>
    </div>
  </div>
)

const SuggestedPortfolioQuestion = ({ text }) => (
  <button className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
    "{text}"
  </button>
)

export default ContractLibraryPage
