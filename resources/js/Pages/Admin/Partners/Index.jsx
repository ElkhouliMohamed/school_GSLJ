import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

export default function Index({ partners }) {
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Cette action est irréversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.partners.destroy', id), {
                    preserveScroll: true,
                });
            }
        });
    };

    return (
        <AdminLayout title="Partenaires">
            <Head title="Gérer les Partenaires" />

            <div className="sm:flex sm:items-center mb-6">
                <div className="sm:flex-auto">
                    <p className="mt-2 text-sm text-gray-700">Gérez les logos et informations des partenaires.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link
                        href={route('admin.partners.create')}
                        className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        <PlusIcon className="h-5 w-5 inline-block mr-1" />
                        Ajouter un Partenaire
                    </Link>
                </div>
            </div>

            <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {partners.map((partner) => (
                        <li key={partner.id} className="px-6 py-4 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="h-16 w-24 flex-shrink-0 bg-gray-100 rounded flex items-center justify-center p-2">
                                        <img
                                            src={partner.logo.startsWith('http') ? partner.logo : `/storage/${partner.logo}`}
                                            alt={partner.name?.fr || partner.name?.en}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-gray-900">
                                                {partner.name?.fr || partner.name?.en}
                                            </p>
                                            {!partner.is_active && (
                                                <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                                                    Inactif
                                                </span>
                                            )}
                                        </div>
                                        {partner.url && (
                                            <p className="text-sm text-gray-500 truncate">{partner.url}</p>
                                        )}
                                        <p className="text-xs text-gray-400">Ordre: {partner.order}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={route('admin.partners.edit', partner.id)}
                                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        <PencilSquareIcon className="h-5 w-5 inline-block" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(partner.id)}
                                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50"
                                    >
                                        <TrashIcon className="h-5 w-5 inline-block" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {partners.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <p className="text-gray-500">Aucun partenaire enregistré.</p>
                </div>
            )}
        </AdminLayout>
    );
}
