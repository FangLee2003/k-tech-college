import React, { useState } from 'react';
import styles from './UserRegistrationForm.module.css';

interface FormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    gender: string;
    dateOfBirth: string;
    country: string;
    hobbies: string[];
    profilePicture: File | null;
    bio: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phoneNumber?: string;
    gender?: string;
    dateOfBirth?: string;
    country?: string;
    hobbies?: string;
    profilePicture?: string;
    bio?: string;
}

const UserRegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        gender: '',
        dateOfBirth: '',
        country: '',
        hobbies: [],
        profilePicture: null,
        bio: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const countries = [
        'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
        'France', 'Japan', 'South Korea', 'Vietnam', 'Thailand', 'Singapore'
    ];

    const hobbyOptions = ['Reading', 'Traveling', 'Gaming'];

    const validateField = (name: string, value: any): string | undefined => {
        switch (name) {
            case 'fullName': {
                return value.length < 3 ? 'Full Name must be at least 3 characters.' : undefined;
            }

            case 'email': {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(value) ? 'Must be a valid email format.' : undefined;
            }

            case 'password': {
                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
                return !passwordRegex.test(value) ? 'Password must be at least 8 characters and contain letters and numbers.' : undefined;
            }

            case 'confirmPassword': {
                return value !== formData.password ? 'Passwords must match.' : undefined;
            }

            case 'phoneNumber': {
                const phoneRegex = /^\d{10,}$/;
                return !phoneRegex.test(value.replace(/\D/g, '')) ? 'Phone number must be at least 10 digits.' : undefined;
            }

            case 'gender': {
                return !value ? 'Please select a gender.' : undefined;
            }

            case 'dateOfBirth': {
                if (!value) return 'Please select your date of birth.';
                const today = new Date();
                const birthDate = new Date(value);
                const age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    return age - 1 < 18 ? 'You must be at least 18 years old.' : undefined;
                }
                return age < 18 ? 'You must be at least 18 years old.' : undefined;
            }

            case 'country': {
                return !value ? 'Please select a country.' : undefined;
            }

            case 'hobbies': {
                return value.length === 0 ? 'Please select at least one hobby.' : undefined;
            }

            case 'profilePicture': {
                if (!value) return 'Please upload a profile picture.';
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                return !validTypes.includes(value.type) ? 'Profile picture must be a .jpg, .jpeg, or .png file.' : undefined;
            }

            case 'bio': {
                return value.length > 300 ? 'Bio must be 300 characters or less.' : undefined;
            }

            default: {
                return undefined;
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            hobbies: checked
                ? [...prev.hobbies, value]
                : prev.hobbies.filter(hobby => hobby !== value)
        }));
        if (errors.hobbies) {
            setErrors(prev => ({ ...prev, hobbies: undefined }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, profilePicture: file }));
        if (errors.profilePicture) {
            setErrors(prev => ({ ...prev, profilePicture: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key as keyof FormData]);
            if (error) {
                newErrors[key as keyof FormErrors] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitted(true);
            console.log('Form submitted:', formData);
        }
    };

    const isFormValid = Object.keys(errors).length === 0 &&
        formData.fullName && formData.email && formData.password &&
        formData.confirmPassword && formData.phoneNumber && formData.gender &&
        formData.dateOfBirth && formData.country && formData.hobbies.length > 0 &&
        formData.profilePicture;

    if (isSubmitted) {
        return (
            <div className={styles.formContainer}>
                <div className={styles.successMessage}>
                    <h2>✅ Registration Successful!</h2>
                    <p>Thank you for registering. Your account has been created successfully.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>User Registration</h1>
            
            <form onSubmit={handleSubmit} noValidate>
                <div className={styles.formGrid}>
                    {/* Full Name */}
                    <div className={styles.fieldGroup}>
                        <label htmlFor="fullName" className={styles.label}>Full Name *</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={styles.input}
                            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        />
                        {errors.fullName && <span id="fullName-error" className={styles.errorMessage}>{errors.fullName}</span>}
                    </div>

                    {/* Email */}
                    <div className={styles.fieldGroup}>
                        <label htmlFor="email" className={styles.label}>Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={styles.input}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                        {errors.email && <span id="email-error" className={styles.errorMessage}>{errors.email}</span>}
                    </div>

                    {/* Password */}
                    <div className={styles.fieldGroup}>
                        <label htmlFor="password" className={styles.label}>Password *</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={styles.input}
                            aria-describedby={errors.password ? 'password-error' : undefined}
                        />
                        {errors.password && <span id="password-error" className={styles.errorMessage}>{errors.password}</span>}
                    </div>

                    {/* Confirm Password */}
                    <div className={styles.fieldGroup}>
                        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password *</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={styles.input}
                            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                        />
                        {errors.confirmPassword && <span id="confirmPassword-error" className={styles.errorMessage}>{errors.confirmPassword}</span>}
                    </div>

                    {/* Phone Number */}
                    <div className={styles.fieldGroup}>
                        <label htmlFor="phoneNumber" className={styles.label}>Phone Number *</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className={styles.input}
                            aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
                        />
                        {errors.phoneNumber && <span id="phoneNumber-error" className={styles.errorMessage}>{errors.phoneNumber}</span>}
                    </div>

                    {/* Gender */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Gender *</label>
                        <div className={styles.radioGroup}>
                            {['Male', 'Female', 'Other'].map(gender => (
                                <div key={gender} className={styles.radioItem}>
                                    <input
                                        type="radio"
                                        id={gender.toLowerCase()}
                                        name="gender"
                                        value={gender}
                                        checked={formData.gender === gender}
                                        onChange={handleRadioChange}
                                    />
                                    <label htmlFor={gender.toLowerCase()}>{gender}</label>
                                </div>
                            ))}
                        </div>
                        {errors.gender && <span className={styles.errorMessage}>{errors.gender}</span>}
                    </div>

                    {/* Date of Birth */}
                    <div className={styles.fieldGroup}>
                        <label htmlFor="dateOfBirth" className={styles.label}>Date of Birth *</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className={styles.input}
                            aria-describedby={errors.dateOfBirth ? 'dateOfBirth-error' : undefined}
                        />
                        {errors.dateOfBirth && <span id="dateOfBirth-error" className={styles.errorMessage}>{errors.dateOfBirth}</span>}
                    </div>

                    {/* Country */}
                    <div className={styles.fieldGroup}>
                        <label htmlFor="country" className={styles.label}>Country *</label>
                        <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className={styles.select}
                            aria-describedby={errors.country ? 'country-error' : undefined}
                        >
                            <option value="">Select a country</option>
                            {countries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        {errors.country && <span id="country-error" className={styles.errorMessage}>{errors.country}</span>}
                    </div>

                    {/* Hobbies */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.label}>Hobbies *</label>
                        <div className={styles.checkboxGroup}>
                            {hobbyOptions.map(hobby => (
                                <div key={hobby} className={styles.checkboxItem}>
                                    <input
                                        type="checkbox"
                                        id={hobby.toLowerCase()}
                                        value={hobby}
                                        checked={formData.hobbies.includes(hobby)}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor={hobby.toLowerCase()}>{hobby}</label>
                                </div>
                            ))}
                        </div>
                        {errors.hobbies && <span className={styles.errorMessage}>{errors.hobbies}</span>}
                    </div>

                    {/* Profile Picture */}
                    <div className={styles.fieldGroup}>
                        <label htmlFor="profilePicture" className={styles.label}>Profile Picture *</label>
                        <input
                            type="file"
                            id="profilePicture"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className={styles.fileInput}
                            aria-describedby={errors.profilePicture ? 'profilePicture-error' : undefined}
                        />
                        {errors.profilePicture && <span id="profilePicture-error" className={styles.errorMessage}>{errors.profilePicture}</span>}
                    </div>
                </div>

                {/* Bio - Full Width */}
                <div className={styles.fieldGroup}>
                    <label htmlFor="bio" className={styles.label}>Bio (Optional)</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className={styles.textarea}
                        rows={4}
                        maxLength={300}
                        aria-describedby={errors.bio ? 'bio-error' : undefined}
                    />
                    <div className={styles.charCounter}>
                        {formData.bio.length}/300 characters
                    </div>
                    {errors.bio && <span id="bio-error" className={styles.errorMessage}>{errors.bio}</span>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={styles.submitButton}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default UserRegistrationForm;