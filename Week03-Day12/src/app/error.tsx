'use client';

interface ErrorProps {
    // error: Error & { digest?: string };
    error: string;
    reset: () => void;
}

export default function Error({ error, reset, }: ErrorProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                            <span className="text-white font-bold text-xl">⚠️</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                Something went wrong!
                            </h1>
                            <p className="text-gray-600 mt-1">An error occurred while loading the task management page</p>
                        </div>
                    </div>
                </div>

                {/* Error Details */}
                <section className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-orange-600 p-4">
                        <h2 className="text-lg font-semibold text-white flex items-center">
                            <span className="mr-2">🚨</span>
                            Error Details
                        </h2>
                    </div>

                    <div className="p-6">
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 mb-6">
                            <div className="flex items-start">
                                <div className="text-red-500 text-xl mr-3 mt-1">⚠️</div>
                                <div>
                                    <h3 className="font-semibold text-red-800 mb-2">Error Message:</h3>
                                    <p className="text-red-700 mb-3">{error}</p>
{/* 
                                    {error.digest && (
                                        <div className="text-sm text-red-600">
                                            <strong>Error ID:</strong> {error.digest}
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={reset}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium flex items-center justify-center"
                            >
                                <span className="mr-2">🔄</span>
                                Try again
                            </button>

                            <button
                                onClick={() => window.location.href = '/'}
                                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 font-medium flex items-center justify-center"
                            >
                                <span className="mr-2">🏠</span>
                                Go Home
                            </button>
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-medium text-gray-800 mb-2">💡 What can you do:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Try refreshing the page</li>
                                <li>• Check your internet connection</li>
                                <li>• Contact support if the problem persists</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}