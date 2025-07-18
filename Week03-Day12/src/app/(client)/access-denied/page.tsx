import Link from 'next/link';

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 text-center">
          {/* Error Icon */}
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">!</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>

          <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto mb-6"></div>

          <p className="text-gray-600 mb-3 leading-relaxed">
            You do not have permission to access this page. Please log in to continue.
          </p>

          <p className="text-gray-500 text-sm mb-8">
            If you believe this is an error, please contact support.
          </p>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-gray-600 text-sm mb-4">Return to the login page:</p>

            <Link
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              href="/login"
            >
              <span className="mr-2">🔑</span>
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
