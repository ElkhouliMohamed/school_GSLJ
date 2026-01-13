import React, { useState } from 'react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PhotoIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import { compressImage } from '@/Utils/imageCompression';

export default function CreateEdit({ gallery = null }) {
    const isEditing = !!gallery;

    const { data, setData, post: submitPost, processing, errors } = useForm({
        title: {
            en: gallery?.title?.en || '',
            fr: gallery?.title?.fr || '',
        },
        type: gallery?.type || 'photo',
        file: null, // For single upload (edit or video)
        files: [], // For multi upload (create photo)
        video_source: gallery?.path && !gallery.path.startsWith('/storage') ? 'url' : 'upload',
        video_url: gallery?.path && !gallery.path.startsWith('/storage') ? gallery.path : '',
        _method: isEditing ? 'put' : 'post',
    });

    const [previews, setPreviews] = useState(gallery?.thumbnail ? [gallery.thumbnail] : []);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isCompressing, setIsCompressing] = useState(false);

    const handleFileChange = async (e) => {
        if (data.type === 'photo' && !isEditing) {
            // Multi-upload handling with compression
            const FileList = e.target.files;
            const newFiles = [];
            const newPreviews = [];

            try {
                setIsCompressing(true);
                
                for (let i = 0; i < FileList.length; i++) {
                    const file = FileList[i];
                    const compressedFile = await compressImage(file, { maxSizeMB: 7, maxWidthOrHeight: 1920 });
                    newFiles.push(compressedFile);
                    newPreviews.push(URL.createObjectURL(compressedFile));
                }

                setData('files', newFiles);
                setPreviews(newPreviews);
            } catch (error) {
                console.error('Error compressing images:', error);
                // Fallback to original files
                const fallbackFiles = [];
                const fallbackPreviews = [];
                for (let i = 0; i < FileList.length; i++) {
                    const file = FileList[i];
                    fallbackFiles.push(file);
                    fallbackPreviews.push(URL.createObjectURL(file));
                }
                setData('files', fallbackFiles);
                setPreviews(fallbackPreviews);
            } finally {
                setIsCompressing(false);
            }
        } else {
            // Single file handling (Edit or Video) with compression
            const file = e.target.files[0];
            if (!file) return;

            if (data.type === 'photo') {
                try {
                    setIsCompressing(true);
                    const compressedFile = await compressImage(file, { maxSizeMB: 7, maxWidthOrHeight: 1920 });
                    setData('file', compressedFile);
                    
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setPreviews([reader.result]);
                    };
                    reader.readAsDataURL(compressedFile);
                } catch (error) {
                    console.error('Error compressing image:', error);
                    setData('file', file);
                } finally {
                    setIsCompressing(false);
                }
            } else {
                // Video file - no compression
                setData('file', file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviews([reader.result]);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        let routeName;
        if (isEditing) {
            // Note: Route parameter must be 'album' because Route::resource('albums', ...)
            routeName = route('admin.galleries.update', { album: gallery.id }, false);
        } else {
            routeName = route('admin.galleries.store', undefined, false);
        }

        // Reset progress
        setUploadProgress(0);

        submitPost(routeName, {
            forceFormData: true,
            onProgress: (progress) => {
                // Update progress bar
                const percentage = Math.round((progress.loaded / progress.total) * 100);
                setUploadProgress(percentage);
            },
            onSuccess: () => {
                setUploadProgress(100);
                Swal.fire({
                    icon: 'success',
                    title: isEditing ? 'Updated!' : 'Created!',
                    text: isEditing ? 'Gallery item has been updated successfully.' : 'Gallery item has been created successfully.',
                    confirmButtonColor: '#7c3aed',
                    timer: 2000,
                    timerProgressBar: true,
                });
            },
            onError: (errors) => {
                setUploadProgress(0);
                const errorMessages = Object.values(errors).flat().join('\n');
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: errorMessages || 'Something went wrong. Please try again.',
                    confirmButtonColor: '#7c3aed',
                });
            },
        });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Gallery Item' : 'Add Gallery Item'}>
            <Head title={isEditing ? 'Edit Gallery Item' : 'Add Gallery Item'} />

            <form onSubmit={submit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                {/* Progress Bar */}
                {processing && uploadProgress > 0 && (
                    <div className="px-4 pt-6 sm:px-8">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                            <div
                                className="bg-violet-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 text-center mb-4">
                            Uploading... {uploadProgress}%
                        </p>
                    </div>
                )}

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
                                        disabled={isEditing}
                                        className="h-4 w-4 border-gray-300 text-violet-600 focus:ring-violet-600 disabled:text-gray-400"
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
                                        disabled={isEditing}
                                        className="h-4 w-4 border-gray-300 text-violet-600 focus:ring-violet-600 disabled:text-gray-400"
                                    />
                                    <label htmlFor="type_video" className="ml-3 block text-sm font-medium leading-6 text-gray-900">Video (URL)</label>
                                </div>
                            </div>
                        </div>

                        {/* Title English */}
                        <div className="sm:col-span-3">
                            <label htmlFor="title_en" className="block text-sm font-medium leading-6 text-gray-900">Title (English) - Optional</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="title_en"
                                    value={data.title.en}
                                    onChange={(e) => setData('title', { ...data.title, en: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-violet-600 sm:text-sm sm:leading-6"
                                    placeholder={!isEditing && data.type === 'photo' ? "Applies to all selected photos" : ""}
                                />
                            </div>
                        </div>

                        {/* Title French */}
                        <div className="sm:col-span-3">
                            <label htmlFor="title_fr" className="block text-sm font-medium leading-6 text-gray-900">Title (French) - Optional</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="title_fr"
                                    value={data.title.fr}
                                    onChange={(e) => setData('title', { ...data.title, fr: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-violet-600 sm:text-sm sm:leading-6"
                                    placeholder={!isEditing && data.type === 'photo' ? "Applies to all selected photos" : ""}
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
                                            className="h-4 w-4 border-gray-300 text-violet-600 focus:ring-violet-600"
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
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    {isEditing ? "Photo (Max 8MB)" : "Photos (Select Multiple, Max 8MB each)"}
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 relative">
                                    {previews.length > 0 ? (
                                        <div className="text-center w-full">
                                            <div className="flex flex-wrap gap-4 justify-center">
                                                {previews.map((src, index) => (
                                                    <img key={index} src={src} alt={`Preview ${index}`} className="h-32 w-32 object-cover rounded-md shadow-sm" />
                                                ))}
                                            </div>
                                            <div className="mt-4 flex gap-4 justify-center">
                                                <label
                                                    htmlFor="file-upload-change"
                                                    className="cursor-pointer text-sm text-violet-600 hover:text-violet-500 font-medium"
                                                >
                                                    {isEditing ? 'Change Image' : 'Change Images'}
                                                    <input
                                                        id="file-upload-change"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={handleFileChange}
                                                        accept="image/*"
                                                        multiple={!isEditing}
                                                    />
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => { setPreviews([]); setData(isEditing ? 'file' : 'files', isEditing ? null : []); }}
                                                    className="text-sm text-red-600 hover:text-red-500 font-medium"
                                                >
                                                    Clear Selection
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-violet-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-600 focus-within:ring-offset-2 hover:text-violet-500"
                                                >
                                                    <span>{isEditing ? "Upload a file" : "Upload files"}</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={handleFileChange}
                                                        accept="image/*"
                                                        multiple={!isEditing}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.file && <p className="mt-2 text-sm text-red-600">{errors.file}</p>}
                                {errors.files && <p className="mt-2 text-sm text-red-600">{errors.files}</p>}
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
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-violet-600 sm:text-sm sm:leading-6"
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
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-violet-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-600 focus-within:ring-offset-2 hover:text-violet-500"
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
                        disabled={processing || isCompressing}
                        className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:bg-violet-400"
                    >
                        {isCompressing ? 'Compressing Images...' : (processing ? 'Processing...' : 'Save')}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
