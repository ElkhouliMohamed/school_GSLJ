import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/solid';

export default function CreateEdit({ gallery = null }) {
    const isEditing = !!gallery;

    const { data, setData, post: submitPost, processing, errors } = useForm({
        title: {
            en: gallery?.title?.en || '',
            fr: gallery?.title?.fr || '',
        },
        type: gallery?.type || 'photo',
        file: null,
        video_source: gallery?.path && !gallery.path.startsWith('/storage') ? 'url' : 'upload', // Heuristic to determine source
        video_url: gallery?.path && !gallery.path.startsWith('/storage') ? gallery.path : '',
        _method: isEditing ? 'put' : 'post',
    });

    const [preview, setPreview] = useState(gallery?.thumbnail || null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('file', file);
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
        const routeName = isEditing ? route('admin.galleries.update', gallery.id) : route('admin.galleries.store');

        submitPost(routeName, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Gallery Item' : 'Add Gallery Item'}>
            <Head title={isEditing ? 'Edit Gallery Item' : 'Add Gallery Item'} />

            <form onSubmit={submit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/* Type Selection */}
                        <div className="sm:col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Item Type</label>
                            <div className="mt-2 flex items-center space-x-6">
                                <div className="flex items-center">
                                    <input
                                        id="type_photo"
                                        name="type"
                                        type="radio"
                                        checked={data.type === 'photo'}
                                        onChange={() => setData('type', 'photo')}
                                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                                    />
                                    <label htmlFor="type_photo" className="ml-3 block text-sm font-medium leading-6 text-gray-900">Photo</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="type_video"
                                        name="type"
                                        type="radio"
                                        checked={data.type === 'video'}
                                        onChange={() => setData('type', 'video')}
                                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                                    />
                                    <label htmlFor="type_video" className="ml-3 block text-sm font-medium leading-6 text-gray-900">Video (URL)</label>
                                </div>
                            </div>
                        </div>

                        {/* Title English */}
                        <div className="sm:col-span-3">
                            <label htmlFor="title_en" className="block text-sm font-medium leading-6 text-gray-900">Title (English)</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="title_en"
                                    value={data.title.en}
                                    onChange={(e) => setData('title', { ...data.title, en: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Title French */}
                        <div className="sm:col-span-3">
                            <label htmlFor="title_fr" className="block text-sm font-medium leading-6 text-gray-900">Title (French)</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="title_fr"
                                    value={data.title.fr}
                                    onChange={(e) => setData('title', { ...data.title, fr: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Video Source Selection */}
                        {data.type === 'video' && (
                            <div className="sm:col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Video Source</label>
                                <div className="mt-2 flex items-center space-x-6">
                                    <div className="flex items-center">
                                        <input
                                            id="source_url"
                                            name="video_source"
                                            type="radio"
                                            checked={data.video_source === 'url'}
                                            onChange={() => setData('video_source', 'url')}
                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                                        />
                                        <label htmlFor="source_url" className="ml-3 block text-sm font-medium leading-6 text-gray-900">External URL (YouTube/Vimeo)</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="source_upload"
                                            name="video_source"
                                            type="radio"
                                            checked={data.video_source === 'upload'}
                                            onChange={() => setData('video_source', 'upload')}
                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                                        />
                                        <label htmlFor="source_upload" className="ml-3 block text-sm font-medium leading-6 text-gray-900">Upload Video File</label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* File Upload (Photo) */}
                        {data.type === 'photo' && (
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Photo (Max 8MB)</label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 relative">
                                    {preview ? (
                                        <div className="text-center">
                                            <img src={preview} alt="Preview" className="mx-auto h-48 object-cover rounded-md" />
                                            <button
                                                type="button"
                                                onClick={() => { setPreview(null); setData('file', null); }}
                                                className="mt-2 text-sm text-red-600 hover:text-red-500"
                                            >
                                                Change Photo
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
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.file && <p className="mt-2 text-sm text-red-600">{errors.file}</p>}
                            </div>
                        )}

                        {/* Video URL or Upload */}
                        {data.type === 'video' && data.video_source === 'url' && (
                            <div className="col-span-full">
                                <label htmlFor="video_url" className="block text-sm font-medium leading-6 text-gray-900">Video URL</label>
                                <div className="mt-2">
                                    <input
                                        type="url"
                                        id="video_url"
                                        value={data.video_url}
                                        onChange={(e) => setData('video_url', e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.video_url && <p className="mt-2 text-sm text-red-600">{errors.video_url}</p>}
                                </div>
                            </div>
                        )}

                        {data.type === 'video' && data.video_source === 'upload' && (
                            <div className="col-span-full">
                                <label htmlFor="video-upload" className="block text-sm font-medium leading-6 text-gray-900">Video File (Max 100MB)</label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="video-upload-input"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                            >
                                                <span>Upload a video</span>
                                                <input
                                                    id="video-upload-input"
                                                    name="file"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={(e) => setData('file', e.target.files[0])}
                                                    accept="video/*"
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">MP4, MOV, AVI up to 100MB</p>
                                        {data.file && <p className="mt-2 text-sm text-green-600">Selected: {data.file.name}</p>}
                                    </div>
                                </div>
                                {errors.file && <p className="mt-2 text-sm text-red-600">{errors.file}</p>}
                            </div>
                        )}

                    </div>
                </div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                    <Link href={route('admin.galleries.index')} className="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
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
