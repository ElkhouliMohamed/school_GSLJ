import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
    const { settings, locale } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const getLocalizedSetting = (setting, fallback) => {
        if (!setting) return fallback;
        if (typeof setting === 'string') return setting;
        return setting[locale] || setting['en'] || Object.values(setting)[0] || fallback;
    };

    const logo = getLocalizedSetting(settings?.site_logo, "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600");
    const siteName = getLocalizedSetting(settings?.site_name, 'School Name');

    const navigation = [
        { name: 'Accueil', href: '/' },
        { name: 'À propos', href: '/about' },
        { name: 'Admissions', href: '/admissions' },
        { name: 'Vie étudiante', href: '/campus-life' },
        {
            name: 'Galerie',
            children: [
                { name: 'Photos', href: route('gallery.index', { type: 'photo' }) },
                { name: 'Vidéos', href: route('gallery.index', { type: 'video' }) },
            ]
        },
        { name: 'Actualités', href: '/news' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8" aria-label="Global">
                <div className="flex xl:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 sm:gap-3 group" data-track-click="header-logo">
                        <span className="sr-only">{siteName}</span>
                        {/* Check if logo exists, otherwise use placeholder or text.
                             The user wants to 'add logo or any image not change' - assume now it works.
                             Logic: if logo is set in settings, it will be the URL. If not, fallback.
                          */}
                        <img className="h-8 sm:h-10 lg:h-12 w-auto transition-transform group-hover:scale-105" src={logo} alt={siteName} />
                        <span className="text-base sm:text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-blue-900 tracking-tight group-hover:to-blue-600 transition-all truncate max-w-[150px] sm:max-w-none">{siteName}</span>
                    </Link>
                </div>
                <div className="flex xl:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Ouvrir le menu</span>
                        <Bars3Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden xl:flex xl:gap-x-10">
                    {navigation.map((item) => (
                        item.children ? (
                            <div key={item.name} className="relative group">
                                <button className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-700 hover:text-blue-600 transition-colors outline-none">
                                    {item.name}
                                    <svg className="h-5 w-5 flex-none text-gray-400 group-hover:text-blue-600 transition-colors" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div className="absolute -left-8 top-full z-10 mt-3 w-40 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                                    <div className="p-2">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className="block rounded-lg px-4 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-700 hover:text-blue-600 relative group transition-colors">
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                            </Link>
                        )
                    ))}
                </div>
                <div className="hidden xl:flex xl:flex-1 xl:justify-end gap-3 items-center">
                    <div className="flex items-center gap-2 border-r border-gray-200 pr-4 mr-2">
                        <a href="/language/fr" className={`text-xs font-bold px-2 py-1 rounded transition-colors ${locale === 'fr' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
                            FR
                        </a>
                        <a href="/language/en" className={`text-xs font-bold px-2 py-1 rounded transition-colors ${locale === 'en' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
                            EN
                        </a>
                    </div>
                    <Link href="/admin/dashboard" className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all hover:shadow-md hover:-translate-y-0.5 transform">
                        Espace Portail <span aria-hidden="true" className="ml-1">&rarr;</span>
                    </Link>
                </div>
            </nav>
            {/* Mobile menu */}
            <div className={`xl:hidden fixed inset-0 z-50 transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
                <div className="fixed inset-y-0 right-0 z-60 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-2xl">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900">{siteName}</span>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Fermer le menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    item.children ? (
                                        <div key={item.name} className="space-y-2">
                                            <div className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 bg-gray-50">
                                                {item.name}
                                            </div>
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-all"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:pl-6 transition-all"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                ))}
                            </div>
                            <div className="py-6 border-t border-gray-100">
                                <div className="flex gap-4 mb-6 justify-center bg-gray-50 p-2 rounded-lg">
                                    <a href="/language/fr" className="text-sm font-bold text-blue-600 bg-white shadow-sm px-4 py-1 rounded">FR</a>
                                    <a href="/language/en" className="text-sm font-bold text-gray-500 px-4 py-1 rounded">EN</a>
                                </div>
                                <Link
                                    href="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-center text-white bg-blue-600 hover:bg-blue-500 shadow-lg"
                                >
                                    Se connecter
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
