// src/pages/Login.tsx

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '../services';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { LoginContext } from '../context';

// Strong typed interface for form data
interface IFormInput {
  username: string;
  password: string;
}

// Yup validation schema with strong typing
const validationSchema: yup.ObjectSchema<IFormInput> = yup.object({
  username: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters'),
});

const Login = () => {
  const { setUser } = useContext(LoginContext);
  const navigate = useNavigate(); // Use navigate from react-router-dom for redirection
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange', // Validate on change for better UX
    defaultValues: {
      username: 'tungnt@softech.vn',
      password: '123456789', // Example default value
    },
  });

  const onSubmit = async (data: IFormInput): Promise<void> => {
    try {
      const user = await login(data.username, data.password);
      setUser(user); // Set the user in context
      navigate('/tasks'); // Redirect to tasks page on successful login
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Login
          </h2>

          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">📧</span>
              </div>
              <input
                id="username"
                type="text"
                {...register('username')}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.username
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50'
                    : !errors.username && dirtyFields.username
                    ? 'border-green-300 focus:border-green-500 focus:ring-green-200 bg-green-50'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200 hover:border-gray-300'
                }`}
                placeholder="Enter your username"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔒</span>
              </div>
              <input
                id="password"
                type="password"
                {...register('password')}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.password
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50'
                    : !errors.password && dirtyFields.password
                    ? 'border-green-300 focus:border-green-500 focus:ring-green-200 bg-green-50'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200 hover:border-gray-300'
                }`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
              isSubmitting || !isValid 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>

          {/* Form validation status indicator */}
          <div className="mt-6 text-center">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              isValid 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              <span className="mr-1">
                {isValid ? '✓' : '⚠️'}
              </span>
              {isValid ? 'Form is valid' : 'Please fill in all required fields correctly'}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;