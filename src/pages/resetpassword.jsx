import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import resetPasswordIllustration from '../assets/resetpassword.png';
import surviantLogo from '../assets/logo.png';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const [tokenStatus, setTokenStatus] = useState('valid');
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenStatus('missing');
        setIsCheckingToken(false);
        return;
      }

     /* try {
        const response = await fetch(`YOUR_BACKEND_URL/api/auth/verify-reset-token?token=${token}`);
        
        if (response.ok) {
          setTokenStatus('valid');
        } else if (response.status === 404 || response.status === 400) {
          const data = await response.json();
          if (data.message.includes('expired')) {
            setTokenStatus('expired');
          } else {
            setTokenStatus('invalid');
          }
        } else {
          setTokenStatus('invalid');
        }
      } catch (err) {
        console.error('Token verification error:', err);
        setTokenStatus('invalid');
      } finally {
        setIsCheckingToken(false);
      } */ 

      // FOR TESTING
      setTimeout(() => {
        if (!token) {
          setTokenStatus('missing');
        } else if (token === 'expired123') {
          setTokenStatus('expired');
        } else if (token === 'invalid123') {
          setTokenStatus('invalid');
        } else {
          setTokenStatus('valid');
        }
        setIsCheckingToken(false);
      }, 1000);
    };

    verifyToken();
  }, [token]);

  const validatePassword = (password) => {
    const errors = [];
    
    if (!password) {
      return { valid: false, errors: ['Password is required'] };
    }
    
    if (password.length < 8) {
      errors.push('Must be at least 8 characters');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Must contain at least one lowercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('Must contain at least one number');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (error) {
      setError('');
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    if (field === 'newPassword') {
      const validation = validatePassword(formData.newPassword);
      if (!validation.valid) {
        setErrors(prev => ({
          ...prev,
          newPassword: validation.errors[0]
        }));
      }
    }
    
    if (field === 'confirmPassword' && formData.confirmPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match'
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});
    
    setTouched({
      newPassword: true,
      confirmPassword: true
    });

    const passwordValidation = validatePassword(formData.newPassword);
    if (!passwordValidation.valid) {
      setErrors(prev => ({
        ...prev,
        newPassword: passwordValidation.errors[0]
      }));
      return;
    }

    if (!formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Please confirm your password'
      }));
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));
      return;
    }

    setIsSubmitting(true);

    /* try {
      const response = await fetch('YOUR_BACKEND_URL/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect directly to login
        navigate('/login');
      } else if (response.status === 400) {
        if (data.message.includes('expired')) {
          setTokenStatus('expired');
        } else {
          setError(data.message || 'Invalid reset link');
        }
      } else if (response.status >= 500) {
        setError('Something went wrong. Please try again.');
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError('Unable to connect to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    } */

    // FOR TESTING - Redirect directly to login
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const getInputBorderClass = (field) => {
    if (errors[field] && touched[field]) return 'border-red-500';
    if (touched[field] && formData[field] && !errors[field]) return 'border-green-500';
    return 'border-gray-300';
  };

  if (isCheckingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  // Invalid token screen
  if (tokenStatus !== 'valid') {
    return (
      <div className="min-h-screen flex bg-white">
        <div className="w-1/2 bg-white flex flex-col p-12">
          <div className="mb-8">
            <img src={surviantLogo} alt="Surviant Logo" className="h-12" />
          </div>

          <div className="flex-1 flex items-start justify-center pt-20">
            <div className="w-full max-w-md">
              <Link 
                to="/login" 
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-12 text-sm font-medium"
              >
                <ArrowLeft size={16} />
                Back to login Page
              </Link>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">Reset Password</h1>
              
              <div className="mb-6">
                <p className="text-red-600 text-sm font-semibold mb-1">
                  {tokenStatus === 'expired' && 'Link Expired'}
                  {tokenStatus === 'invalid' && 'Invalid Link'}
                  {tokenStatus === 'missing' && 'Invalid Link'}
                </p>
                <p className="text-red-600 text-sm">
                  {tokenStatus === 'expired' && 'This reset link has expired. Please request a new one.'}
                  {tokenStatus === 'invalid' && 'This reset link is invalid. Please request a new one.'}
                  {tokenStatus === 'missing' && 'This reset link is invalid. Please request a new one.'}
                </p>
              </div>

              <Link 
                to="/forgot-password"
                className="w-full block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-full transition-colors duration-200"
              >
                Request new reset link
              </Link>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="w-full h-[calc(100vh-4rem)] bg-gradient-to-r from-[#FF7A1F] via-[#B8957A] to-[#4A9FE5] flex flex-col justify-end items-center pb-12 px-16 text-white rounded-3xl">
            <div className="flex items-end justify-center mb-8">
              <img src={resetPasswordIllustration} alt="Password reset" className="w-[35rem] h-[35rem] object-contain" />
            </div>
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-4">Welcome to PRD AI</h2>
              <p className="text-lg opacity-90 max-w-md mx-auto">
                Turn conversations into clear, structured product requirements in minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white">
      <div className="w-1/2 bg-white flex flex-col p-12">
        <div className="mb-8">
          <img src={surviantLogo} alt="Surviant Logo" className="h-12" />
        </div>

        <div className="flex-1 flex items-start justify-center pt-20">
          <div className="w-full max-w-[70%]">
            <Link 
              to="/login" 
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-12 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back to login Page
            </Link>

            <h1 className="text-4xl font-medium text-black mb-4 !text-black" style={{fontSize:'30px'}}>Reset Password</h1>
            <p className="text-black mb-10 font-regular !text-black" style={{fontSize:'16px'}}     >Create a new password for your PRD AI account.</p>

            {error && (
              <p className="text-red-600 text-sm mb-6">{error}</p>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-2">
                <label className="block text-black text-sm font-regular mb-3" style={{fontSize:'16px'}}>New password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur('newPassword')}
                    placeholder="Enter a new password"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${getInputBorderClass('newPassword')}`}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.newPassword && touched.newPassword && (
                  <p className="text-red-600 text-sm mt-2">{errors.newPassword}</p>
                )}
              </div>

              <p className="text-xs text-blackmb-8 text-right font-light" style={{fontSize:'12px'}}>Must be at least 8 characters.</p>

              <div className="mb-8">
                <label className="block text-black text-sm font-regular mb-3" style={{fontSize:'16px'}}>Confirm password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur('confirmPassword')}
                    placeholder="Re-enter your new password"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${getInputBorderClass('confirmPassword')}`}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-600 text-sm mt-2">{errors.confirmPassword}</p>
                )}
              </div>

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
                    Resetting...
                  </span>
                ) : (
                  'Reset password'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full h-[calc(100vh-4rem)] bg-gradient-to-r from-[#FF7A1F] via-[#B8957A] to-[#4A9FE5] flex flex-col justify-end items-center pb-12 px-16 text-white rounded-3xl">
          <div className="flex items-end justify-center mb-8">
            <img src={resetPasswordIllustration} alt="Password reset" className="w-[35rem] h-[35rem] object-contain" />
          </div>
          <div className="">
            <h2 className="text-5xl font-semibold mb-4" style={{fontSize:'40px'}}>Welcome to PRD AI</h2>
            <p className="text-lg opacity-90 max-w-md mx-auto font-light" style={{fontSize:'20px'}}>
              Turn conversations into clear, structured product requirements in minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;