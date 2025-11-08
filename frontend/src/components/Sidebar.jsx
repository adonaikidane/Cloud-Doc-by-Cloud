// Sidebar.jsx
// Navigation sidebar with links to main pages
// Shows: Logo, Chat, Library, Compare, Settings

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MessageSquare, FolderOpen, GitCompare, Settings } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: MessageSquare, label: 'Chat Analysis' },
    { path: '/library', icon: FolderOpen, label: 'Contract Library' },
    { path: '/compare', icon: GitCompare, label: 'Compare Contracts' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary-600">
          ClauseCloud
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          AI Contract Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer info */}
      <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
        <p>Built with Claude AI</p>
        <p className="mt-1">© 2025 ClauseCloud</p>
      </div>
    </aside>
  )
}

export default Sidebar
