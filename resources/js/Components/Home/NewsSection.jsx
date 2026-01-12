import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

export default function NewsSection({ news }) {
    const { settings, locale } = usePage().props;

    const title = settings?.news_title?.[locale] || "Actualités de l'École";
    const description = settings?.news_description?.[locale] || "Découvrez les moments forts et les dernières annonces de notre communauté.";

    // Helper for localized content
    const getLocalized = (content, fallback = '') => {
        if (!content) return fallback;
        if (typeof content === 'string') return content;
        return content[locale] || content['en'] || Object.values(content)[0] || fallback;
    };

    // Improved dummy data or use actual news
    const posts = news && news.length > 0 ? news : [
        { id: 1, title: 'Inscriptions ouvertes pour 2024', summary: 'Les inscriptions pour la prochaine année scolaire sont désormais ouvertes. Places limitées.', image: 'https://images.unsplash.com/photo-1577896332028-eb8729598858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', created_at: '2024-03-01' },
        { id: 2, title: 'Victoire au concours de sciences', summary: 'Nos élèves ont remporté le premier prix au concours régional de robotique.', image: 'https://images.unsplash.com/photo-1581092921461-e3924f05cd79?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', created_at: '2024-02-20' },
        { id: 3, title: 'Sortie culturelle au musée', summary: 'Les classes de CM2 ont visité le musée des Beaux-Arts.', image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', created_at: '2024-02-15' },
    ];

    return (
        <section className="bg-gray-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {title}
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                        {description}
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.id} className="flex flex-col items-start bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative w-full h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={getLocalized(post.title)}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-x-4 text-xs font-medium text-gray-500 mb-3">
                                    <time dateTime={post.created_at} className="text-gray-500">
                                        {new Date(post.created_at).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </time>
                                    <span className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-600">
                                        News
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-blue-600 mb-3 line-clamp-2">
                                    <Link href={`/news/${post.slug || post.id}`}>
                                        <span className="absolute inset-0" />
                                        {getLocalized(post.title)}
                                    </Link>
                                </h3>
                                <p className="text-sm leading-6 text-gray-600 line-clamp-3 mb-4 flex-1">
                                    {getLocalized(post.summary || post.content)}
                                </p>
                                <div className="mt-auto pt-4 border-t border-gray-100 w-full">
                                    <Link href={`/news/${post.slug || post.id}`} className="text-sm font-semibold leading-6 text-blue-600 flex items-center gap-1 hover:text-blue-500">
                                        Lire l'article <ArrowLongRightIcon className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href={route('news', undefined, false)} className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Voir toutes les actualités
                    </Link>
                </div>
            </div>
        </section>
    );
}
