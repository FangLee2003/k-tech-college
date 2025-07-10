import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Shield } from 'lucide-react';

// Import các component đã viết từ registration form
import CheckboxField from '../../components/CheckboxField';
import InputField from '../../components/InputField';

// Validation schema for login
const loginSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required')
        .min(5, 'Username must be at least 5 characters')
        .test('email-or-phone', 'Must be a valid email or phone number', (value) => {
            if (!value) return false;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\d{10,15}$/;
            return emailRegex.test(value) || phoneRegex.test(value);
        }),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[a-zA-Z])(?!.*\s).*$/, 'Password must contain at least 1 letter and no spaces'),
    rememberMe: yup.boolean().optional()
});

// Types
interface LoginFormData {
    username: string;
    password: string;
    rememberMe: boolean;
}

// Profile Card Component for Hero Section
const ProfileCard: React.FC<{ color: string; position: string; size: string }> = ({
    color,
    position,
    size
}) => {
    return (
        <div
            className={`absolute ${position} ${size} ${color} rounded-2xl shadow-lg overflow-hidden`}
        >
            <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>
    );
};

// Main Login Form Component
const LoginForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            username: '',
            password: '',
            rememberMe: false
        }
    });

    const rememberMe = watch('rememberMe');

    const onSubmit = (data: LoginFormData) => {
        console.log('Login form submitted:', data);

        if (data.rememberMe) {
            console.log('User wants to be remembered');
            // Mock localStorage logic
            console.log('Saving user session...');
        }

        alert(`Welcome back! Logging in as: ${data.username}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Side - Hero Section */}
            <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:items-center bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div className="max-w-lg text-center z-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Set Your Partner Recruitment on Auto-Pilot
                    </h1>

                    {/* Hero Image - Woman celebrating */}
                    <div className="relative mx-auto w-80 h-80 mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full"></div>
                        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                            <div className="text-6xl">👩‍💼</div>
                        </div>

                        {/* Floating Profile Cards */}
                        <ProfileCard
                            color="bg-red-400"
                            position="top-4 right-8"
                            size="w-16 h-16"
                        />
                        <ProfileCard
                            color="bg-blue-400"
                            position="top-16 right-16"
                            size="w-12 h-12"
                        />
                        <ProfileCard
                            color="bg-yellow-400"
                            position="bottom-8 left-4"
                            size="w-20 h-20"
                        />
                        <ProfileCard
                            color="bg-purple-400"
                            position="bottom-16 left-12"
                            size="w-14 h-14"
                        />
                    </div>
                </div>

                {/* Background Decorative Elements */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full"></div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-6">
                            <Shield size={32} className="text-red-500 mr-2" />
                            <h1 className="text-2xl font-bold text-gray-900">Grovia</h1>
                        </div>
                        <h2 className="text-3xl font-bold text-red-500 mb-2">Login</h2>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Login to your account
                        </h3>
                        <p className="text-sm text-gray-600">
                            Thank you for get back to Grovia, let's access our the best
                            recommendation contact for you.
                        </p>
                    </div>

                    {/* Login Form - Sử dụng lại InputField và CheckboxField */}
                    <div className="space-y-6">
                        <InputField
                            label="Username"
                            name="username"
                            type="text"
                            placeholder="Email or Phone Number"
                            register={register}
                            error={errors.username?.message}
                        />

                        <InputField
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            register={register}
                            error={errors.password?.message}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                        />

                        <div className="flex items-center justify-between">
                            <CheckboxField
                                label="Remember me"
                                name="rememberMe"
                                register={register}
                                error={errors.rememberMe?.message}
                            />
                            <button
                                type="button"
                                className="text-sm text-red-500 hover:text-red-600 font-medium"
                                onClick={() => alert('Reset password functionality')}
                            >
                                Reset Password?
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            disabled={!isValid}
                            className={`w-full py-3 px-4 rounded-lg text-white font-semibold text-lg transition-colors ${isValid
                                ? 'bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
                                : 'bg-gray-400 cursor-not-allowed'
                                }`}
                        >
                            SIGN IN
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            Don't have an account yet?{' '}
                            <button
                                type="button"
                                className="text-red-500 hover:text-red-600 font-medium"
                                onClick={() => alert('Redirect to registration')}
                            >
                                Join Grovia Now!
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;