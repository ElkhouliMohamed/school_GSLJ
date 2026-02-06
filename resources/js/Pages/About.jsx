import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { CheckCircleIcon } from '@heroicons/react/20/solid';

export default function About() {
    const { settings, locale } = usePage().props;

    // Helper for localized content
    const getLocalized = (content, fallback = '') => {
        if (!content) return fallback;
        if (typeof content === 'string') return content;
        return content[locale] || content['en'] || Object.values(content)[0] || fallback;
    };

    const title = getLocalized(settings?.about_title, 'À Propos de l\'Excellence Academy');
    const content = getLocalized(settings?.about_content, 'Fondée avec une vision d\'excellence, notre école est un pilier de la communauté depuis de nombreuses années. Nous croyons en une approche holistique de l\'éducation, équilibrant la rigueur académique avec le développement du caractère. Notre mission est de fournir un environnement stimulant où chaque élève peut découvrir ses talents uniques et développer les compétences nécessaires pour s\'épanouir dans un monde en constante évolution. Nous nous engageons à favoriser la pensée critique, la créativité et l\'amour de l\'apprentissage tout au long de la vie. Avec des installations de pointe, des enseignants dévoués et une communauté diversifiée d\'apprenants, nous préparons nos élèves non seulement à la réussite académique, mais aussi à des vies significatives en tant que citoyens du monde engagés.');
    const image = getLocalized(settings?.about_image, 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80');

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <Head title="À Propos - Groupe Scolaire GSLJ" />
            <Header />

            <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 grow">


                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-violet-600">À Propos</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">{title}</h1>
                                <p className="mt-6 text-xl leading-8 text-gray-700">
                                    Un établissement d'enseignement de premier plan au service de la réussite de chaque élève.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <img
                            className="w-full aspect-4/3 object-cover rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 lg:w-full lg:h-auto lg:max-w-none xl:w-3xl"
                            src={image}
                            alt="Campus Life"
                        />
                    </div>
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                                <p className="mb-8">{content}</p>
                                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                                    <li className="flex gap-x-3">
                                        <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-violet-600" aria-hidden="true" />
                                        <span><strong className="font-semibold text-gray-900">Excellence Académique.</strong> Programme rigoureux conforme aux standards internationaux.</span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-violet-600" aria-hidden="true" />
                                        <span><strong className="font-semibold text-gray-900">Épanouissement Personnel.</strong> Un cadre de vie favorisant le développement de la confiance en soi.</span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-violet-600" aria-hidden="true" />
                                        <span><strong className="font-semibold text-gray-900">Innovation Pédagogique.</strong> Utilisation des technologies modernes au service de l'apprentissage.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
