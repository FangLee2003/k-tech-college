import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface Props {
  onSubmit: (email: string) => void;
}

const emailSchema = yup.object({
  email: yup.string().required('Email is required').email('Please enter a valid email'),
});

type EmailFormType = yup.InferType<typeof emailSchema>;

export default function InitialEmailForm({ onSubmit }: Props) {
  const form = useForm<EmailFormType>({ resolver: yupResolver(emailSchema) });

  return (
    <form onSubmit={form.handleSubmit((data) => onSubmit(data.email))}>
      <div className="space-y-4">
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
        <button
          type="submit"
          className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
