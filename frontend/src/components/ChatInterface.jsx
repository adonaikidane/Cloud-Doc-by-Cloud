// ChatInterface.jsx
// Interactive chat interface for Q&A about contracts
// Shows conversation history with citations
// Handles streaming responses from Claude

import React, { useState, useRef, useEffect } from 'react'
import { Send, Loader } from 'lucide-react'

const ChatInterface = ({ contractId, initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // TODO: API call to send message and get response
      // const response = await sendChatMessage(contractId, inputValue)
      
      // Simulated response for structure
      const assistantMessage = {
        role: 'assistant',
        content: 'This is a placeholder response. API integration needed.',
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Ask me anything about this contract...
            </p>
            <div className="mt-4 space-y-2">
              <SuggestedQuestion text="What are the payment terms?" />
              <SuggestedQuestion text="Does this contract allow early termination?" />
              <SuggestedQuestion text="Who owns the intellectual property?" />
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about this contract..."
            rows={1}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="btn-primary px-6 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

// Sub-component for chat messages
const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user'
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-3xl rounded-lg p-4 ${
          isUser
            ? 'bg-primary-100 text-primary-900'
            : 'bg-white border border-gray-200'
        }`}
      >
        <div className="prose prose-sm max-w-none">
          {message.content}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

// Sub-component for suggested questions
const SuggestedQuestion = ({ text }) => {
  return (
    <button className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
      "{text}"
    </button>
  )
}

export default ChatInterface
