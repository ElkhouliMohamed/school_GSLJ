import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function CampusLife() {
    return (
        <MainLayout>
            <Head title="Vie Étudiante" />

            {/* Hero Section */}
            <div className="bg-white">
                <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
                    <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
                        <div className="px-6 lg:px-0 lg:pt-4">
                            <div className="mx-auto max-w-2xl">
                                <div className="max-w-lg">
                                    <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                        Vivez pleinement votre scolarité
                                    </h1>
                                    <p className="mt-6 text-lg leading-8 text-gray-600">
                                        Au-delà de l'excellence académique, nous offrons un environnement dynamique où chaque élève peut s'épanouir à travers des activités culturelles, sportives et sociales.
                                    </p>
                                    <div className="mt-10 flex items-center gap-x-6">
                                        <a
                                            href="#"
                                            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        >
                                            Découvrir les clubs
                                        </a>
                                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                            Voir la galerie <span aria-hidden="true">→</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
                            <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36" aria-hidden="true" />
                            <div className="shadow-lg md:rounded-3xl">
                                <div className="bg-blue-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                                    <div
                                        className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                                        aria-hidden="true"
                                    />
                                    <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                                        <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                                            <img
                                                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                                                alt="Campus Life"
                                                width={2432}
                                                height={1442}
                                                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                                            />
                                        </div>
                                        <div
                                            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section - Facilities/Clubs */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Activités & Installations</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Un environnement propice à l'épanouissement
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {[
                                {
                                    name: 'Sports et Compétitions',
                                    description: 'Des installations modernes pour le football, le basketball et la natation. Nos équipes participent régulièrement aux tournois inter-écoles.',
                                },
                                {
                                    name: 'Arts et Culture',
                                    description: 'Ateliers de théâtre, musique et peinture pour développer la créativité. Expositions et spectacles annuels.',
                                },
                                {
                                    name: 'Clubs Scientifiques',
                                    description: 'Robotique, codage et expériences scientifiques pour les esprits curieux. Participation aux olympiades.',
                                },
                                {
                                    name: 'Bibliothèque et Médiathèque',
                                    description: 'Un espace calme et riche en ressources pour la lecture, la recherche et l\'étude personnelle.',
                                },
                            ].map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                                            </svg>
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-xl text-center">
                        <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">Témoignages</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Ce que disent nos élèves
                        </p>
                    </div>
                    <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
                        <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                                    <figure className="rounded-2xl bg-white p-8 text-sm leading-6 shadow-md ring-1 ring-gray-900/5">
                                        <blockquote className="text-gray-900">
                                            <p>“L'école m'a permis de découvrir ma passion pour les sciences grâce au club de robotique. L'ambiance est géniale et les profs sont toujours à l'écoute.”</p>
                                        </blockquote>
                                        <figcaption className="mt-6 flex items-center gap-x-4">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">A</div>
                                            <div>
                                                <div className="font-semibold text-gray-900">Ahmadou Diallo</div>
                                                <div className="text-gray-600">Élève de Terminale</div>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </MainLayout>
    );
}
