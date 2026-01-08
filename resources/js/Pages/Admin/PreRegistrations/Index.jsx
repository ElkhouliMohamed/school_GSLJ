import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ preRegistrations }) {
    const [filter, setFilter] = useState('all');

    const filteredRegistrations = filter === 'all'
        ? preRegistrations
        : preRegistrations.filter(reg => reg.status === filter);

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800',
            contacted: 'bg-blue-100 text-blue-800',
            enrolled: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };

        const labels = {
            pending: 'En attente',
            contacted: 'Contacté',
            enrolled: 'Inscrit',
            rejected: 'Rejeté',
        };

        return (
            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${badges[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const updateStatus = (id, newStatus) => {
        router.patch(route('admin.pre-registrations.updateStatus', id), {
            status: newStatus,
        }, {
            preserveScroll: true,
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    return (
        <AdminLayout>
            <Head title="Pré-inscriptions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Pré-inscriptions</h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setFilter('all')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        Tous ({preRegistrations.length})
                                    </button>
                                    <button
                                        onClick={() => setFilter('pending')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        En attente ({preRegistrations.filter(r => r.status === 'pending').length})
                                    </button>
                                    <button
                                        onClick={() => setFilter('contacted')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${filter === 'contacted' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        Contactés ({preRegistrations.filter(r => r.status === 'contacted').length})
                                    </button>
                                    <button
                                        onClick={() => setFilter('enrolled')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${filter === 'enrolled' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                    >
                                        Inscrits ({preRegistrations.filter(r => r.status === 'enrolled').length})
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Élève
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date de naissance
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Classe demandée
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Parent
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Téléphone
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date de demande
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Statut
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredRegistrations.length === 0 ? (
                                            <tr>
                                                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                                                    Aucune pré-inscription trouvée
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredRegistrations.map((registration) => (
                                                <tr key={registration.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {registration.student_first_name} {registration.student_last_name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatDate(registration.birth_date)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {registration.requested_class}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {registration.parent_name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {registration.phone}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatDate(registration.created_at)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {getStatusBadge(registration.status)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <select
                                                            value={registration.status}
                                                            onChange={(e) => updateStatus(registration.id, e.target.value)}
                                                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                                        >
                                                            <option value="pending">En attente</option>
                                                            <option value="contacted">Contacté</option>
                                                            <option value="enrolled">Inscrit</option>
                                                            <option value="rejected">Rejeté</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Details Section */}
                            {filteredRegistrations.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-4">Détails des demandes</h3>
                                    <div className="space-y-4">
                                        {filteredRegistrations.map((registration) => (
                                            registration.message && (
                                                <div key={`msg-${registration.id}`} className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-medium text-gray-900">
                                                            {registration.student_first_name} {registration.student_last_name}
                                                        </h4>
                                                        <span className="text-xs text-gray-500">{formatDate(registration.created_at)}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">{registration.message}</p>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
