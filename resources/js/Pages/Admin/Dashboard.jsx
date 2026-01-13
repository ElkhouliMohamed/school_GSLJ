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
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Dashboard({ stats }) {
    // Prepare chart data
    const chartData = stats?.visits?.chartData || [];
    const maxVisits = Math.max(...chartData.map(d => d.count), 1);

    // Prepare Chart.js data
    const chartJsData = {
        labels: chartData.map(item => {
            const date = new Date(item.date);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }),
        datasets: [
            {
                label: 'Visits',
                data: chartData.map(item => item.count),
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: 'rgb(99, 102, 241)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverBackgroundColor: 'rgb(99, 102, 241)',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 3,
            },
        ],
    };

    // Chart.js options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                titleColor: '#fff',
                titleFont: {
                    size: 14,
                    weight: 'bold',
                },
                bodyColor: '#fff',
                bodyFont: {
                    size: 13,
                },
                displayColors: false,
                callbacks: {
                    label: function(context) {
                        return context.parsed.y + ' visits';
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 12,
                        weight: '500',
                    },
                    padding: 10,
                },
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: '#6b7280',
                    font: {
                        size: 11,
                        weight: '500',
                    },
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 10,
                },
            },
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    };

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
                { label: 'Contacted', value: stats?.preRegistrations?.contacted || 0, icon: CheckCircleIcon },
                { label: 'Enrolled', value: stats?.preRegistrations?.enrolled || 0, icon: CheckCircleIcon },
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

            <div className="space-y-6">
                {/* Statistics Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {statCards.map((card) => (
                        <Link
                            key={card.name}
                            href={card.href}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 hover:border-transparent"
                        >
                            {/* Animated Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                            
                            {/* Top accent bar */}
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`}></div>

                            <div className="p-6 relative">
                                {/* Header with Icon */}
                                <div className="flex items-start justify-between mb-6">
                                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                                        <card.icon className="h-7 w-7 text-white" aria-hidden="true" />
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                                        <span className="text-xs font-medium">View all</span>
                                        <ArrowTrendingUpIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="mb-4">
                                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{card.name}</h3>
                                    <p className={`text-5xl font-extrabold bg-gradient-to-br ${card.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block`}>
                                        {card.value.toLocaleString()}
                                    </p>
                                </div>

                                {/* Details breakdown */}
                                {card.details && (
                                    <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                                        {card.details.map((detail, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <detail.icon className="h-4 w-4 text-gray-400" />
                                                    <span className="text-sm font-medium">{detail.label}</span>
                                                </div>
                                                <span className="text-sm font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-full">{detail.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* KPI Chart Section */}
                {chartData.length > 0 && (
                    <div className="relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-200 overflow-hidden">
                        <div className="relative p-8">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                                        <ChartBarIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-extrabold text-gray-900">Visit Analytics</h2>
                                        <p className="text-sm text-gray-500">Last 30 days activity</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold uppercase tracking-wider opacity-90">Total Visits</span>
                                            <span className="text-2xl font-extrabold">{stats.visits.total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chart.js Line Chart */}
                            <div className="relative bg-white rounded-2xl p-8 border border-gray-100">
                                <div className="h-80">
                                    <Line data={chartJsData} options={chartOptions} />
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 px-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-1 bg-indigo-500 rounded-full"></div>
                                    <span className="text-sm font-medium text-gray-600">Visit Trend</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-600">Peak: </span>
                                    <span className="text-sm font-bold text-indigo-600">{maxVisits} visits</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty state for chart */}
                {chartData.length === 0 && (
                    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-sm border border-gray-200 p-20 text-center overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100 via-purple-50 to-transparent rounded-full blur-3xl opacity-20"></div>
                        <div className="max-w-md mx-auto relative">
                            <div className="relative inline-block mb-8">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-3xl blur-2xl opacity-40 animate-pulse"></div>
                                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50">
                                    <ChartBarIcon className="h-24 w-24 text-indigo-400 mx-auto" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">No Visit Data Available</h3>
                            <p className="text-gray-500 text-lg">Visit analytics will appear here once data is collected.</p>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
