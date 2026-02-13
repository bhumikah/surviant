import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import forgotPasswordIllustration from '../assets/forgotpassword.png';
import surviantLogo from '../assets/logo.png';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  // Email validation function  
  const validateEmail = (email) => {
    if (!email || email.trim() === '') {
      return { valid: false, error: 'Email address is required', type: 'empty' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, error: 'Please enter a valid email address', type: 'invalid' };
    }

    if (email.startsWith('@') || email.endsWith('@')) {
      return { valid: false, error: 'Please enter a valid email address', type: 'invalid' };
    }

    if (email.length < 5) {
      return { valid: false, error: 'Email address is too short', type: 'invalid' };
    }

    if (email.length > 254) {
      return { valid: false, error: 'Email address is too long', type: 'invalid' };
    }

    return { valid: true, error: '', type: '' };
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (error && touched) {
      setError('');
      setErrorType('');
    }
  };

  const handleBlur = () => {
    setTouched(true);
    
    const validation = validateEmail(email);
    if (!validation.valid) {
      setError(validation.error);
      setErrorType(validation.type);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrorType('');
    setTouched(true);

    const validation = validateEmail(email);
    if (!validation.valid) {
      setError(validation.error);
      setErrorType(validation.type);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('YOUR_BACKEND_URL/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/check-inbox', { state: { email } });
      } else if (response.status === 404) {
        setError("We couldn't find an account with that email.");
        setErrorType('not-found');
      } else if (response.status >= 500) {
        setError('Something went wrong. Please try again.');
        setErrorType('server');
      } else {
        setError(data.message || 'Something went wrong');
        setErrorType('server');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Unable to connect to the server. Please check your internet connection.');
      setErrorType('server');
    } finally {
      setIsSubmitting(false);
    } 

    // FOR TESTING - Uncomment this and comment out the above
   
    setTimeout(() => {
      navigate('/check-inbox', { state: { email } });
      setIsSubmitting(false);
    }, 1000);
    
  };

  const getInputBorderClass = () => {
    if (error && touched) return 'border-red-500';
    if (touched && !error && email) return 'border-green-500';
    return 'border-gray-300';
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Forgot Password Form */}
      <div className="w-1/2 bg-white flex flex-col p-12">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src={surviantLogo} 
            alt="Surviant Logo" 
            className="h-12"
          />
        </div>

        {/* Form - Positioned higher */}
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
            <h1 className="text-4xl font-medium text-black mb-6"style={{fontSize:'30px'}}>
              Forgot your password?
            </h1>
            
            {/* Description */}
            <p className="text-black mb-10 font-regular" style={{fontSize:'16px'}}  >
              No worries. Enter your email and we'll send you a link to reset your password.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              {/* Email Input */}
              <div className="mb-10">
                <label className="block text-black text-sm font-regular mb-3"style={{fontSize:'16px'}}>
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleBlur}
                  placeholder="e.g. alex@company.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${getInputBorderClass()}`}
                  disabled={isSubmitting}
                  aria-invalid={error && touched ? 'true' : 'false'}
                  aria-describedby={error && touched ? 'email-error' : undefined}
                />
                
                {/* Inline Error Messages */}
                {error && touched && (errorType === 'invalid' || errorType === 'empty' || errorType === 'not-found') && (
                  <p id="email-error" className="text-red-600 text-sm mt-2 flex items-start gap-1">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </p>
                )}
              </div>

              {/* Server Error Text */}
              {error && touched && errorType === 'server' && (
                <div className="text-red-600 text-sm mt-2 mb-6 flex items-start gap-1">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-full transition-colors duration-200 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send reset link'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration & Gradient */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full h-[calc(100vh-4rem)] bg-gradient-to-r from-[#FF7A1F] via-[#B8957A] to-[#4A9FE5] flex flex-col justify-end items-center pb-12 px-16 text-white rounded-3xl">  
          <div className="flex items-end justify-center mb-8">
            <img 
              src={forgotPasswordIllustration} 
              alt="Person with question mark" 
              className="w-[35rem] h-[35rem] object-contain"
            />
          </div>

          {/* Text */} 
          <div className="">
            <h2 className="text-5xl font-semibold mb-4" style={{fontSize:'40px'}}>Welcome to PRD AI</h2>
            <p className="text-lg opacity-90 max-w-md mx-auto font-light" style={{ fontSize: '20px' }}>
              Turn conversations into clear, structured product requirements in minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;