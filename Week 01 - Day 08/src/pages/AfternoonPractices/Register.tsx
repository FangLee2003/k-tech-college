import React from 'react';
import RegisterForm from '../../components/RegisterForm';

const RegisterPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:items-center bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8">
                <div className="max-w-md text-center">
                    <div className="flex items-center justify-center mb-8">
                        {/* You can use your logo here */}
                        <span className="mr-2">🎰</span>
                        <h1 className="text-2xl font-bold">Lottery Display</h1>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                        A few clicks away from creating your Lottery Display
                    </h2>
                    <div className="relative mx-auto w-64 h-48 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg shadow-lg">
                        <div className="absolute inset-4 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 bg-yellow-400 rounded-full"></div>
                        <div className="absolute top-4 right-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-white"></div>
                    </div>
                </div>
            </div>
            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-md">
                    <div className="lg:hidden mb-8 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <span className="mr-2">🎰</span>
                            <h1 className="text-xl font-bold text-gray-900">Lottery Display</h1>
                        </div>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;