import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import useSettings from '@/Hooks/useSettings';
import { getLocalized } from '@/Utils/localization';
import { DocumentTextIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function ReglementInterieur({ content, pdf }) {
    const { locale } = usePage().props;
    const { getSetting } = useSettings();

    const localizedContent = getLocalized(content);
    const localizedPdf = getLocalized(pdf);

    // Hero background image (optional, from admin settings)
    const heroImage = getSetting('reglement_hero_image');

    return (
        <MainLayout>
            <Head title="Règlement Intérieur - Groupe Scolaire Privé Bilingue Les Jumelles" />

            {/* ── Hero Section ── */}
            <div className="relative isolate overflow-hidden bg-primary py-24 sm:py-32">
                {/* Background image when provided */}
                {heroImage && (
                    <img
                        src={heroImage}
                        alt="Règlement Intérieur"
                        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20 mix-blend-multiply"
                    />
                )}

                {/* Decorative gradient blob */}
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
                    />
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 flex items-start gap-6">
                        <DocumentTextIcon className="h-14 w-14 shrink-0 text-white/70 mt-1 hidden sm:block" />
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-serif">
                                Règlement Intérieur
                            </h1>
                            
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="bg-gray-50 py-16 sm:py-24">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-10">

                    {/* PDF Download Card */}
                    {localizedPdf && (
                        <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-900/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Version PDF Officielle</h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Consultez et téléchargez le règlement complet au format PDF.
                                </p>
                            </div>
                            <a
                                href={localizedPdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-opacity"
                            >
                                <ArrowDownTrayIcon className="w-5 h-5" />
                                Télécharger le PDF
                            </a>
                        </div>
                    )}

                    {/* Rules Text Content */}
                    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                        {/* Colored top accent bar */}
                        <div className="h-1.5 w-full bg-primary" />

                        <div className="p-8 sm:p-12">
                            <div
                                className="prose prose-lg prose-headings:text-gray-900 prose-headings:font-serif prose-p:text-gray-700 prose-li:text-gray-700 max-w-none tinymce-content"
                                dangerouslySetInnerHTML={{
                                    __html: localizedContent || '<p>Le règlement intérieur est en cours de mise à jour.</p>'
                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}
