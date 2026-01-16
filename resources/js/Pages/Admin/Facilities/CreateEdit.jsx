import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import { compressImage } from '@/Utils/imageCompression';

export default function CreateEdit({ facility = null }) {
    const isEditing = !!facility;

    const [selectedImages, setSelectedImages] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isCompressing, setIsCompressing] = useState(false);
    const [compressionProgress, setCompressionProgress] = useState({ current: 0, total: 0 });

    const { data, setData, post: submitPost, processing, errors } = useForm({
        name: {
            en: facility?.name?.en || '',
            fr: facility?.name?.fr || '',
        },
        type: facility?.type || 'transport',
        description: {
            en: facility?.description?.en || '',
            fr: facility?.description?.fr || '',
        },
        order: facility?.order || 0,
        is_active: facility?.is_active ?? true,
        images: null,
        _method: isEditing ? 'put' : 'post',
    });

    const submit = (e) => {
        e.preventDefault();

        let routeName;
        if (isEditing) {
            routeName = route('admin.facilities.update', facility.id);
        } else {
            routeName = route('admin.facilities.store');
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
                    text: isEditing ? 'Facility has been updated successfully.' : 'Facility has been created successfully.',
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
        <AdminLayout title={isEditing ? 'Edit Facility' : 'Create Facility'}>
            <Head title={isEditing ? 'Edit Facility' : 'Create Facility'} />

            <form onSubmit={submit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                <div className="px-4 py-6 sm:p-8">
                    {/* Compression Progress Bar */}
                    {isCompressing && compressionProgress.total > 0 && (
                        <div className="px-4 pt-6 sm:px-8">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${(compressionProgress.current / compressionProgress.total) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 text-center mb-4">
                                Compressing images... {compressionProgress.current} of {compressionProgress.total}
                            </p>
                        </div>
                    )}

                    {/* Upload Progress Bar */}
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

                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="name_en" className="block text-sm font-medium text-gray-900">Name (English)</label>
                            <input type="text" id="name_en" value={data.name.en} onChange={(e) => setData('name', { ...data.name, en: e.target.value })} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm" />
                            {errors['name.en'] && <p className="mt-2 text-sm text-red-600">{errors['name.en']}</p>}
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="name_fr" className="block text-sm font-medium text-gray-900">Name (French)</label>
                            <input type="text" id="name_fr" value={data.name.fr} onChange={(e) => setData('name', { ...data.name, fr: e.target.value })} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm" />
                            {errors['name.fr'] && <p className="mt-2 text-sm text-red-600">{errors['name.fr']}</p>}
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-900">Type</label>
                            <select id="type" value={data.type} onChange={(e) => setData('type', e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm">
                                <option value="transport">Transportation</option>
                                <option value="catering">Catering</option>
                                <option value="uniform">Uniform</option>
                                <option value="lab">Laboratory</option>
                                <option value="infrastructure">Infrastructure</option>
                                <option value="regulations">Regulations</option>
                            </select>
                            {errors.type && <p className="mt-2 text-sm text-red-600">{errors.type}</p>}
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="order" className="block text-sm font-medium text-gray-900">Display Order</label>
                            <input type="number" id="order" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm" />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="description_en" className="block text-sm font-medium text-gray-900">Description (English)</label>
                            <textarea id="description_en" rows={5} value={data.description.en} onChange={(e) => setData('description', { ...data.description, en: e.target.value })} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm" />
                            {errors['description.en'] && <p className="mt-2 text-sm text-red-600">{errors['description.en']}</p>}
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="description_fr" className="block text-sm font-medium text-gray-900">Description (French)</label>
                            <textarea id="description_fr" rows={5} value={data.description.fr} onChange={(e) => setData('description', { ...data.description, fr: e.target.value })} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm" />
                            {errors['description.fr'] && <p className="mt-2 text-sm text-red-600">{errors['description.fr']}</p>}
                        </div>
                        <div className="sm:col-span-3">
                            <div className="flex items-center gap-x-3">
                                <input id="is_active" type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600" />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-900">Active</label>
                            </div>
                        </div>

                        {/* Existing Images Display */}
                        {isEditing && facility.images && facility.images.length > 0 && (
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-900 mb-2">Current Images</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {facility.images.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <img src={img} alt={`Facility ${index}`} className="h-24 w-full object-cover rounded-lg border border-gray-200" />
                                            {/* Delete functionality would go here if implemented in backend */}
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-2 text-xs text-gray-500">New uploads will be added to these images.</p>
                            </div>
                        )}

                        <div className="col-span-full">
                            <label className="block text-sm font-medium text-gray-900">
                                {isEditing ? 'Add Images' : 'Images'}
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label htmlFor="images" className="relative cursor-pointer rounded-md bg-white font-semibold text-violet-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-600 focus-within:ring-offset-2 hover:text-violet-500">
                                            <span>Upload files</span>
                                            <input
                                                id="images"
                                                name="images"
                                                type="file"
                                                className="sr-only"
                                                multiple
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    const FileList = e.target.files;
                                                    const files = Array.from(FileList);

                                                    try {
                                                        setIsCompressing(true);
                                                        setCompressionProgress({ current: 0, total: files.length });

                                                        const compressedFiles = [];
                                                        for (let i = 0; i < files.length; i++) {
                                                            const file = files[i];
                                                            setCompressionProgress({ current: i + 1, total: files.length });
                                                            const compressedFile = await compressImage(file, { maxSizeMB: 7, maxWidthOrHeight: 1920 });
                                                            compressedFiles.push(compressedFile);
                                                        }

                                                        setSelectedImages(compressedFiles);
                                                        setData('images', compressedFiles);
                                                    } catch (error) {
                                                        console.error('Error compressing images:', error);
                                                        // Fallback to original files
                                                        setSelectedImages(files);
                                                        setData('images', files);
                                                    } finally {
                                                        setIsCompressing(false);
                                                        setCompressionProgress({ current: 0, total: 0 });
                                                    }
                                                }}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 2MB</p>
                                    {selectedImages.length > 0 && (
                                        <div className="mt-2 text-sm text-gray-500">
                                            {selectedImages.length} NEW image(s) selected
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                    <Link href={route('admin.facilities.index')} className="text-sm font-semibold text-gray-900">Cancel</Link>
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
