
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../components/InputField';
import CheckboxField from '../components/CheckboxField';

const countries = ['Vietnam', 'United States', 'Japan', 'France', 'Germany', 'Other'];
const hobbiesList = ['Reading', 'Traveling', 'Gaming'];

const today = new Date();
const minBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

const schema = yup.object({
  fullName: yup.string().required('Full Name is required').min(3, 'Full Name must be at least 3 characters.'),
  email: yup.string().required('Email is required').email('Invalid email address.'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters with letters and numbers.').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, 'Password must be at least 8 characters with letters and numbers.'),
  confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password')], 'Passwords must match.'),
  phoneNumber: yup.string().required('Phone Number is required').matches(/^\d{10,}$/, 'Phone number must be at least 10 digits.'),
  gender: yup.string().required('Please select a gender.'),
  dob: yup.date().required('Date of Birth is required').max(minBirthDate, 'You must be at least 18 years old.'),
  country: yup.string().required('Please select a country.'),
  hobbies: yup.array().of(yup.string()).min(1, 'Select at least one hobby.'),
  profilePicture: yup
    .mixed()
    .required('Profile picture is required.')
    .test('fileType', 'Only .jpg, .jpeg, .png files are allowed.', (value: any) => {
      if (!value || !value.length) return false;
      const file = value[0];
      return file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
    }),
  bio: yup.string().max(300, 'Bio must be at most 300 characters.'),
});

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender: string;
  dob: string;
  country: string;
  hobbies: string[];
  profilePicture: FileList;
  bio: string;
};

const UserRegistrationForm: React.FC = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [bioLength, setBioLength] = useState(0);
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: { hobbies: [] }
  });

  const onSubmit = (data: FormData) => {
    alert('Registration successful!');
    // handle data here
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">User Registration</h2>
      {/* Full Name */}
      <InputField
        label="Full Name"
        name="fullName"
        type="text"
        placeholder="Enter your full name"
        register={register}
        error={errors.fullName?.message}
      />
      {/* Email */}
      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        register={register}
        error={errors.email?.message}
      />
      {/* Password */}
      <InputField
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        register={register}
        error={errors.password?.message}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />
      {/* Confirm Password */}
      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        placeholder="Re-enter your password"
        register={register}
        error={errors.confirmPassword?.message}
        showPassword={showConfirmPassword}
        onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
      />
      {/* Phone Number */}
      <InputField
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        placeholder="Enter your phone number"
        register={register}
        error={errors.phoneNumber?.message}
      />
      {/* Gender */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Gender</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input type="radio" value="Male" {...register('gender')} /> Male
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" value="Female" {...register('gender')} /> Female
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" value="Other" {...register('gender')} /> Other
          </label>
        </div>
        {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>}
      </div>
      {/* Date of Birth */}
      <InputField
        label="Date of Birth"
        name="dob"
        type="date"
        placeholder=""
        register={register}
        error={errors.dob?.message}
      />
      {/* Country */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Country</label>
        <select {...register('country')} className="w-full border rounded px-3 py-2">
          <option value="">Select Country</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country.message}</p>}
      </div>
      {/* Hobbies */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Hobbies</label>
        <div className="flex gap-4">
          {hobbiesList.map((hobby) => (
            <CheckboxField
              key={hobby}
              label={hobby}
              name="hobbies"
              register={register}
              error={undefined}
            // error hiển thị dưới group
            />
          ))}
        </div>
        {errors.hobbies && <p className="text-red-600 text-sm mt-1">{errors.hobbies.message}</p>}
      </div>
      {/* Profile Picture */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Profile Picture</label>
        <input type="file" accept=".jpg,.jpeg,.png" {...register('profilePicture')} className="w-full" />
        {errors.profilePicture && <p className="text-red-600 text-sm mt-1">{errors.profilePicture.message as string}</p>}
      </div>
      {/* Bio */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Bio</label>
        <textarea
          {...register('bio')}
          maxLength={300}
          rows={3}
          className="w-full border rounded px-3 py-2"
          onChange={e => setBioLength(e.target.value.length)}
        />
        <div className="flex justify-between">
          {errors.bio && <p className="text-red-600 text-sm mt-1">{errors.bio.message}</p>}
          <span className="text-xs text-gray-500 ml-auto">{watch('bio')?.length || 0}/300</span>
        </div>
      </div>
      <button type="submit" className="w-full bg-black text-white py-2 rounded mt-2 font-semibold">Register</button>
    </form>
  );
};

export default UserRegistrationForm;
