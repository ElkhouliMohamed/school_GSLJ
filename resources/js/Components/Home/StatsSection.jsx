import React from 'react';
import { AcademicCapIcon, UserGroupIcon, TrophyIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const stats = [
    { id: 1, name: 'Années d\'expérience', value: '14+', icon: AcademicCapIcon },
    { id: 2, name: 'Programmes Bilingues', value: '3', icon: ShieldCheckIcon },
    { id: 3, name: 'Enseignants Qualifiés', value: '31', icon: UserGroupIcon },
    { id: 4, name: 'Taux de Réussite', value: '100%', icon: TrophyIcon },
];

export default function StatsSection() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Pourquoi choisir notre école ?
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-600">
                            Des résultats prouvés et un engagement envers l'excellence.
                        </p>
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8 hover:bg-violet-50 transition-colors duration-300">
                                <dt className="text-sm font-semibold leading-6 text-gray-600 flex flex-col items-center gap-2">
                                    <stat.icon className="h-8 w-8 text-yellow-600 mb-2" />
                                    {stat.name}
                                </dt>
                                <dd className="order-first text-3xl font-bold tracking-tight text-violet-900 mb-2">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
