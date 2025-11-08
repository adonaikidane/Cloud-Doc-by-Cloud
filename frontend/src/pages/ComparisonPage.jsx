// ComparisonPage.jsx
// Page 3 - Multi-Contract Comparison & Recommendation Engine
// Features:
// - Upload multiple contracts for comparison
// - Side-by-side comparison table
// - AI recommendation with reasoning
// - Negotiation advice
// - 3-year TCO calculation

import React, { useState } from 'react'
import { Upload, GitCompare } from 'lucide-react'
import FileUpload from '../components/FileUpload'
import ComparisonTable from '../components/ComparisonTable'
import RiskBadge from '../components/RiskBadge'

const ComparisonPage = () => {
  const [contracts, setContracts] = useState([])
  const [recommendation, setRecommendation] = useState(null)
  const [isComparing, setIsComparing] = useState(false)

  const handleAddContract = async (uploadData) => {
    setIsComparing(true)
    
    try {
      // TODO: API call to analyze and add contract
      // const analysis = await analyzeContract(uploadData)
      
      // Mock contract data for structure
      const mockContract = {
        id: Date.now(),
        name: `Contract ${contracts.length + 1}`,
        vendor: `Vendor ${String.fromCharCode(65 + contracts.length)}`,
        price: `$${200 + contracts.length * 40}K`,
        riskScore: { level: 'medium', score: 10 + contracts.length * 2 },
        liability: contracts.length === 0 ? 'Unlimited' : 'Capped at $500K',
        paymentTerms: `Net ${30 + contracts.length * 15}`,
        contractTerm: '12 months',
        autoRenewal: contracts.length % 2 === 0,
        terminationNotice: `${30 + contracts.length * 30} days`,
        ipOwnership: contracts.length === 2 ? 'Vendor' : 'Client',
        priceEscalation: `${3 + contracts.length}%/year`,
      }
      
      setContracts([...contracts, mockContract])
      
      // Generate recommendation when we have 2+ contracts
      if (contracts.length >= 1) {
        generateRecommendation([...contracts, mockContract])
      }
    } catch (error) {
      console.error('Error adding contract:', error)
    } finally {
      setIsComparing(false)
    }
  }

  const generateRecommendation = (contractsList) => {
    // TODO: API call to get AI recommendation
    // Mock recommendation for structure
    const mockRecommendation = {
      bestChoice: contractsList[1],
      reasoning: [
        'Lowest total risk (scores 8/20 vs 12/20)',
        'Best contract terms (7 of 9 favorable)',
        'Middle pricing ($195K - only 19% less than cheapest)',
        'No red line violations',
        'Aligns with your company standards',
      ],
      tradeoffs: '24-month term (vs your preferred 12 months), but terms allow 30-day exit without penalty after year 1',
      alternativeAdvice: {
        contract: contractsList[0],
        items: [
          'Cap liability at $480K (2x annual)',
          'Change auto-renewal to 60-day notice',
          'Reduce payment terms to Net 45',
        ],
        impact: 'Risk → 🟢 Low',
      },
      tco: {
        threeYear: [
          { name: contractsList[0].name, cost: '$756K' },
          { name: contractsList[1].name, cost: '$610K' },
          { name: contractsList[2]?.name, cost: '$883K' },
        ],
        savings: '$146K over 3 years vs Contract A',
      },
    }
    
    setRecommendation(mockRecommendation)
  }

  const removeContract = (contractId) => {
    const updated = contracts.filter(c => c.id !== contractId)
    setContracts(updated)
    if (updated.length >= 2) {
      generateRecommendation(updated)
    } else {
      setRecommendation(null)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compare Contracts</h1>
          <p className="text-gray-600 mt-1">
            Upload multiple proposals to get AI-powered recommendations
          </p>
        </div>
        
        {contracts.length > 0 && (
          <div className="text-sm text-gray-600">
            {contracts.length} contract{contracts.length !== 1 ? 's' : ''} uploaded
          </div>
        )}
      </div>

      {/* Upload area */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload Contracts to Compare
        </h3>
        <FileUpload onUpload={handleAddContract} />
        {isComparing && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Analyzing contract...
          </div>
        )}
      </div>

      {/* Uploaded contracts list */}
      {contracts.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Contracts in Comparison</h3>
          <div className="space-y-2">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <GitCompare className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{contract.name}</p>
                    <p className="text-sm text-gray-600">{contract.vendor} • {contract.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RiskBadge level={contract.riskScore.level} score={contract.riskScore.score} />
                  <button
                    onClick={() => removeContract(contract.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comparison table */}
      {contracts.length >= 2 && (
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Side-by-Side Comparison</h3>
          <ComparisonTable contracts={contracts} />
        </div>
      )}

      {/* AI Recommendation */}
      {recommendation && (
        <div className="card border-2 border-primary-200 bg-primary-50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🤖</span>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  AI Recommendation
                </h3>
                <p className="text-lg font-semibold text-primary-700 mt-2">
                  🥇 BEST CHOICE: {recommendation.bestChoice.name}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Why {recommendation.bestChoice.name} wins:
                </h4>
                <ul className="space-y-1">
                  {recommendation.reasoning.map((reason, index) => (
                    <li key={index} className="text-gray-700 flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {recommendation.tradeoffs && (
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm">
                    <span className="font-semibold">⚠️ Trade-off:</span> {recommendation.tradeoffs}
                  </p>
                </div>
              )}

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">
                  💡 If you choose {recommendation.alternativeAdvice.contract.name} instead:
                </h4>
                <p className="text-sm text-gray-700 mb-2">Negotiate these items first:</p>
                <ol className="space-y-1 ml-4">
                  {recommendation.alternativeAdvice.items.map((item, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {index + 1}. {item}
                    </li>
                  ))}
                </ol>
                <p className="text-sm text-gray-700 mt-2">
                  Estimated impact: {recommendation.alternativeAdvice.impact}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  📊 Total Cost of Ownership (3 years)
                </h4>
                <div className="space-y-1">
                  {recommendation.tco.threeYear.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{item.name}:</span>
                      <span className="font-medium text-gray-900">{item.cost}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-green-700 font-medium mt-2">
                  💰 {recommendation.tco.savings}
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="btn-primary">Download Full Report</button>
                <button className="btn-secondary">Share with Team</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {contracts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GitCompare className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600">
            Upload at least 2 contracts to see comparison and recommendations
          </p>
        </div>
      )}
    </div>
  )
}

export default ComparisonPage
