import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { compressImage } from '@/Utils/imageCompression';

export default function CreateEdit({ program = null }) {
    const isEditing = !!program;

    const { data, setData, post: submitPost, processing, errors } = useForm({
        name: {
            en: program?.name?.en || '',
            fr: program?.name?.fr || '',
        },
        level: program?.level || 'preschool',
        description: {
            en: program?.description?.en || '',
            fr: program?.description?.fr || '',
        },
        image: null,
        order: program?.order || 0,
        is_active: program?.is_active ?? true,
        _method: isEditing ? 'put' : 'post',
    });

    const [preview, setPreview] = useState(program?.image || null);
    const [isCompressing, setIsCompressing] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsCompressing(true);
            const compressedFile = await compressImage(file, { maxSizeMB: 5, maxWidthOrHeight: 1920 });
            setData('image', compressedFile);
            
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error('Error compressing image:', error);
            setData('image', file);
        } finally {
            setIsCompressing(false);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        const routeName = isEditing ? route('admin.programs.update', program.id) : route('admin.programs.store');
        submitPost(routeName, { forceFormData: true });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Program' : 'Create Program'}>
            <Head title={isEditing ? 'Edit Program' : 'Create Program'} />

            <form onSubmit={submit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/* Name English */}
                        <div className="sm:col-span-3">
                            <label htmlFor="name_en" className="block text-sm font-medium leading-6 text-gray-900">
                                Name (English)
                            </label>
                            <input
                                type="text"
                                id="name_en"
                                value={data.name.en}
                                onChange={(e) => setData('name', { ...data.name, en: e.target.value })}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                            />
                            {errors['name.en'] && <p className="mt-2 text-sm text-red-600">{errors['name.en']}</p>}
                        </div>

                        {/* Name French */}
                        <div className="sm:col-span-3">
                            <label htmlFor="name_fr" className="block text-sm font-medium leading-6 text-gray-900">
                                Name (French)
                            </label>
                            <input
                                type="text"
                                id="name_fr"
                                value={data.name.fr}
                                onChange={(e) => setData('name', { ...data.name, fr: e.target.value })}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                            />
                            {errors['name.fr'] && <p className="mt-2 text-sm text-red-600">{errors['name.fr']}</p>}
                        </div>

                        {/* Level */}
                        <div className="sm:col-span-3">
                            <label htmlFor="level" className="block text-sm font-medium leading-6 text-gray-900">
                                Level
                            </label>
                            <select
                                id="level"
                                value={data.level}
                                onChange={(e) => setData('level', e.target.value)}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                            >
                                <option value="preschool">Preschool</option>
                                <option value="elementary">Elementary</option>
                                <option value="middle">Middle School</option>
                                <option value="secondary">Secondary</option>
                            </select>
                            {errors.level && <p className="mt-2 text-sm text-red-600">{errors.level}</p>}
                        </div>

                        {/* Order */}
                        <div className="sm:col-span-3">
                            <label htmlFor="order" className="block text-sm font-medium leading-6 text-gray-900">
                                Display Order
                            </label>
                            <input
                                type="number"
                                id="order"
                                value={data.order}
                                onChange={(e) => setData('order', parseInt(e.target.value))}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                            />
                        </div>

                        {/* Description English */}
                        <div className="col-span-full">
                            <label htmlFor="description_en" className="block text-sm font-medium leading-6 text-gray-900">
                                Description (English)
                            </label>
                            <textarea
                                id="description_en"
                                rows={5}
                                value={data.description.en}
                                onChange={(e) => setData('description', { ...data.description, en: e.target.value })}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                            />
                            {errors['description.en'] && <p className="mt-2 text-sm text-red-600">{errors['description.en']}</p>}
                        </div>

                        {/* Description French */}
                        <div className="col-span-full">
                            <label htmlFor="description_fr" className="block text-sm font-medium leading-6 text-gray-900">
                                Description (French)
                            </label>
                            <textarea
                                id="description_fr"
                                rows={5}
                                value={data.description.fr}
                                onChange={(e) => setData('description', { ...data.description, fr: e.target.value })}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                            />
                            {errors['description.fr'] && <p className="mt-2 text-sm text-red-600">{errors['description.fr']}</p>}
                        </div>

                        {/* Image Upload */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Program Image</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                {preview ? (
                                    <div className="text-center">
                                        <img src={preview} alt="Preview" className="mx-auto h-48 object-cover rounded-md" />
                                        <div className="mt-4 flex gap-4 justify-center">
                                            <label htmlFor="file-upload-change" className="cursor-pointer text-sm text-violet-600 hover:text-violet-500 font-medium">
                                                Change Image
                                                <input id="file-upload-change" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                            </label>
                                            <button type="button" onClick={() => { setPreview(null); setData('image', null); }} className="text-sm text-red-600 hover:text-red-500 font-medium">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-violet-600 hover:text-violet-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-600">PNG, JPG up to 5MB</p>
                                    </div>
                                )}
                            </div>
                            {isCompressing && <p className="mt-2 text-sm text-blue-600">Compressing image...</p>}
                            {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                        </div>

                        {/* Active Status */}
                        <div className="sm:col-span-3">
                            <div className="flex items-center gap-x-3">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-900">Active</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                    <Link href={route('admin.programs.index')} className="text-sm font-semibold text-gray-900">Cancel</Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
