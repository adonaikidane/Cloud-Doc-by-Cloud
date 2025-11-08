// SettingsPage.jsx
// Page 4 - Company Profile & Settings
// Features:
// - Company profile (name, industry, size)
// - Red lines configuration
// - Risk tolerance settings
// - Notification preferences
// - Benchmark comparisons toggle

import React, { useState } from 'react'
import { Save, Building, AlertCircle, Bell, BarChart } from 'lucide-react'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
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
  })

  const [hasChanges, setHasChanges] = useState(false)

  const updateCompany = (field, value) => {
    setSettings({
      ...settings,
      company: { ...settings.company, [field]: value },
    })
    setHasChanges(true)
  }

  const toggleRedLine = (id) => {
    setSettings({
      ...settings,
      redLines: settings.redLines.map(rl =>
        rl.id === id ? { ...rl, enabled: !rl.enabled } : rl
      ),
    })
    setHasChanges(true)
  }

  const updateRiskTolerance = (category, field, value) => {
    setSettings({
      ...settings,
      riskTolerance: {
        ...settings.riskTolerance,
        [category]: {
          ...settings.riskTolerance[category],
          [field]: parseInt(value),
        },
      },
    })
    setHasChanges(true)
  }

  const toggleNotification = (key) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    })
    setHasChanges(true)
  }

  const toggleBenchmark = (key) => {
    setSettings({
      ...settings,
      benchmarks: {
        ...settings.benchmarks,
        [key]: !settings.benchmarks[key],
      },
    })
    setHasChanges(true)
  }

  const saveSettings = () => {
    // TODO: API call to save settings
    console.log('Saving settings:', settings)
    setHasChanges(false)
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Customize how ClauseCloud analyzes contracts for your company
          </p>
        </div>
        
        {hasChanges && (
          <button onClick={saveSettings} className="btn-primary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        )}
      </div>

      {/* Company Profile Section */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <Building className="w-5 h-5" />
          Company Profile
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={settings.company.name}
              onChange={(e) => updateCompany('name', e.target.value)}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select
                value={settings.company.industry}
                onChange={(e) => updateCompany('industry', e.target.value)}
                className="input-field"
              >
                <option value="saas">SaaS / Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="financial">Financial Services</option>
                <option value="retail">Retail / E-commerce</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Size
              </label>
              <select
                value={settings.company.size}
                onChange={(e) => updateCompany('size', e.target.value)}
                className="input-field"
              >
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="50-200">50-200 employees</option>
                <option value="200-1000">200-1,000 employees</option>
                <option value="1000+">1,000+ employees</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Company Red Lines Section */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          Company Red Lines
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          AI will automatically flag violations of these non-negotiable rules
        </p>
        
        <div className="space-y-2">
          {settings.redLines.map((redLine) => (
            <label
              key={redLine.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={redLine.enabled}
                onChange={() => toggleRedLine(redLine.id)}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-gray-900">{redLine.label}</span>
            </label>
          ))}
        </div>

        <button className="mt-4 text-sm text-primary-600 hover:underline">
          + Add Custom Red Line
        </button>
      </div>

      {/* Risk Tolerance Settings */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Risk Tolerance Settings
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Define what's acceptable for your company
        </p>

        <div className="space-y-6">
          <RiskToleranceInput
            label="Payment Terms (days)"
            category="paymentTerms"
            values={settings.riskTolerance.paymentTerms}
            onChange={updateRiskTolerance}
          />
          <RiskToleranceInput
            label="Termination Notice (days)"
            category="terminationNotice"
            values={settings.riskTolerance.terminationNotice}
            onChange={updateRiskTolerance}
          />
          <RiskToleranceInput
            label="Contract Length (months)"
            category="contractLength"
            values={settings.riskTolerance.contractLength}
            onChange={updateRiskTolerance}
          />
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5" />
          Notification Preferences
        </h2>
        
        <div className="space-y-3">
          <NotificationToggle
            label="Email me when contract expires in 60 days"
            checked={settings.notifications.expiringContracts}
            onChange={() => toggleNotification('expiringContracts')}
          />
          <NotificationToggle
            label="Alert when red line violated in uploaded contract"
            checked={settings.notifications.redLineViolations}
            onChange={() => toggleNotification('redLineViolations')}
          />
          <NotificationToggle
            label="Weekly portfolio risk digest"
            checked={settings.notifications.weeklyDigest}
            onChange={() => toggleNotification('weeklyDigest')}
          />
        </div>
      </div>

      {/* Benchmark Comparisons */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
          <BarChart className="w-5 h-5" />
          Benchmark Comparisons
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Compare your contracts against these standards
        </p>
        
        <div className="space-y-3">
          <NotificationToggle
            label="My own contract history"
            checked={settings.benchmarks.ownHistory}
            onChange={() => toggleBenchmark('ownHistory')}
          />
          <NotificationToggle
            label="SaaS industry standards"
            checked={settings.benchmarks.saasIndustry}
            onChange={() => toggleBenchmark('saasIndustry')}
          />
          <NotificationToggle
            label="Healthcare industry standards"
            checked={settings.benchmarks.healthcare}
            onChange={() => toggleBenchmark('healthcare')}
          />
          <NotificationToggle
            label="Financial services standards"
            checked={settings.benchmarks.financial}
            onChange={() => toggleBenchmark('financial')}
          />
        </div>
      </div>
    </div>
  )
}

// Sub-components
const RiskToleranceInput = ({ label, category, values, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-3">
      {label}
    </label>
    <div className="grid grid-cols-3 gap-4">
      <div>
        <p className="text-xs text-gray-500 mb-1">Preferred</p>
        <input
          type="number"
          value={values.preferred}
          onChange={(e) => onChange(category, 'preferred', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1">Acceptable (up to)</p>
        <input
          type="number"
          value={values.acceptable}
          onChange={(e) => onChange(category, 'acceptable', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1">Flag if ≥</p>
        <input
          type="number"
          value={values.flag}
          onChange={(e) => onChange(category, 'flag', e.target.value)}
          className="w-full px-3 py-2 border border-yellow-300 rounded-lg text-sm bg-yellow-50"
        />
      </div>
    </div>
  </div>
)

const NotificationToggle = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
    />
    <span className="text-gray-900">{label}</span>
  </label>
)

export default SettingsPage
