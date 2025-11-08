// routes/chat.js
// Routes for chat/Q&A about contracts

import express from 'express'
import { sendMessage, getChatHistory } from '../controllers/chatController.js'

const router = express.Router()

// POST /api/chat/message - Send a chat message about a contract
router.post('/message', sendMessage)

// GET /api/chat/history/:contractId - Get chat history for a contract
router.get('/history/:contractId', getChatHistory)

export default router
