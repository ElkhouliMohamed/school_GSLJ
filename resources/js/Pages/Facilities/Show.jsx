import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { TruckIcon, HomeIcon, ShoppingBagIcon, AcademicCapIcon, BuildingOfficeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function Show({ facility }) {
    const { locale } = usePage().props;

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

    const IconComponent = typeIcons[facility.type] || BuildingOfficeIcon;

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <Head title={`${getLocalized(facility.name)} - Groupe Scolaire GSLJ`} />
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
                                {getLocalized(facility.name)}
                            </h1>
                            <p className="mt-4 text-xl text-violet-100 capitalize">
                                {getTypeLabel(facility.type) || facility.type}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        {facility.description && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    {locale === 'en' ? 'About This Service' : 'À propos de ce service'}
                                </h2>
                                <div className="prose prose-lg text-gray-600">
                                    <p>{getLocalized(facility.description)}</p>
                                </div>
                            </div>
                        )}

                        {facility.details && facility.details.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    {locale === 'en' ? 'Service Details' : 'Détails du service'}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {getLocalized(facility.details).map((detail, index) => (
                                        <div key={index} className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                                                    <span className="text-sm font-bold">{index + 1}</span>
                                                </div>
                                            </div>
                                            <p className="ml-3 text-gray-600">{detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {facility.images && facility.images.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    {locale === 'en' ? 'Facility Images' : 'Images de l\'établissement'}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {facility.images.map((image, index) => (
                                        <div key={index} className="rounded-2xl overflow-hidden shadow-lg">
                                            <img
                                                src={image}
                                                alt={`${getLocalized(facility.name)} - Image ${index + 1}`}
                                                className="w-full h-64 object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-violet-50 rounded-2xl p-8">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {locale === 'en' ? 'Need More Information?' : 'Besoin de plus d\'informations ?'}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {locale === 'en'
                                        ? `Learn more about our ${getLocalized(facility.name)} service and how it benefits our students.`
                                        : `En savoir plus sur notre service ${getLocalized(facility.name)} et comment il bénéficie à nos élèves.`}
                                </p>
                                <a
                                    href="/contact"
                                    className="inline-flex justify-center rounded-md bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                                >
                                    {locale === 'en' ? 'Contact Us' : 'Nous contacter'}
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
