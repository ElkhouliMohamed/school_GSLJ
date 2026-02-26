import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { AcademicCapIcon, BookOpenIcon, LightBulbIcon, UserGroupIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';

export default function Show({ program, teamMembers }) {
    const { locale } = usePage().props;
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % program.gallery_images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + program.gallery_images.length) % program.gallery_images.length);
    };

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
                <div
                    className="relative bg-violet-600 bg-cover bg-center"
                    style={program.bg_image ? { backgroundImage: `url(${program.bg_image})` } : {}}
                >
                    {program.bg_image && <div className="absolute inset-0 bg-violet-900/60 mix-blend-multiply" aria-hidden="true" />}
                    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
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
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">{locale === 'fr' || !locale ? 'À propos de ce programme' : 'About This Program'}</h2>
                                <div
                                    className="tinymce-content"
                                    dangerouslySetInnerHTML={{ __html: getLocalized(program.description) }}
                                />
                            </div>
                        )}

                        {(() => {
                            const objectives = getLocalized(program.objectives, []);
                            return objectives && objectives.length > 0 && (
                                <div className="mb-16">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{locale === 'fr' || !locale ? 'Objectifs pédagogiques' : 'Learning Objectives'}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {objectives.map((objective, index) => (
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
                            );
                        })()}

                        {(() => {
                            const curriculum = getLocalized(program.curriculum, []);
                            return curriculum && curriculum.length > 0 && (
                                <div className="mb-16">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{locale === 'fr' || !locale ? 'Programme scolaire' : 'Curriculum'}</h2>
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                        <ul className="divide-y divide-gray-200">
                                            {curriculum.map((subject, index) => (
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
                            );
                        })()}

                        {program.image && (
                            <div className="mb-16">

                                <div className="rounded-2xl overflow-hidden shadow-lg">
                                    <img
                                        src={program.image}
                                        alt={getLocalized(program.name)}
                                        className="w-full h-96 object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {teamMembers && teamMembers.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">{locale === 'fr' || !locale ? 'Notre Équipe Pédagogique' : 'Our Teaching Team'}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {teamMembers.map((member, index) => (
                                        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                                            {member.photo && (
                                                <div className="aspect-square overflow-hidden">
                                                    <img
                                                        src={member.photo}
                                                        alt={getLocalized(member.name)}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{getLocalized(member.name)}</h3>
                                                <p className="text-violet-600 font-semibold mb-3">{getLocalized(member.position)}</p>
                                                {member.bio && (
                                                    <p className="text-gray-600 text-sm line-clamp-3">{getLocalized(member.bio)}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {program.gallery_images && program.gallery_images.length > 0 && (
                            <div className="mb-16">


                                <div className="relative group">
                                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-2 -mx-2 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                        {program.gallery_images.map((img, index) => (
                                            <div
                                                key={index}
                                                className="flex-none w-72 md:w-96 rounded-xl overflow-hidden shadow-md aspect-4/3 snap-center cursor-pointer relative group/item"
                                                onClick={() => openLightbox(index)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${getLocalized(program.name)} environnement ${index + 1}`}
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

                        {/* ========================================= */}
                        {/* CALL TO ACTION SECTION */}
                        {/* ========================================= */}
                        <div className={`rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row ${program.cta_image ? 'bg-white' : 'bg-violet-50 p-8'}`}>
                            {program.cta_image && (
                                <div className="md:w-1/2">
                                    <img src={program.cta_image} alt="Call to action" className="w-full h-full object-cover min-h-[300px]" />
                                </div>
                            )}
                            <div className={`flex flex-col justify-center text-center ${program.cta_image ? 'md:w-1/2 p-8 md:p-12 md:text-left' : 'w-full'}`}>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {getLocalized(program.cta_title, locale === 'fr' || !locale ? 'Prêt à vous inscrire ?' : 'Ready to Enroll?')}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {getLocalized(
                                        program.cta_description,
                                        locale === 'fr' || !locale
                                            ? `Découvrez comment notre programme ${getLocalized(program.name)} peut façonner l'avenir de votre enfant.`
                                            : `Discover how our ${getLocalized(program.name)} program can shape your child's future.`
                                    )}
                                </p>

                                <div className={program.cta_image ? 'flex justify-start' : 'flex justify-center'}>
                                    {program.cta_file ? (
                                        <a
                                            href={program.cta_file}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 rounded-md bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-colors"
                                        >
                                            <ArrowDownTrayIcon className="w-5 h-5" />
                                            {locale === 'fr' || !locale ? 'Télécharger la brochure' : 'Download Brochure'}
                                        </a>
                                    ) : (
                                        <a
                                            href="/admissions"
                                            className="inline-flex justify-center rounded-md bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-colors"
                                        >
                                            {locale === 'fr' || !locale ? 'Postuler maintenant' : 'Apply Now'}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />

            {/* Lightbox Dialog component */}
            {
                program.gallery_images && program.gallery_images.length > 0 && (
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
                                            src={program.gallery_images[currentImageIndex]}
                                            alt={`Gallery expanded ${currentImageIndex + 1}`}
                                            className="max-w-full max-h-[85vh] object-contain select-none shadow-2xl rounded-sm"
                                        />

                                        {program.gallery_images.length > 1 && (
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

                                    {program.gallery_images.length > 1 && (
                                        <div className="text-white mt-4 text-sm font-medium tracking-wide">
                                            {currentImageIndex + 1} / {program.gallery_images.length}
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
