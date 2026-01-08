import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export default function Index({ posts }) {
    const { locale } = usePage().props;

    // Helper for localized content
    const getLocalized = (content, fallback = '') => {
        if (!content) return fallback;
        if (typeof content === 'string') return content;
        return content[locale] || content['en'] || Object.values(content)[0] || fallback;
    };

    return (
        <MainLayout>
            <Head title="School Blog" />

            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Latest News & Events</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Stay updated with what's happening at our school.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.data.map((post) => (
                            <article key={post.id} className="flex flex-col items-start justify-between">
                                <div className="relative w-full">
                                    <img
                                        src={post.image || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3600&q=80'}
                                        alt=""
                                        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                    />
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                                </div>
                                <div className="max-w-xl">
                                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                                        <time dateTime={post.published_at} className="text-gray-500">
                                            <CalendarDaysIcon className="h-4 w-4 inline mr-1" />
                                            {new Date(post.published_at).toLocaleDateString()}
                                        </time>
                                    </div>
                                    <div className="group relative">
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            <Link href={route('news.show', post.slug)}>
                                                <span className="absolute inset-0" />
                                                {getLocalized(post.title)}
                                            </Link>
                                        </h3>
                                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                                            {/* Truncate content or show summary if available */}
                                            {getLocalized(post.content)?.substring(0, 150)}...
                                        </p>
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
