import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

interface Props {
  email: string;
  onSwitchToSignIn: () => void;
  onSubmit: (data: SignUpFormType) => void;
}

const signUpSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  acceptTerms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

type SignUpFormType = yup.InferType<typeof signUpSchema>;

export default function SignUpForm({ email, onSwitchToSignIn, onSubmit }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignUpFormType>({
    resolver: yupResolver(signUpSchema),
    defaultValues: { name: '', email, password: '', acceptTerms: false },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Name"
          {...form.register('name')}
          className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {form.formState.errors.name && (
          <p className="text-red-400 text-sm mt-1">{form.formState.errors.name.message}</p>
        )}
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          {...form.register('email')}
          className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {form.formState.errors.email && (
          <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>
        )}
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
      <div className="flex items-center">
        <input type="checkbox" id="acceptTerms" {...form.register('acceptTerms')} className="mr-2" />
        <label htmlFor="acceptTerms" className="text-white/90 text-sm">
          By selecting Agree and continue below, I agree to{' '}
          <a href="#" className="text-green-500 hover:text-green-400">Terms of Service</a> and{' '}
          <a href="#" className="text-green-500 hover:text-green-400">Privacy Policy</a>.
        </label>
      </div>
      {form.formState.errors.acceptTerms && (
        <p className="text-red-400 text-sm mt-1">{form.formState.errors.acceptTerms.message}</p>
      )}
      <button
        type="submit"
        className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
      >
        Agree and continue
      </button>
      <div className="mt-4 text-center">
        <p className="text-white/80 text-sm">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-green-500 hover:text-green-400"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
}
