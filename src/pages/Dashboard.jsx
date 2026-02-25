import { useState } from 'react';
import { Link } from 'react-router';
import { Home, Clock, Settings, HelpCircle, MessageSquarePlus, Upload, ChevronRight, LogOut, ChevronsLeft } from 'lucide-react';
import surviantLogo from '../assets/logo.png';
import clipboard from '../assets/clipboard.png'; 

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Sample recent conversations - start with empty array for testing
  const [recentConversations, setRecentConversations] = useState([ 
   {
      id: 1,
      title: 'E-Commerce Platform PRD',
      status: 'In Progress',
      statusColor: 'blue',
      updatedTime: '2 hours ago'
    },
    {
      id: 2,
      title: 'CRM System Brief',
      status: 'Completed',
      statusColor: 'green',
      updatedTime: '2 hours ago'
    },
    {
      id: 3,
      title: 'Mobile App Requirements',
      status: 'In Progress',
      statusColor: 'blue',
      updatedTime: '2 hours ago'
    },
    {
      id: 4,
      title: 'Fitness App Requirements',
      status: 'In Progress',
      statusColor: 'blue',
      updatedTime: '2 hours ago'
    }
   ]);
  
  // Check if there are conversations
  const hasConversations = recentConversations.length > 0;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
      
      if (validTypes.includes(file.type)) {
        setSelectedFile(file);
        console.log('File selected:', file.name);
        console.log('File size:', file.size);
        console.log('File type:', file.type);
      } else {
        alert('Please upload a PDF, DOCX, or image file.');
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-70 bg-white flex flex-col">
        {/* Logo and Toggle */}
        <div className="p-6 flex items-center justify-between">
          <img 
            src={surviantLogo} 
            alt="Surviant Logo" 
            className="h-10"
          />
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronsLeft size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-black bg-blue-50 rounded-lg font-medium">
                <Home size={20} />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-50 rounded-lg transition-colors">
                <Clock size={20} />
                <span>History</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-50 rounded-lg transition-colors">
                <Settings size={20} />
                <span>Setting</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-50 rounded-lg transition-colors">
                <HelpCircle size={20} />
                <span>Help</span>
              </a>
            </li>
          </ul>
        </nav>

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
      <main className="flex-1 overflow-auto rounded-tl-3xl bg-white">
        {/* Header */}
        <header className="bg-white px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        </header>

        {/* Content Area */}
        <div className="p-16 bg-[#F7F8FF]">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, User.</h2>
            <p className="text-gray-600">Continue where you left off or start a new requirement.</p>
          </div>

          {/* Start New Chat Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Start a New Chat</h3>
            <p className="text-gray-600 mb-6">
              Capture product requirements through guided AI conversations or upload an existing PRD or brief.
            </p>
            
            <div className="flex gap-4 mb-4">
              <button 
                className="flex items-center gap-2 px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#1F8DE6' }}
              >
                <MessageSquarePlus size={20} />
                <span>Start New Conversation</span>
              </button>
              
              {/* File Upload Button */}
              <label className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                <Upload size={20} />
                <span>Upload Existing PRD</span>
                <input 
                  type="file" 
                  accept=".pdf,.docx,image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            {/* Show selected file */}
            {selectedFile && (
              <p className="text-sm text-green-600 mb-2">
                ✓ Selected: {selectedFile.name}
              </p>
            )}
            
            <p className="text-sm text-gray-500">
              Supports PDF, DOCX, and image files with diagrams.
            </p>
          </div>

          {/* Recent Conversations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
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

            {/* Conditional Rendering: Show conversations or empty state */}
            {hasConversations ? (
              // Conversations List
              <div className="divide-y divide-gray-200">
                {recentConversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-1">{conversation.title}</h4>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span 
                          className={`w-2 h-2 rounded-full ${
                            conversation.statusColor === 'blue' ? 'bg-blue-500' : 'bg-green-500'
                          }`}
                        ></span>
                        <span className="text-sm text-gray-600">{conversation.status}</span>
                      </div>
                      
                      <span className="text-sm text-gray-400">•</span>
                      
                      <span className="text-sm text-gray-600">Updated {conversation.updatedTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-16">
              <img 
    src={clipboard} 
    alt="No conversations" 
    className="w-48 h-48 mb-6 object-contain"
  />
                <p className="text-gray-500">No conversations yet. Let's turn your next idea into a structured plan.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}