// ChatPage.jsx
// Main page: Page 1 - Chat Interface for Contract Analysis
// Features:
// - File upload (drag-drop or paste text)
// - Instant structured analysis with risk scoring
// - Q&A chat interface with memory
// - Citations and recommendations

import React, { useState } from 'react'
import FileUpload from '../components/FileUpload'
import ContractSummary from '../components/ContractSummary'
import ChatInterface from '../components/ChatInterface'

const ChatPage = () => {
  const [currentContract, setCurrentContract] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleUpload = async (uploadData) => {
    setIsAnalyzing(true)
    
    try {
      // TODO: API call to analyze contract
      // const response = await analyzeContract(uploadData)
      
      // Simulated analysis for structure
      const mockAnalysis = {
        contractType: 'SaaS Service Agreement',
        parties: 'YourCo ↔ AWS',
        term: '12 months',
        autoRenews: true,
        value: '$50,000/year',
        riskLevel: 'medium',
        riskScore: 12,
        criticalIssues: [
          {
            title: 'Unlimited Liability Clause',
            description: 'Service provider accepts unlimited liability for damages.',
            section: 'Section 8.2',
            citation: 'Section 8.2, Page 4',
            recommendation: 'Negotiate cap at $100K (2x annual fees)',
          },
          {
            title: '90-day Auto-Renewal Notice',
            description: 'Contract auto-renews unless cancelled 90 days before expiration.',
            section: 'Section 12.1',
            citation: 'Section 12.1, Page 7',
            recommendation: 'Set reminder for August 1, 2025 or negotiate 30-day window',
          },
        ],
        moderateConcerns: [
          {
            title: 'Payment Terms: Net 60',
            description: 'Your standard is Net 30',
          },
          {
            title: 'IP Ownership Ambiguous',
            description: 'Work-product rights not clearly defined',
            section: 'Section 4.3',
          },
        ],
        favorableTerms: [
          'Strong confidentiality protections',
          'Clear performance SLAs',
          'Reasonable indemnification terms',
          'Standard dispute resolution process',
        ],
      }
      
      setAnalysis(mockAnalysis)
      setCurrentContract(uploadData)
    } catch (error) {
      console.error('Error analyzing contract:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Upload section - shown when no contract analyzed */}
      {!analysis && (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Analyze Your Contract
              </h1>
              <p className="text-gray-600">
                Upload a contract to get instant AI-powered analysis with risk assessment and recommendations
              </p>
            </div>
            
            <FileUpload onUpload={handleUpload} />
            
            {isAnalyzing && (
              <div className="mt-6 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <p className="mt-2 text-gray-600">Analyzing contract...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Analysis and chat section - shown after analysis */}
      {analysis && (
        <div className="flex-1 grid grid-cols-2 gap-6 p-6 overflow-hidden">
          {/* Left: Analysis summary (scrollable) */}
          <div className="overflow-y-auto custom-scrollbar">
            <ContractSummary analysis={analysis} />
          </div>

          {/* Right: Chat interface */}
          <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col bg-white">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Ask Questions</h3>
              <p className="text-sm text-gray-500">
                I have the full contract in context
              </p>
            </div>
            <ChatInterface contractId={currentContract?.id} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatPage
