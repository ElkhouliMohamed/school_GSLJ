import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { TruckIcon, HomeIcon, ShoppingBagIcon, AcademicCapIcon, BuildingOfficeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function Index({ facilities }) {
    const { locale } = usePage().props;

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const typeFilter = urlParams.get('type');

    const getLocalized = (content, fallback = '') => {
        if (!content) return fallback;
        if (typeof content === 'string') return content;
        return content[locale] || content['fr'] || content['en'] || Object.values(content)[0] || fallback;
    };

    const typeIcons = {
        transport: TruckIcon,
        catering: ShoppingBagIcon,
        uniform: HomeIcon,
        lab: AcademicCapIcon,
        infrastructure: BuildingOfficeIcon,
        regulations: DocumentTextIcon
    };

    const typeLabels = {
        transport: {
            en: 'Transportation',
            fr: 'Transport'
        },
        catering: {
            en: 'Catering',
            fr: 'Restauration'
        },
        uniform: {
            en: 'School Uniform',
            fr: 'Uniforme Scolaire'
        },
        lab: {
            en: 'Laboratory',
            fr: 'Laboratoire'
        },
        infrastructure: {
            en: 'Infrastructure',
            fr: 'Infrastructure'
        },
        regulations: {
            en: 'Regulations',
            fr: 'Règlements'
        }
    };

    const getTypeLabel = (type) => {
        const labels = typeLabels[type];
        if (typeof labels === 'object') {
            return labels[locale] || labels['fr'] || labels['en'];
        }
        return labels || type;
    };

    // Filter facilities based on type if specified in URL
    const filteredFacilities = typeFilter
        ? facilities.filter(facility => facility.type === typeFilter)
        : facilities;

    // Get type name for title
    const typeName = getTypeLabel(typeFilter) || typeFilter;

    const pageTitle = typeFilter
        ? `${typeName} Services`
        : 'Facilities & Services';

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <Head title={`${pageTitle} - Groupe Scolaire GSLJ`} />
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-violet-600">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                {pageTitle}
                            </h1>
                            <p className="mt-6 text-xl leading-8 text-violet-100">
                                {typeFilter
                                    ? (locale === 'en'
                                        ? `Comprehensive ${typeName.toLowerCase()} services to support our students and their families`
                                        : `Services complets de ${typeName.toLowerCase()} pour soutenir nos élèves et leurs familles`)
                                    : (locale === 'en'
                                        ? 'Comprehensive services to support our students and their families'
                                        : 'Services complets pour soutenir nos élèves et leurs familles')
                                }
                            </p>
                        </div>
                    </div>
                </div>

                {/* Facilities Grid */}
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            {typeFilter
                                ? typeName
                                : (locale === 'en' ? 'School Services' : 'Services scolaires')}
                        </h2>
                        <p className="mt-4 text-lg leading-6 text-gray-600">
                            {typeFilter
                                ? (locale === 'en'
                                    ? `Our comprehensive ${typeName.toLowerCase()} services to enhance the educational experience`
                                    : `Nos services complets de ${typeName.toLowerCase()} pour améliorer l'expérience éducative`)
                                : (locale === 'en'
                                    ? 'We provide a range of facilities and services to enhance the educational experience'
                                    : 'Nous fournissons un ensemble d\'installations et de services pour améliorer l\'expérience éducative')
                            }
                        </p>
                    </div>

                    {filteredFacilities.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">{locale === 'en' ? 'No services found for the selected type.' : 'Aucun service trouvé pour le type sélectionné.'}</p>
                            <a
                                href="/facilities"
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700"
                            >
                                {locale === 'en' ? 'View All Services' : 'Voir tous les services'}
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredFacilities.map((facility) => {
                                const IconComponent = typeIcons[facility.type] || BuildingOfficeIcon;
                                return (
                                    <div key={facility.id} className="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                                        <div className="p-8">
                                            <div className="flex justify-center mb-6">
                                                {facility.images && facility.images.length > 0 ? (
                                                    <img
                                                        src={facility.images[0]}
                                                        alt={getLocalized(facility.name)}
                                                        className="h-16 w-16 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                                        <IconComponent className="h-8 w-8" />
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                                                {getLocalized(facility.name)}
                                            </h3>
                                            <p className="text-gray-600 text-center text-sm mb-4 capitalize">
                                                {getTypeLabel(facility.type) || facility.type}
                                            </p>
                                            {facility.description && (
                                                <p className="text-gray-600 text-sm mb-4">
                                                    {getLocalized(facility.description)}
                                                </p>
                                            )}
                                            <div className="mt-6">
                                                <a
                                                    href={`/facilities/${facility.slug}`}
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
