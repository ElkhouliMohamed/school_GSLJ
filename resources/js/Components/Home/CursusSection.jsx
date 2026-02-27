import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { BookOpenIcon, AcademicCapIcon, UserIcon, BriefcaseIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const ITEMS_PER_PAGE = 4;

export default function CursusSection() {
    const { programs, locale } = usePage().props;
    const [page, setPage] = useState(0);

    const getLocalized = (content) => {
        if (!content) return '';
        if (typeof content === 'string') return content;
        return content[locale] || content['fr'] || content['en'] || Object.values(content)[0] || '';
    };

    const getIcon = (slug) => {
        switch (slug) {
            case 'prescolaire': return <UserIcon className="w-12 h-12 text-white" />;
            case 'elementaire': return <BookOpenIcon className="w-12 h-12 text-white" />;
            case 'moyen-secondaire': return <AcademicCapIcon className="w-12 h-12 text-white" />;
            case 'formation-professionnelle': return <BriefcaseIcon className="w-12 h-12 text-white" />;
            default: return <BookOpenIcon className="w-12 h-12 text-white" />;
        }
    };

    const getColor = (index) => index % 2 === 0 ? 'bg-primary' : 'bg-secondary';

    if (!programs || programs.length === 0) return null;

    const totalPages = Math.ceil(programs.length / ITEMS_PER_PAGE);
    const visiblePrograms = programs.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

    const prev = () => setPage(p => Math.max(0, p - 1));
    const next = () => setPage(p => Math.min(totalPages - 1, p + 1));

    return (
        <section className="bg-white py-16 relative overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/10 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-tl-full" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold uppercase text-primary mb-4">
                    Le Cursus Scolaire
                </h2>
                <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-4" />
                <p className="max-w-2xl mx-auto text-gray-600 mb-12 text-lg">
                    Un parcours d'excellence, de la maternelle au baccalauréat, ouvrant les portes des meilleures universités mondiales.
                </p>

                {/* Programs Grid (4 per page) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-10">
                    {visiblePrograms.map((program, idx) => {
                        const globalIdx = page * ITEMS_PER_PAGE + idx;
                        return (
                            <Link
                                key={program.id}
                                href={`/programs/${program.slug}`}
                                className="flex flex-col items-center group"
                            >
                                <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${getColor(globalIdx)} flex items-center justify-center shadow-xl mb-5 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                                    <div className="absolute inset-2 border-2 border-white/30 rounded-full" />
                                    {getIcon(program.slug)}
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-primary uppercase mb-2 text-center leading-tight">
                                    {getLocalized(program.name)}
                                </h3>
                                <div
                                    className="text-xs text-gray-500 uppercase tracking-widest text-center line-clamp-2"
                                    dangerouslySetInnerHTML={{ __html: getLocalized(program.description) }}
                                />
                            </Link>
                        );
                    })}
                </div>

                {/* Navigation (only shows when more than 4 programs) */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={prev}
                            disabled={page === 0}
                            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow hover:bg-primary/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Page précédente"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                        </button>

                        {/* Dot indicators */}
                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i)}
                                    aria-label={`Page ${i + 1}`}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${i === page ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-primary/50'}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            disabled={page === totalPages - 1}
                            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow hover:bg-primary/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Page suivante"
                        >
                            <ChevronRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
