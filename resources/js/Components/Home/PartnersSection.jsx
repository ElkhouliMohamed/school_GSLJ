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



    return (
        <section className="bg-white py-12 sm:py-16 border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {title}
                    </h2>
                    {settings?.partners_description?.[locale] && (
                        <p className="mt-4 text-lg leading-8 text-gray-600">
                            {settings.partners_description[locale]}
                        </p>
                    )}
                </div>

                {partners && partners.length > 0 ? (
                    <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        {partners.map((partner) => {
                            // Handle various path formats:
                            // 1. External URLs (http/https)
                            // 2. Absolute paths from root (/images/..., /storage/...)
                            // 3. Relative paths (assume they need /storage/ prefix)
                            const logoUrl = partner.logo.startsWith('http') || partner.logo.startsWith('/')
                                ? partner.logo
                                : `/storage/${partner.logo}`;

                            return (
                                <a
                                    key={partner.id}
                                    href={partner.url || '#'}
                                    target={partner.url ? '_blank' : '_self'}
                                    rel={partner.url ? 'noopener noreferrer' : ''}
                                    className="col-span-2 lg:col-span-1 flex justify-center"
                                >
                                    <img
                                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                                        src={logoUrl}
                                        alt={getLocalized(partner.name)}
                                        width={158}
                                        height={48}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            // Fallback to a simple SVG placeholder
                                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='158' height='48' viewBox='0 0 158 48'%3E%3Crect width='158' height='48' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%239ca3af'%3EPreview%3C/text%3E%3C/svg%3E";
                                        }}
                                    />
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        {/* Optional: Message when no partners are found, or render nothing */}
                    </div>
                )}
            </div>
        </section>
    );
}
