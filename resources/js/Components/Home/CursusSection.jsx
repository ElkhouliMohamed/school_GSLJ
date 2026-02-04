import React from 'react';
import { Link } from '@inertiajs/react';
import { BookOpenIcon, AcademicCapIcon, UserIcon, GlobeAltIcon } from '@heroicons/react/24/outline'; // Using generic icons

export default function CursusSection() {
    const columns = [
        {
            title: "Primaire",
            subtitle: "De la Petite Section au CM2",
            icon: <UserIcon className="w-12 h-12 text-white" />,
            color: "bg-primary",
            link: "/programs"
        },
        {
            title: "Secondaire",
            subtitle: "De la 6ème à la Terminale",
            icon: <BookOpenIcon className="w-12 h-12 text-white" />,
            color: "bg-secondary",
            link: "/programs"
        },
        {
            title: "Section Internationale Américaine",
            subtitle: "SIA & OIB",
            icon: <GlobeAltIcon className="w-12 h-12 text-white" />,
            color: "bg-primary",
            link: "/programs"
        }
    ];

    return (
        <section className="bg-white py-20 relative">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {columns.map((col, idx) => (
                        <div key={idx} className="flex flex-col items-center group">
                            <div className={`w-40 h-40 rounded-full ${col.color} flex items-center justify-center shadow-xl mb-8 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                                {/* Inner circle decoration */}
                                <div className="absolute inset-2 border-2 border-white/30 rounded-full" />
                                {col.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-primary uppercase mb-2">
                                {col.title}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6 h-10">
                                {col.subtitle}
                            </p>
                            <Link
                                href={col.link}
                                className="inline-block bg-primary text-white text-xs font-bold uppercase px-8 py-3 rounded-full hover:bg-secondary transition-colors shadow-md"
                            >
                                Découvrir
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
