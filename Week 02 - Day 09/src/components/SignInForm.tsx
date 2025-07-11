import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

interface Props {
  email: string;
  onSubmit: (data: SignInFormType) => void;
}

const signInSchema = yup.object({
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  rememberMe: yup.boolean().notRequired().default(false),
});

type SignInFormType = yup.InferType<typeof signInSchema>;

export default function SignInForm({ email, onSubmit }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignInFormType>({
    resolver: yupResolver(signInSchema),
    defaultValues: { email, password: '', rememberMe: false },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <span className="text-xl font-bold text-white">JD</span>
        </div>
        <div>
          <h2 className="text-white font-semibold">Jane Doe</h2>
          <p className="text-white/60 text-sm">{email}</p>
        </div>
      </div>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          {...form.register('password')}
          className="w-full px-4 py-3 pr-16 bg-white/90 backdrop-blur-sm border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-gray-600 hover:text-gray-900"
        >
          {showPassword ? 'Hide' : 'View'}
        </button>
        {form.formState.errors.password && (
          <p className="text-red-400 text-sm mt-1">{form.formState.errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
      >
        Continue
      </button>
      <div className="mt-4 text-center">
        <a href="#" className="text-green-500 hover:text-green-400 text-sm">
          Forgot your password?
        </a>
      </div>
    </form>
  );
}
