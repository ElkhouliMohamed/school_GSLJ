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
    PlusCircleIcon,
    GlobeAltIcon,
    ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

const navigation = [
    {
        title: 'Vue d\'ensemble',
        items: [
            { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
            { name: 'Statistiques', href: '/admin/kpi', icon: ChartBarIcon },
        ]
    },
    {
        title: 'Gestion Scolaire',
        items: [
            { name: 'Programmes', href: '/admin/programs', icon: DocumentTextIcon },
            { name: 'Services', href: '/admin/facilities', icon: PhotoIcon },
            { name: 'Pré-inscriptions', href: '/admin/pre-registrations', icon: ClipboardDocumentListIcon },
        ]
    },
    {
        title: 'Contenu',
        items: [
            { name: 'Actualités', href: '/admin/news', icon: NewspaperIcon },
            { name: 'Événements', href: '/admin/events', icon: CalendarIcon },
            { name: 'Galerie', href: '/admin/albums', icon: PhotoIcon },
            { name: 'Paramètres', href: '/admin/settings', icon: Cog6ToothIcon },
        ]
    },
    {
        title: 'Personnes',
        items: [
            { name: 'Équipe', href: '/admin/team-members', icon: UsersIcon },
            { name: 'Partenaires', href: '/admin/partners', icon: UsersIcon },
            { name: 'Utilisateurs', href: '/admin/users', icon: UsersIcon },
        ]
    },
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
                "fixed inset-y-0 z-50 flex w-72 flex-col bg-[#111827] transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:flex border-r border-gray-800"
            )}>
                {/* Logo & Close Button */}
                <div className="flex h-20 shrink-0 items-center justify-between bg-[#111827] px-6 shadow-sm border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/gslj/logo.jpg"
                            alt="GSLJ Logo"
                            className="h-10 w-10 rounded-full object-cover shadow-lg border-2 border-violet-500/30"
                        />
                        <div className="flex flex-col">
                            <span className="text-lg font-bold tracking-tight text-white leading-tight">
                                GSLJ
                            </span>
                            <span className="text-[10px] font-medium text-violet-400 uppercase tracking-widest">
                                Admin Portal
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-slate-400 hover:text-white md:hidden"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex flex-1 flex-col overflow-y-auto px-3 py-6 custom-scrollbar space-y-8">
                    {navigation.map((group) => (
                        <div key={group.title}>
                            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                {group.title}
                            </h3>
                            <nav className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = window.location.pathname === item.href || window.location.pathname.startsWith(item.href + '/');
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                isActive
                                                    ? 'bg-gradient-to-r from-violet-600 to-violet-900 text-white shadow-lg shadow-violet-900/20'
                                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white',
                                                'group flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200'
                                            )}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-white',
                                                    'mr-3 h-5 w-5 shrink-0 transition-colors'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    ))}

                    <div className="pt-4 mt-4 border-t border-gray-800">
                        <a
                            href="/"
                            target="_blank"
                            className="group flex items-center rounded-xl px-3 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-300 transition-all duration-200"
                        >
                            <GlobeAltIcon
                                className="mr-3 h-5 w-5 shrink-0 text-emerald-500 group-hover:text-emerald-400 transition-colors"
                                aria-hidden="true"
                            />
                            Voir le site
                        </a>
                    </div>
                </div>

                {/* User Section (Neam Section) */}
                <div className="border-t border-slate-800 bg-[#0b111e] p-4">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-800/50 p-3 transition-colors hover:bg-slate-800 border border-slate-700/50">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 font-bold text-white shadow-lg overflow-hidden">
                            {/* Try to use the user avatar if available, else show initial */}
                            {/* Assuming we might want to use the director image here dynamically if it was the authenticated user, but for now stick to initial or placeholder */}
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
