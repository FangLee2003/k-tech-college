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
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 p-8 rounded-3xl shadow-lg border border-white/50 backdrop-blur-xl max-w-lg mx-auto mb-8">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">Add New User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-lg mt-2"
        >
          Add User
        </button>
      </form>
    </div>
  );
}