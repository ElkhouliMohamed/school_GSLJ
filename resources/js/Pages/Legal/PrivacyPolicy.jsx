import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import useSettings from '@/Hooks/useSettings';

export default function PrivacyPolicy() {
    const { getSetting } = useSettings();
    const siteName = getSetting('site_name', 'Groupe Scolaire Les Jumelles');
    const email = getSetting('contact_email', 'contact@gslj.sn');

    return (
        <MainLayout>
            <Head title="Politique de Confidentialité" />

            <div className="bg-white py-16 sm:py-24">
                <div className="mx-auto max-w-3xl px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                        Politique de Confidentialité
                    </h1>

                    <div className="prose prose-lg prose-indigo mx-auto text-gray-500 space-y-8">
                        <p>
                            Chez {siteName}, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.
                        </p>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. Collecte des informations</h2>
                            <p>
                                Nous recueillons des informations lorsque vous utilisez notre formulaire de contact, postulez à une admission ou naviguez sur notre site. Les informations collectées peuvent inclure votre nom, votre adresse e-mail, votre numéro de téléphone et toute autre information que vous choisissez de nous fournir.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">2. Utilisation des informations</h2>
                            <p>
                                Les informations que nous recueillons auprès de vous peuvent être utilisées pour :
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Répondre à vos demandes et questions</li>
                                <li>Traiter vos dossiers d'inscription</li>
                                <li>Améliorer notre site web</li>
                                <li>Vous envoyer des informations concernant notre établissement (si vous avez accepté de les recevoir)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">3. Confidentialité des données</h2>
                            <p>
                                Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande et / ou une transaction.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">4. Protection des informations</h2>
                            <p>
                                Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Nous utilisons un cryptage à la pointe de la technologie pour protéger les informations sensibles transmises en ligne. Nous protégeons également vos informations hors ligne.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">5. Vos droits</h2>
                            <p>
                                Conformément à la législation en vigueur sur la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Vous pouvez exercer ce droit en nous contactant à l'adresse suivante : <strong>{email}</strong>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
