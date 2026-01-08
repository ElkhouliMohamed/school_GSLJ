import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AcademicCapIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex">
            <Head title="Connexion - École" />

            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800">
                {/* Animated background patterns */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-4000"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
                    <div className="max-w-md">
                        {/* Logo/Icon */}
                        <div className="mb-8 flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl"></div>
                                <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border-2 border-white/30">
                                    <AcademicCapIcon className="h-20 w-20 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <h1 className="text-4xl font-bold mb-4 text-center">
                            Bienvenue à l'École
                        </h1>
                        <p className="text-xl text-blue-100 text-center mb-8">
                            Portail d'Administration
                        </p>

                        {/* Features */}
                        <div className="space-y-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="flex items-start space-x-3">
                                <div className="shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Gestion Centralisée</h3>
                                    <p className="text-sm text-blue-100">Gérez tous les aspects de votre école</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Sécurisé & Fiable</h3>
                                    <p className="text-sm text-blue-100">Vos données sont protégées</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Interface Moderne</h3>
                                    <p className="text-sm text-blue-100">Facile à utiliser et intuitive</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-md w-full space-y-8">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 mb-4">
                            <AcademicCapIcon className="h-10 w-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Portail d'Administration</h2>
                    </div>

                    {/* Form Header */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Connexion
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Connectez-vous à votre compte administrateur
                        </p>
                    </div>

                    {/* Login Form */}
                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <div className="space-y-5">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Adresse Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out sm:text-sm placeholder-gray-400"
                                        placeholder="admin@ecole.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center">
                                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mot de Passe
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out sm:text-sm placeholder-gray-400"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center">
                                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {processing ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Connexion en cours...
                                    </span>
                                ) : (
                                    'Se Connecter'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            © 2026 École. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}
