import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { BookOpenIcon, AcademicCapIcon, UserIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export default function CursusSection() {
    const { programs, locale } = usePage().props;

    // Helper for localized content
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

    const getColor = (index) => {
        return index % 2 === 0 ? 'bg-primary' : 'bg-secondary';
    };

    return (
        <section className="bg-white py-10 relative">
            {/* Decorative shapes */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/10 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-tl-full" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold uppercase text-primary mb-4">
                    Le Cursus Scolaire
                </h2>
                <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-8" />
                <p className="max-w-2xl mx-auto text-gray-600 mb-16 text-lg">
                    Un parcours d'excellence, de la maternelle au baccalauréat, ouvrant les portes des meilleures universités mondiales.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {programs?.map((program, idx) => (
                        <Link key={program.id} href={`/programs/${program.slug}`} className="flex flex-col items-center group">
                            <div className={`w-40 h-40 rounded-full ${getColor(idx)} flex items-center justify-center shadow-xl mb-8 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                                {/* Inner circle decoration */}
                                <div className="absolute inset-2 border-2 border-white/30 rounded-full" />
                                {getIcon(program.slug)}
                            </div>
                            <h3 className="text-xl font-bold text-primary uppercase mb-2 text-center">
                                {getLocalized(program.name)}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6 h-10 text-center">
                                {getLocalized(program.description)}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
