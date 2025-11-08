// routes/portfolio.js
// Routes for portfolio-wide analysis and queries

import express from 'express'
import { getPortfolioMetrics, portfolioQuery } from '../controllers/portfolioController.js'

const router = express.Router()

// GET /api/portfolio/metrics - Get portfolio overview metrics
router.get('/metrics', getPortfolioMetrics)

// POST /api/portfolio/query - Ask questions about entire portfolio
router.post('/query', portfolioQuery)

export default router
