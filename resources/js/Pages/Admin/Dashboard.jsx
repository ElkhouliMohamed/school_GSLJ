import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    DocumentTextIcon,
    PhotoIcon,
    UserGroupIcon,
    UsersIcon,
    BuildingOfficeIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';

export default function Dashboard({ stats }) {
    // Prepare chart data
    const chartData = stats?.visits?.chartData || [];
    const maxVisits = Math.max(...chartData.map(d => d.count), 1);

    const statCards = [
        {
            name: 'Total Posts',
            value: stats?.posts?.total || 0,
            icon: DocumentTextIcon,
            href: '/admin/news',
            color: 'violet',
            gradient: 'from-violet-500 to-purple-600',
            details: [
                { label: 'Published', value: stats?.posts?.published || 0, icon: CheckCircleIcon },
                { label: 'Draft', value: stats?.posts?.draft || 0, icon: ClockIcon },
            ]
        },
        {
            name: 'Gallery Items',
            value: stats?.galleries || 0,
            icon: PhotoIcon,
            href: '/admin/galleries',
            color: 'blue',
            gradient: 'from-blue-500 to-cyan-600',
        },
        {
            name: 'Pre-Registrations',
            value: stats?.preRegistrations?.total || 0,
            icon: UserGroupIcon,
            href: '/admin/pre-registrations',
            color: 'emerald',
            gradient: 'from-emerald-500 to-teal-600',
            details: [
                { label: 'Pending', value: stats?.preRegistrations?.pending || 0, icon: ClockIcon },
                { label: 'Approved', value: stats?.preRegistrations?.approved || 0, icon: CheckCircleIcon },
                { label: 'Rejected', value: stats?.preRegistrations?.rejected || 0, icon: XCircleIcon },
            ]
        },
        {
            name: 'Total Users',
            value: stats?.users || 0,
            icon: UsersIcon,
            href: '/admin/users',
            color: 'amber',
            gradient: 'from-amber-500 to-orange-600',
        },
        {
            name: 'Partners',
            value: stats?.partners || 0,
            icon: BuildingOfficeIcon,
            href: '/admin/partners',
            color: 'pink',
            gradient: 'from-pink-500 to-rose-600',
        },
        {
            name: 'Visits (30 Days)',
            value: stats?.visits?.total || 0,
            icon: ChartBarIcon,
            href: '/admin/kpi',
            color: 'indigo',
            gradient: 'from-indigo-500 to-blue-600',
        },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {statCards.map((card) => (
                    <div
                        key={card.name}
                        className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                    >
                        {/* Gradient Background Accent */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full -mr-16 -mt-16`}></div>

                        <div className="p-6 relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                                    <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <Link
                                    href={card.href}
                                    className={`text-sm font-medium text-${card.color}-600 hover:text-${card.color}-700 flex items-center gap-1 transition-colors`}
                                >
                                    View all
                                    <ArrowTrendingUpIcon className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="mb-2">
                                <p className="text-sm font-medium text-gray-600 mb-1">{card.name}</p>
                                <p className="text-4xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                    {card.value.toLocaleString()}
                                </p>
                            </div>

                            {/* Details breakdown */}
                            {card.details && (
                                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                                    {card.details.map((detail, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1.5 text-gray-600">
                                                <detail.icon className="h-3.5 w-3.5" />
                                                <span>{detail.label}</span>
                                            </div>
                                            <span className="font-semibold text-gray-900">{detail.value}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* KPI Chart Section */}
            {chartData.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Visit Analytics</h2>
                            <p className="text-sm text-gray-600 mt-1">Last 30 days activity</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md">
                            <ChartBarIcon className="h-5 w-5" />
                            <span className="font-semibold">{stats.visits.total.toLocaleString()} visits</span>
                        </div>
                    </div>

                    {/* Simple Bar Chart */}
                    <div className="relative h-64 flex items-end gap-1">
                        {chartData.map((item, index) => {
                            const height = (item.count / maxVisits) * 100;
                            const date = new Date(item.date);
                            const day = date.getDate();

                            return (
                                <div key={index} className="flex-1 flex flex-col items-center group">
                                    <div className="relative w-full flex items-end justify-center h-56">
                                        <div
                                            className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-300 hover:from-violet-600 hover:to-violet-400 cursor-pointer shadow-md"
                                            style={{ height: `${height}%` }}
                                            title={`${item.date}: ${item.count} visits`}
                                        >
                                            {/* Tooltip on hover */}
                                            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                <div className="font-semibold">{item.count} visits</div>
                                                <div className="text-gray-300">{item.date}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* X-axis label - show every 5th day */}
                                    {index % 5 === 0 && (
                                        <div className="text-xs text-gray-500 mt-2 font-medium">
                                            {day}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Y-axis reference lines */}
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500 border-t border-gray-200 pt-4">
                        <span>0 visits</span>
                        <span className="font-medium text-gray-700">{maxVisits} visits (peak)</span>
                    </div>
                </div>
            )}

            {/* Empty state for chart */}
            {chartData.length === 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                    <ChartBarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Visit Data Available</h3>
                    <p className="text-gray-600">Visit analytics will appear here once data is collected.</p>
                </div>
            )}
        </AdminLayout>
    );
}
