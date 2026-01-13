import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    UserCircleIcon,
    EnvelopeIcon,
    LockClosedIcon,
    ShieldCheckIcon,
    ArrowLeftIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

export default function CreateEdit({ user = null, roles }) {
    const isEditing = !!user;
    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        password_confirmation: '',
        roles: user?.roles || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.users.update', user.id));
        } else {
            post(route('admin.users.store'));
        }
    };

    const toggleRole = (roleName) => {
        setData('roles', 
            data.roles.includes(roleName)
                ? data.roles.filter(r => r !== roleName)
                : [...data.roles, roleName]
        );
    };

    return (
        <AdminLayout title={isEditing ? 'Edit User' : 'Create User'}>
            <Head title={isEditing ? 'Edit User' : 'Create User'} />

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <Link
                        href={route('admin.users.index')}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            {isEditing ? 'Edit User' : 'Create New User'}
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            {isEditing ? 'Update user information and roles' : 'Add a new user to the system'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* User Information Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <UserCircleIcon className="h-6 w-6 text-indigo-600" />
                                User Information
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <UserCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 border ${
                                            errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:ring-indigo-500'
                                        } rounded-xl focus:ring-2 focus:border-transparent transition-all`}
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>
                                {errors.name && (
                                    <div className="mt-2 flex items-center gap-1 text-sm text-rose-600">
                                        <ExclamationCircleIcon className="h-4 w-4" />
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 border ${
                                            errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:ring-indigo-500'
                                        } rounded-xl focus:ring-2 focus:border-transparent transition-all`}
                                        placeholder="user@example.com"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <div className="mt-2 flex items-center gap-1 text-sm text-rose-600">
                                        <ExclamationCircleIcon className="h-4 w-4" />
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Password Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <LockClosedIcon className="h-6 w-6 text-indigo-600" />
                                Password {isEditing && <span className="text-sm font-normal text-gray-500">(Leave blank to keep current)</span>}
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password {!isEditing && <span className="text-rose-500">*</span>}
                                </label>
                                <div className="relative">
                                    <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 border ${
                                            errors.password ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:ring-indigo-500'
                                        } rounded-xl focus:ring-2 focus:border-transparent transition-all`}
                                        placeholder="••••••••"
                                        required={!isEditing}
                                    />
                                </div>
                                {errors.password && (
                                    <div className="mt-2 flex items-center gap-1 text-sm text-rose-600">
                                        <ExclamationCircleIcon className="h-4 w-4" />
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* Password Confirmation */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Confirm Password {!isEditing && <span className="text-rose-500">*</span>}
                                </label>
                                <div className="relative">
                                    <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 border ${
                                            errors.password_confirmation ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 focus:ring-indigo-500'
                                        } rounded-xl focus:ring-2 focus:border-transparent transition-all`}
                                        placeholder="••••••••"
                                        required={!isEditing}
                                    />
                                </div>
                                {errors.password_confirmation && (
                                    <div className="mt-2 flex items-center gap-1 text-sm text-rose-600">
                                        <ExclamationCircleIcon className="h-4 w-4" />
                                        {errors.password_confirmation}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Roles Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />
                                User Roles
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {roles.map((role) => (
                                    <label
                                        key={role.id}
                                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                            data.roles.includes(role.name)
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300 bg-white'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={data.roles.includes(role.name)}
                                            onChange={() => toggleRole(role.name)}
                                            className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900">{role.name}</div>
                                            <div className="text-xs text-gray-500">User role permissions</div>
                                        </div>
                                        {data.roles.includes(role.name) && (
                                            <CheckCircleIcon className="h-5 w-5 text-indigo-600" />
                                        )}
                                    </label>
                                ))}
                            </div>
                            {errors.roles && (
                                <div className="mt-3 flex items-center gap-1 text-sm text-rose-600">
                                    <ExclamationCircleIcon className="h-4 w-4" />
                                    {errors.roles}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-6">
                        <Link
                            href={route('admin.users.index')}
                            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CheckCircleIcon className="h-5 w-5" />
                                    {isEditing ? 'Update User' : 'Create User'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
