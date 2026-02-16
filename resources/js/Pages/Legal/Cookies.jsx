import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import useSettings from '@/Hooks/useSettings';

export default function Cookies() {
    const { getSetting } = useSettings();
    const siteName = getSetting('site_name', 'Groupe Scolaire Les Jumelles');

    return (
        <GuestLayout>
            <Head title="Gestion des Cookies" />

            <div className="bg-white py-16 sm:py-24">
                <div className="mx-auto max-w-3xl px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                        Gestion des Cookies
                    </h1>

                    <div className="prose prose-lg prose-indigo mx-auto text-gray-500 space-y-8">
                        <p>
                            Le site web du {siteName} utilise des cookies pour améliorer l'expérience utilisateur et assurer le bon fonctionnement de certains services.
                        </p>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">1. Qu'est-ce qu'un cookie ?</h2>
                            <p>
                                Un cookie est un petit fichier texte enregistré sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web. Il permet à son émetteur d'identifier le terminal dans lequel il est enregistré, pendant la durée de validité ou d'enregistrement du cookie concerné.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">2. Les cookies que nous utilisons</h2>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li><strong>Cookies techniques :</strong> indispensables au bon fonctionnement du site (ex: mémorisation de votre session).</li>
                                <li><strong>Cookies de mesure d'audience :</strong> nous permettent d'analyser la fréquentation du site pour en améliorer le contenu.</li>
                                <li><strong>Cookies tiers :</strong> liés aux services externes intégrés (ex: vidéos YouTube, cartes Google Maps).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">3. Gestion de vos préférences</h2>
                            <p>
                                Vous pouvez à tout moment choisir de désactiver ces cookies. Votre navigateur peut également être paramétré pour vous signaler les cookies qui sont déposés dans votre ordinateur et vous demander de les accepter ou non.
                            </p>
                            <p className="mt-2">
                                Nous vous rappelons que le paramétrage est susceptible de modifier vos conditions d'accès à nos contenus et services nécessitant l'utilisation de cookies.
                            </p>
                            <p className="mt-2 text-sm italic">
                                Pour plus d'informations sur les cookies et leur gestion, vous pouvez consulter le site de la CNIL (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500">www.cnil.fr</a>.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
