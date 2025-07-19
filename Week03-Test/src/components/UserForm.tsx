import { useForm, type Resolver, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUsers } from '../context/UserProvider';
import InputField from './InputField';

const userSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Minimum 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age must be positive')
    .integer('Age must be an integer')
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .optional(),
}).required(); // ⚠️ thêm .required() ở đây


type UserFormType = yup.InferType<typeof userSchema>;

export default function UserForm({ onAddUser }: { onAddUser?: (data: UserFormType) => void }) {
  const { addUser } = useUsers();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormType>({
    resolver: yupResolver(userSchema) as Resolver<UserFormType>, // ⚠️ Ép kiểu rõ ràng
    defaultValues: { name: '', email: '' },
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<UserFormType> = (data) => {
    const userToAdd = { ...data };
    console.log(userToAdd);
    addUser(userToAdd);
    if (onAddUser) onAddUser(userToAdd);
    reset();
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4">
            <span className="text-white text-2xl font-bold">+</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New User</h1>
          <p className="text-gray-600 text-lg">Fill in the details to add a new user to the system</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl font-bold">📝</span>
              </div>
              <div>
                <h2 className="text-2xl text-white font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Add New User</h2>
                <p className="text-indigo-100 text-sm">Please provide the required information</p>
              </div>
            </div>
          </div>

          {/* Original Form Content - Only styling upgraded */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <InputField
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  register={register}
                  error={errors.name?.message}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  register={register}
                  error={errors.email?.message}
                />
                <InputField
                  label="Age"
                  name="age"
                  type="number"
                  placeholder="Enter age (optional)"
                  register={register}
                  error={errors.age?.message}
                />
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  className="w-full py-4 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 text-center">
            <div className="text-2xl font-bold text-indigo-600 mb-2">📧</div>
            <div className="text-sm text-gray-600 font-medium">Email Validation</div>
            <div className="text-xs text-gray-500 mt-1">Automatic verification</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">🔒</div>
            <div className="text-sm text-gray-600 font-medium">Secure Storage</div>
            <div className="text-xs text-gray-500 mt-1">Encrypted data</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">⚡</div>
            <div className="text-sm text-gray-600 font-medium">Instant Access</div>
            <div className="text-xs text-gray-500 mt-1">Immediate activation</div>
          </div>
        </div>
      </div>
    </div>
  );
}