import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Kpi({ totalVisits, totalClicks, recentActivity, dailyVisits }) {
    // Calculate max value for bar chart scaling
    const maxDailyVisits = Math.max(...dailyVisits.map(d => d.count), 1);

    return (
        <AdminLayout title="Analyse d'audience">
            <Head title="KPI Dashboard" />

            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-slate-500">Total Visites</p>
                                <p className="text-3xl font-bold text-slate-900">{totalVisits}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-slate-500">Total Clics</p>
                                <p className="text-3xl font-bold text-slate-900">{totalClicks}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daily Visits Chart with CSS */}
                <div className="bg-white shadow-sm rounded-xl border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-slate-900">Visites (30 derniers jours)</h3>
                        <div className="text-sm text-slate-500">
                            Max: <span className="font-semibold text-slate-900">{maxDailyVisits}</span>
                        </div>
                    </div>

                    <div className="relative h-64 w-full">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
                                <div key={tick} className="w-full border-t border-slate-100 flex items-center">
                                    <span className="text-[10px] text-slate-400 -mt-5 bg-white pr-1">
                                        {Math.round(maxDailyVisits * (1 - tick))}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Bars */}
                        <div className="absolute inset-x-0 bottom-0 top-6 flex items-end space-x-1 pl-6">
                            {dailyVisits.length > 0 ? dailyVisits.map((item, index) => (
                                <div key={index} className="flex flex-col items-center flex-1 min-w-[10px] sm:min-w-[20px] group h-full justify-end">
                                    <div
                                        className="w-full bg-linear-to-t from-blue-600 to-blue-400 rounded-t-sm hover:from-blue-500 hover:to-blue-300 transition-all relative group-hover:shadow-lg shadow-blue-200"
                                        style={{ height: `${(item.count / maxDailyVisits) * 100}%` }}
                                    >
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs py-1.5 px-3 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                            <div className="font-bold">{item.count} visites</div>
                                            <div className="text-slate-300 text-[10px]">{new Date(item.date).toLocaleDateString()}</div>
                                            {/* Arrow */}
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                                        </div>
                                    </div>
                                    {/* X-Axis Labels (show every 5th or on hover) */}
                                    <div className="mt-2 h-4 relative w-full">
                                        <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 text-[9px] sm:text-[10px] text-slate-400 whitespace-nowrap transition-opacity ${index % 5 === 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                            {new Date(item.date).getDate()}/{new Date(item.date).getMonth() + 1}
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    Aucune donnée disponible pour les 30 derniers jours
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200">
                        <h3 className="text-lg font-medium text-slate-900">Activité Récente</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Chemin / Page</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Détail (ID)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">IP / Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {recentActivity.map((activity) => (
                                    <tr key={activity.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${activity.type === 'visit' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                {activity.type === 'visit' ? 'Visite' : 'Clic'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                                            {activity.path}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {activity.element_id || '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            <div className="flex flex-col">
                                                <span>{activity.ip_address}</span>
                                                <span className="text-xs text-slate-400">
                                                    {new Date(activity.created_at).toLocaleString()}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {recentActivity.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                                            Aucune activité récente.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
