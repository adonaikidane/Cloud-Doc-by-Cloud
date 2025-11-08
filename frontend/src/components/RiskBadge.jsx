// RiskBadge.jsx
// Visual risk level indicator badge
// Shows color-coded risk level (Low/Medium/High) with score

import React from 'react'
import { Shield, AlertTriangle, AlertCircle } from 'lucide-react'

const RiskBadge = ({ level, score, showScore = true }) => {
  const config = {
    low: {
      color: 'text-green-700',
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: Shield,
      label: 'LOW RISK',
    },
    medium: {
      color: 'text-yellow-700',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: AlertTriangle,
      label: 'MEDIUM RISK',
    },
    high: {
      color: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: AlertCircle,
      label: 'HIGH RISK',
    },
  }

  const { color, bg, border, icon: Icon, label } = config[level.toLowerCase()] || config.medium

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${bg} ${border}`}>
      <Icon className={`w-4 h-4 ${color}`} />
      <span className={`text-xs font-semibold ${color}`}>
        {label}
      </span>
      {showScore && score !== undefined && (
        <span className={`text-xs ${color}`}>
          ({score}/20)
        </span>
      )}
    </div>
  )
}

export default RiskBadge
