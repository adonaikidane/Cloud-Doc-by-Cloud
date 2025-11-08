// controllers/portfolioController.js
// Business logic for portfolio-wide operations

import { contractStore } from '../models/contractStore.js'

// ===== Get Portfolio Metrics =====

export const getPortfolioMetrics = async (req, res, next) => {
  try {
    const contracts = contractStore.getAll()
    
    const totalContracts = contracts.length
    const averageRisk = contracts.length > 0
      ? contracts.reduce((sum, c) => sum + (c.analysis?.riskScore || 0), 0) / totalContracts
      : 0
    
    const needsReview = contracts.filter(c => {
      // Check if contract expires soon (within 60 days)
      // TODO: Implement date checking logic
      return false
    }).length
    
    const totalValue = contracts.reduce((sum, c) => {
      // TODO: Parse contract value properly
      return sum
    }, 0)

    res.json({
      success: true,
      metrics: {
        totalContracts,
        averageRisk: parseFloat(averageRisk.toFixed(1)),
        needsReview,
        totalValue,
      },
    })
  } catch (error) {
    console.error('Error fetching portfolio metrics:', error)
    next(error)
  }
}

// ===== Portfolio Query =====

export const portfolioQuery = async (req, res, next) => {
  try {
    const { query } = req.body

    if (!query) {
      return res.status(400).json({ error: 'Query is required' })
    }

    // TODO: Implement portfolio-wide query with Claude
    // This should:
    // 1. Get all contracts
    // 2. Send query to Claude with all contract summaries
    // 3. Return answer with relevant contracts

    const contracts = contractStore.getAll()

    res.json({
      success: true,
      answer: 'Portfolio query functionality - to be implemented',
      relevantContracts: [],
    })
  } catch (error) {
    console.error('Error in portfolio query:', error)
    next(error)
  }
}
