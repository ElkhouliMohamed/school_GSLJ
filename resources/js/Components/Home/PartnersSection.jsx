import React from 'react';
import { usePage } from '@inertiajs/react';

export default function PartnersSection({ partners }) {
    const { settings, locale } = usePage().props;
    const title = settings?.partners_title?.[locale] || "Nos Partenaires et Accréditations";

    // Helper for localized content
    const getLocalized = (content, fallback = '') => {
        if (!content) return fallback;
        if (typeof content === 'string') return content;
        return content[locale] || content['en'] || Object.values(content)[0] || fallback;
    };

    // Use real partners or fallback to dummy data
    const partnersList = partners && partners.length > 0 ? partners : [
        { id: 1, name: 'Ministère de l\'Éducation', logo: 'https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg' },
        { id: 2, name: 'Cambridge English', logo: 'https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg' },
        { id: 3, name: 'Association Sportive', logo: 'https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg' },
        { id: 4, name: 'Partenaire Culturel', logo: 'https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg' },
        { id: 5, name: 'Réseau Écoles Vertes', logo: 'https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg' },
    ];

    return (
        <section className="bg-white py-12 sm:py-16 border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <p className="text-center text-sm font-semibold leading-8 text-gray-500 mb-8 uppercase tracking-wide">
                    {title}
                </p>
                <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    {partnersList.map((partner) => {
                        const logoUrl = partner.logo.startsWith('http')
                            ? partner.logo
                            : `/storage/${partner.logo}`;

                        return (
                            <a
                                key={partner.id}
                                href={partner.url || '#'}
                                target={partner.url ? '_blank' : '_self'}
                                rel={partner.url ? 'noopener noreferrer' : ''}
                                className="col-span-2 lg:col-span-1"
                            >
                                <img
                                    className="max-h-12 w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                                    src={logoUrl}
                                    alt={getLocalized(partner.name)}
                                    width={158}
                                    height={48}
                                />
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
