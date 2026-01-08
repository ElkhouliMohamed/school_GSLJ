import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Index({ settings }) {
    // Transform settings object into form data structure
    const initialData = {};
    Object.keys(settings).forEach(key => {
        initialData[key] = settings[key].value || { en: '', fr: '' };
        if (settings[key].type === 'image' || settings[key].type === 'video_file') {
            // For images and video files, we want to initialize null for new upload inputs
            initialData[key] = null;
        }
    });

    const { data, setData, post, processing, errors, wasSuccessful } = useForm({
        ...initialData,
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update', undefined, false), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handleFileChange = (key, e) => {
        setData(key, e.target.files[0]);
    };

    // Helper to render a single field
    const renderField = (key) => {
        const setting = settings[key];
        if (!setting) return null;

        return (
            <div key={key} className="col-span-full border-b border-gray-100 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
                <label className="block text-sm font-semibold leading-6 text-gray-900 mb-2">
                    {setting.label}
                </label>

                {setting.type === 'text' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">English</label>
                            <input
                                type="text"
                                value={typeof data[setting.key] === 'object' && data[setting.key]?.en !== undefined ? data[setting.key].en : (typeof setting.value === 'object' ? setting.value.en : '')}
                                onChange={(e) => {
                                    const oldVal = typeof data[setting.key] === 'object' ? data[setting.key] : (settings[setting.key].value || { en: '', fr: '' });
                                    setData(setting.key, { ...oldVal, en: e.target.value })
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">French</label>
                            <input
                                type="text"
                                value={typeof data[setting.key] === 'object' && data[setting.key]?.fr !== undefined ? data[setting.key].fr : (typeof setting.value === 'object' ? setting.value.fr : '')}
                                onChange={(e) => {
                                    const oldVal = typeof data[setting.key] === 'object' ? data[setting.key] : (settings[setting.key].value || { en: '', fr: '' });
                                    setData(setting.key, { ...oldVal, fr: e.target.value })
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                )}

                {setting.type === 'textarea' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">English</label>
                            <textarea
                                rows={3}
                                value={typeof data[setting.key] === 'object' && data[setting.key]?.en !== undefined ? data[setting.key].en : (typeof setting.value === 'object' ? setting.value.en : '')}
                                onChange={(e) => {
                                    const oldVal = typeof data[setting.key] === 'object' ? data[setting.key] : (settings[setting.key].value || { en: '', fr: '' });
                                    setData(setting.key, { ...oldVal, en: e.target.value })
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">French</label>
                            <textarea
                                rows={3}
                                value={typeof data[setting.key] === 'object' && data[setting.key]?.fr !== undefined ? data[setting.key].fr : (typeof setting.value === 'object' ? setting.value.fr : '')}
                                onChange={(e) => {
                                    const oldVal = typeof data[setting.key] === 'object' ? data[setting.key] : (settings[setting.key].value || { en: '', fr: '' });
                                    setData(setting.key, { ...oldVal, fr: e.target.value })
                                }}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                )}

                {setting.type === 'video_file' && (
                    <div className="flex items-center gap-x-6">
                        {/* Current Video Preview/Indicator */}
                        <div className="shrink-0">
                            {settings[setting.key].value?.en ? (
                                <div className="h-20 w-20 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-xs text-center p-1">
                                    Video Uploaded
                                </div>
                            ) : (
                                <div className="h-20 w-20 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No Video</div>
                            )}
                            <p className="mt-1 text-xs text-center text-gray-500">Current</p>
                        </div>

                        <div className="flex-1">
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(setting.key, e)}
                                accept="video/mp4,video/webm,video/ogg"
                                className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100
                                "
                            />
                            <p className="mt-2 text-xs text-gray-500">Max size: 50MB. Formats: MP4, WebM. Note: Uploading a file will override the YouTube URL.</p>
                        </div>
                    </div>
                )}

                {setting.type === 'image' && (
                    <div className="flex items-center gap-x-6">
                        {/* Current Image Preview */}
                        <div className="shrink-0">
                            {settings[setting.key].value?.en ? (
                                <img
                                    src={settings[setting.key].value.en.startsWith('http') ? settings[setting.key].value.en : settings[setting.key].value.en}
                                    alt="Current"
                                    className="h-20 w-20 rounded-lg object-cover ring-1 ring-gray-200"
                                />
                            ) : (
                                <div className="h-20 w-20 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No Image</div>
                            )}
                            <p className="mt-1 text-xs text-center text-gray-500">Current</p>
                        </div>

                        <div className="flex-1">
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(setting.key, e)}
                                accept="image/*"
                                className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100
                                "
                            />
                            <p className="mt-2 text-xs text-gray-500">Upload to replace. Recommended size depends on section.</p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Definition of sections
    const sections = [
        {
            title: "General Settings",
            description: "Basic site information and contacts.",
            keys: ['site_name', 'site_logo', 'contact_email', 'contact_phone', 'facebook_url', 'twitter_url', 'instagram_url']
        },
        {
            title: "Home: Hero Section",
            description: "The main top section of the home page.",
            keys: ['hero_title', 'hero_description', 'hero_image']
        },
        {
            title: "Home: Director's Word",
            description: "Message from the school principal.",
            keys: ['director_title', 'director_name', 'director_role', 'director_content', 'director_image']
        },
        {
            title: "Home: Video Tour",
            description: "Promotional video section.",
            keys: ['video_title', 'video_description', 'video_url', 'video_file']
        },
        {
            title: "Home: News Section",
            description: "Headings for the news area.",
            keys: ['news_title', 'news_description']
        },
        {
            title: "Home: Events Section",
            description: "Headings for the upcoming events area.",
            keys: ['events_title', 'events_description']
        },
        {
            title: "Home: Stats Section",
            description: "Key achievement numbers.",
            keys: ['stats_title', 'stats_description']
        },
        {
            title: "Home: Partners Section",
            description: "Logos or text about partners.",
            keys: ['partners_title', 'partners_description']
        },
        {
            title: "About Page",
            description: "Content for the About page.",
            keys: ['about_title', 'about_content', 'about_image']
        },
    ];

    const [activeTab, setActiveTab] = useState(0);

    return (
        <AdminLayout title="Site Settings">
            <Head title="Site Settings" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-4 md:gap-6">
                    {/* Sidebar Navigation */}
                    <div className="md:col-span-1">
                        <nav className="space-y-1" aria-label="Sidebar">
                            {sections.map((section, idx) => (
                                <button
                                    key={section.title}
                                    onClick={() => setActiveTab(idx)}
                                    className={`
                                        group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium
                                        ${activeTab === idx
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                                        }
                                    `}
                                >
                                    <span className="truncate">{section.title}</span>
                                </button>
                            ))}
                        </nav>

                        <div className="mt-8 px-3">
                            {wasSuccessful && (
                                <div className="rounded-md bg-green-50 p-4 mb-4">
                                    <div className="flex">
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-green-800">Settings saved successfully.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={submit}
                                disabled={processing}
                                className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                            >
                                {processing ? 'Saving Changes...' : 'Save All Changes'}
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="mt-5 md:col-span-3 md:mt-0">
                        <form onSubmit={submit}>
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="mb-6">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                                            {sections[activeTab].title}
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {sections[activeTab].description}
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        {sections[activeTab].keys.map(key => renderField(key))}
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 sm:rounded-b-lg">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
