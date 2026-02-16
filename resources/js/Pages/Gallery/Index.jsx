import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { getTranslation } from '../../translations';
import { FolderOpen } from 'lucide-react';

export default function Index({ albums }) {
    const { locale } = usePage().props;
    const t = (key) => getTranslation(key, locale);

    return (
        <MainLayout>
            <Head title={t('gallery_title')} />

            {/* Hero Section */}
            <div className="relative bg-violet-950 py-20 sm:py-24 lg:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="/images/gslj/hero.jpg"
                        alt=""
                        className="h-full w-full object-cover object-center opacity-10"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-violet-950 via-violet-950/50" />
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
                {albums.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {albums.data.map((album) => (
                            <Link
                                key={album.id}
                                href={route('gallery.show', album.slug)}
                                className="group relative aspect-4/3 cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300 block"
                            >
                                {album.cover_image ? (
                                    <img
                                        src={album.cover_image}
                                        alt={album.title?.[locale]}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-violet-50 flex items-center justify-center">
                                        <FolderOpen className="w-20 h-20 text-violet-200" />
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                                            {album.title?.[locale]}
                                        </h3>
                                        <p className="text-sm text-gray-300">
                                            {album.galleries_count || 0} items
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">{t('Aucun élément trouvé.', 'Aucun album trouvé.')}</p>
                    </div>
                )}

                {/* Pagination */}
                {albums.links.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <div className="flex gap-2">
                            {albums.links.map((link, k) => (
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
        </MainLayout>
    );
}
