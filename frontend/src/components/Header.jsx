// Header.jsx
// Top header bar with page title and optional actions

import React from 'react'
import { Bell, User } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page title - can be dynamic based on route */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Contract Analysis
          </h2>
          <p className="text-sm text-gray-500">
            Upload and analyze contracts instantly
          </p>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell className="w-5 h-5 text-gray-600" />
            {/* Notification badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User menu */}
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              User
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
