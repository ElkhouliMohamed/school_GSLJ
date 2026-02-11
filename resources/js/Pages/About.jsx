import React from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { CheckCircleIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/20/solid';
import { getLocalized } from '@/Utils/localization';

export default function About() {
    const { settings, locale } = usePage().props;



    const ContactForm = () => {
        const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            message: ''
        });

        const submit = (e) => {
            e.preventDefault();
            post(route('contact.submit'), {
                onSuccess: () => reset()
            });
        };

        return (
            <form onSubmit={submit} className="space-y-6">
                {wasSuccessful && (
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">
                                    Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Prénom
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                value={data.firstName}
                                onChange={e => setData('firstName', e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                            />
                            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Nom
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                value={data.lastName}
                                onChange={e => setData('lastName', e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                            />
                            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
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
                                onChange={e => setData('email', e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                            Téléphone
                        </label>
                        <div className="mt-2.5">
                            <input
                                type="tel"
                                name="phone-number"
                                id="phone-number"
                                autoComplete="tel"
                                value={data.phoneNumber}
                                onChange={e => setData('phoneNumber', e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                            />
                            {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
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
                                onChange={e => setData('message', e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                            />
                            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-md bg-violet-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50"
                    >
                        {processing ? 'Envoi...' : 'Envoyer le message'}
                    </button>
                </div>
            </form>
        );
    };

    const title = getLocalized(settings?.about_title, locale, 'À Propos de l\'Excellence Academy');
    const content = getLocalized(settings?.about_content, locale, 'Fondée avec une vision d\'excellence, notre école est un pilier de la communauté depuis de nombreuses années. Nous croyons en une approche holistique de l\'éducation, équilibrant la rigueur académique avec le développement du caractère. Notre mission est de fournir un environnement stimulant où chaque élève peut découvrir ses talents uniques et développer les compétences nécessaires pour s\'épanouir dans un monde en constante évolution. Nous nous engageons à favoriser la pensée critique, la créativité et l\'amour de l\'apprentissage tout au long de la vie. Avec des installations de pointe, des enseignants dévoués et une communauté diversifiée d\'apprenants, nous préparons nos élèves non seulement à la réussite académique, mais aussi à des vies significatives en tant que citoyens du monde engagés.');
    const image = getLocalized(settings?.about_image, locale, 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80');

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <Head title="À Propos - Groupe Scolaire GSLJ" />
            <Header />

            <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 grow">


                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="lg:max-w-lg">
                                <p className="text-base font-semibold leading-7 text-violet-600">À Propos</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">{title}</h1>
                                <p className="mt-6 text-xl leading-8 text-gray-700">
                                    Un établissement d'enseignement de premier plan au service de la réussite de chaque élève.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <img
                            className="w-full aspect-4/3 object-cover rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 lg:w-full lg:h-auto lg:max-w-none xl:w-3xl"
                            src={image}
                            alt="Campus Life"
                        />
                    </div>
                    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="lg:pr-4">
                            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                                <p className="mb-8">{content}</p>
                                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                                    <li className="flex gap-x-3">
                                        <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-violet-600" aria-hidden="true" />
                                        <span><strong className="font-semibold text-gray-900">Excellence Académique.</strong> Programme rigoureux conforme aux standards internationaux.</span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-violet-600" aria-hidden="true" />
                                        <span><strong className="font-semibold text-gray-900">Épanouissement Personnel.</strong> Un cadre de vie favorisant le développement de la confiance en soi.</span>
                                    </li>
                                    <li className="flex gap-x-3">
                                        <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-violet-600" aria-hidden="true" />
                                        <span><strong className="font-semibold text-gray-900">Innovation Pédagogique.</strong> Utilisation des technologies modernes au service de l'apprentissage.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-serif">
                            {getLocalized(settings?.about_contact_title, locale, 'Contactez-nous')}
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            {getLocalized(settings?.about_contact_description, locale, 'Vous avez des questions sur nos programmes ou les admissions ? N\'hésitez pas à nous écrire ou à visiter nos locaux.')}
                        </p>
                    </div>

                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="flex gap-x-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-600">
                                    <MapPinIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Adresse</h3>
                                    <p className="mt-2 leading-7 text-gray-600 whitespace-pre-wrap">
                                        {settings?.site_address ? getLocalized(settings.site_address, locale) : 'GSLJ Sénégal'}<br />
                                        {/* Dakar, Sénégal */}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-x-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-600">
                                    <PhoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Téléphone</h3>
                                    <p className="mt-2 leading-7 text-gray-600">
                                        <a href={`tel:${settings?.site_phone?.value || settings?.contact_phone?.value || '+221 33 000 00 00'}`} className="hover:text-violet-600">
                                            {settings?.site_phone ? getLocalized(settings.site_phone, locale) : (settings?.contact_phone ? getLocalized(settings.contact_phone, locale) : '+221 33 000 00 00')}
                                        </a>
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-x-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-600">
                                    <EnvelopeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Email</h3>
                                    <p className="mt-2 leading-7 text-gray-600">
                                        <a href={`mailto:${settings?.site_email?.value || settings?.contact_email?.value || 'info@gslj.sn'}`} className="hover:text-violet-600">
                                            {settings?.site_email ? getLocalized(settings.site_email, locale) : (settings?.contact_email ? getLocalized(settings.contact_email, locale) : 'info@gslj.sn')}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white px-6 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-xl sm:px-10">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
