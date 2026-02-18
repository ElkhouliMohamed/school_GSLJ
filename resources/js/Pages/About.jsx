import React from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import DirectorsWord from "../Components/Home/DirectorsWord";
import { CheckCircleIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, StarIcon, HeartIcon, UserIcon } from '@heroicons/react/24/solid';
import { getLocalized } from '@/Utils/localization';
import useSettings from '@/Hooks/useSettings';

export default function About({ team }) {
    const { settings, locale } = usePage().props;
    const { getSetting } = useSettings();

    // --- Data for new sections ---

    // Mission Section Data
    const missionTitle = getSetting('about_mission_title', "Notre Mission");
    const missionContent = getSetting('about_mission_content', "Notre engagement est de nourrir la passion, l'envie et la soif d'apprendre. Nous formons le caractère par les valeurs, et la rigueur par le travail, le développement de la confiance en soi et la curiosité d'aller plus loin sont au cœur de notre projet.\n\nPermettre un épanouissement de l'esprit, par la culture du goût, l'éveil à la curiosité intellectuelle et le développement de tous les potentiels en harmonie avec son milieu.\n\nFormer de futurs performance, futurs gestionnaires pleinement épanouis conscients de leurs responsabilités de meneur d'entreprise dans un environnement changeant de l'industrie.");
    const missionImage = getSetting('about_mission_image', "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");

    // Values Data
    const valuesTitle = getSetting('about_values_title', "Nos valeurs");

    const values = [
        {
            id: 1,
            title: getSetting('about_value_1_title', "EXCELLENCE"),
            description: getSetting('about_value_1_description', "À travers nos offres, nous cherchons à développer tant chez nos élèves que chez le personnel l'envie de se dépasser pour mieux réussir. Ne pas se contenter du banal, le dépassement de soi pour que la remise en question permanente accompagne chacun dans l'exercice de toutes ses fonctions."),
            icon: StarIcon,
            color: "text-emerald-700",
            bg: "bg-emerald-50",
            border: "border-emerald-200"
        },
        {
            id: 2,
            title: getSetting('about_value_2_title', "RESPECT"),
            description: getSetting('about_value_2_description', "Le respect est essentiel pour créer un environnement propice à l'apprentissage. Au GSLJ, nous garantissons l'acceptation de l'autre avec ses différences non seulement, mais aussi le respect de soi."),
            icon: HeartIcon, // Changed to Heart or Handshake if available, keeping Star/Heart per original but adjusting logic
            color: "text-amber-500",
            bg: "bg-amber-50",
            border: "border-amber-200"
        },
        {
            id: 3,
            title: getSetting('about_value_3_title', "EMPATHIE"),
            description: getSetting('about_value_3_description', "L'empathie est la base de toute communauté scolaire. Nous encourageons l'ouverture d'esprit et l'écoute des autres afin de faire une place pour chacun et de construire une culture où la pluralité communique et vit dans des relations urbaines."),
            icon: UserIcon, // Keeping generic or swapping
            color: "text-rose-600",
            bg: "bg-rose-50",
            border: "border-rose-200"
        },
    ];

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

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <Head title="À Propos - Groupe Scolaire GSLJ" />
            <Header />

            <main className="grow">
                {/* 1. Mot du Président Section */}
                <DirectorsWord />


                {/* 2. Notre Mission Section */}
                <section className="bg-sky-50 py-16 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Text Content */}
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl mb-6 font-serif">
                                    {missionTitle}
                                </h2>
                                <div className="text-lg leading-8 text-gray-700 whitespace-pre-wrap">
                                    {missionContent}
                                </div>
                            </div>

                            {/* Image */}
                            <div className="relative">
                                <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                                    <img
                                        src={missionImage}
                                        alt="Notre Mission"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Optional decorative element */}
                                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-900 rounded-full -z-10"></div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* 3. L'équipe Section */}
                <section className="bg-white py-16 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl font-serif">
                                L'équipe
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Une équipe pédagogique qualifiée et un encadrement dévoué pour la réussite de chaque élève.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team && team.map((member) => (
                                <div key={member.id} className="flex flex-col items-center">
                                    <div className="w-48 h-48 mb-4 overflow-hidden rounded-full border-4 border-yellow-400 bg-gray-100 shadow-lg">
                                        {member.photo ? (
                                            <img
                                                src={member.photo}
                                                alt={getLocalized(member.name, locale)}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                                <UserIcon className="h-20 w-20" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{getLocalized(member.name, locale)}</h3>
                                    <p className="text-sm font-medium text-cyan-600 uppercase tracking-wide">{getLocalized(member.position, locale)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* 4. Nos Valeurs Section */}
                <section className="bg-white py-16 sm:py-24 relative overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-sky-50 -z-10 skew-y-1 transform origin-top-left"></div>

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl font-serif">
                                {valuesTitle}
                            </h2>
                            <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {values.map((val, index) => (
                                <div
                                    key={val.id}
                                    className={`group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col items-start h-full`}
                                >
                                    {/* Top Accent Line */}
                                    <div className={`absolute top-0 left-0 w-full h-2 ${val.bg.replace('bg-', 'bg-gradient-to-r from-white via-').replace('-50', '-400')} to-white`}></div>

                                    <div className={`mb-6 p-4 rounded-2xl ${val.bg} ${val.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <val.icon className="h-8 w-8" />
                                    </div>

                                    <h3 className={`text-2xl font-bold uppercase tracking-wide mb-4 ${val.color}`}>
                                        {val.title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed font-medium">
                                        {val.description}
                                    </p>

                                    {/* Big Number Watermark */}
                                    <div className={`absolute -bottom-4 -right-4 text-9xl font-black opacity-5 ${val.color} select-none`}>
                                        {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* Contact Section */}
                <div className="bg-white py-24 sm:py-32">
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
            </main>

            <Footer />
        </div>
    );
}
