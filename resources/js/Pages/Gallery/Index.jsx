import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { VideoCameraIcon } from '@heroicons/react/24/outline';

export default function Index({ galleries, currentType }) {
    const { locale } = usePage().props;
    const [selectedItem, setSelectedItem] = useState(null);

    const tabs = [
        { name: 'All', value: 'all' },
        { name: 'Photos', value: 'photo' },
        { name: 'Videos', value: 'video' },
    ];

    const openModal = (item) => {
        setSelectedItem(item);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedItem(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <MainLayout>
            <Head title="Gallery" />

            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Gallery</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Moments captured from around our campus.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="mt-10 flex justify-center space-x-4">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.value}
                                href={route('gallery.index', { type: tab.value })}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${currentType === tab.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                preserveScroll
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </div>

                    <div className="mx-auto mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {galleries.data.map((item) => (
                            <div
                                key={item.id}
                                className="relative group rounded-lg overflow-hidden bg-gray-100 shadow-sm aspect-square cursor-pointer"
                                onClick={() => openModal(item)}
                            >
                                {item.type === 'photo' ? (
                                    <img src={item.path} alt={item.title?.[locale]} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white relative">
                                        {/* Check if local video */}
                                        {item.path.startsWith('/storage') ? (
                                            <video
                                                src={item.path}
                                                className="w-full h-full object-cover pointer-events-none" // Disable controls in grid
                                                onClick={(e) => openModal(item)}
                                            />
                                        ) : (
                                            <>
                                                <VideoCameraIcon className="h-12 w-12" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-all">
                                                    <span className="text-sm font-bold border border-white px-3 py-1 rounded">Watch Video</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                                    <p className="text-sm font-semibold text-white">{item.title?.[locale]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination would act similarly to Posts */}
                </div>
            </div>
            {/* Lightbox Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={closeModal}>
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2"
                        onClick={closeModal}
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="relative max-w-5xl w-full max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        {selectedItem.type === 'photo' ? (
                            <img
                                src={selectedItem.path}
                                alt={selectedItem.title?.[locale]}
                                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            />
                        ) : (
                            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black">
                                {selectedItem.path.startsWith('/storage') ? (
                                    <video
                                        src={selectedItem.path}
                                        controls
                                        autoPlay
                                        className="w-full h-full"
                                    />
                                ) : (
                                    /* Embed Frame Handling */
                                    <div className="flex flex-col items-center justify-center h-full text-white">
                                        <p className="mb-4 text-lg">External Video Link</p>
                                        <a
                                            href={selectedItem.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-3 bg-blue-600 rounded-full font-bold hover:bg-blue-500 transition-colors"
                                        >
                                            Watch on Provider
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                        {selectedItem.title?.[locale] && (
                            <div className="absolute -bottom-10 left-0 right-0 text-center text-white font-medium text-lg drop-shadow-md">
                                {selectedItem.title[locale]}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
