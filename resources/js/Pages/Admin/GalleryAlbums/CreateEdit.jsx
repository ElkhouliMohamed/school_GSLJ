import React, { useState } from 'react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Upload, X, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';

export default function CreateEdit({ album = null }) {
    const isEditing = !!album;

    const { data, setData, post, processing, errors } = useForm({
        title: {
            en: album?.title?.en || '',
            fr: album?.title?.fr || '',
        },
        description: {
            en: album?.description?.en || '',
            fr: album?.description?.fr || '',
        },
        cover_image: null,
        _method: isEditing ? 'put' : 'post',
    });

    const [coverPreview, setCoverPreview] = useState(album?.cover_image || null);

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('cover_image', file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const options = {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `Album ${isEditing ? 'updated' : 'created'} successfully`,
                    timer: 2000,
                    showConfirmButton: false
                });
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Please check the form for errors',
                });
            }
        };

        if (isEditing) {
            post(route('admin.albums.update', album.id), options);
        } else {
            post(route('admin.albums.store'), options);
        }
    };

    // Image Management Section (Only for Edit)
    const [uploadingImages, setUploadingImages] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploadingImages(true);
        setUploadProgress(0);

        const compressedFiles = [];
        const compressionOptions = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {
            // Compress images
            for (const file of files) {
                if (file.type.startsWith('image/')) {
                    try {
                        const compressedFile = await imageCompression(file, compressionOptions);
                        // Create a new File object because some backends expect the original name
                        const newFile = new File([compressedFile], file.name, {
                            type: file.type,
                            lastModified: Date.now()
                        });
                        compressedFiles.push(newFile);
                    } catch (error) {
                        console.error("Compression failed for", file.name, error);
                        compressedFiles.push(file); // Fallback to original
                    }
                } else {
                    compressedFiles.push(file);
                }
            }

            const formData = new FormData();
            compressedFiles.forEach(file => {
                formData.append('files[]', file);
            });
            formData.append('type', 'photo');
            formData.append('gallery_album_id', album.id);

            router.post(route('admin.galleries.store'), formData, {
                onProgress: (progress) => {
                    const percentage = Math.round((progress.loaded / progress.total) * 100);
                    setUploadProgress(percentage);
                },
                onSuccess: () => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Uploaded!',
                        text: 'Images uploaded successfully',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    setUploadingImages(false);
                    setUploadProgress(0);
                    // Reload to see new images
                    router.reload({ only: ['album'] });
                },
                onError: (errors) => {
                    console.error("Upload errors:", errors);
                    Swal.fire({
                        icon: 'error',
                        title: 'Upload Failed',
                        text: 'Failed to upload images. Please check file sizes or server limits.',
                    });
                    setUploadingImages(false);
                    setUploadProgress(0);
                },
                forceFormData: true,
            });

        } catch (error) {
            console.error("Overall upload process error", error);
            setUploadingImages(false);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred during processing.',
            });
        }
    };

    const handleDeleteImage = (imageId) => {
        Swal.fire({
            title: 'Delete this image?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.galleries.destroy', imageId), {
                    onSuccess: () => {
                        Swal.fire(
                            'Deleted!',
                            'Image has been deleted.',
                            'success'
                        );
                    }
                });
            }
        });
    };

    function ImageIcon({ className }) {
        return (
            <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        );
    }

    return (
        <AdminLayout title={isEditing ? `Edit Album: ${data.title.en}` : 'Create Album'}>
            <Head title={isEditing ? `Edit Album` : 'Create Album'} />

            <div className="mb-6">
                <Link href={route('admin.albums.index')} className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Albums
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Album Details Form */}
                <div className="col-span-1 lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-6 pb-2 border-b">{isEditing ? 'Edit Album Details' : 'Album Details'}</h2>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label htmlFor="title_en" className="block text-sm font-medium text-gray-700">Title (English)</label>
                                <input
                                    type="text"
                                    id="title_en"
                                    value={data.title.en}
                                    onChange={e => setData('title', { ...data.title, en: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                                />
                                {errors['title.en'] && <p className="text-red-500 text-sm mt-1">{errors['title.en']}</p>}
                            </div>

                            <div>
                                <label htmlFor="title_fr" className="block text-sm font-medium text-gray-700">Title (French)</label>
                                <input
                                    type="text"
                                    id="title_fr"
                                    value={data.title.fr}
                                    onChange={e => setData('title', { ...data.title, fr: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="description_en" className="block text-sm font-medium text-gray-700">Description (English)</label>
                                <textarea
                                    id="description_en"
                                    rows="3"
                                    value={data.description.en}
                                    onChange={e => setData('description', { ...data.description, en: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="description_fr" className="block text-sm font-medium text-gray-700">Description (French)</label>
                                <textarea
                                    id="description_fr"
                                    rows="3"
                                    value={data.description.fr}
                                    onChange={e => setData('description', { ...data.description, fr: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                                <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition relative">
                                    {coverPreview ? (
                                        <div className="relative w-full">
                                            <img src={coverPreview} alt="Cover Preview" className="w-full h-48 object-cover rounded-md" />
                                            <button
                                                type="button"
                                                onClick={() => { setCoverPreview(null); setData('cover_image', null); }}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-sm"
                                                title="Remove Cover"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer w-full text-center py-4">
                                            <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                                            <span className="text-sm font-medium text-violet-600 hover:text-violet-500">Click to upload cover</span>
                                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 8MB</p>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleCoverChange} />
                                        </label>
                                    )}
                                </div>
                                {errors.cover_image && <p className="text-red-500 text-sm mt-1">{errors.cover_image}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50 transition-colors"
                            >
                                {processing ? 'Saving...' : (isEditing ? 'Update Album' : 'Create Album')}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Album Images (Only visible when editing) */}
                {isEditing && (
                    <div className="col-span-1 lg:col-span-2">
                        <div className="bg-white p-6 rounded-lg shadow h-full flex flex-col">
                            <div className="flex justify-between items-center mb-6 pb-2 border-b">
                                <h2 className="text-xl font-semibold">Album Images</h2>
                                <div className="relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="album-images-upload"
                                        disabled={uploadingImages}
                                    />
                                    <label htmlFor="album-images-upload">
                                        <span className={`inline-flex items-center px-4 py-2 border border-violet-600 shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none cursor-pointer transition-colors ${uploadingImages ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                            <Upload className="w-4 h-4 mr-2" />
                                            {uploadingImages ? `Uploading... ` : 'Add Multiple Images'}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            {uploadingImages && (
                                <div className="mb-6 animate-pulse">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-violet-700">Uploading & Compressing...</span>
                                        <span className="text-sm font-medium text-violet-700">{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-violet-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {album.galleries && album.galleries.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[600px] p-1">
                                    {album.galleries.map((image) => (
                                        <div key={image.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                            <img
                                                src={image.thumbnail || image.path}
                                                alt={image.title?.en || 'Gallery Image'}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleDeleteImage(image.id)}
                                                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-lg transform hover:scale-110"
                                                    title="Delete Image"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => document.getElementById('album-images-upload').click()}>
                                    <ImageIcon className="w-16 h-16 text-gray-300 mb-4" />
                                    <p className="text-gray-500 text-lg font-medium mb-1">No images in this album yet.</p>
                                    <p className="text-sm text-gray-400">Click here or use the button above to upload images.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
