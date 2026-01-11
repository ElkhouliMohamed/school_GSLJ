import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

export default function HeroSection() {
    const { settings, locale } = usePage().props;

    // Helper for localized content
    const getLocalized = (content, fallback = '') => {
        if (!content) return fallback;
        if (typeof content === 'string') return content;
        return content[locale] || content['en'] || Object.values(content)[0] || fallback;
    };

    // Fallback content
    const title = getLocalized(settings?.hero_title, "L'Excellence Éducative pour votre Enfant");
    const subtitle = getLocalized(settings?.hero_description, "Un programme bilingue 50/50 Français-Anglais pour ouvrir les portes du monde.");
    const image = getLocalized(settings?.hero_image, "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80");

    return (
        <div className="relative isolate overflow-hidden bg-gray-900">
            {/* Background Image */}
            <img
                src={image}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover brightness-50"
            />

            {/* Gradients */}
            <div
                className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"
            />
            <div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-900/50 to-purple-900/50 mix-blend-multiply"
            />

            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">

                    {/* Badge */}
                    <div className="mt-24 sm:mt-32 lg:mt-16">
                        <Link href={route('admissions')} className="inline-flex space-x-6">
                            <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-400 ring-1 ring-inset ring-blue-600/20">
                                Rentrée {new Date().getFullYear()}
                            </span>
                            <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                                <span>Inscriptions ouvertes</span>
                                <ChevronRightIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                            </span>
                        </Link>
                    </div>

                    {/* Title */}
                    <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        {title}
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        {subtitle}
                    </p>

                    {/* CTAs */}
                    <div className="mt-10 flex items-center gap-x-6">
                        <Link
                            href={route('admissions', undefined, false)}
                            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300 transform hover:scale-105"
                        >
                            Commencer l'inscription
                        </Link>
                        <Link href={route('about', undefined, false)} className="text-sm font-semibold leading-6 text-white hover:text-blue-300 transition-colors">
                            Découvrir l'école <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
