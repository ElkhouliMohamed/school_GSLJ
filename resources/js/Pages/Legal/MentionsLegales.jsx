import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import useSettings from '@/Hooks/useSettings';

export default function MentionsLegales() {
    const { getSetting } = useSettings();
    const siteName = getSetting('site_name', 'Groupe Scolaire Les Jumelles');
    const address = getSetting('address', 'Avenue Cheikh Anta Diop\nBP 3222 - Dakar, SÉNÉGAL');
    const email = getSetting('contact_email', 'contact@gslj.sn');
    const phone = getSetting('contact_phone', '(+ 221) 33 860 45 33');

    return (
        <MainLayout>
            <Head title="Mentions Légales" />

            <div className="bg-white py-16 sm:py-24">
                <div className="mx-auto max-w-3xl px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                        Mentions Légales
                    </h1>

                    <div className="prose prose-lg prose-indigo mx-auto text-gray-500 space-y-8">
                        <p>
                            Merci de visiter le site web du {siteName}. Conformément aux dispositions des articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site les informations suivantes :
                        </p>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. Éditeur du site</h2>
                            <p>
                                Le présent site est la propriété exclusive de <strong>{siteName}</strong>, établissement d'enseignement privé.
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li><strong>Adresse :</strong> {address}</li>
                                <li><strong>Téléphone :</strong> {phone}</li>
                                <li><strong>Email :</strong> {email}</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">2. Hébergement</h2>
                            <p>
                                Le site est hébergé par [Nom de l'hébergeur], [Adresse de l'hébergeur], [Téléphone de l'hébergeur].
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">3. Propriété intellectuelle</h2>
                            <p>
                                De manière générale, les données, les programmes, les échantillons musicaux, les textes, les informations, les logos, les identités visuelles, les images animées ou non et leurs mises en forme, apparaissant sur le Site sont la propriété de {siteName} et sont protégés à ce titre par les dispositions du Code de la propriété intellectuelle.
                            </p>
                            <p className="mt-2">
                                Tout internaute s’engage à ne pas les utiliser sauf dans le cadre strict autorisé par le site ou par la loi. Toute reproduction total ou partielle de ces marques ou de ces logos effectués à partir des éléments du site sans l'autorisation expresse de {siteName} est donc prohibée.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">4. Liens hypertextes</h2>
                            <p>
                                Le site peut contenir des liens hypertextes donnant accès à d'autres sites web édités et gérés par des tiers. {siteName} ne saurait être tenu responsable directement ou indirectement dans le cas où lesdits sites tiers ne respecteraient pas les dispositions légales et réglementaires tant françaises qu'européennes en vigueur ou à venir, ainsi que des conséquences de ce non-respect.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">5. Droit applicable</h2>
                            <p>
                                Le présent site et ses mentions légales sont soumis au droit sénégalais.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
