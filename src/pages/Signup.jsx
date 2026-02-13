import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import doorIllustration from '../assets/signup.png';
import surviantLogo from '../assets/logo.png';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate password length
    if (formData.password.length < 8) {
      setErrors({ password: 'Must be at least 8 characters.' });
      return;
    }

    // Validate terms checkbox
    if (!agreedToTerms) {
      setErrors({ terms: 'You must agree to use PRD AI for internal product documentation purposes.' });
      return;
    }

    setIsSubmitting(true);

    // FOR TESTING - Uncomment this and comment out the API code below
    setTimeout(() => {
      navigate('/user-profile');
      setIsSubmitting(false);
    }, 1000);

    /*
    try {
      const response = await fetch('YOUR_BACKEND_URL/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/user-profile');
      } else {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ submit: data.message || 'Sign up failed. Please try again.' });
        }
      }
    } catch (err) {
      console.error('Sign up error:', err);
      setErrors({ submit: 'Unable to connect to the server. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Sign Up Form */}
      <div className="w-1/2 bg-white flex flex-col p-12">
        {/* Logo - Fixed at top */}
        <div className="mb-8">
          <img 
            src={surviantLogo} 
            alt="Surviant Logo" 
            className="h-12"
          />
        </div>

        {/* Form - Centered in remaining space */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-[70%]"> {/*reduced width*/ }
            {/* Sign Up Heading */}
            <div className="text-black mb-3 font-medium" style={{ fontSize: '30px' }}>Sign up</div>
            
            {/* Sign In Link */}
            <p className="text-black mb-8 font-regular" style={{ fontSize: '16px' }}>
              Create an account to start generating structured PRDs with AI.
              <br />
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
                Sign in
              </Link>
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Full Name Input */}
              <div className="mb-6">
                <label className="block text-black text-sm font-regular mb-2" style={{ fontSize: '16px' }}>
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Johnson"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-2">{errors.name}</p>
                )}
              </div>

              {/* Work Email Input */}
              <div className="mb-6">
                <label className="block text-black text-sm font-regular mb-2"style={{ fontSize: '16px' }}>
                  Work Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. alex@company.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-2">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-2">
                <label className="block text-black text-sm font-regular mb-2" style={{ fontSize: '16px' }}>
                  Enter your Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a secure password"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-black text-xs mt-2 text-right">Must be at least 8 characters.</p>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="mb-8 mt-6">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (errors.terms) {
                        setErrors({ ...errors, terms: '' });
                      }
                    }}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 mt-0.5 flex-shrink-0"
                    disabled={isSubmitting}
                  />
                  <span className="ml-3 text-sm text-black"style={{fontSize:'12px'}}>
                    By continuing, you agree to use PRD AI for internal product documentation purposes.
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-600 text-sm mt-2">{errors.terms}</p>
                )}
              </div>

              {/* General Submit Error */}
              {errors.submit && (
                <p className="text-red-600 text-sm mb-6">{errors.submit}</p>
              )}

              {/* Register Button */}
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
                    Creating account...
                  </span>
                ) : (
                  'Register'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration & Gradient */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full h-[calc(100vh-4rem)] bg-gradient-to-r from-[#FF7A1F] via-[#B8957A] to-[#4A9FE5] flex flex-col justify-end items-center pb-12 px-16 text-white rounded-3xl">   
          {/* Illustration */}
          <div className="flex items-end justify-center mb-8">
            <img 
              src={doorIllustration} 
              alt="Person entering door" 
              className="w-[35rem] h-[35rem] object-contain"
            />
          </div>

          {/* Text */}
          <div className="">
            
            <h2 className="text-5xl font-medium mb-4" style={{fontSize:'40px'}}>Sign up to PRD AI</h2>
            <p className="text-lg opacity-90 max-w-md mx-auto font-light" style={{ fontSize: '20px' }}>
              Create your account to start building accurate, structured PRDs with AI assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;