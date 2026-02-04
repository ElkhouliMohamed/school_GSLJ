import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bars3Icon, XMarkIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'; // Added useful icons
import { getTranslation } from '../translations';
import useSettings from '@/Hooks/useSettings';

export default function Header() {
    const { settings, locale, auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getSetting } = useSettings();

    const t = (key) => getTranslation(key, locale);

    const logo = getSetting('site_logo') || "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Logo_AEFE.svg/1200px-Logo_AEFE.svg.png";
    const siteName = getSetting('site_name', "Groupe Scolaire Privé Bilingue LES JUMELLES");

    const navigation = [
        { name: 'ACCUEIL', href: '/' },
        { name: 'À PROPOS', href: '/about' },
        { name: 'INSCRIPTIONS', href: '/admissions' },
        {
            name: 'PÉDAGOGIE',
            children: [
                { name: 'Maternelle & Primaire', href: '/programs/elementary-school-program' },
                { name: 'Collège & Lycée', href: '/programs/high-school-program' },
            ]
        },
        { name: 'ACTUALITÉS', href: '/news' },
        { name: 'CONTACTS', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 transition-all duration-300 font-sans shadow-lg bg-white">
            {/* Top Bar - Vibrant Red/Secondary */}
            <div className="bg-secondary text-white py-2 text-xs md:text-sm font-bold tracking-wide">
                <div className="mx-auto flex flex-col md:flex-row max-w-7xl items-center justify-between px-6 lg:px-8 gap-2 md:gap-0">
                    <div className="flex items-center gap-6">
                        <a href="tel:+22100000000" className="flex items-center gap-1 hover:text-gray-200">
                            <PhoneIcon className="h-4 w-4" />
                            <span>+221 33 000 00 00</span>
                        </a>
                        <a href="mailto:contact@lesjumelles.sn" className="flex items-center gap-1 hover:text-gray-200">
                            <EnvelopeIcon className="h-4 w-4" />
                            <span>contact@lesjumelles.sn</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/pronote" className="hover:underline">ESPACE ÉLÈVE</Link>
                        <span className="text-white/50">|</span>
                        <Link href="/webmail" className="hover:underline">WEBMAIL</Link>
                        <span className="text-white/50">|</span>
                        {/* Language Switcher */}
                        <div className="flex items-center gap-2">
                            <Link
                                href="/language/fr"
                                className={`hover:opacity-80 transition-opacity ${locale === 'fr' ? 'opacity-100' : 'opacity-50'}`}
                                title="Français"
                            >
                                🇫🇷
                            </Link>
                            <Link
                                href="/language/en"
                                className={`hover:opacity-80 transition-opacity ${locale === 'en' ? 'opacity-100' : 'opacity-50'}`}
                                title="English"
                            >
                                🇬🇧
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header Area - Logo & Name */}
            <div className="bg-white border-b border-gray-100 py-1">
                <div className="mx-auto flex max-w-7xl items-center px-4 lg:px-8 gap-3">
                    {/* Logo - Reduced Size */}
                    <Link href="/" className="flex-shrink-0">
                        <img className="h-12 sm:h-16 w-auto object-contain hover:scale-105 transition-transform" src={logo} alt={siteName} />
                    </Link>

                    {/* School Name - Visible & Explicit */}
                    <div className="flex flex-col justify-center">
                        <Link href="/" className="hover:opacity-80 transition-opacity">
                            <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-primary uppercase leading-tight">
                                Groupe Scolaire Privé Bilingue <br className="hidden sm:block" />
                                <span className="text-secondary">LES JUMELLES</span>
                            </h1>
                            <p className="text-gray-500 text-[10px] sm:text-xs font-bold tracking-widest uppercase mt-0">
                                de Yeumbeul Comico 4
                            </p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation Bar - Compact */}
            <nav className="bg-primary text-white mx-auto w-full relative shadow-md" aria-label="Global">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8">
                    {/* Desktop Menu */}
                    <div className="hidden lg:flex lg:gap-x-1 items-center w-full justify-center">
                        {navigation.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.children ? (
                                    <>
                                        <button className="flex items-center gap-1 text-xs font-bold text-white hover:bg-secondary/80 transition-colors px-3 py-2 uppercase tracking-wider">
                                            {item.name}
                                            <svg className="h-3 w-3 flex-none text-white/70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <div className="absolute left-0 top-full z-20 w-48 overflow-hidden rounded-b-md bg-white shadow-xl ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                                            <div className="py-1">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-primary border-b border-gray-50 last:border-0"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link key={item.name} href={item.href} className="text-xs font-bold text-white hover:bg-secondary/80 transition-colors px-3 py-2 uppercase tracking-wider block h-full">
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden absolute top-[4.5rem] right-6 p-2">
                <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2 text-primary"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <span className="sr-only">Ouvrir le menu</span>
                    <Bars3Icon className="h-8 w-8" aria-hidden="true" />
                </button>
            </div>

            {/* Mobile menu */}
            <div className={`lg:hidden fixed inset-0 z-50 transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
                <div className="fixed inset-y-0 right-0 z-60 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <img className="h-10 w-auto" src={logo} alt="" />
                            <span className="font-bold text-primary text-sm leading-tight">GS LES JUMELLES</span>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Fermer menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    item.children ? (
                                        <div key={item.name} className="space-y-1">
                                            <div className="block rounded-lg px-3 py-2 text-base font-bold leading-7 text-primary bg-primary/5">
                                                {item.name}
                                            </div>
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
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
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-bold leading-7 text-gray-900 hover:bg-gray-50"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                ))}
                            </div>
                            <div className="py-6 border-t border-gray-200">
                                <a href="tel:+22100000000" className="flex items-center gap-2 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    <PhoneIcon className="h-5 w-5 text-secondary" />
                                    +221 33 000 00 00
                                </a>
                                <a href="mailto:contact@lesjumelles.sn" className="flex items-center gap-2 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    <EnvelopeIcon className="h-5 w-5 text-secondary" />
                                    contact@lesjumelles.sn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
