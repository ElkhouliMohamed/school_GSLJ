import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function About() {
    const { settings, locale } = usePage().props;
    const siteName = settings?.site_name?.[locale] || 'Notre École';

    // Get About page settings with fallbacks
    const aboutTitle = settings?.about_title?.[locale] || (locale === 'fr' ? 'À Propos de ' : 'About ') + siteName;
    const aboutContent = settings?.about_content?.[locale] || (locale === 'fr'
        ? 'Fondée avec une vision d\'excellence, notre école est un pilier de la communauté depuis des années. Nous croyons en une approche holistique de l\'éducation, équilibrant rigueur académique et développement du caractère.'
        : 'Founded with a vision of excellence, our school has been a pillar of the community for years. We believe in a holistic approach to education, balancing academic rigor with character development.');
    const aboutImage = settings?.about_image?.[locale] || settings?.about_image?.en || settings?.about_image?.fr || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1670&q=80';

    return (
        <MainLayout>
            <Head title={locale === 'fr' ? 'À Propos' : 'About Us'} />

            <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <svg
                        className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                        aria-hidden="true"
                    >
                        <defs>
                            <pattern
                                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                                width={200}
                                height={200}
                                x="50%"
                                y={-1}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M100 200V.5M.5 .5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                            <path
                                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                    </svg>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-blue-600">
                                    {locale === 'fr' ? 'Notre Histoire' : 'Our Story'}
                                </p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    {aboutTitle}
                                </h1>
                                <div className="mt-6 text-xl leading-8 text-gray-700 whitespace-pre-line">
                                    {aboutContent}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <img
                            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                            src={aboutImage}
                            alt={aboutTitle}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
