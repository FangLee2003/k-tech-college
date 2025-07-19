
import { signIn } from 'next-auth/react';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

export function GoogleLoginButton({ callbackUrl = '/task-csr' }: { callbackUrl?: string }) {
  const [loading, setLoading] = React.useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn('google', { callbackUrl });
    setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full mt-4 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 p-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow"
      disabled={loading}
    >
      <FcGoogle size={22} />
      {loading ? 'Signing in...' : 'Sign in with Google'}
    </button>
  );
}
