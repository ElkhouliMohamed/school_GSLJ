import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { compressImage } from '@/Utils/imageCompression';

export default function CreateEdit({ partner = null }) {
    const isEditing = !!partner;

    const { data, setData, post: submitPost, processing, errors } = useForm({
        name: {
            en: partner?.name?.en || '',
            fr: partner?.name?.fr || '',
        },
        logo: null,
        url: partner?.url || '',
        order: partner?.order || 0,
        is_active: partner?.is_active !== undefined ? partner.is_active : true,
        _method: isEditing ? 'put' : 'post',
    });

    const [preview, setPreview] = useState(
        partner?.logo ? (partner.logo.startsWith('http') ? partner.logo : `/storage/${partner.logo}`) : null
    );
    const [isCompressing, setIsCompressing] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsCompressing(true);
            const compressedFile = await compressImage(file, { maxSizeMB: 7, maxWidthOrHeight: 1920 });
            setData('logo', compressedFile);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error('Error compressing image:', error);
            setData('logo', file);
        } finally {
            setIsCompressing(false);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        const routeName = isEditing ? route('admin.partners.update', partner.id) : route('admin.partners.store');

        submitPost(routeName, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout title={isEditing ? 'Modifier le Partenaire' : 'Ajouter un Partenaire'}>
            <Head title={isEditing ? 'Modifier le Partenaire' : 'Ajouter un Partenaire'} />

            <form onSubmit={submit} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        {/* Name French */}
                        <div className="sm:col-span-3">
                            <label htmlFor="name_fr" className="block text-sm font-medium leading-6 text-gray-900">
                                Nom (Français) <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="name_fr"
                                    value={data.name.fr}
                                    onChange={(e) => setData('name', { ...data.name, fr: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    required
                                />
                                {errors['name.fr'] && <p className="mt-2 text-sm text-red-600">{errors['name.fr']}</p>}
                            </div>
                        </div>

                        {/* Name English */}
                        <div className="sm:col-span-3">
                            <label htmlFor="name_en" className="block text-sm font-medium leading-6 text-gray-900">
                                Nom (Anglais) <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="name_en"
                                    value={data.name.en}
                                    onChange={(e) => setData('name', { ...data.name, en: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    required
                                />
                                {errors['name.en'] && <p className="mt-2 text-sm text-red-600">{errors['name.en']}</p>}
                            </div>
                        </div>

                        {/* Logo Upload */}
                        <div className="col-span-full">
                            <label htmlFor="logo" className="block text-sm font-medium leading-6 text-gray-900">
                                Logo {!isEditing && <span className="text-red-500">*</span>}
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                {preview ? (
                                    <div className="text-center">
                                        <img src={preview} alt="Preview" className="mx-auto h-24 object-contain rounded-md bg-gray-100 p-2" />
                                        <button
                                            type="button"
                                            onClick={() => { setPreview(null); setData('logo', null); }}
                                            className="mt-2 text-sm text-red-600 hover:text-red-500"
                                        >
                                            Changer le logo
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
                                                <span>Télécharger un fichier</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={handleFileChange}
                                                    accept="image/*"
                                                    required={!isEditing}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF, SVG jusqu'à 2MB</p>
                                    </div>
                                )}
                            </div>
                            {errors.logo && <p className="mt-2 text-sm text-red-600">{errors.logo}</p>}
                        </div>

                        {/* URL */}
                        <div className="col-span-full">
                            <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
                                Site Web (URL)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="url"
                                    id="url"
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                    placeholder="https://example.com"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                                {errors.url && <p className="mt-2 text-sm text-red-600">{errors.url}</p>}
                            </div>
                        </div>

                        {/* Order */}
                        <div className="sm:col-span-3">
                            <label htmlFor="order" className="block text-sm font-medium leading-6 text-gray-900">
                                Ordre d'affichage <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    id="order"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value))}
                                    min="0"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    required
                                />
                                {errors.order && <p className="mt-2 text-sm text-red-600">{errors.order}</p>}
                            </div>
                        </div>

                        {/* Active Status */}
                        <div className="sm:col-span-3">
                            <label htmlFor="is_active" className="block text-sm font-medium leading-6 text-gray-900">
                                Statut
                            </label>
                            <div className="mt-2">
                                <select
                                    id="is_active"
                                    value={data.is_active ? '1' : '0'}
                                    onChange={(e) => setData('is_active', e.target.value === '1')}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
                                >
                                    <option value="1">Actif</option>
                                    <option value="0">Inactif</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                    <Link href={route('admin.partners.index')} className="text-sm font-semibold leading-6 text-gray-900">
                        Annuler
                    </Link>
                    <button
                        type="submit"
                        disabled={processing || isCompressing}
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                    >
                        {isCompressing ? 'Compression...' : (processing ? 'Enregistrement...' : 'Enregistrer')}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
