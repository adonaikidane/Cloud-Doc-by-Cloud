// routes/settings.js
// Routes for company settings, red lines, and preferences

import express from 'express'
import { getSettings, updateSettings, updateRedLines } from '../controllers/settingsController.js'

const router = express.Router()

// GET /api/settings - Get current settings
router.get('/', getSettings)

// PUT /api/settings - Update all settings
router.put('/', updateSettings)

// PUT /api/settings/red-lines - Update red lines specifically
router.put('/red-lines', updateRedLines)

export default router
