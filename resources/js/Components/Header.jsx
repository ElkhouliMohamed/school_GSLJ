import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bars3Icon, XMarkIcon, PhoneIcon, EnvelopeIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { getTranslation } from '../translations';
import useSettings from '@/Hooks/useSettings';

export default function Header() {
    const { settings, locale, auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getSetting } = useSettings();

    const t = (key) => getTranslation(key, locale);

    const logo = getSetting('site_logo') || "https://tailwindui.com/img/logos/mark.svg?color=violet&shade=600";
    const siteName = getSetting('site_name', "Groupe Scolaire GSLJ");
    const contactPhone = getSetting('contact_phone', "+221 33 000 00 00");
    const contactEmail = getSetting('contact_email', "info@gslj.sn");

    const navigation = [
        { name: 'Accueil', href: '/' },
        {
            name: "L'École",
            children: [
                { name: 'À propos', href: '/about' },
                { name: 'Équipe', href: '/team' },
                { name: t('facilities'), href: '/facilities' },
            ]
        },
        {
            name: 'Programmes',
            children: [
                { name: 'Préscolaire', href: '/programs/preschool-program' },
                { name: 'Élémentaire', href: '/programs/elementary-school-program' },
                { name: 'Moyen', href: '/programs/middle-school-program' },
                { name: 'Secondaire', href: '/programs/high-school-program' },
            ]
        },
        { name: 'Admissions', href: '/admissions' },
        {
            name: 'Vie Scolaire',
            children: [
                { name: locale === 'fr' ? 'Transport' : 'Transport', href: '/facilities/school-transportation' },
                { name: locale === 'fr' ? 'Restauration' : 'Catering', href: '/facilities/school-catering' },
                { name: locale === 'fr' ? 'Uniforme' : 'School Uniform', href: '/facilities/school-uniform' },
                { name: locale === 'fr' ? 'Laboratoires' : 'Laboratory', href: '/facilities/computer-laboratory' },
                { name: 'Vie étudiante', href: '/campus-life' },
            ]
        },
        {
            name: 'Médiathèque',
            children: [
                { name: 'Actualités', href: '/news' },
                { name: t('tab_photos'), href: route('gallery.index', { type: 'photo' }) },
                { name: t('tab_videos'), href: route('gallery.index', { type: 'video' }) },
            ]
        },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 transition-all duration-300 font-sans">
            {/* Top Bar */}
            <div className="bg-violet-950 text-white py-2 text-xs sm:text-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
                    <div className="flex items-center gap-6">
                        <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                            <PhoneIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">{contactPhone}</span>
                        </a>
                        <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                            <EnvelopeIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">{contactEmail}</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border-r border-violet-800 pr-4 mr-2">
                            <a href="/language/fr" className={`font-bold transition-colors ${locale === 'fr' ? 'text-yellow-400' : 'text-gray-400 hover:text-white'}`}>FR</a>
                            <a href="/language/en" className={`font-bold transition-colors ${locale === 'en' ? 'text-yellow-400' : 'text-gray-400 hover:text-white'}`}>EN</a>
                        </div>
                        <Link href={auth?.user ? "/admin/dashboard" : "/login"} className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
                            <UserCircleIcon className="h-5 w-5" />
                            <span className="hidden sm:inline">Espace Enseignant</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-100 mx-auto w-full sticky top-0" aria-label="Global">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

                    {/* Logo Section - Left Side */}
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group" data-track-click="header-logo">
                            <img className="h-8 sm:h-12 w-auto transition-transform group-hover:scale-105" src={logo} alt={siteName} />
                            <div className="flex flex-col">
                                <span className="text-xl sm:text-2xl font-bold text-violet-950 font-serif tracking-tight leading-none group-hover:text-violet-700 transition-colors">GSLJ</span>
                                <span className="text-[0.65rem] sm:text-xs font-semibold text-yellow-600 uppercase tracking-widest">Groupe Scolaire</span>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Ouvrir le menu</span>
                            <Bars3Icon className="h-7 w-7" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex lg:gap-x-8">
                        {navigation.map((item) => (
                            item.children ? (
                                <div key={item.name} className="relative group">
                                    <button className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-700 hover:text-violet-700 transition-colors outline-none py-2">
                                        {item.name}
                                        <svg className="h-4 w-4 flex-none text-gray-400 group-hover:text-violet-700 transition-colors" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <div className="absolute -left-4 top-full z-10 w-48 overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-gray-900/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left translate-y-2 group-hover:translate-y-0">
                                        <div className="p-1">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="block rounded-md px-4 py-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-700 hover:text-violet-700 relative group transition-colors py-2">
                                    {item.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 transition-all group-hover:w-full"></span>
                                </Link>
                            )
                        ))}
                    </div>

                </div>
            </nav>

            {/* Mobile menu */}
            <div className={`lg:hidden fixed inset-0 z-50 transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
                <div className="fixed inset-y-0 right-0 z-60 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm shadow-2xl">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                        <div className="flex items-center gap-2">
                            <img className="h-8 w-auto" src={logo} alt={siteName} />
                            <span className="font-bold text-violet-950">GSLJ</span>
                        </div>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Fermer le menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-1 py-6">
                                {navigation.map((item) => (
                                    item.children ? (
                                        <div key={item.name} className="space-y-1">
                                            <div className="block rounded-lg px-3 py-2 text-base font-bold text-gray-900 bg-gray-50">
                                                {item.name}
                                            </div>
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="block rounded-lg py-2 pl-8 pr-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-violet-700"
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
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-violet-700 transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                ))}
                            </div>
                            <div className="py-6 space-y-4">
                                <Link
                                    href="/admissions"
                                    className="block w-full rounded-md bg-violet-600 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-violet-500"
                                >
                                    Portail Parents
                                </Link>
                                <div className="flex justify-center gap-6 text-sm font-medium text-gray-500">
                                    <a href="/language/fr" className={locale === 'fr' ? 'text-violet-600 font-bold' : ''}>Français</a>
                                    <a href="/language/en" className={locale === 'en' ? 'text-violet-600 font-bold' : ''}>English</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
