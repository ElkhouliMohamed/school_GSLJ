import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { compressImage } from '@/Utils/imageCompression';

export default function Index({ settings }) {

    const THEME_PRESETS = [
        {
            name: 'Modern Violet',
            colors: {
                theme_color: '#7c3aed',         // Violet 600
                theme_color_primary: '#5b21b6', // Violet 800
                theme_color_secondary: '#ede9fe', // Violet 100
                theme_color_accent: '#8b5cf6',  // Violet 500
            }
        },
        {
            name: 'Ocean Blue',
            colors: {
                theme_color: '#2563eb',         // Blue 600
                theme_color_primary: '#1e3a8a', // Blue 900
                theme_color_secondary: '#dbeafe', // Blue 100
                theme_color_accent: '#3b82f6',  // Blue 500
            }
        },
        {
            name: 'Emerald City',
            colors: {
                theme_color: '#059669',         // Emerald 600
                theme_color_primary: '#064e3b', // Emerald 900
                theme_color_secondary: '#d1fae5', // Emerald 100
                theme_color_accent: '#10b981',  // Emerald 500
            }
        },
        {
            name: 'Sunset Orange',
            colors: {
                theme_color: '#ea580c',         // Orange 600
                theme_color_primary: '#7c2d12', // Orange 900
                theme_color_secondary: '#ffedd5', // Orange 100
                theme_color_accent: '#f97316',  // Orange 500
            }
        },
        {
            name: 'Royal Rose',
            colors: {
                theme_color: '#e11d48',         // Rose 600
                theme_color_primary: '#881337', // Rose 900
                theme_color_secondary: '#ffe4e6', // Rose 100
                theme_color_accent: '#f43f5e',  // Rose 500
            }
        },
        {
            name: 'Midnight Slate',
            colors: {
                theme_color: '#475569',         // Slate 600
                theme_color_primary: '#0f172a', // Slate 900
                theme_color_secondary: '#f1f5f9', // Slate 100
                theme_color_accent: '#64748b',  // Slate 500
            }
        },
        {
            name: 'Golden Amber',
            colors: {
                theme_color: '#d97706',         // Amber 600
                theme_color_primary: '#78350f', // Amber 900
                theme_color_secondary: '#fef3c7', // Amber 100
                theme_color_accent: '#f59e0b',  // Amber 500
            }
        },
        {
            name: 'Teal Waters',
            colors: {
                theme_color: '#0d9488',         // Teal 600
                theme_color_primary: '#134e4a', // Teal 900
                theme_color_secondary: '#ccfbf1', // Teal 100
                theme_color_accent: '#14b8a6',  // Teal 500
            }
        },
        {
            name: 'Crimson Red',
            colors: {
                theme_color: '#dc2626',         // Red 600
                theme_color_primary: '#7f1d1d', // Red 900
                theme_color_secondary: '#fee2e2', // Red 100
                theme_color_accent: '#ef4444',  // Red 500
            }
        },
        {
            name: 'Indigo Night',
            colors: {
                theme_color: '#4f46e5',         // Indigo 600
                theme_color_primary: '#312e81', // Indigo 900
                theme_color_secondary: '#e0e7ff', // Indigo 100
                theme_color_accent: '#6366f1',  // Indigo 500
            }
        },
        {
            name: 'Sky Blue',
            colors: {
                theme_color: '#0ea5e9',         // Sky 500
                theme_color_primary: '#0c4a6e', // Sky 900
                theme_color_secondary: '#e0f2fe', // Sky 100
                theme_color_accent: '#38bdf8',  // Sky 400
            }
        },
        {
            name: 'Hot Pink',
            colors: {
                theme_color: '#db2777',         // Pink 600
                theme_color_primary: '#831843', // Pink 900
                theme_color_secondary: '#fce7f3', // Pink 100
                theme_color_accent: '#ec4899',  // Pink 500
            }
        },
        {
            name: 'Lime Zest',
            colors: {
                theme_color: '#65a30d',         // Lime 600
                theme_color_primary: '#365314', // Lime 900
                theme_color_secondary: '#ecfccb', // Lime 100
                theme_color_accent: '#84cc16',  // Lime 500
            }
        },
        {
            name: 'Fuchsia Fun',
            colors: {
                theme_color: '#c026d3',         // Fuchsia 600
                theme_color_primary: '#701a75', // Fuchsia 900
                theme_color_secondary: '#fae8ff', // Fuchsia 100
                theme_color_accent: '#d946ef',  // Fuchsia 500
            }
        },
        {
            name: 'Cyan Future',
            colors: {
                theme_color: '#0891b2',         // Cyan 600
                theme_color_primary: '#164e63', // Cyan 900
                theme_color_secondary: '#cffafe', // Cyan 100
                theme_color_accent: '#06b6d4',  // Cyan 500
            }
        },
        {
            name: 'Elegant Gray',
            colors: {
                theme_color: '#52525b',         // Zinc 600
                theme_color_primary: '#18181b', // Zinc 900
                theme_color_secondary: '#f4f4f5', // Zinc 100
                theme_color_accent: '#71717a',  // Zinc 500
            }
        }
    ];

    const applyThemePreset = (preset) => {
        // We need to update multiple fields. 
        // Since setData in Inertia/react acts like useState's setter but merged with the form object logic,
        // we can probably call it multiple times or use the functional update if available, 
        // BUT inertia useForm setData usually takes (key, value) OR (object).
        // Let's check documentation or assumption. 
        // Usually setData(previousData => ({ ...previousData, ...newValues })) works if it supports functional updates.
        // If not, we might need to do setData({...data, ...preset.colors}).

        // Let's assume standard object merge is safer:
        // Actually, looking at lines 17-20: const { data, setData ... } = useForm(...)
        // Inertia useForm `setData` can take an object to replace ALL data, or key/value.
        // It does NOT typically support partial object merge to update subset of fields easily without replacing everything?
        // Wait, standard Inertia useForm:
        // setData(key, value)
        // setData(data => ({ ...data, ...updates })) works!

        setData(previousData => ({
            ...previousData,
            ...preset.colors
        }));
    };

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
                            <p className="mt-2 text-xs text-gray-500">Upload to replace. Recommended size depends on section. Images will be automatically converted to WebP.</p>
                        </div>
                    </div>
                )}

                {setting.type === 'color' && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-6">
                            <div className="flex items-center gap-4">
                                <input
                                    type="color"
                                    value={typeof data[setting.key] === 'string' ? data[setting.key] : (typeof setting.value === 'object' ? setting.value.en : setting.value) || '#7c3aed'}
                                    onChange={(e) => setData(setting.key, e.target.value)}
                                    className="h-12 w-24 rounded-lg border-2 border-gray-300 cursor-pointer p-1"
                                />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {typeof data[setting.key] === 'string' ? data[setting.key] : (typeof setting.value === 'object' ? setting.value.en : setting.value) || '#7c3aed'}
                                    </p>
                                    <p className="text-xs text-gray-500">Or select a custom color</p>
                                </div>
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
            description: "Basic site information.",
            keys: ['site_name', 'site_logo', 'facebook_url', 'twitter_url', 'instagram_url']
        },
        {
            title: "Contact Information",
            description: "Address, phone numbers, and emails displayed on the site.",
            keys: ['site_address', 'site_email', 'site_phone', 'contact_email', 'contact_phone']
        },
        {
            title: "Mail Configuration",
            description: "SMTP settings for sending emails.",
            keys: ['mail_mailer', 'mail_host', 'mail_port', 'mail_username', 'mail_password', 'mail_encryption', 'mail_from_address', 'mail_from_name']
        },
        {
            title: "Home: Hero Section",
            description: "The main top section of the home page.",
            keys: ['hero_title', 'hero_highlight', 'hero_location', 'hero_motto', 'hero_bottom_bar_text', 'hero_image_1', 'hero_image_2', 'hero_image_3']
        },
        {
            title: "Home: Info Section",
            description: "Content for 'Notre Établissement'.",
            keys: ['info_title', 'info_description', 'info_motto', 'info_cta_text', 'info_image']
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
            keys: ['news_title', 'news_description', 'news_cta_text']
        },
        {
            title: "Home: Why Choose Us",
            description: "Content for the 'Pourquoi Choisir' section.",
            keys: ['why_us_title', 'why_us_description', 'why_us_point_1', 'why_us_point_2', 'why_us_point_3', 'why_us_point_4', 'why_us_cta_text', 'why_us_floating_text', 'why_us_image']
        },
        {
            title: "Home: Events Section",
            description: "Headings for the upcoming events area.",
            keys: ['events_title', 'events_description', 'events_section_image']
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
            keys: ['about_title', 'about_content', 'about_image', 'about_contact_title', 'about_contact_description']
        },
        {
            title: "Theme",
            description: "Customize the website's appearance. These colors will override the default theme.",
            keys: ['theme_color', 'theme_color_primary', 'theme_color_secondary', 'theme_color_accent']
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
                            <div
                                className="px-4 py-3 border-b border-gray-200"
                                style={{
                                    background: `linear-gradient(to right, ${data.theme_color || '#fdf2f8'}, #ffffff)`
                                }}
                            >
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
                                        style={activeTab === idx ? {
                                            color: data.theme_color || '#7c3aed',
                                            backgroundColor: '#f9fafb', // gray-50
                                            borderLeft: `3px solid ${data.theme_color || '#7c3aed'}`,
                                        } : {}}
                                        className={`
                                        group flex w-full items-center rounded-r-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 border-l-3 border-transparent
                                        ${activeTab === idx
                                                ? 'bg-gray-50'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }
                                    `}
                                    >
                                        <span className="truncate">{section.title}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="p-3 border-t border-gray-200 bg-gray-50">
                            {wasSuccessful && (
                                <div className="rounded-md bg-green-50 p-3 mb-3 border border-green-200">
                                    <div className="flex">
                                        <div className="ml-2">
                                            <p className="text-xs font-medium text-green-800">Settings saved successfully.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={submit}
                                disabled={processing || isCompressing}
                                className="w-full rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50 transition-all duration-200"
                                style={{
                                    backgroundColor: data.theme_color || '#7c3aed',
                                }}
                            >
                                {isCompressing ? 'Compressing Image...' : (processing ? 'Saving Changes...' : 'Save All Changes')}
                            </button>

                            {progress && (
                                <div className="mt-3">
                                    <div className="flex justify-between text-xs font-medium text-gray-900 mb-1">
                                        <span>Uploading...</span>
                                        <span>{progress.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div
                                            className="bg-violet-600 h-1.5 rounded-full transition-all duration-300 ease-in-out"
                                            style={{
                                                width: `${progress.percentage}%`,
                                                backgroundColor: data.theme_color || '#7c3aed'
                                            }}
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
                                        {sections[activeTab].title === 'Theme' && (
                                            <div className="mb-8">
                                                <label className="block text-sm font-medium text-gray-700 mb-4">Select a Theme Preset</label>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                                    {THEME_PRESETS.map((preset) => (
                                                        <button
                                                            key={preset.name}
                                                            type="button"
                                                            title={preset.name}
                                                            onClick={() => applyThemePreset(preset)}
                                                            className="group relative flex items-center justify-center p-0.5 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md h-12 w-20 sm:w-24 border border-gray-200 overflow-hidden"
                                                        >
                                                            <div className="h-full w-full flex rounded-full overflow-hidden">
                                                                {/* Pill Design: Vertical Stripes */}
                                                                <div className="h-full w-1/3" style={{ backgroundColor: preset.colors.theme_color }}></div>
                                                                <div className="h-full w-1/3" style={{ backgroundColor: preset.colors.theme_color_secondary }}></div>
                                                                <div className="h-full w-1/3" style={{ backgroundColor: preset.colors.theme_color_primary }}></div>
                                                            </div>

                                                            {/* Selected Indicator */}
                                                            {data['theme_color'] === preset.colors.theme_color && (
                                                                <div className="absolute inset-0 ring-2 ring-gray-900 rounded-full z-10 pointer-events-none"></div>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 bg-blue-50 p-3 rounded-md border border-blue-100">
                                                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <p>Hover to see theme names. Click to apply colors instantly to the form below.</p>
                                                </div>
                                            </div>
                                        )}

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
