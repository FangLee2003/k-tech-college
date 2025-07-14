// UserDetail.jsx
import { useParams } from 'react-router-dom';
import { useUsers } from '../context/UserProvider'; // Import UserContext
import { Link } from 'react-router-dom';

export default function UserDetail() {
  const { id } = useParams(); // Lấy ID từ URL params
  const { getUserById } = useUsers(); // Lấy function từ UserContext

  const user = getUserById(id || "1"); // Tìm user theo ID

  // Nếu không tìm thấy user
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-2xl border border-red-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl font-bold">!</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">User Not Found</h3>
            <p className="text-red-500 text-sm mb-6">The user with ID "{id}" could not be found.</p>
            <Link to="/" className="inline-block bg-gray-600 text-white font-semibold py-2 px-6 rounded-xl hover:bg-gray-700 transition-colors">
              Back to Users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Hiển thị thông tin user
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">User Profile</h2>
            <p className="text-indigo-100 text-center text-sm">ID: {user.id}</p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">
                  Full Name
                </label>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 group-hover:border-indigo-300 transition-colors">
                  <p className="text-gray-800 font-semibold">{user.name}</p>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 group-hover:border-indigo-300 transition-colors">
                  <p className="text-gray-800 font-semibold break-all">{user.email}</p>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">
                  Age
                </label>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 group-hover:border-indigo-300 transition-colors">
                  <p className="text-gray-800 font-semibold">
                    {user.age ? `${user.age} years old` : 'Not specified'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
                  Edit Profile
                </button>
                <Link to="/" className="flex-1 bg-gray-100 text-center text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center">
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 text-center">
            <div className="text-xl font-bold text-indigo-600 mb-1">#{user.id}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">User ID</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 text-center">
            <div className="text-xl font-bold text-green-600 mb-1">✓</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
}