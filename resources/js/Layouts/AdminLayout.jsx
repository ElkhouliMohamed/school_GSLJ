import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { HomeIcon, UsersIcon, DocumentTextIcon, PhotoIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon, NewspaperIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon, current: true },
    { name: 'Statistiques', href: '/admin/kpi', icon: ChartBarIcon, current: false },
    { name: 'Actualités', href: '/admin/news', icon: NewspaperIcon, current: false },
    { name: 'Événements', href: '/admin/events', icon: CalendarIcon, current: false },
    { name: 'Galerie', href: '/admin/galleries', icon: PhotoIcon, current: false },
    { name: 'Paramètres', href: '/admin/settings', icon: Cog6ToothIcon, current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AdminLayout({ children, title = 'Dashboard' }) {
    const { auth, locale } = usePage().props;
    const currentLocale = locale || 'en';

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
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden w-64 md:fixed md:inset-y-0 md:flex md:flex-col box-border">
                <div className="flex min-h-0 flex-1 flex-col bg-slate-900 border-r border-slate-800">
                    <div className="flex h-16 flex-shrink-0 items-center px-6 bg-slate-950 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">A</span>
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">Admin<span className="text-blue-500">Portal</span></span>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4 px-3">
                        <nav className="mt-5 flex-1 space-y-2">
                            {navigation.map((item) => {
                                const isActive = window.location.pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            isActive
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                                : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                                            'group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200'
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                isActive ? 'text-white' : 'text-slate-500 group-hover:text-white',
                                                'mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="px-3">
                            <div className="rounded-xl bg-slate-800 p-4 border border-slate-700/50">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">System Status</p>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs text-slate-300">Live & Running</span>
                                </div>
                                <p className="text-[10px] text-slate-500">v1.2.0 • Stable</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-shrink-0 border-t border-slate-800 bg-slate-900 p-4">
                        <div className="group block w-full flex-shrink-0">
                            <div className="flex items-center">
                                <div>
                                    <div className="inline-block h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                                        {userInitial}
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                        {userName}
                                    </p>
                                    <Link href="/logout" method="post" as="button" className="text-xs font-medium text-slate-400 group-hover:text-white flex items-center mt-1 transition-colors">
                                        <ArrowLeftOnRectangleIcon className="h-3 w-3 mr-1" /> Sign Out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 flex-col md:pl-64">
                <main className="flex-1">
                    <div className="py-6">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                        </div>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                            <div className="py-4">
                                {children}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
