// models/contractStore.js
// Simple in-memory storage for contracts (for hackathon MVP)
// TODO: Replace with proper database (MongoDB, PostgreSQL, etc.)

import { v4 as uuidv4 } from 'uuid'

class ContractStore {
  constructor() {
    this.contracts = new Map()
  }

  add(contractData) {
    const id = uuidv4()
    const contract = {
      id,
      ...contractData,
      createdAt: new Date(),
    }
    this.contracts.set(id, contract)
    return id
  }

  getById(id) {
    return this.contracts.get(id)
  }

  getAll() {
    return Array.from(this.contracts.values())
  }

  update(id, updates) {
    const contract = this.contracts.get(id)
    if (!contract) return null

    const updated = {
      ...contract,
      ...updates,
      updatedAt: new Date(),
    }
    this.contracts.set(id, updated)
    return updated
  }

  delete(id) {
    return this.contracts.delete(id)
  }

  search(query) {
    const results = []
    const lowerQuery = query.toLowerCase()

    for (const contract of this.contracts.values()) {
      const searchableText = `
        ${contract.filename}
        ${contract.text}
        ${JSON.stringify(contract.analysis)}
      `.toLowerCase()

      if (searchableText.includes(lowerQuery)) {
        results.push(contract)
      }
    }

    return results
  }

  clear() {
    this.contracts.clear()
  }
}

// Export singleton instance
export const contractStore = new ContractStore()
