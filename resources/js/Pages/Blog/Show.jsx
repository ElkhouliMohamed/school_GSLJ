import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { ArrowLeftIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function Show({ post }) {
    const { locale } = usePage().props;
    const title = post.title[locale] || post.title['en'];
    const content = post.content[locale] || post.content['en'];
    const gallery = post.gallery || [];

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'unset';
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
            if (e.key === 'ArrowLeft') setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, gallery.length]);

    return (
        <MainLayout>
            <Head title={title} />

            <div className="bg-white px-6 py-32 lg:px-8">
                <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                    <Link href={route('news')} className="text-blue-600 hover:text-blue-500 mb-6 inline-flex items-center text-sm font-semibold">
                        <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to News
                    </Link>

                    <p className="text-base font-semibold leading-7 text-blue-600">News</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>

                    {post.image && (
                        <div className="mt-8 aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2 overflow-hidden">
                            <img src={post.image} alt={title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="mt-10 max-w-2xl space-y-4">
                        {/* Render content - preserving newlines using whitespace-pre-wrap */}
                        <div className="whitespace-pre-wrap font-serif text-lg">
                            {content}
                        </div>
                        <div className="whitespace-pre-wrap font-serif text-lg">
                            {content}
                        </div>
                    </div>

                    {/* Gallery Section */}
                    {gallery.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Gallery</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {gallery.map((image, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100 hover:opacity-90 transition-opacity"
                                        onClick={() => openLightbox(index)}
                                    >
                                        <img
                                            src={image}
                                            alt={`${title} - Gallery ${index + 1}`}
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={closeLightbox}>
                    <button
                        onClick={closeLightbox}
                        className="absolute right-4 top-4 text-white hover:text-gray-300 z-50 p-2"
                    >
                        <XMarkIcon className="h-8 w-8" />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 bg-black/50 rounded-full md:bg-transparent"
                    >
                        <ChevronLeftIcon className="h-8 w-8 md:h-12 md:w-12" />
                    </button>

                    <div className="relative max-h-full max-w-full" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={gallery[currentImageIndex]}
                            alt={`Gallery ${currentImageIndex + 1}`}
                            className="max-h-[90vh] max-w-[90vw] object-contain select-none"
                        />
                        <div className="absolute bottom-[-30px] left-0 right-0 text-center text-white text-sm">
                            {currentImageIndex + 1} / {gallery.length}
                        </div>
                    </div>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 bg-black/50 rounded-full md:bg-transparent"
                    >
                        <ChevronRightIcon className="h-8 w-8 md:h-12 md:w-12" />
                    </button>
                </div>
            )}
        </MainLayout>
    );
}
