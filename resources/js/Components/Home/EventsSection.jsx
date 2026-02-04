import React from 'react';
import { usePage } from '@inertiajs/react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export default function EventsSection({ events }) {
    const { settings, locale } = usePage().props;
    const title = settings?.events_title?.[locale] || "Dernières Actualités & Événements";
    const description = settings?.events_description?.[locale] || "Restez informés de ce qui se passe dans notre établissement.";
    const sectionImage = settings?.events_section_image?.[locale];

    // Helper for localized content
    const getLocalized = (content, fallback = '') => {
        if (!content) return fallback;
        if (typeof content === 'string') return content;
        return content[locale] || content['en'] || Object.values(content)[0] || fallback;
    };

    // Use real events or fallback to dummy data
    const eventsList = events && events.length > 0 ? events : [
        { id: 1, title: 'Journée Portes Ouvertes', date: '2024-03-15', location: 'Campus Principal', image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
        { id: 2, title: 'Fête de la Musique', date: '2024-06-21', location: 'Auditorium', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
        { id: 3, title: 'Remise des Diplômes', date: '2024-06-30', location: 'Grand Hall', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
        { id: 4, title: 'Rentrée Scolaire', date: '2024-09-02', location: 'Toute l\'école', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' },
    ];

    return (
        <section className={`relative py-24 sm:py-32 ${sectionImage ? 'bg-gray-900' : 'bg-white'}`}>
            {/* Dynamic Background Image */}
            {sectionImage && (
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={sectionImage}
                        alt=""
                        className="h-full w-full object-cover object-center opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                </div>
            )}

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${sectionImage ? 'text-white' : 'text-gray-900'}`}>
                        {title}
                    </h2>
                    <p className={`mt-4 ${sectionImage ? 'text-gray-300' : 'text-gray-600'}`}>
                        {description}
                    </p>
                </div>

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {eventsList.map((event) => {
                        const eventDate = new Date(event.start_date || event.date || event.published_at);
                        const day = !isNaN(eventDate) ? eventDate.getDate() : '--';
                        const month = !isNaN(eventDate) ? eventDate.toLocaleDateString(locale, { month: 'short' }) : '---';

                        return (
                            <div key={event.id} className="group relative flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                                {/* Image Header */}
                                <div className="relative h-48 overflow-hidden bg-gray-200">
                                    <img
                                        src={event.image}
                                        alt={getLocalized(event.title)}
                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-center shadow-sm">
                                        <span className="block text-xs font-bold text-gray-500 uppercase">
                                            {month}
                                        </span>
                                        <span className="block text-xl font-bold text-gray-900">
                                            {day}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-xs text-primary font-medium mb-3">
                                        <CalendarDaysIcon className="h-4 w-4" />
                                        <span className="relative z-10 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary">
                                            {getLocalized(event.type, 'Événement')}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {getLocalized(event.title)}
                                    </h3>
                                    {event.content && (
                                        <p className="text-sm leading-6 text-gray-600 line-clamp-2 mb-4 flex-1">
                                            {getLocalized(event.content).replace(/<\/?[^>]+(>|$)/g, "")}
                                        </p>
                                    )}

                                    <div className="mt-auto pt-4">
                                        <button className="text-sm font-semibold text-gray-900 group-hover:text-primary flex items-center gap-1 transition-colors">
                                            Détails <span aria-hidden="true">&rarr;</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
