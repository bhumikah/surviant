import { Link, useLocation } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import checkInboxIllustration from '../assets/checkinbox.png';
import surviantLogo from '../assets/logo.png';

function CheckInbox() {
  const location = useLocation();
  const email = location.state?.email || 'your email';

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side */}
      <div className="w-1/2 bg-white flex flex-col p-12">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src={surviantLogo} 
            alt="Surviant Logo" 
            className="h-12"
          />
        </div>

        {/* Content - Positioned higher */}
        <div className="flex-1 flex items-start justify-center pt-20">
          <div className="w-full max-w-[70%]">
            {/* Back to Login Link */}
            <Link 
              to="/login" 
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-12 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back to login Page
            </Link>

            {/* Heading */}
            <h1 className="text-4xl font-medium text-black mb-4" style={{fontSize:'30px'}}>
              Check your inbox
            </h1>
            
            {/* Description */}
            <p className="text-black mb-2 font-regular" style={{fontSize:'16px'}}>
              We've sent a password reset link to your email.
            </p>
            <p className="text-black mb-10 font-regular" style={{fontSize:'16px'}}>
              If you don't see it, check your spam folder.
            </p>

            {/* Resend Link Button */}
            <Link
              to="/forgot-password"
              className="w-full block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-full transition-colors duration-200"
            >
              Resend link
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration & Gradient */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full h-[calc(100vh-4rem)] bg-gradient-to-r from-[#FF7A1F] via-[#B8957A] to-[#4A9FE5] flex flex-col justify-end items-center pb-12 px-16 text-white rounded-3xl">
          
          {/* Illustration */}
          <div className="flex items-end justify-center mb-8">
            <img 
              src={checkInboxIllustration} 
              alt="Check inbox illustration" 
              className="w-[35rem] h-[35rem] object-contain"
            />
          </div>

          {/* Text */}
          <div className="">
            <h2 className="text-5xl font-semibold mb-4"style={{fontSize:'40px'}}>Welcome to PRD AI</h2>
            <p className="text-lg opacity-90 max-w-md mx-auto font-light" style={{fontSize:'20px'}}>
              Turn conversations into clear, structured product requirements in minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckInbox;