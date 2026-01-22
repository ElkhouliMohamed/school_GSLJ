import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { AcademicCapIcon, BookOpenIcon, LightBulbIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function Show({ program }) {
    const { locale } = usePage().props;

    const getLocalized = (content, fallback = '') => {
        if (!content) return fallback;
        if (typeof content === 'string') return content;
        return content[locale] || content['fr'] || content['en'] || Object.values(content)[0] || fallback;
    };

    const levelIcons = {
        preschool: AcademicCapIcon,
        elementary: BookOpenIcon,
        middle: LightBulbIcon,
        secondary: UserGroupIcon
    };

    const IconComponent = levelIcons[program.level] || AcademicCapIcon;

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <Head title={`${getLocalized(program.name)} - Groupe Scolaire GSLJ`} />
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-violet-600">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                    <IconComponent className="h-10 w-10" />
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                {getLocalized(program.name)}
                            </h1>
                            <p className="mt-4 text-xl text-violet-100 capitalize">
                                {program.level.replace('_', ' ')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        {program.description && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">{locale === 'en' ? 'About This Program' : 'À propos de ce programme'}</h2>
                                <div className="prose prose-lg text-gray-600">
                                    <p>{getLocalized(program.description)}</p>
                                </div>
                            </div>
                        )}

                        {program.objectives && program.objectives.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">{locale === 'en' ? 'Learning Objectives' : 'Objectifs pédagogiques'}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {getLocalized(program.objectives).map((objective, index) => (
                                        <div key={index} className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                                    <span className="text-sm font-bold">{index + 1}</span>
                                                </div>
                                            </div>
                                            <p className="ml-3 text-gray-600">{objective}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {program.curriculum && program.curriculum.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">{locale === 'en' ? 'Curriculum' : 'Programme scolaire'}</h2>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <ul className="divide-y divide-gray-200">
                                        {getLocalized(program.curriculum).map((subject, index) => (
                                            <li key={index} className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-5 w-5 text-violet-600">
                                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <p className="ml-3 text-gray-900 font-medium">{subject}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {program.image && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">{locale === 'en' ? 'Program Environment' : 'Environnement du programme'}</h2>
                                <div className="rounded-2xl overflow-hidden shadow-lg">
                                    <img
                                        src={program.image}
                                        alt={getLocalized(program.name)}
                                        className="w-full h-96 object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="bg-violet-50 rounded-2xl p-8">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{locale === 'en' ? 'Ready to Enroll?' : 'Prêt à vous inscrire ?'}</h3>
                                <p className="text-gray-600 mb-6">
                                    {locale === 'en'
                                        ? `Discover how our ${getLocalized(program.name)} program can shape your child's future.`
                                        : `Découvrez comment notre programme ${getLocalized(program.name)} peut façonner l'avenir de votre enfant.`}
                                </p>
                                <a
                                    href="/admissions"
                                    className="inline-flex justify-center rounded-md bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                                >
                                    {locale === 'en' ? 'Apply Now' : 'Postuler maintenant'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
