import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { UserIcon, AcademicCapIcon, BriefcaseIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function Show({ teamMember }) {
    const { locale } = usePage().props;

    const getLocalized = (content, fallback = '') => {
        if (!content) return fallback;
        if (typeof content === 'string') return content;
        return content[locale] || content['en'] || Object.values(content)[0] || fallback;
    };

    const departmentLabels = {
        teaching: 'Teaching Staff',
        administration: 'Administration',
        support: 'Support Staff'
    };

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <Head title={`${getLocalized(teamMember.name)} - Groupe Scolaire GSLJ`} />
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-violet-600">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                {teamMember.photo ? (
                                    <img
                                        src={teamMember.photo}
                                        alt={getLocalized(teamMember.name)}
                                        className="h-32 w-32 rounded-full object-cover border-4 border-white"
                                    />
                                ) : (
                                    <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white">
                                        <UserIcon className="h-16 w-16 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                {getLocalized(teamMember.name)}
                            </h1>
                            {teamMember.position && (
                                <p className="mt-4 text-xl text-violet-100">
                                    {getLocalized(teamMember.position)}
                                </p>
                            )}
                            <p className="mt-2 text-lg text-violet-100 capitalize">
                                {departmentLabels[teamMember.department] || teamMember.department}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        {teamMember.bio && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
                                <div className="prose prose-lg text-gray-600">
                                    <p>{getLocalized(teamMember.bio)}</p>
                                </div>
                            </div>
                        )}

                        {(teamMember.qualifications && teamMember.qualifications.length > 0) && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Qualifications</h2>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <ul className="divide-y divide-gray-200">
                                        {getLocalized(teamMember.qualifications).map((qualification, index) => (
                                            <li key={index} className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-5 w-5 text-violet-600">
                                                        <AcademicCapIcon className="h-5 w-5" />
                                                    </div>
                                                    <p className="ml-3 text-gray-900 font-medium">{qualification}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {(teamMember.specialties && teamMember.specialties.length > 0) && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Specialties</h2>
                                <div className="flex flex-wrap gap-3">
                                    {getLocalized(teamMember.specialties).map((specialty, index) => (
                                        <span key={index} className="inline-flex items-center rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-800">
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(teamMember.email || teamMember.phone) && (
                            <div className="mb-16">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                <div className="space-y-4">
                                    {teamMember.email && (
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-6 w-6 text-violet-600">
                                                <EnvelopeIcon className="h-6 w-6" />
                                            </div>
                                            <a href={`mailto:${teamMember.email}`} className="ml-3 text-gray-900 hover:text-violet-600">
                                                {teamMember.email}
                                            </a>
                                        </div>
                                    )}
                                    {teamMember.phone && (
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-6 w-6 text-violet-600">
                                                <PhoneIcon className="h-6 w-6" />
                                            </div>
                                            <a href={`tel:${teamMember.phone}`} className="ml-3 text-gray-900 hover:text-violet-600">
                                                {teamMember.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="bg-violet-50 rounded-2xl p-8">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h3>
                                <p className="text-gray-600 mb-6">
                                    Reach out to our team member for more information.
                                </p>
                                <a
                                    href="/contact"
                                    className="inline-flex justify-center rounded-md bg-violet-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                                >
                                    Get in Touch
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
