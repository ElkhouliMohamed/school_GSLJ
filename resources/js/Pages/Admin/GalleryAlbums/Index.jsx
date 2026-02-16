import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index({ albums }) {

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! All images inside will be deleted.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.albums.destroy', id), {
                    onSuccess: () => {
                        Swal.fire(
                            'Deleted!',
                            'Album has been deleted.',
                            'success'
                        );
                    }
                });
            }
        });
    };

    return (
        <AdminLayout title="Gallery Albums">
            <Head title="Gallery Albums" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Gallery Albums</h1>
                <Link
                    href={route('admin.albums.create')}
                    className="inline-flex items-center px-4 py-2 bg-violet-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-violet-700 active:bg-violet-900 focus:outline-none focus:border-violet-900 focus:ring ring-violet-300 disabled:opacity-25 transition ease-in-out duration-150"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Album
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
                                    Cover
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Images Count
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {albums.data.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                        No albums found. Create one to get started.
                                    </td>
                                </tr>
                            ) : (
                                albums.data.map((album) => (
                                    <tr key={album.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {album.cover_image ? (
                                                <img
                                                    src={album.cover_image}
                                                    alt={album.title.en}
                                                    className="w-16 h-12 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="w-16 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                                                    <ImageIcon className="w-6 h-6" />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{album.title.en}</div>
                                            {album.title.fr && (
                                                <div className="text-sm text-gray-500">{album.title.fr}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {album.galleries_count}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('admin.albums.edit', album.id)}
                                                    className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-full transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(album.id)}
                                                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-full transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {albums.data.length > 0 && (
                <div className="mt-4 flex justify-center">
                    <div className="flex gap-1">
                        {albums.links.map((link, i) => (
                            link.url ? (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`px-3 py-1 rounded border text-sm ${link.active
                                            ? 'bg-violet-600 text-white border-violet-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded border border-gray-200 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
