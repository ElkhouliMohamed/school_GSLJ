import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
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
            <Head title="Connexion - Groupe Scolaire Les Jumelés" />

            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-primary via-violet-700 to-secondary">
                {/* Animated background patterns */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-4000"></div>
                </div>

                {/* Decorative circles */}
                <div className="absolute top-10 right-10 w-32 h-32 border-4 border-white/20 rounded-full"></div>
                <div className="absolute bottom-20 left-10 w-24 h-24 border-4 border-white/10 rounded-full"></div>
                <div className="absolute top-1/2 right-20 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
                    <div className="max-w-md">
                        {/* Logo/Icon */}
                        <div className="mb-8 flex justify-center">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                                <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-full border-2 border-white/30 group-hover:border-white/50 transition-all duration-300 shadow-2xl">
                                    <AcademicCapIcon className="h-24 w-24 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <h1 className="text-5xl font-bold mb-4 text-center leading-tight">
                            Groupe Scolaire<br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-yellow-200 to-white">
                                Les Jumelés
                            </span>
                        </h1>
                        <p className="text-xl text-white/90 text-center mb-12 font-medium">
                            Portail d'Administration
                        </p>

                        {/* Features */}
                        <div className="space-y-4 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                            <div className="flex items-start space-x-4">
                                <div className="shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mt-0.5 backdrop-blur-sm">
                                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Gestion Centralisée</h3>
                                    <p className="text-sm text-white/80 mt-1">Gérez tous les aspects de votre école depuis une seule plateforme</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mt-0.5 backdrop-blur-sm">
                                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Sécurisé & Fiable</h3>
                                    <p className="text-sm text-white/80 mt-1">Vos données sont protégées avec les meilleurs standards</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="shrink-0 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mt-0.5 backdrop-blur-sm">
                                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Interface Moderne</h3>
                                    <p className="text-sm text-white/80 mt-1">Design intuitif et facile à utiliser au quotidien</p>
                                </div>
                            </div>
                        </div>

                        {/* Motto */}
                        <div className="mt-8 text-center">
                            <p className="text-2xl font-serif italic text-white/90">
                                "L'Excellence Notre Credo"
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-50 to-gray-100">
                <div className="max-w-md w-full space-y-8">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-primary to-secondary mb-6 shadow-xl">
                            <AcademicCapIcon className="h-12 w-12 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Les Jumelés</h2>
                        <p className="text-sm text-gray-600">Portail d'Administration</p>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-200">
                        {/* Form Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Connexion
                            </h2>
                            <p className="text-sm text-gray-600">
                                Connectez-vous à votre compte administrateur
                            </p>
                        </div>

                        {/* Login Form */}
                        <form className="space-y-6" onSubmit={submit}>
                            <div className="space-y-5">
                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Adresse Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                                            className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out text-sm placeholder-gray-400 bg-gray-50 focus:bg-white"
                                            placeholder="admin@lesjumeles.com"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center animate-fadeIn">
                                            <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Mot de Passe
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                                            className="block w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out text-sm placeholder-gray-400 bg-gray-50 focus:bg-white"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-xl transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center animate-fadeIn">
                                            <svg className="h-4 w-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.password}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-linear-to-r from-primary via-violet-600 to-secondary hover:from-primary hover:via-violet-700 hover:to-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
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
                                        <span className="flex items-center">
                                            Se Connecter
                                            <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Additional Links */}
                        <div className="mt-6 text-center">
                            <Link
                                href="/"
                                className="text-sm font-medium text-primary hover:text-secondary transition-colors"
                            >
                                ← Retour à l'accueil
                            </Link>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            © 2026 Groupe Scolaire Les Jumelés. Tous droits réservés.
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
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}

