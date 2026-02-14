import React from 'react';
import { Home, Clock, Settings, HelpCircle, MessageSquarePlus, Upload, ChevronRight, LogOut } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">Surviant</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium">
                <Home size={20} />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Clock size={20} />
                <span>History</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Settings size={20} />
                <span>Setting</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <HelpCircle size={20} />
                <span>Help</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" 
              alt="User" 
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">Culaccino_</p>
              <p className="text-xs text-gray-500">UI Designer</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-red-500 text-sm font-medium hover:text-red-600 transition-colors">
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, User.</h2>
            <p className="text-gray-600">Continue where you left off or start a new requirement.</p>
          </div>

          {/* Start New Chat Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Start a New Chat</h3>
            <p className="text-gray-600 mb-6">
              Capture product requirements through guided AI conversations or upload an existing PRD or brief.
            </p>
            
            <div className="flex gap-4 mb-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                <MessageSquarePlus size={20} />
                <span>Start New Conversation</span>
              </button>
              
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                <Upload size={20} />
                <span>Upload Existing PRD</span>
              </button>
            </div>
            
            <p className="text-sm text-gray-500">
              Supports PDF, DOCX, and image files with diagrams.
            </p>
          </div>

          {/* Recent Conversations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Recent Conversations</h3>
                <p className="text-gray-600 text-sm">Your most recent requirement sessions.</p>
              </div>
              <a href="#" className="flex items-center gap-1 text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors">
                View all Conversation
                <ChevronRight size={16} />
              </a>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gray-100 rounded-lg transform rotate-12"></div>
                <div className="w-32 h-32 bg-gray-50 rounded-lg absolute top-4 left-4 transform -rotate-6"></div>
                <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg absolute top-8 left-8"></div>
              </div>
              <p className="text-gray-500">No conversations yet. Let's turn your next idea into a structured plan.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}