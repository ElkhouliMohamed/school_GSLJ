import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Show({ post }) {
    const { locale } = usePage().props;
    const title = post.title[locale] || post.title['en'];
    const content = post.content[locale] || post.content['en'];

    return (
        <MainLayout>
            <Head title={title} />

            <div className="bg-white px-6 py-32 lg:px-8">
                <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                    <Link href={route('blog.index')} className="text-blue-600 hover:text-blue-500 mb-6 inline-flex items-center text-sm font-semibold">
                        <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Blog
                    </Link>

                    <p className="text-base font-semibold leading-7 text-blue-600">News</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>

                    {post.image && (
                        <div className="mt-8 aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] overflow-hidden">
                            <img src={post.image} alt={title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="mt-10 max-w-2xl space-y-4">
                        {/* Render content - preserving newlines using whitespace-pre-wrap */}
                        <div className="whitespace-pre-wrap font-serif text-lg">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
