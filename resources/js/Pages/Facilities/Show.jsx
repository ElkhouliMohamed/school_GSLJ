import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { TruckIcon, HomeIcon, ShoppingBagIcon, AcademicCapIcon, BuildingOfficeIcon, DocumentTextIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';

export default function Show({ facility }) {
    const { locale } = usePage().props;
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % facility.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + facility.images.length) % facility.images.length);
    };

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
                <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                    {facility.images && facility.images.length > 0 && (
                        <img
                            src={facility.images[0]}
                            alt={getLocalized(facility.name)}
                            className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-40"
                        />
                    )}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20">
                                    <IconComponent className="h-10 w-10" />
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-serif shadow-sm">
                                {getLocalized(facility.name)}
                            </h1>
                            <p className="mt-4 text-xl text-gray-300 capitalize font-light">
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
                                <div
                                    className="tinymce-content"
                                    dangerouslySetInnerHTML={{ __html: getLocalized(facility.description) }}
                                />
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

                        {/* Gallery Slider (replaces the old grid, heading is hidden) */}
                        {facility.images && facility.images.length > 0 && (
                            <div className="mb-16">
                                {/* Heading intentionally hidden as requested */}
                                <div className="relative group">
                                    <div
                                        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-2 -mx-2 hide-scrollbar"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                    >
                                        {facility.images.map((img, index) => (
                                            <div
                                                key={index}
                                                className="flex-none w-72 md:w-96 rounded-xl overflow-hidden shadow-md aspect-4/3 snap-center cursor-pointer relative group/item"
                                                onClick={() => openLightbox(index)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${getLocalized(facility.name)} - Image ${index + 1}`}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                                    <div className="opacity-0 group-hover/item:opacity-100 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium flex items-center gap-2 transform translate-y-4 group-hover/item:translate-y-0 transition-all duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                                                        </svg>
                                                        {locale === 'fr' || !locale ? 'Agrandir' : 'Enlarge'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Desktop Navigation Arrows for Slider */}
                                    <button
                                        onClick={(e) => {
                                            const container = e.currentTarget.parentElement.querySelector('.hide-scrollbar');
                                            container.scrollBy({ left: -300, behavior: 'smooth' });
                                        }}
                                        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg text-violet-600 hover:bg-violet-50 hover:scale-110 transition-all z-10 opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronLeftIcon className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            const container = e.currentTarget.parentElement.querySelector('.hide-scrollbar');
                                            container.scrollBy({ left: 300, behavior: 'smooth' });
                                        }}
                                        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg text-violet-600 hover:bg-violet-50 hover:scale-110 transition-all z-10 opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronRightIcon className="h-6 w-6" />
                                    </button>
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

            {/* Lightbox Dialog */}
            {facility.images && facility.images.length > 0 && (
                <Dialog open={lightboxOpen} onClose={() => setLightboxOpen(false)} className="relative z-100">
                    <DialogBackdrop transition className="fixed inset-0 bg-black/95 backdrop-blur-sm transition-opacity duration-300" />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel transition className="relative w-full max-w-6xl flex flex-col items-center justify-center duration-300 ease-out data-closed:scale-95 data-closed:opacity-0">
                                <button
                                    type="button"
                                    className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
                                    onClick={() => setLightboxOpen(false)}
                                >
                                    <XMarkIcon className="h-8 w-8" />
                                </button>

                                <div className="relative w-full aspect-4/3 md:aspect-video flex items-center justify-center">
                                    <img
                                        src={facility.images[currentImageIndex]}
                                        alt={`Gallery expanded ${currentImageIndex + 1}`}
                                        className="max-w-full max-h-[85vh] object-contain select-none shadow-2xl rounded-sm"
                                    />

                                    {facility.images.length > 1 && (
                                        <>
                                            {/* Mobile Tap Areas for Next/Prev */}
                                            <div className="absolute inset-y-0 left-0 w-1/3 z-10 md:hidden cursor-pointer" onClick={prevImage} />
                                            <div className="absolute inset-y-0 right-0 w-1/3 z-10 md:hidden cursor-pointer" onClick={nextImage} />

                                            {/* Desktop Nav Arrows */}
                                            <button
                                                className="hidden md:block absolute -left-16 text-white/50 hover:text-white hover:scale-110 transition-all p-2"
                                                onClick={prevImage}
                                            >
                                                <ChevronLeftIcon className="h-12 w-12" />
                                            </button>
                                            <button
                                                className="hidden md:block absolute -right-16 text-white/50 hover:text-white hover:scale-110 transition-all p-2"
                                                onClick={nextImage}
                                            >
                                                <ChevronRightIcon className="h-12 w-12" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {facility.images.length > 1 && (
                                    <div className="text-white mt-4 text-sm font-medium tracking-wide">
                                        {currentImageIndex + 1} / {facility.images.length}
                                    </div>
                                )}
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    );
}
