import React, { useState } from 'react';
import GridDistortion from '../components/GridDistortion';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../utils/apiEndpoints';
import toast from 'react-hot-toast';
import axiosConfig from '../utils/axiosConfig';
import ProfilePhotoSelector from '../components/ProfilePhotoSelector';
import uploadProfileImage from '../utils/uploadProfileImage';
import { assets } from '../assets/assests';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
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
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with backend API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({}); // Clear any previous errors

    try {
      let profilePhotoUrl = null;

      // Upload profile photo to Cloudinary first if selected
      if (profilePhoto) {
        try {
          const uploadResponse = await uploadProfileImage(profilePhoto);
          profilePhotoUrl = uploadResponse.secure_url;
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          toast.error("Failed to upload profile image. Continuing without it.");
        }
      }

      // Send registration data to your backend
      const registrationData = {
        fullName: formData.name,
        email: formData.email,
        password: formData.password
      };

      // Add profile photo URL if upload was successful
      if (profilePhotoUrl) {
        registrationData.profileImageUrl = profilePhotoUrl; //backend name is profile Image url
      }

      console.log("Sending registration data:", registrationData);

      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, registrationData);

      if (response.status === 201) {
        console.log('Registration successful:', response.data);
        toast.success("Account created successfully!");
        setShowSuccess(true);

        // Reset form after successful signup
        setTimeout(() => {
          setFormData({ name: '', email: '', password: '' });
          setProfilePhoto(null);
          setShowSuccess(false);
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error('Something went wrong:', error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          if (data.errors) {
            setErrors(data.errors);
          } else {
            toast.error(data.message || "Invalid input data");
          }
        } else if (status === 409) {
          toast.error("User with this email already exists");
          setErrors({ email: "User with this email already exists" });
        } else if (status === 500) {
          toast.error("Server error. Please try again later");
        } else {
          toast.error(data.message || "Something went wrong");
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* Left Column - Signup Form */}
      <div className="w-1/2 bg-white flex items-center justify-center p-3 relative z-10">
        <div className="max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join us and start your journey today</p>
          </div>

          {showSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-green-700 font-medium">Account created successfully!</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Profile Photo Selector */}
            <div className="mb-8">
              <ProfilePhotoSelector 
                image={profilePhoto} 
                setImage={setProfilePhoto}
              />
              <p className="text-center text-sm text-gray-500 mt-2">
                Add a profile photo (optional)
              </p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors ${
                  errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors ${
                  errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors ${
                  errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="Create a secure password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-white font-medium transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-1'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column - Grid Distortion */}
      <div className="w-1/2 relative overflow-hidden flex items-center justify-center bg-black">
        <GridDistortion
          imageSrc={assets.LoginImage}
          grid={10}
          mouse={0.1}
          strength={0.25}
          relaxation={0.9}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default Signup;
