import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    register: any;
    error?: string;
    showPassword?: boolean;
    onTogglePassword?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type,
    placeholder,
    register,
    error,
    showPassword,
    onTogglePassword
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    {...register(name)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
                />
                {(name === 'password' || name === 'confirmPassword') && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default InputField;
