
import React, { useState } from 'react';
import InitialEmailForm from '../../components/InitialEmailForm';
import SignUpForm from '../../components/SignUpForm';
import SignInForm from '../../components/SignInForm';


export default function AuthForms() {
    const [mode, setMode] = useState<'initial' | 'signin' | 'signup'>('initial');
    const [email, setEmail] = useState('');

    // Shared background and back button
    const BackgroundImage = () => (
        <div className="absolute inset-0">
            <img src="/bg.png" alt="Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0" />
        </div>
    );
    const BackButton = () => (
        <button
            onClick={() => setMode('initial')}
            className="absolute top-4 left-4 z-20 text-white/80 hover:text-white text-2xl"
            aria-label="Back"
        >
            ←
        </button>
    );

    return (
        <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4">
            <div className="w-full max-w-xs">
                <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl flex flex-col">
                    <BackgroundImage />
                    {mode !== 'initial' && <BackButton />}
                    {/* Phần trên để show background image */}
                    <div className="flex-1" />
                    {/* Form nằm phía dưới, có blur, bo góc, padding */}
                    <div className="relative z-10 w-full">
                        <div className="backdrop-blur-md bg-black/60 rounded-t-2xl p-6 w-full">
                            {mode === 'initial' && (
                                <>
                                    <h2 className="text-2xl font-bold text-white mb-6">Hi!</h2>
                                    <InitialEmailForm onSubmit={(email) => { setEmail(email); setMode('signup'); }} />
                                    <div className="my-4 flex items-center">
                                        <div className="flex-1 h-px bg-white/20" />
                                        <span className="mx-2 text-xs text-white/60">or</span>
                                        <div className="flex-1 h-px bg-white/20" />
                                    </div>
                                    <button className="w-full flex items-center justify-center py-2 mb-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition">
                                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="fb" className="w-5 h-5 mr-2" />
                                        Continue with Facebook
                                    </button>
                                    <button className="w-full flex items-center justify-center py-2 mb-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition">
                                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="google" className="w-5 h-5 mr-2" />
                                        Continue with Google
                                    </button>
                                    <button className="w-full flex items-center justify-center py-2 mb-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition">
                                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="apple" className="w-5 h-5 mr-2" />
                                        Continue with Apple
                                    </button>
                                    <div className="flex justify-between mt-2 text-xs">
                                        <span className="text-white/80">Don't have an account? <button className="text-green-400 hover:underline" onClick={() => setMode('signup')}>Sign up</button></span>
                                        <button className="text-green-400 hover:underline" onClick={() => setMode('signin')}>Forgot your password?</button>
                                    </div>
                                </>
                            )}
                            {mode === 'signup' && (
                                <>
                                    <h1 className="text-2xl font-bold mb-4 text-white">Sign up</h1>
                                    <div className="mb-4">
                                        <p className="text-white/90 text-xs leading-relaxed">
                                            Looks like you don't have an account.<br />
                                            Let's create a new account for <span className="font-semibold">{email}</span>.
                                        </p>
                                    </div>
                                    <SignUpForm
                                        email={email}
                                        onSwitchToSignIn={() => setMode('signin')}
                                        onSubmit={(data) => { console.log('Sign up data:', data); }}
                                    />
                                </>
                            )}
                            {mode === 'signin' && (
                                <SignInForm
                                    email={email}
                                    onBack={() => setMode('initial')}
                                    onSubmit={(data) => { console.log('Sign in data:', data); }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}