import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from './InputField';
import CheckboxField from './CheckboxField';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required').min(2, 'First Name must be at least 2 characters'),
    lastName: yup.string().required('Last Name is required').min(2, 'Last Name must be at least 2 characters'),
    phoneNumber: yup.string().required('Phone Number is required').matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits only'),
    email: yup.string().required('Email is required').email('Please enter a valid email address'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).*$/, 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and no spaces'),
    confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password')], 'Passwords must match'),
    newsletterOptIn: yup.boolean().optional(),
    termsAgreement: yup.boolean().required('You must agree to the Terms, Privacy Policy, and Fees').oneOf([true], 'You must agree to the Terms, Privacy Policy, and Fees'),
});

type FormData = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    newsletterOptIn: boolean;
    termsAgreement: boolean;
};

const RegisterForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
            newsletterOptIn: false,
            termsAgreement: false
        }
    });
    const termsAgreement = watch('termsAgreement');
    const onSubmit = (data: FormData) => {
        console.log('Form submitted:', data);
        alert('Account created successfully!');
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="First Name" name="firstName" type="text" placeholder="John" register={register} error={errors.firstName?.message} />
                <InputField label="Last Name" name="lastName" type="text" placeholder="Doe" register={register} error={errors.lastName?.message} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Phone Number" name="phoneNumber" type="tel" placeholder="0987654321" register={register} error={errors.phoneNumber?.message} />
                <InputField label="Email" name="email" type="email" placeholder="john.doe@example.com" register={register} error={errors.email?.message} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Secret123" register={register} error={errors.password?.message} showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)} />
                <InputField label="Confirm Password" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Secret123" register={register} error={errors.confirmPassword?.message} showPassword={showConfirmPassword} onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)} />
            </div>
            <div className="space-y-4">
                <CheckboxField label="Yes, I want to receive Lottery Display emails." name="newsletterOptIn" register={register} error={errors.newsletterOptIn?.message} />
                <CheckboxField label="I agree to all the Terms, Privacy Policy, and Fees." name="termsAgreement" register={register} error={errors.termsAgreement?.message} required />
            </div>
            <button
                type="submit"
                disabled={!isValid || !termsAgreement}
                className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${isValid && termsAgreement ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-400 cursor-not-allowed'}`}
            >
                Create Account
            </button>
            <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                    Log in
                </a>
            </p>
        </form>
    );
};

export default RegisterForm;
