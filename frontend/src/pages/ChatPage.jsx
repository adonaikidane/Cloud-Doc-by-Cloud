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
import { analyzeContract, analyzeTextContract } from '../services/api'

const ChatPage = () => {
  const [currentContract, setCurrentContract] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

const handleUpload = async (uploadData) => {
  setIsAnalyzing(true)
  
  try {
    let response
    
    // FileUpload sends: { type: 'file'|'text', data: ... }
    if (uploadData.type === 'file' && uploadData.data && uploadData.data.length > 0) {
      const formData = new FormData()
      formData.append('contract', uploadData.data[0])  // Backend expects 'contract'
      response = await analyzeContract(formData)
    } else if (uploadData.type === 'text' && uploadData.data) {
      response = await analyzeTextContract(uploadData.data)
    } else {
      throw new Error('No file or text provided')
    }
    
    if (response && response.success) {
      setAnalysis(response.analysis)
      setCurrentContract({
        id: response.contractId,
        text: uploadData.type === 'text' ? uploadData.data : uploadData.data[0].name,
      })
    } else {
      throw new Error(response?.error || 'Analysis failed')
    }
  } catch (error) {
    console.error('Error analyzing contract:', error)
    alert('Error: ' + (error.response?.data?.error || error.message))
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
