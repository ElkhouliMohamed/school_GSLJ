import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import useSettings from '@/Hooks/useSettings';

export default function DirectorsWord() {
    const { getSetting } = useSettings();

    const title = getSetting('director_title', "Mot de la Direction");
    const content = getSetting('director_content', "Bienvenue à l'École Excellence. Notre mission est de fournir un environnement éducatif stimulant et bienveillant où chaque enfant peut s'épanouir académiquement et personnellement. Nous croyons en l'excellence, l'innovation et l'ouverture sur le monde.");
    const image = getSetting('director_image', "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80");
    const directorName = getSetting('director_name', "Mme. Directrice");

    return (
        <section className="bg-white py-24 sm:py-32 relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">

                    {/* Text Column */}
                    <div className="lg:order-2">
                        <div className="relative pl-6 lg:pl-0">
                            {/* Decorative line */}
                            <div className="absolute left-0 top-2 bottom-0 w-1 bg-gradient-to-b from-violet-600 to-transparent lg:hidden"></div>

                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {title}
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600 whitespace-pre-wrap">
                                {content}
                            </p>

                            <div className="mt-8 border-l-4 border-violet-600 pl-4 py-1">
                                <p className="font-semibold text-gray-900">{directorName}</p>
                                <p className="text-sm text-gray-500">Directrice de l'établissement</p>
                            </div>

                            <div className="mt-10">
                                <Link href={route('about', undefined, false)} className="text-sm font-semibold leading-6 text-violet-700 hover:text-violet-600 inline-flex items-center gap-1 group">
                                    En savoir plus sur notre mission
                                    <span aria-hidden="true" className="block transition-transform group-hover:translate-x-1">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className="lg:order-1 relative">
                        <div className="absolute -inset-4 bg-gray-100 rounded-2xl transform rotate-2"></div>
                        <img
                            src={image}
                            alt="Director"
                            className="relative w-full max-w-lg rounded-2xl shadow-xl ring-1 ring-gray-900/10 object-cover aspect-[4/5] mx-auto lg:mr-auto"
                        />
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full z-20 flex items-center justify-center shadow-lg hidden md:flex">
                            <span className="text-xs font-bold text-center px-2">Excellence<br />depuis 2010</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
