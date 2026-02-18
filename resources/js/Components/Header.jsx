import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bars3Icon, XMarkIcon, PhoneIcon, EnvelopeIcon, ChevronDownIcon } from '@heroicons/react/24/outline'; // Added useful icons
import { getTranslation } from '../translations';
import useSettings from '@/Hooks/useSettings';

export default function Header() {
    const { settings, locale, auth, facilities, programs } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});
    const { getSetting } = useSettings();

    const toggleMobileDropdown = (itemName) => {
        setMobileDropdownOpen(prev => ({
            ...prev,
            [itemName]: !prev[itemName]
        }));
    };

    const t = (key) => getTranslation(key, locale);

    const logo = getSetting('site_logo') || "/logo.svg";
    const siteName = getSetting('site_name', "Groupe Scolaire Privé Bilingue LES JUMELLES");
    const sitePhone = getSetting('site_phone') || "+221 33 000 00 00";
    const siteEmail = getSetting('site_email') || "contact@lesjumelles.sn";

    // Helper for localized content
    const getLocalized = (content) => {
        if (!content) return '';
        if (typeof content === 'string') return content;
        return content[locale] || content['fr'] || content['en'] || Object.values(content)[0] || '';
    };

    const navigation = [
        { name: 'ACCUEIL', href: '/' },
        { name: 'À PROPOS', href: '/about' },
        { name: 'INSCRIPTIONS', href: '/admissions' },
        {
            name: 'VIE SCOLAIRE',
            children: [
                ...(facilities?.map(facility => ({
                    name: getLocalized(facility.name),
                    href: `/facilities/${facility.slug}`
                })) || []),
                { name: 'Règlement Intérieur', href: '/rules_regulations.pdf', target: '_blank' }
            ]
        },
        {
            name: 'PÉDAGOGIE',
            children: programs?.map(program => ({
                name: getLocalized(program.name),
                href: `/programs/${program.slug}`
            })) || []
        },
        { name: 'ACTUALITÉS', href: '/news' },
        { name: 'GALERIE', href: '/gallery' },
        { name: 'CONTACTS', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 transition-all duration-300 font-sans shadow-lg bg-white">
            {/* Top Bar - Teal/Green inspired by Maarif */}
            <div className="hidden md:block bg-primary text-white py-2 text-xs md:text-sm font-bold tracking-wide">
                <div className="container mx-auto flex flex-col md:flex-row w-full items-center justify-between px-6 lg:px-8 gap-2 md:gap-0">
                    <div className="flex items-center gap-6">
                        <a href={`tel:${sitePhone.replace(/\s/g, '')}`} className="flex items-center gap-1 hover:text-gray-200">
                            <PhoneIcon className="h-4 w-4" />
                            <span>{sitePhone}</span>
                        </a>
                        <a href={`mailto:${siteEmail}`} className="flex items-center gap-1 hover:text-gray-200">
                            <EnvelopeIcon className="h-4 w-4" />
                            <span>{siteEmail}</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">

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
                                en
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header Area - Logo & Name & Navigation */}
            <div className="bg-white border-b border-gray-100 py-2">
                <div className="container mx-auto flex w-full items-center justify-between px-4 lg:px-8 gap-4">
                    {/* Logo & Name Container */}
                    <div className="flex items-center gap-3">
                        {/* Logo - Reduced Size */}
                        <Link href="/" className="shrink-0">
                            <img className="h-10 sm:h-14 w-auto object-contain hover:scale-105 transition-transform" src={logo} alt={siteName} />
                        </Link>

                        {/* School Name - Visible & Explicit */}
                        <div className="flex flex-col justify-center">
                            <Link href="/" className="hover:opacity-80 transition-opacity">
                                {/* Mobile/Tablet Name (< lg) */}
                                <h1 className="lg:hidden text-sm font-extrabold text-primary uppercase leading-tight">
                                    GS LES JUMELLES
                                </h1>

                                {/* Desktop Name (>= lg) */}
                                <h1 className="hidden lg:block text-xs sm:text-sm md:text-base font-extrabold text-primary uppercase leading-tight">
                                    Groupe Scolaire Privé Bilingue <br />
                                    <span className="text-secondary text-base sm:text-lg md:text-xl">LES JUMELLES</span>
                                </h1>
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-x-1" aria-label="Global">
                        {navigation.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.children ? (
                                    <>
                                        <button className="flex items-center gap-1 text-[11px] font-bold text-gray-700 hover:text-primary transition-colors px-2 py-2 uppercase tracking-wide">
                                            {item.name}
                                            <svg className="h-3 w-3 flex-none text-gray-400 group-hover:text-secondary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <div className="absolute top-full right-0 z-20 w-48 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                            <div className="py-1">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className="block px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link key={item.name} href={item.href} className="flex items-center text-[11px] font-bold text-gray-700 hover:text-primary transition-colors px-2 py-2 uppercase tracking-wide">
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Mobile Menu Trigger */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Ouvrir le menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
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
                                            <button
                                                onClick={() => toggleMobileDropdown(item.name)}
                                                className="w-full flex items-center justify-between rounded-lg px-3 py-3 text-base font-bold leading-7 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                                            >
                                                <span>{item.name}</span>
                                                <ChevronDownIcon
                                                    className={`h-5 w-5 text-primary transition-transform duration-200 ${mobileDropdownOpen[item.name] ? 'rotate-180' : ''}`}
                                                    aria-hidden="true"
                                                />
                                            </button>
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdownOpen[item.name]
                                                    ? 'max-h-96 opacity-100'
                                                    : 'max-h-0 opacity-0'
                                                    }`}
                                            >
                                                <div className="space-y-1 pt-1">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.name}
                                                            href={child.href}
                                                            className="block rounded-lg py-2.5 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-colors"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-3 text-base font-bold leading-7 text-gray-900 hover:bg-gray-50 transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                ))}
                            </div>
                            <div className="py-6 border-t border-gray-200 space-y-2">

                                <a href={`tel:${sitePhone.replace(/\s/g, '')}`} className="flex items-center gap-2 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    <PhoneIcon className="h-5 w-5 text-secondary" />
                                    {sitePhone}
                                </a>
                                <a href={`mailto:${siteEmail}`} className="flex items-center gap-2 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    <EnvelopeIcon className="h-5 w-5 text-secondary" />
                                    {siteEmail}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
