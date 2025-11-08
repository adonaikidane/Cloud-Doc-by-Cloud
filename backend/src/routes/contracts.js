// routes/contracts.js
// Routes for contract upload, analysis, and management

import express from 'express'
import multer from 'multer'
import {
  analyzeContract,
  analyzeTextContract,
  getAllContracts,
  getContractById,
  deleteContract,
  compareContracts,
  getRecommendation,
} from '../controllers/contractController.js'

const router = express.Router()

// Configure multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE_MB || 10) * 1024 * 1024, // 10MB default
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/plain']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, PNG, and TXT files are allowed.'))
    }
  },
})

// ===== Contract Analysis Routes =====

// POST /api/contracts/analyze - Upload and analyze contract file
router.post('/analyze', upload.single('contract'), analyzeContract)

// POST /api/contracts/analyze-text - Analyze pasted contract text
router.post('/analyze-text', analyzeTextContract)

// ===== Contract Management Routes =====

// GET /api/contracts - Get all contracts for current user
router.get('/', getAllContracts)

// GET /api/contracts/:id - Get specific contract by ID
router.get('/:id', getContractById)

// DELETE /api/contracts/:id - Delete contract
router.delete('/:id', deleteContract)

// GET /api/contracts/search - Search contracts
router.get('/search', (req, res) => {
  // TODO: Implement search functionality
  res.json({ message: 'Search endpoint - to be implemented' })
})

// ===== Comparison Routes =====

// POST /api/contracts/compare - Compare multiple contracts
router.post('/compare', compareContracts)

// POST /api/contracts/recommendation - Get AI recommendation for best contract
router.post('/recommendation', getRecommendation)

export default router
