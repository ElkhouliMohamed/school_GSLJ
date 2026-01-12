import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { VideoCameraIcon } from '@heroicons/react/24/outline';
import { getTranslation } from '../../translations';

export default function Index({ galleries, currentType }) {
    const { locale } = usePage().props;
    const [selectedItem, setSelectedItem] = useState(null);

    const t = (key) => getTranslation(key, locale);

    const tabs = [
        { name: t('tab_all'), value: 'all' },
        { name: t('tab_photos'), value: 'photo' },
        { name: t('tab_videos'), value: 'video' },
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
            <Head title={t('gallery_title')} />

            <div className="relative bg-violet-950 py-20 sm:py-24 lg:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1544928147-79a2af1f9850?ixlib=rb-4.0.3&auto=format&fit=crop&w=2835&q=80"
                        alt=""
                        className="h-full w-full object-cover object-center opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-950 via-violet-950/50" />
                </div>
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-serif">
                        {t('gallery_title')}
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        {t('gallery_desc')}
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <nav className="flex space-x-4 bg-white p-1 rounded-xl shadow-sm border border-gray-100" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.value}
                                href={route('gallery.index', { type: tab.value })}
                                className={`
                                    rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
                                    ${currentType === tab.value
                                        ? 'bg-violet-600 text-white shadow-md'
                                        : 'text-gray-500 hover:text-violet-700 hover:bg-violet-50'
                                    }
                                `}
                                aria-current={currentType === tab.value ? 'page' : undefined}
                                preserveScroll
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Gallery Grid */}
                {galleries.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleries.data.map((item) => (
                            <div
                                key={item.id}
                                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
                                onClick={() => openModal(item)}
                            >
                                {item.type === 'photo' ? (
                                    <img
                                        src={item.path}
                                        alt={item.title?.[locale]}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="relative h-full w-full bg-gray-900">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <VideoCameraIcon className="w-16 h-16 text-white/80 group-hover:text-white transition-colors" />
                                        </div>
                                        <img
                                            src={item.thumbnail || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                                            alt={item.title?.[locale]}
                                            className="h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        {item.title?.[locale] && (
                                            <h3 className="text-lg font-bold text-white mb-1">
                                                {item.title[locale]}
                                            </h3>
                                        )}
                                        <p className="text-sm text-gray-300 capitalize">{item.type === 'photo' ? t('tab_photos') : t('tab_videos')}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">{t('no_items', 'Aucun élément trouvé.')}</p>
                    </div>
                )}

                {/* Pagination */}
                {galleries.links.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <div className="flex gap-2">
                            {galleries.links.map((link, k) => (
                                link.url ? (
                                    <Link
                                        key={k}
                                        href={link.url}
                                        className={`px-4 py-2 text-sm rounded-lg transition-colors ${link.active
                                            ? 'bg-violet-600 text-white font-bold'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={k}
                                        className="px-4 py-2 text-sm rounded-lg transition-colors text-gray-300 cursor-default"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* Lightbox Modal */}
            {/* Lightbox Modal */}
            {
                selectedItem && (
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
                                            <p className="mb-4 text-lg">{t('external_video')}</p>
                                            <a
                                                href={selectedItem.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-3 bg-blue-600 rounded-full font-bold hover:bg-blue-500 transition-colors"
                                            >
                                                {t('watch_provider')}
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
                )
            }
        </MainLayout >
    );
}
