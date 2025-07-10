import React from 'react';

interface CheckboxFieldProps {
    label: string;
    name: string;
    register: any;
    error?: string;
    required?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
    label,
    name,
    register,
    error,
    required
}) => {
    return (
        <div className="mb-4">
            <div className="flex items-start">
                <input
                    id={name}
                    type="checkbox"
                    {...register(name)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default CheckboxField;
