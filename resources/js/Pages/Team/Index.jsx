import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { UserGroupIcon, AcademicCapIcon, BuildingOfficeIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Index({ teamMembers }) {
    const { locale } = usePage().props;

    const getLocalized = (content, fallback = '') => {
        if (!content) return fallback;
        if (typeof content === 'string') return content;
        return content[locale] || content['en'] || Object.values(content)[0] || fallback;
    };

    const departmentIcons = {
        teaching: AcademicCapIcon,
        administration: BuildingOfficeIcon,
        support: UserIcon
    };

    const departmentLabels = {
        teaching: 'Teaching Staff',
        administration: 'Administration',
        support: 'Support Staff'
    };

    // Group team members by department
    const groupedMembers = {};
    Object.entries(teamMembers).forEach(([department, members]) => {
        groupedMembers[department] = members;
    });

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <Head title="Our Team - Groupe Scolaire GSLJ" />
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-violet-600">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                Découvrez notre équipe
                            </h1>
                            <p className="mt-6 text-xl leading-8 text-violet-100">
                                Des professionnels dévoués, engagés pour l’excellence dans l’éducation
                            </p>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                    {Object.entries(groupedMembers).map(([department, members]) => {
                        const IconComponent = departmentIcons[department] || UserGroupIcon;
                        return (
                            <div key={department} className="mb-20">
                                <div className="flex items-center mb-12">
                                    <IconComponent className="h-8 w-8 text-violet-600 mr-4" />
                                    <h2 className="text-3xl font-bold text-gray-900">
                                        {departmentLabels[department] || department}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {members.map((member) => (
                                        <div key={member.id} className="bg-white overflow-hidden shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                                            <div className="p-6 text-center">
                                                <div className="flex justify-center mb-6">
                                                    {member.photo ? (
                                                        <img
                                                            src={member.photo}
                                                            alt={getLocalized(member.name)}
                                                            className="h-32 w-32 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <UserIcon className="h-16 w-16 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                    {getLocalized(member.name)}
                                                </h3>
                                                {member.position && (
                                                    <p className="text-violet-600 font-medium mb-2">
                                                        {getLocalized(member.position)}
                                                    </p>
                                                )}
                                                {member.bio && (
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                        {getLocalized(member.bio)}
                                                    </p>
                                                )}
                                                <div className="mt-4">
                                                    <a
                                                        href={`/team/${member.slug}`}
                                                        className="inline-flex justify-center rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                                                    >
                                                        View Profile
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
}
