import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { compressImage } from '@/Utils/imageCompression';

export default function CreateEdit({ teamMember = null }) {
    const isEditing = !!teamMember;

    const { data, setData, post: submitPost, processing, errors } = useForm({
        name: {
            en: teamMember?.name?.en || '',
            fr: teamMember?.name?.fr || '',
        },
        position: {
            en: teamMember?.position?.en || '',
            fr: teamMember?.position?.fr || '',
        },
        department: teamMember?.department || 'teaching',
        bio: {
            en: teamMember?.bio?.en || '',
            fr: teamMember?.bio?.fr || '',
        },
        email: teamMember?.email || '',
        phone: teamMember?.phone || '',
        photo: null,
        order: teamMember?.order || 0,
        is_active: teamMember?.is_active ?? true,
        _method: isEditing ? 'put' : 'post',
    });

    const [preview, setPreview] = useState(teamMember?.photo || null);
    const [isCompressing, setIsCompressing] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsCompressing(true);
            const compressedFile = await compressImage(file, { maxSizeMB: 5, maxWidthOrHeight: 1920 });
            setData('photo', compressedFile);
            
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error('Error compressing image:', error);
            setData('photo', file);
        } finally {
            setIsCompressing(false);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        const routeName = isEditing ? route('admin.team-members.update', teamMember.id) : route('admin.team-members.store');
        submitPost(routeName, { forceFormData: true });
    };

    return (
        <AdminLayout title={isEditing ? 'Edit Team Member' : 'Create Team Member'}>
            <Head title={isEditing ? 'Edit Team Member' : 'Create Team Member'} />

            <form onSubmit={submit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
                <div className="px-4 py-6 sm:p-8">
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
                            <label htmlFor="position_en" className="block text-sm font-medium text-gray-900">Position (English)</label>
                            <input type="text" id="position_en" value={data.position.en} onChange={(e) => setData('position', { ...data.position, en: e.target.value })} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm" />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="position_fr" className="block text-sm font-medium text-gray-900">Position (French)</label>
                            <input type="text" id="position_fr" value={data.position.fr} onChange={(e) => setData('position', { ...data.position, fr: e.target.value })} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm" />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="department" className="block text-sm font-medium text-gray-900">Department</label>
                            <select id="department" value={data.department} onChange={(e) => setData('department', e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm">
                                <option value="teaching">Teaching</option>
                                <option value="administration">Administration</option>
                                <option value="support">Support Staff</option>
                            </select>
                            {errors.department && <p className="mt-2 text-sm text-red-600">{errors.department}</p>}
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                            <input type="email" id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm" />
                            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-900">Phone</label>
                            <input type="text" id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm" />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="order" className="block text-sm font-medium text-gray-900">Display Order</label>
                            <input type="number" id="order" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm" />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="bio_en" className="block text-sm font-medium text-gray-900">Bio (English)</label>
                            <textarea id="bio_en" rows={3} value={data.bio.en} onChange={(e) => setData('bio', { ...data.bio, en: e.target.value })} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm" />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="bio_fr" className="block text-sm font-medium text-gray-900">Bio (French)</label>
                            <textarea id="bio_fr" rows={3} value={data.bio.fr} onChange={(e) => setData('bio', { ...data.bio, fr: e.target.value })} className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm" />
                        </div>
                        <div className="col-span-full">
                            <label className="block text-sm font-medium text-gray-900">Photo</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                {preview ? (
                                    <div className="text-center">
                                        <img src={preview} alt="Preview" className="mx-auto h-32 w-32 rounded-full object-cover" />
                                        <div className="mt-4 flex gap-4 justify-center">
                                            <label htmlFor="file-upload-change" className="cursor-pointer text-sm text-violet-600 hover:text-violet-500 font-medium">
                                                Change Photo
                                                <input id="file-upload-change" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                            </label>
                                            <button type="button" onClick={() => { setPreview(null); setData('photo', null); }} className="text-sm text-red-600 hover:text-red-500 font-medium">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-violet-600 hover:text-violet-500">
                                                <span>Upload photo</span>
                                                <input id="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-600">PNG, JPG up to 5MB</p>
                                    </div>
                                )}
                            </div>
                            {isCompressing && <p className="mt-2 text-sm text-blue-600">Compressing image...</p>}
                            {errors.photo && <p className="mt-2 text-sm text-red-600">{errors.photo}</p>}
                        </div>
                        <div className="sm:col-span-3">
                            <div className="flex items-center gap-x-3">
                                <input id="is_active" type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600" />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-900">Active</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                    <Link href={route('admin.team-members.index')} className="text-sm font-semibold text-gray-900">Cancel</Link>
                    <button type="submit" disabled={processing} className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 disabled:opacity-50">{processing ? 'Saving...' : 'Save'}</button>
                </div>
            </form>
        </AdminLayout>
    );
}
