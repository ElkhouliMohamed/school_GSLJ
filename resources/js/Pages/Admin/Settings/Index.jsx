import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { compressImage } from '@/Utils/imageCompression';

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

    const { data, setData, post, processing, progress, errors, wasSuccessful } = useForm({
        ...initialData,
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update', undefined, false), {
            forceFormData: true,
            preserveScroll: true,
            onProgress: (progress) => {
                // Determine if we are uploading
                // Note: Inertia's progress object has { loaded, total, percentage }
                console.log('Upload progress:', progress.percentage);
            },
        });
    };

    const handleFileChange = async (key, e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type.startsWith('image/')) {
            setIsCompressing(true);
            try {
                const compressed = await compressImage(file);
                setData(key, compressed);
            } catch (error) {
                console.error("Compression failed:", error);
                setData(key, file);
            } finally {
                setIsCompressing(false);
            }
        } else {
            setData(key, file);
        }
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-violet-600 sm:text-sm sm:leading-6"
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-violet-600 sm:text-sm sm:leading-6"
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-violet-600 sm:text-sm sm:leading-6"
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-violet-600 sm:text-sm sm:leading-6"
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
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100
                                "
                            />
                            <p className="mt-2 text-xs text-gray-500">Max size: 50MB. Formats: MP4, WebM. Note: Uploading a file will override the YouTube URL.</p>
                            {errors[setting.key] && <p className="mt-2 text-sm text-red-600">{errors[setting.key]}</p>}
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
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100
                                "
                            />
                            <p className="mt-2 text-xs text-gray-500">Upload to replace. Recommended size depends on section.</p>
                        </div>
                    </div>
                )}

                {setting.type === 'color' && (
                    <div className="flex items-center gap-x-6">
                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                value={typeof data[setting.key] === 'string' ? data[setting.key] : (typeof setting.value === 'object' ? setting.value.en : setting.value) || '#7c3aed'}
                                onChange={(e) => setData(setting.key, e.target.value)}
                                className="h-12 w-24 rounded-lg border-2 border-gray-300 cursor-pointer"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {typeof data[setting.key] === 'string' ? data[setting.key] : (typeof setting.value === 'object' ? setting.value.en : setting.value) || '#7c3aed'}
                                </p>
                                <p className="text-xs text-gray-500">Click to change the primary theme color</p>
                            </div>
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
            keys: ['hero_title', 'hero_description', 'hero_image_1', 'hero_image_2', 'hero_image_3']
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
        {
            title: "Theme",
            description: "Customize the website's appearance.",
            keys: ['theme_color']
        },
    ];

    const [activeTab, setActiveTab] = useState(0);
    const [isCompressing, setIsCompressing] = useState(false);

    return (
        <AdminLayout title="Site Settings">
            <Head title="Site Settings" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-4 md:gap-6">
                    {/* Sidebar Navigation */}
                    <div className="md:col-span-1">
                        <div className="sticky top-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-violet-50 to-purple-50">
                                <h3 className="text-sm font-semibold text-gray-900">Settings Sections</h3>
                            </div>
                            <nav
                                className="max-h-[calc(100vh-12rem)] overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-gray-100 hover:scrollbar-thumb-violet-300"
                                aria-label="Sidebar"
                                style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#ddd6fe #f3f4f6'
                                }}
                            >
                                {sections.map((section, idx) => (
                                    <button
                                        key={section.title}
                                        onClick={() => setActiveTab(idx)}
                                        className={`
                                        group flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
                                        ${activeTab === idx
                                                ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                                                : 'text-gray-700 hover:bg-violet-50 hover:text-violet-700'
                                            }
                                    `}
                                    >
                                        <span className="truncate">{section.title}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="mt-4 px-3">
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
                                disabled={processing || isCompressing}
                                className="w-full rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50"
                            >
                                {isCompressing ? 'Compressing Image...' : (processing ? 'Saving Changes...' : 'Save All Changes')}
                            </button>

                            {/* Upload Progress Bar - Only valid if using useForm's logic, but useForm `progress` is for the overall form. 
                                Actually, useForm from @inertiajs/react exposes a `progress` property which is an object { percentage } if uploading. 
                            */}
                            {progress && (
                                <div className="mt-4">
                                    <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
                                        <span>Uploading...</span>
                                        <span>{progress.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-violet-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                                            style={{ width: `${progress.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
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
                                        disabled={processing || isCompressing}
                                        className="inline-flex justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50"
                                    >
                                        {isCompressing ? 'Compressing...' : 'Save'}
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
