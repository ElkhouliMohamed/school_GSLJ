import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'; // Keep in case needed, but design uses pill buttons

import useSettings from '@/Hooks/useSettings'; // Import hook

export default function NewsSection({ news }) {
    const { settings, locale } = usePage().props;
    const { getSetting } = useSettings(); // Use hook

    const title = settings?.news_title?.[locale] || "NOS DERNIÈRES ACTUALITÉS";
    const subtitle = getSetting('news_description', "Restez informés sur la vie de l'école, les événements et les actualités");
    const ctaText = getSetting('news_cta_text', "Toutes les actualités");

    const getLocalized = (content, fallback = '') => {
        if (!content) return fallback;
        if (typeof content === 'string') return content;
        return content[locale] || content['en'] || Object.values(content)[0] || fallback;
    };

    if (!news || news.length === 0) {
        return null; // Or show empty state?
    }

    const posts = news.slice(0, 3); // Limit to 3 for the design

    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl uppercase mb-2">
                        {getLocalized(title, "NOS DERNIÈRES ACTUALITÉS")}
                    </h2>
                    <div className="h-1 w-20 bg-yellow-400 mx-auto rounded-full mb-6"></div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                        {subtitle}
                    </p>
                </div>

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.id} className="flex flex-col items-start bg-white rounded-3xl shadow-lg shadow-gray-200/50 overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="relative w-full aspect-video overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={getLocalized(post.title)}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                                {post.category && (
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase shadow-sm">
                                        {post.category.name}
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex flex-col flex-1 w-full text-center items-center">
                                <h3 className="mt-2 text-lg font-bold leading-6 text-gray-900 group-hover:text-primary mb-4 uppercase min-h-12 line-clamp-2">
                                    <Link href={`/news/${post.slug || post.id}`}>
                                        <span className="absolute inset-0" />
                                        {getLocalized(post.title)}
                                    </Link>
                                </h3>
                                {/* Button centered at bottom */}
                                <div className="mt-auto pt-4 w-full flex justify-center">
                                    <Link
                                        href={`/news/${post.slug || post.id}`}
                                        className="relative z-10 rounded-full bg-primary px-6 py-2 text-xs font-bold text-white shadow-sm hover:bg-violet-700 uppercase tracking-widest transition-colors duration-200"
                                    >
                                        Lire la suite
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Link
                        href={route('news', undefined, false)}
                        className="rounded-full border-2 border-primary bg-transparent px-8 py-2.5 text-sm font-bold text-primary shadow-sm hover:bg-primary hover:text-white transition-colors uppercase tracking-widest"
                    >
                        {ctaText}
                    </Link>
                </div>
            </div>
        </section>
    );
}
