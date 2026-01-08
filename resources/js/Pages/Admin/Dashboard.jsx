import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard() {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Card 1 */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Total Blogs</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">0</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                            <a href="/admin/posts" className="font-medium text-blue-600 hover:text-blue-500">
                                View all
                            </a>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="w-0 flex-1">
                                <dl>
                                    <dt className="truncate text-sm font-medium text-gray-500">Gallery Items</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">0</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                            <a href="/admin/galleries" className="font-medium text-blue-600 hover:text-blue-500">
                                View all
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
