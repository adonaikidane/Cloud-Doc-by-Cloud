// controllers/settingsController.js
// Business logic for company settings management

// In-memory settings store (for hackathon MVP)
// TODO: Replace with database
let userSettings = {
  company: {
    name: 'TechStartup Inc.',
    industry: 'saas',
    size: '50-200',
  },
  redLines: [
    { id: 1, label: 'Never accept unlimited liability', enabled: true },
    { id: 2, label: 'Liability cap must be ≤ 2x contract value', enabled: true },
    { id: 3, label: 'Payment terms must be ≤ Net 45', enabled: true },
    { id: 4, label: 'Auto-renewal notice must be ≤ 60 days', enabled: true },
    { id: 5, label: 'No exclusive partnerships', enabled: true },
    { id: 6, label: 'Must include data breach notification', enabled: false },
    { id: 7, label: 'Require right to audit vendor', enabled: false },
  ],
  riskTolerance: {
    paymentTerms: { preferred: 30, acceptable: 45, flag: 60 },
    terminationNotice: { preferred: 30, acceptable: 60, flag: 90 },
    contractLength: { preferred: 12, acceptable: 24, flag: 36 },
  },
  notifications: {
    expiringContracts: true,
    redLineViolations: true,
    weeklyDigest: false,
  },
  benchmarks: {
    ownHistory: true,
    saasIndustry: true,
    healthcare: false,
    financial: false,
  },
}

// ===== Get Settings =====

export const getSettings = async (req, res, next) => {
  try {
    res.json({
      success: true,
      settings: userSettings,
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    next(error)
  }
}

// ===== Update Settings =====

export const updateSettings = async (req, res, next) => {
  try {
    const newSettings = req.body

    // Merge with existing settings
    userSettings = {
      ...userSettings,
      ...newSettings,
    }

    res.json({
      success: true,
      message: 'Settings updated successfully',
      settings: userSettings,
    })
  } catch (error) {
    console.error('Error updating settings:', error)
    next(error)
  }
}

// ===== Update Red Lines =====

export const updateRedLines = async (req, res, next) => {
  try {
    const { redLines } = req.body

    if (!Array.isArray(redLines)) {
      return res.status(400).json({ error: 'Red lines must be an array' })
    }

    userSettings.redLines = redLines

    res.json({
      success: true,
      message: 'Red lines updated successfully',
      redLines: userSettings.redLines,
    })
  } catch (error) {
    console.error('Error updating red lines:', error)
    next(error)
  }
}

// Helper function to get active red lines
export const getActiveRedLines = () => {
  return userSettings.redLines
    .filter(rl => rl.enabled)
    .map(rl => rl.label)
}

// Helper function to get settings for contract analysis
export const getAnalysisSettings = () => {
  return {
    redLines: getActiveRedLines(),
    riskTolerance: userSettings.riskTolerance,
    companyInfo: userSettings.company,
  }
}
