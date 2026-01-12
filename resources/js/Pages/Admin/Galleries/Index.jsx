import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { PencilSquareIcon, TrashIcon, PlusIcon, VideoCameraIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

export default function Index({ galleries }) {
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.galleries.destroy', id), {
                    preserveScroll: true,
                });
            }
        });
    };

    return (
        <AdminLayout title="Gallery">
            <Head title="Manage Gallery" />

            <div className="sm:flex sm:items-center mb-6">
                <div className="sm:flex-auto">
                    <p className="mt-2 text-sm text-gray-700">Manage photos and videos.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link
                        href={route('admin.galleries.create')}
                        className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        <PlusIcon className="h-5 w-5 inline-block mr-1" />
                        Add Item
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleries.data.map((item) => (
                    <div key={item.id} className="relative group rounded-lg overflow-hidden bg-gray-100 shadow-sm aspect-square">
                        {item.type === 'photo' ? (
                            <img src={item.path} alt={item.title?.en} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                                <VideoCameraIcon className="h-12 w-12" />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Link href={route('admin.galleries.edit', item.id)} className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50">
                                <PencilSquareIcon className="h-5 w-5" />
                            </Link>
                            <button onClick={() => handleDelete(item.id)} className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50">
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs truncate">
                            {item.title?.en || 'No title'}
                        </div>
                        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/50 text-white text-xs uppercase font-bold">
                            {item.type}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {galleries.last_page > 1 && (
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Affichage de <span className="font-medium">{galleries.from}</span> à <span className="font-medium">{galleries.to}</span> sur <span className="font-medium">{galleries.total}</span> éléments
                    </div>
                    <div className="flex gap-1">
                        {galleries.links.map((link, index) => (
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${link.active
                                            ? 'bg-blue-600 text-white font-medium'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 text-sm rounded-md bg-gray-50 text-gray-400 cursor-not-allowed"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )
                        ))}
                    </div>
                </div>
            )}

            {galleries.data.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No items in gallery.
                </div>
            )}
        </AdminLayout>
    );
}
