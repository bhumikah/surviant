import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown } from 'lucide-react';
import onboardingIllustration from '../assets/userprofile.png'; // You'll need this image
import surviantLogo from '../assets/logo.png';

function UserProfile() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    'Product Manager',
    'Project Manager',
    'Business Analyst',
    'Software Engineer',
    'Designer',
    'QA Engineer',
    'Scrum Master',
    'CEO/Founder',
    'Other'
  ];

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setIsDropdownOpen(false);
    if (errors.role) {
      setErrors({ ...errors, role: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!role) {
      newErrors.role = 'Please select your role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('YOUR_BACKEND_URL/api/user/profile', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Add authorization token if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          companyName: companyName.trim(),
          role: role
        })
      });

      if (response.ok) {
        // Navigate to dashboard or main app
        navigate('/dashboard');
      } else {
        setErrors({ submit: 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      console.error('Profile update error:', err);
      setErrors({ submit: 'Unable to save your information. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }

    // FOR TESTING - Uncomment this and comment out the above
    /*
    setTimeout(() => {
      navigate('/dashboard');
      setIsSubmitting(false);
    }, 1000);
    */
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
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
            {/* Heading */}
            <h1 className="text-4xl font-medium text-black mb-3" style={{fontSize:'30px'}}>
              Let's get to know you
            </h1>
            
            {/* Description */}
            <p className="text-black mb-10 font-regular" style={{fontSize:'16px'}}>
              Just a few details to get started.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              {/* Company Name Input */}
              <div className="mb-6">
                <label className="block text-black text-sm font-regular mb-2"style={{fontSize:'16px'}}>
                  Company name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    if (errors.companyName) {
                      setErrors({ ...errors, companyName: '' });
                    }
                  }}
                  placeholder="e.g. Acme Corp"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.companyName && (
                  <p className="text-red-600 text-sm mt-2">{errors.companyName}</p>
                )}
              </div>

              {/* Role Dropdown */}
              <div className="mb-8">
                <label className="block text-black text-sm font-regular mb-2" style={{fontSize:'16px'}}>
                  Your role
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors flex items-center justify-between bg-white ${
                      errors.role ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  >
                    <span className={role ? 'text-gray-900' : 'text-gray-400'}>
                      {role || 'Product Manager'}
                    </span>
                    <ChevronDown 
                      size={20} 
                      className={`text-gray-400 transition-transform ${
                        isDropdownOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                      {roles.map((roleOption) => (
                        <button
                          key={roleOption}
                          type="button"
                          onClick={() => handleRoleSelect(roleOption)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-gray-700 border-b border-gray-100 last:border-b-0"
                        >
                          {roleOption}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.role && (
                  <p className="text-red-600 text-sm mt-2">{errors.role}</p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="text-red-600 text-sm mb-6 flex items-start gap-1">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.submit}</span>
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
                    Saving...
                  </span>
                ) : (
                  'Get started'
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
              src={onboardingIllustration} 
              alt="User onboarding illustration" 
              className="w-[35rem] h-[35rem] object-contain"
            />
          </div>

          {/* Text */}
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

export default UserProfile;