// models/chatStore.js
// Simple in-memory storage for chat history (for hackathon MVP)
// TODO: Replace with proper database

class ChatStore {
  constructor() {
    // Map of contractId -> array of messages
    this.conversations = new Map()
  }

  addMessage(contractId, message) {
    if (!this.conversations.has(contractId)) {
      this.conversations.set(contractId, [])
    }

    this.conversations.get(contractId).push({
      ...message,
      timestamp: message.timestamp || new Date(),
    })
  }

  getHistory(contractId) {
    return this.conversations.get(contractId) || []
  }

  clearHistory(contractId) {
    this.conversations.delete(contractId)
  }

  clearAll() {
    this.conversations.clear()
  }
}

// Export singleton instance
export const chatStore = new ChatStore()
