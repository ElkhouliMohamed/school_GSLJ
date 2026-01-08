import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Admissions() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        student_last_name: '',
        student_first_name: '',
        birth_date: '',
        requested_class: '',
        parent_name: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pre-registration.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <MainLayout>
            <Head title="Admissions" />

            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Students studying"
                    className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Rejoignez l'Excellence</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Découvrez notre processus d'admission et faites le premier pas vers un avenir brillant.
                            Nous accueillons des élèves motivés et curieux de la maternelle au lycée.
                        </p>
                    </div>
                </div>
            </div>

            {/* Process Steps */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Procédure</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Comment s'inscrire ?
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Notre processus d'admission est conçu pour être simple et transparent. Suivez ces étapes pour inscrire votre enfant.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                            {[
                                {
                                    name: '1. Dossier de candidature',
                                    description: 'Remplissez le formulaire de pré-inscription en ligne ou retirez un dossier au secrétariat de l\'école.',
                                    icon: (
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: '2. Entretien / Test',
                                    description: 'Une rencontre avec l\'équipe pédagogique et un test de niveau (selon la classe) pour évaluer les acquis.',
                                    icon: (
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: '3. Inscription définitive',
                                    description: 'Après validation du dossier, procédez au règlement des frais d\'inscription pour réserver la place.',
                                    icon: (
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    ),
                                },
                            ].map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-md">
                                            {feature.icon}
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

            {/* Pre-Registration Form Section */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Admission - Pré-inscription</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Remplissez le formulaire ci-dessous, nous vous recontacterons.
                        </p>
                    </div>

                    {/* Success Message */}
                    {flash?.success && (
                        <div className="mx-auto mt-8 max-w-4xl rounded-md bg-green-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800">{flash.success}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-4xl">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            {/* Nom de l'élève */}
                            <div>
                                <label htmlFor="student-last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Nom de l'élève
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="student-last-name"
                                        id="student-last-name"
                                        value={data.student_last_name}
                                        onChange={(e) => setData('student_last_name', e.target.value)}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.student_last_name && <p className="mt-2 text-sm text-red-600">{errors.student_last_name}</p>}
                                </div>
                            </div>

                            {/* Prénom de l'élève */}
                            <div>
                                <label htmlFor="student-first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Prénom de l'élève
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="student-first-name"
                                        id="student-first-name"
                                        value={data.student_first_name}
                                        onChange={(e) => setData('student_first_name', e.target.value)}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.student_first_name && <p className="mt-2 text-sm text-red-600">{errors.student_first_name}</p>}
                                </div>
                            </div>

                            {/* Date de naissance */}
                            <div>
                                <label htmlFor="birth-date" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Date de naissance
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="date"
                                        name="birth-date"
                                        id="birth-date"
                                        value={data.birth_date}
                                        onChange={(e) => setData('birth_date', e.target.value)}
                                        placeholder="jj/mm/aaaa"
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.birth_date && <p className="mt-2 text-sm text-red-600">{errors.birth_date}</p>}
                                </div>
                            </div>

                            {/* Classe demandée */}
                            <div>
                                <label htmlFor="requested-class" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Classe demandée
                                </label>
                                <div className="mt-2.5">
                                    <select
                                        name="requested-class"
                                        id="requested-class"
                                        value={data.requested_class}
                                        onChange={(e) => setData('requested_class', e.target.value)}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    >
                                        <option value="">Sélectionnez une classe</option>
                                        <option value="maternelle-ps">Maternelle - Petite Section</option>
                                        <option value="maternelle-ms">Maternelle - Moyenne Section</option>
                                        <option value="maternelle-gs">Maternelle - Grande Section</option>
                                        <option value="cp">CP</option>
                                        <option value="ce1">CE1</option>
                                        <option value="ce2">CE2</option>
                                        <option value="cm1">CM1</option>
                                        <option value="cm2">CM2</option>
                                        <option value="6eme">6ème</option>
                                        <option value="5eme">5ème</option>
                                        <option value="4eme">4ème</option>
                                        <option value="3eme">3ème</option>
                                        <option value="seconde">Seconde</option>
                                        <option value="premiere">Première</option>
                                        <option value="terminale">Terminale</option>
                                    </select>
                                    {errors.requested_class && <p className="mt-2 text-sm text-red-600">{errors.requested_class}</p>}
                                </div>
                            </div>

                            {/* Nom et prénom du parent */}
                            <div>
                                <label htmlFor="parent-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Nom et prénom du parent
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="parent-name"
                                        id="parent-name"
                                        value={data.parent_name}
                                        onChange={(e) => setData('parent_name', e.target.value)}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.parent_name && <p className="mt-2 text-sm text-red-600">{errors.parent_name}</p>}
                                </div>
                            </div>

                            {/* Téléphone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Téléphone
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                                </div>
                            </div>

                            {/* Message / Informations complémentaires */}
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Message / Informations complémentaires
                                </label>
                                <div className="mt-2.5">
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Envoi en cours...' : 'Envoyer la demande'}
                            </button>
                            <a
                                href="/contact"
                                className="rounded-md bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100 transition-colors text-center"
                            >
                                Prendre RDV
                            </a>
                        </div>
                    </form>
                </div>
            </div>

            {/* Requirements Section */}
            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Documents Requis</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Pour compléter l'inscription, veuillez préparer les documents suivants. Assurez-vous d'avoir les originaux et des copies.
                        </p>
                    </div>
                    <ul role="list" className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <li className="flex gap-x-3 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                            <span className="text-blue-600 text-xl font-bold">•</span>
                            <div>
                                <h3 className="text-lg font-semibold leading-8 text-gray-900">Identité</h3>
                                <p className="leading-7 text-gray-600">Copie de l'acte de naissance et photos d'identité récentes.</p>
                            </div>
                        </li>
                        <li className="flex gap-x-3 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                            <span className="text-blue-600 text-xl font-bold">•</span>
                            <div>
                                <h3 className="text-lg font-semibold leading-8 text-gray-900">Dossier Scolaire</h3>
                                <p className="leading-7 text-gray-600">Bulletins de notes des années précédentes et certificat de scolarité.</p>
                            </div>
                        </li>
                        <li className="flex gap-x-3 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                            <span className="text-blue-600 text-xl font-bold">•</span>
                            <div>
                                <h3 className="text-lg font-semibold leading-8 text-gray-900">Santé</h3>
                                <p className="leading-7 text-gray-600">Carnet de vaccination à jour et fiche médicale remplie.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white">
                <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <svg
                            viewBox="0 0 1024 1024"
                            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                            aria-hidden="true"
                        >
                            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                            <defs>
                                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                    <stop stopColor="#7775D6" />
                                    <stop offset={1} stopColor="#E935C1" />
                                </radialGradient>
                            </defs>
                        </svg>
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Prêt à nous rejoindre ?<br />
                                Commencez l'inscription aujourd'hui.
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Contactez notre service d'admission pour toute question ou pour organiser une visite de l'établissement.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                                <a
                                    href="/contact"
                                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Nous contacter
                                </a>
                                <a href="#" className="text-sm font-semibold leading-6 text-white">
                                    Télécharger la brochure <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
