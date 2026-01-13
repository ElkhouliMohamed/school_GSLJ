import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    HomeIcon,
    UsersIcon,
    DocumentTextIcon,
    PhotoIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    NewspaperIcon,
    CalendarIcon,
    ChartBarIcon,
    Bars3Icon,
    XMarkIcon,
    PlusCircleIcon
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Statistiques', href: '/admin/kpi', icon: ChartBarIcon },
    { name: 'Actualités', href: '/admin/news', icon: NewspaperIcon },
    { name: 'Événements', href: '/admin/events', icon: CalendarIcon },
    { name: 'Partenaires', href: '/admin/partners', icon: UsersIcon },
    { name: 'Nouveau Partenaire', href: '/admin/partners/create', icon: PlusCircleIcon },
    { name: 'Galerie', href: '/admin/albums', icon: PhotoIcon },
    { name: 'Paramètres', href: '/admin/settings', icon: Cog6ToothIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AdminLayout({ children, title = 'Dashboard' }) {
    const { auth, locale } = usePage().props;
    const currentLocale = locale || 'en';
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Helper to safely get user name
    const getUserName = () => {
        const name = auth?.user?.name;
        if (!name) return 'Admin';
        if (typeof name === 'object') {
            return name[currentLocale] || name['en'] || Object.values(name)[0] || 'Admin';
        }
        return name;
    };

    const userName = getUserName();
    const userInitial = typeof userName === 'string' ? userName.charAt(0) : 'A';

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile Sidebar Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/80 backdrop-blur-sm transition-opacity md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={classNames(
                sidebarOpen ? 'translate-x-0' : '-translate-x-full',
                "fixed inset-y-0 z-50 flex w-72 flex-col bg-slate-900 transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:flex"
            )}>
                {/* Logo & Close Button */}
                <div className="flex h-16 shrink-0 items-center justify-between bg-slate-950 px-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-900/20">
                            <span className="text-lg font-bold text-white">A</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Admin<span className="text-violet-500">Portal</span>
                        </span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-slate-400 hover:text-white md:hidden"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
                    <nav className="flex-1 space-y-1">
                        {navigation.map((item) => {
                            const isActive = window.location.pathname === item.href || window.location.pathname.startsWith(item.href + '/');
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        isActive
                                            ? 'bg-violet-600/10 text-violet-400 shadow-[2px_0_0_0_#7c3aed_inset]'
                                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-white',
                                        'group flex items-center rounded-r-lg px-3 py-3 text-sm font-medium transition-all duration-200'
                                    )}
                                >
                                    <item.icon
                                        className={classNames(
                                            isActive ? 'text-violet-400' : 'text-slate-500 group-hover:text-white',
                                            'mr-3 h-5 w-5 shrink-0 transition-colors'
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* System Status */}
                    <div className="mt-8 rounded-xl bg-slate-800/50 p-4 border border-slate-700/30">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">System Status</span>
                            <div className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-[10px] font-medium text-emerald-500">Online</span>
                            </div>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-700 overflow-hidden">
                            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
                        </div>
                    </div>
                </div>

                {/* User Section (Neam Section) */}
                <div className="border-t border-slate-800 bg-slate-900/50 p-4">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-3 transition-colors hover:bg-slate-700/80">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 font-bold text-white shadow-lg">
                            {userInitial}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-white">
                                {userName}
                            </p>
                            <p className="truncate text-xs text-slate-400">Administrator</p>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="group flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-all"
                            title="Sign Out"
                        >
                            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Mobile Header */}
                <div className="flex h-16 items-center gap-4 bg-white px-4 shadow-sm md:hidden">
                    <button
                        type="button"
                        className="-ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">Admin<span className="text-violet-600">Portal</span></span>
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto bg-gray-50 py-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                        <div className="mb-8 md:flex md:items-center md:justify-between">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
