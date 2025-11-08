// ContractSummary.jsx
// Displays structured contract analysis summary
// Shows: Basic info, risk score, critical issues, moderate concerns, favorable terms
// Includes citations and download options

import React from 'react'
import { AlertCircle, AlertTriangle, CheckCircle, Download, FileText } from 'lucide-react'
import RiskBadge from './RiskBadge'

const ContractSummary = ({ analysis }) => {
  if (!analysis) return null

  const {
    contractType,
    parties,
    term,
    autoRenews,
    value,
    riskLevel,
    riskScore,
    criticalIssues = [],
    moderateConcerns = [],
    favorableTerms = [],
  } = analysis

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      {/* Header section */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Contract Summary
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Analyzed in 2.3 seconds
            </p>
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* Basic info grid */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Type</p>
          <p className="text-sm font-medium text-gray-900 mt-1">{contractType}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Parties</p>
          <p className="text-sm font-medium text-gray-900 mt-1">{parties}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Term</p>
          <p className="text-sm font-medium text-gray-900 mt-1">{term}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Value</p>
          <p className="text-sm font-medium text-gray-900 mt-1">{value}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Auto-Renews</p>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {autoRenews ? '⚠️ Yes' : '✓ No'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Risk Level</p>
          <div className="mt-1">
            <RiskBadge level={riskLevel} score={riskScore} />
          </div>
        </div>
      </div>

      {/* Critical Issues */}
      {criticalIssues.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-red-700 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Critical Issues ({criticalIssues.length})
          </h4>
          {criticalIssues.map((issue, index) => (
            <IssueCard key={index} issue={issue} severity="critical" />
          ))}
        </div>
      )}

      {/* Moderate Concerns */}
      {moderateConcerns.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-yellow-700 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Moderate Concerns ({moderateConcerns.length})
          </h4>
          {moderateConcerns.map((concern, index) => (
            <IssueCard key={index} issue={concern} severity="moderate" />
          ))}
        </div>
      )}

      {/* Favorable Terms */}
      {favorableTerms.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-green-700 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Favorable Terms ({favorableTerms.length})
          </h4>
          <ul className="space-y-1 ml-7">
            {favorableTerms.map((term, index) => (
              <li key={index} className="text-sm text-gray-700">
                • {term}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Sub-component for issue cards
const IssueCard = ({ issue, severity }) => {
  const { title, description, section, recommendation, citation } = issue
  
  const severityStyles = {
    critical: 'border-red-200 bg-red-50',
    moderate: 'border-yellow-200 bg-yellow-50',
  }

  return (
    <div className={`border rounded-lg p-4 ${severityStyles[severity]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h5 className="font-medium text-gray-900">{title}</h5>
          {citation && (
            <button className="text-xs text-blue-600 hover:underline mt-1">
              [{citation}] View exact text
            </button>
          )}
        </div>
      </div>
      
      <p className="text-sm text-gray-700 mt-2">{description}</p>
      
      {recommendation && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Recommendation
          </p>
          <p className="text-sm text-gray-900">{recommendation}</p>
        </div>
      )}
    </div>
  )
}

export default ContractSummary
