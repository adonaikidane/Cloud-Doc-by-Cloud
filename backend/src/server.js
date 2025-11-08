// server.js
// Main server entry point for ClauseCloud backend
// Initializes Express app, middleware, and routes

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

// Import routes
import contractRoutes from './routes/contracts.js'
import chatRoutes from './routes/chat.js'
import portfolioRoutes from './routes/portfolio.js'
import settingsRoutes from './routes/settings.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ===== Middleware =====

// Security headers
app.use(helmet())

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Logging
app.use(morgan('dev'))

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})
app.use('/api/', limiter)

// ===== Routes =====

app.use('/api/contracts', contractRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/settings', settingsRoutes)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  })
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'ClauseCloud API', 
    version: '1.0.0',
    endpoints: {
      contracts: '/api/contracts',
      chat: '/api/chat',
      portfolio: '/api/portfolio',
      settings: '/api/settings',
    }
  })
})

// ===== Error Handling =====

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
  })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

// ===== Start Server =====

app.listen(PORT, () => {
  console.log(`🚀 ClauseCloud backend running on port ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 API endpoints available at http://localhost:${PORT}/api`)
  
  // Verify Claude API key
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠️  WARNING: ANTHROPIC_API_KEY not found in environment variables')
  } else {
    console.log('✅ Claude API key configured')
  }
})

export default app
