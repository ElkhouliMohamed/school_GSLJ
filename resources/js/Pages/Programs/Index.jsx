import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { AcademicCapIcon, BookOpenIcon, LightBulbIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function Index({ programs }) {
    const { locale } = usePage().props;

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const levelFilter = urlParams.get('level');

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

    // Filter programs based on level if specified in URL
    const filteredPrograms = levelFilter
        ? programs.filter(program => program.level === levelFilter)
        : programs;

    // Get level name for title
    const levelNames = {
        preschool: 'Preschool',
        elementary: 'Elementary',
        middle: 'Middle School',
        secondary: 'Secondary School'
    };

    const pageTitle = levelFilter
        ? `${levelNames[levelFilter] || levelFilter} Programs`
        : 'Educational Programs';

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <Head title={`${pageTitle} - Groupe Scolaire GSLJ`} />
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-violet-900 via-violet-800 to-indigo-900">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                {pageTitle}
                            </h1>
                            <p className="mt-6 text-xl leading-8 text-violet-200">
                                {levelFilter
                                    ? `Discover our ${levelNames[levelFilter] || levelFilter} program offerings`
                                    : 'Discover our comprehensive academic offerings for every stage of learning'
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Programs Grid */}
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            {levelFilter ? levelNames[levelFilter] || levelFilter : (locale === 'en' ? 'Educational Cycles' : 'Cycles Éducatifs')}
                        </h2>
                        <p className="mt-4 text-lg leading-6 text-gray-600">
                            {levelFilter
                                ? (locale === 'en'
                                    ? `Our comprehensive ${levelNames[levelFilter] || levelFilter} program offerings`
                                    : `Nos offres de programmes complets pour ${levelNames[levelFilter] || levelFilter}`)
                                : (locale === 'en'
                                    ? 'We offer tailored educational programs designed to meet the needs of students at every developmental stage'
                                    : 'Nous proposons des programmes éducatifs sur mesure conçus pour répondre aux besoins des élèves à chaque étape de développement')
                            }
                        </p>
                    </div>

                    {filteredPrograms.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">{locale === 'en' ? 'No programs found for the selected level.' : 'Aucun programme trouvé pour le niveau sélectionné.'}</p>
                            <a
                                href="/programs"
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700"
                            >
                                {locale === 'en' ? 'View All Programs' : 'Voir tous les programmes'}
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {filteredPrograms.map((program) => {
                                const IconComponent = levelIcons[program.level] || AcademicCapIcon;
                                return (
                                    <div key={program.id} className="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                                        <div className="p-8">
                                            <div className="flex justify-center mb-6">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                                    <IconComponent className="h-8 w-8" />
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                                                {getLocalized(program.name)}
                                            </h3>
                                            <p className="text-gray-600 text-center text-sm mb-4 capitalize">
                                                {program.level.replace('_', ' ')}
                                            </p>
                                            {program.description && (
                                                <p className="text-gray-600 text-sm mb-4">
                                                    {getLocalized(program.description)}
                                                </p>
                                            )}
                                            <div className="mt-6">
                                                <a
                                                    href={`/programs/${program.slug}`}
                                                    className="inline-flex w-full justify-center rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                                                >
                                                    {locale === 'en' ? 'Learn More' : 'En savoir plus'}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
