// ComparisonTable.jsx
// Side-by-side comparison table for multiple contracts
// Shows key criteria with visual indicators for best/worst options
// Highlights red line violations

import React from 'react'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import RiskBadge from './RiskBadge'

const ComparisonTable = ({ contracts = [] }) => {
  if (contracts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Upload multiple contracts to compare them side-by-side
      </div>
    )
  }

  const criteria = [
    { key: 'price', label: 'Annual Price', format: (val) => val },
    { key: 'riskScore', label: 'Risk Score', format: (val) => <RiskBadge level={val.level} score={val.score} /> },
    { key: 'liability', label: 'Liability', format: (val) => val },
    { key: 'paymentTerms', label: 'Payment Terms', format: (val) => val },
    { key: 'contractTerm', label: 'Contract Term', format: (val) => val },
    { key: 'autoRenewal', label: 'Auto-Renewal', format: (val) => val ? '⚠️ Yes' : '✓ No' },
    { key: 'terminationNotice', label: 'Termination Notice', format: (val) => val },
    { key: 'ipOwnership', label: 'IP Ownership', format: (val) => val },
    { key: 'priceEscalation', label: 'Price Escalation', format: (val) => val },
  ]

  // Find best value for each criterion
  const getBestValueIndicator = (criterionKey, value, allValues) => {
    // Logic to determine if this is the best value
    // Returns true if this is the best option for this criterion
    return false // TODO: Implement comparison logic
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="text-left p-4 font-semibold text-gray-700 min-w-[200px]">
              Criteria
            </th>
            {contracts.map((contract, index) => (
              <th key={index} className="text-left p-4 min-w-[200px]">
                <div className="font-semibold text-gray-900">
                  {contract.name}
                </div>
                <div className="text-xs text-gray-500 font-normal mt-1">
                  {contract.vendor}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion, index) => (
            <tr
              key={criterion.key}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              <td className="p-4 font-medium text-gray-700 border-b border-gray-200">
                {criterion.label}
              </td>
              {contracts.map((contract, contractIndex) => {
                const value = contract[criterion.key]
                const isBest = getBestValueIndicator(criterion.key, value, contracts)
                
                return (
                  <td
                    key={contractIndex}
                    className={`p-4 border-b border-gray-200 ${
                      isBest ? 'bg-green-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {criterion.format(value)}
                      {isBest && <CheckCircle className="w-4 h-4 text-green-600" />}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComparisonTable
