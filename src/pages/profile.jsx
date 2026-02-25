import React from 'react';
import { Home, Clock, Settings as SettingsIcon, HelpCircle, LogOut, ChevronsLeft, Key, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import surviantLogo from '../assets/logo.png';


export default function Profile() {
  return (
    <div className="flex h-screen bg-gray-50">
  {/* Sidebar */}
  <aside className="w-70 bg-white flex flex-col">
    {/* Logo and Close Button */}
    <div className="p-6 flex items-center justify-between">
      <img 
        src={surviantLogo} 
        alt="Surviant Logo" 
        className="h-10"
      />
      <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <ChevronsLeft size={20} className="text-gray-600" />
      </Link>
    </div>

        {/* Navigation */}
        <nav className=" p-4">
          <ul className="space-y-1">
            <li>
              <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-50 rounded-lg transition-colors">
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/history" className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-50 rounded-lg transition-colors">
                <Clock size={20} />
                <span>History</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-50 rounded-lg transition-colors">
                <SettingsIcon size={20} />
                <span>Setting</span>
              </Link>
            </li>
            <li>
              <Link to="/help" className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-50 rounded-lg transition-colors">
                <HelpCircle size={20} />
                <span>Help</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex-1"></div>

        {/* User Profile */}
        <div className="p-6 mb-10">
          <Link to="/profile" className="flex items-center gap-3 mb-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Culaccino" 
              alt="User" 
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">Surviant</p>
              <p className="text-xs text-gray-500">UX Designer</p>
            </div>
          </Link>
          <button className="flex items-center gap-2 text-red-500 text-sm font-medium hover:text-red-600 transition-colors p-6">
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white px-8 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-full bg-[#F7F8FF]">
          {/* Account Information Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-10 mb-10 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Account Information</h2>
            <p className="text-black text-sm mb-6">Manage your account information and preferences.</p>

            <div className="space-y-4">
              {/* Full Name */}
              <div className="flex items-center">
                <label className="w-48 text-black font-semibold">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Email Address */}
              <div className="flex items-center">
  <label className="w-48 text-black font-semibold">Email Address</label>
  <div className="flex-1 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-white">
    <input
      type="email"
      defaultValue="Johndoe@gmail.com"
      className="flex-1 outline-none border-none focus:ring-0"
    />
    <span className="flex items-center gap-1 text-green-600 text-sm font-medium whitespace-nowrap">
      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
      Verified
    </span>
  </div>
</div>

              {/* Role */}
              <div className="flex items-center">
                <label className="w-48 text-black font-semibold">Role</label>
                <input
                  type="text"
                  defaultValue="UX Designer"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Organization */}
              <div className="flex items-center">
                <label className="w-48 text-black font-semibold">Organization</label>
                <input
                  type="text"
                  defaultValue="XYZ Company"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Security</h2>

            <button 
              className="flex items-center gap-2 px-6 py-3 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#1F8DE6' }}
            >
              <Key size={20} />
              <span>Change Password</span>
            </button>
          </div>

          {/* Danger Zone Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Danger Zone</h2>

            <button className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors mb-3">
              <Trash2 size={20} />
              <span>Delete Account</span>
            </button>

            <p className="text-sm text-black">
              This will permanently delete your account and all conversations. This action cannot be undone.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}