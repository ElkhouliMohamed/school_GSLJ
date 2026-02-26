import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { getTranslation } from '../../translations';

export default function Index({ posts }) {
    const { locale } = usePage().props;

    // Helper for localized content - keeping this for the dynamic post content
    const getLocalized = (content, fallback = '') => {
        if (!content) return fallback;
        if (typeof content === 'string') return content;
        return content[locale] || content['en'] || Object.values(content)[0] || fallback;
    };

    const t = (key) => getTranslation(key, locale);

    return (
        <MainLayout>
            <Head title="School Blog" />

            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('latest_news_title')}</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            {t('latest_news_desc')}
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.data.map((post) => (
                            <article key={post.id} className="flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                                {/* Image Container */}
                                <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2] overflow-hidden bg-gray-100 shrink-0">
                                    <img
                                        src={post.image || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3600&q=80'}
                                        alt=""
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-gray-900/10" />
                                </div>

                                {/* Text Container */}
                                <div className="flex flex-col flex-1 p-6 sm:p-8">
                                    <div className="flex items-center gap-x-4 text-xs mb-4">
                                        <time dateTime={post.published_at} className="text-gray-500 font-medium">
                                            <CalendarDaysIcon className="h-4 w-4 inline mr-1 text-primary" />
                                            {new Date(post.published_at).toLocaleDateString()}
                                        </time>
                                    </div>
                                    <div className="group relative flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold leading-tight text-gray-900 group-hover:text-primary transition-colors mb-4 line-clamp-2">
                                            <Link href={route('news.show', post.slug)}>
                                                <span className="absolute inset-0" />
                                                {getLocalized(post.title)}
                                            </Link>
                                        </h3>
                                        <div
                                            className="line-clamp-3 text-sm leading-6 text-gray-600 flex-1"
                                            dangerouslySetInnerHTML={{ __html: getLocalized(post.content) }}
                                        />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
