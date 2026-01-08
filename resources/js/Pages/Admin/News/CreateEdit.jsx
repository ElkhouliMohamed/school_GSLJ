import React, { useState, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PhotoIcon } from '@heroicons/react/24/solid';

export default function CreateEdit({ news = null }) {
    const isEditing = !!news;

    const { data, setData, post: submitPost, put, processing, errors } = useForm({
        title: {
            en: news?.title?.en || '',
            fr: news?.title?.fr || '',
        },
        content: {
            en: news?.content?.en || '',
            fr: news?.content?.fr || '',
        },
        image: null,
        is_published: news?.is_published || false,
        _method: isEditing ? 'put' : 'post',
    });

    // Handle image preview
    const [preview, setPreview] = useState(news?.image || null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // Use relative URL (3rd param false)
        const routeName = isEditing
            ? route('admin.news.update', news.id, false)
            : route('admin.news.store', undefined, false);

        // Use 'post' method for file uploads even when updating, with _method: 'put'
        submitPost(routeName, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit News' : 'Create News'}>
            <Head title={isEditing ? 'Edit News' : 'Create News'} />

            <form onSubmit={submit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/* Title English */}
                        <div className="sm:col-span-3">
                            <label htmlFor="title_en" className="block text-sm font-medium leading-6 text-gray-900">
                                Title (English)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="title_en"
                                    id="title_en"
                                    value={data.title.en}
                                    onChange={(e) => setData('title', { ...data.title, en: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                {errors['title.en'] && <p className="mt-2 text-sm text-red-600">{errors['title.en']}</p>}
                            </div>
                        </div>

                        {/* Title French */}
                        <div className="sm:col-span-3">
                            <label htmlFor="title_fr" className="block text-sm font-medium leading-6 text-gray-900">
                                Title (French)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="title_fr"
                                    id="title_fr"
                                    value={data.title.fr}
                                    onChange={(e) => setData('title', { ...data.title, fr: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                {errors['title.fr'] && <p className="mt-2 text-sm text-red-600">{errors['title.fr']}</p>}
                            </div>
                        </div>

                        {/* Content English */}
                        <div className="col-span-full">
                            <label htmlFor="content_en" className="block text-sm font-medium leading-6 text-gray-900">
                                Content (English)
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="content_en"
                                    name="content_en"
                                    rows={5}
                                    value={data.content.en}
                                    onChange={(e) => setData('content', { ...data.content, en: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                {errors['content.en'] && <p className="mt-2 text-sm text-red-600">{errors['content.en']}</p>}
                            </div>
                        </div>

                        {/* Content French */}
                        <div className="col-span-full">
                            <label htmlFor="content_fr" className="block text-sm font-medium leading-6 text-gray-900">
                                Content (French)
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="content_fr"
                                    name="content_fr"
                                    rows={5}
                                    value={data.content.fr}
                                    onChange={(e) => setData('content', { ...data.content, fr: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                {errors['content.fr'] && <p className="mt-2 text-sm text-red-600">{errors['content.fr']}</p>}
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Cover photo
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 relative">
                                {preview ? (
                                    <div className="text-center">
                                        <img src={preview} alt="Preview" className="mx-auto h-48 object-cover rounded-md" />
                                        <button
                                            type="button"
                                            onClick={() => { setPreview(null); setData('image', null); }}
                                            className="mt-2 text-sm text-red-600 hover:text-red-500"
                                        >
                                            Remove Image
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 2MB</p>
                                    </div>
                                )}
                            </div>
                            {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                        </div>

                        {/* Published Status */}
                        <div className="sm:col-span-3">
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="is_published"
                                    name="is_published"
                                    type="checkbox"
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                />
                                <label htmlFor="is_published" className="block text-sm font-medium leading-6 text-gray-900">
                                    Publish immediately
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                    <Link href={route('admin.news.index', undefined, false)} className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>

        </AdminLayout>
    );
}
