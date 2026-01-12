import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { getTranslation } from '../../translations';

export default function NewsletterSection() {
    const { locale } = usePage().props;
    const t = (key) => getTranslation(key, locale);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section className="bg-violet-900 py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            {locale === 'en' ? 'Subscribe to our newsletter' : 'Abonnez-vous à notre newsletter'}
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-violet-100">
                            {locale === 'en'
                                ? 'Stay updated with the latest news, events, and academic updates from GSLJ.'
                                : 'Restez informé des dernières actualités, événements et mises à jour académiques du GSLJ.'
                            }
                        </p>
                        <div className="mt-6 flex max-w-md gap-x-4">
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full">
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 placeholder:text-gray-400"
                                    placeholder={locale === 'en' ? 'Enter your email' : 'Entrez votre email'}
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'success'}
                                    className={`flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 transition-all ${status === 'success' ? 'bg-green-500' : 'bg-violet-500'}`}
                                >
                                    {status === 'loading' ? '...' : status === 'success' ? (locale === 'en' ? 'Subscribed!' : 'Inscrit !') : (locale === 'en' ? 'Subscribe' : 'S\'inscrire')}
                                </button>
                            </form>
                        </div>
                    </div>
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                        <div className="flex flex-col items-start">
                            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                <EnvelopeIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <dt className="mt-4 font-semibold text-white">
                                {locale === 'en' ? 'Weekly articles' : 'Articles hebdomadaires'}
                            </dt>
                            <dd className="mt-2 leading-7 text-violet-100">
                                {locale === 'en'
                                    ? 'Receive curated educational content and school highlights.'
                                    : 'Recevez du contenu éducatif et les moments forts de l\'école.'
                                }
                            </dd>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <dt className="mt-4 font-semibold text-white">
                                {locale === 'en' ? 'No spam' : 'Pas de spam'}
                            </dt>
                            <dd className="mt-2 leading-7 text-violet-100">
                                {locale === 'en'
                                    ? 'We respect your privacy. Unsubscribe at any time.'
                                    : 'Nous respectons votre vie privée. Désabonnez-vous à tout moment.'
                                }
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    );
}
