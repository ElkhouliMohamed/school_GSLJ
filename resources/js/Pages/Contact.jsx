import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { getLocalized } from '@/Utils/localization';

export default function Contact({ flash }) {
    const { settings, locale } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        phoneNumber: '',
    });

    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.submit'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSubmissionStatus('success');
                Swal.fire({
                    title: 'Message Envoyé!',
                    text: 'Votre message a été envoyé avec succès! Nous vous contacterons bientôt.',
                    icon: 'success',
                    confirmButtonText: 'Fermer',
                    confirmButtonColor: '#7c3aed' // Violet 600
                });
            },
            onError: () => {
                setSubmissionStatus('error');
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.',
                    icon: 'error',
                    confirmButtonText: 'Fermer',
                    confirmButtonColor: '#dc2626' // Red 600
                });
            }
        });
    }

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <Head title="Contact - Groupe Scolaire GSLJ" />
            <Header />

            <div className="relative isolate bg-white">
                <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                    <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">

                            <h2 className="text-3xl font-bold tracking-tight text-violet-800 font-serif">
                                {getLocalized(settings?.about_contact_title, locale, 'Contactez-nous')}
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                {getLocalized(settings?.about_contact_description, locale, 'Vous avez des questions sur nos programmes ou les admissions ? N\'hésitez pas à nous écrire ou à visiter nos locaux.')}
                            </p>
                            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Adresse</span>
                                        <BuildingOffice2Icon className="h-7 w-6 text-yellow-600" aria-hidden="true" />
                                    </dt>
                                    <dd className="whitespace-pre-wrap">
                                        {settings?.site_address ? getLocalized(settings.site_address, locale) : 'GSLJ Sénégal'}<br />
                                        {/* Dakar, Sénégal */}
                                    </dd>
                                </div>
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Téléphone</span>
                                        <PhoneIcon className="h-7 w-6 text-yellow-600" aria-hidden="true" />
                                    </dt>
                                    <dd>
                                        <a className="hover:text-violet-700" href={`tel:${settings?.site_phone ? getLocalized(settings.site_phone, locale) : '+221330000000'}`}>
                                            {settings?.site_phone ? getLocalized(settings.site_phone, locale) : '+221 33 000 00 00'}
                                        </a>
                                    </dd>
                                </div>
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Email</span>
                                        <EnvelopeIcon className="h-7 w-6 text-yellow-600" aria-hidden="true" />
                                    </dt>
                                    <dd>
                                        <a className="hover:text-violet-700" href={`mailto:${settings?.contact_email ? getLocalized(settings.contact_email, locale) : (settings?.site_email ? getLocalized(settings.site_email, locale) : 'info@gslj.sn')}`}>
                                            {settings?.contact_email ? getLocalized(settings.contact_email, locale) : (settings?.site_email ? getLocalized(settings.site_email, locale) : 'info@gslj.sn')}
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
                        <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg bg-white shadow-2xl rounded-2xl p-8 sm:p-10 border border-gray-200">


                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Prénom
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="first-name"
                                            autoComplete="given-name"
                                            value={data.firstName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.firstName && <div className="text-red-600 text-sm mt-1">{errors.firstName}</div>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Nom
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="last-name"
                                            autoComplete="family-name"
                                            value={data.lastName}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.lastName && <div className="text-red-600 text-sm mt-1">{errors.lastName}</div>}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Téléphone
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            id="phone-number"
                                            autoComplete="tel"
                                            value={data.phoneNumber}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.phoneNumber && <div className="text-red-600 text-sm mt-1">{errors.phoneNumber}</div>}
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                                        Message
                                    </label>
                                    <div className="mt-2.5">
                                        <textarea
                                            name="message"
                                            id="message"
                                            rows={4}
                                            value={data.message}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.message && <div className="text-red-600 text-sm mt-1">{errors.message}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-violet-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-all duration-300 disabled:opacity-50"
                                >
                                    {processing ? 'Envoi...' : 'Envoyer le message'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}
