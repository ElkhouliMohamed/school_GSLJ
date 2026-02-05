import React from 'react';
import { Link } from '@inertiajs/react';
import useSettings from '@/Hooks/useSettings';
import { Phone } from 'lucide-react';

export default function Footer() {
    const { getSetting } = useSettings();

    const siteName = getSetting('site_name', 'Lycée Français Jean Mermoz');
    const contactEmail = getSetting('contact_email', 'contact@gslj.sn');
    const contactPhone = getSetting('contact_phone', '(+ 221) 33 860 45 33');
    const address = getSetting('address', 'Avenue Cheikh Anta Diop\nBP 3222 - Dakar, SÉNÉGAL');

    return (
        <footer className="bg-white border-t border-gray-200">
            {/* Main Footer Content */}
            <div className="bg-white py-12 px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative">
                        {/* Column 1: Contact */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-primary uppercase mb-4">Contact</h3>
                            <div className="space-y-3 text-sm text-gray-700">
                                <p className="font-semibold">{siteName}</p>
                                <p className="whitespace-pre-line">{address}</p>
                                <p className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    <span>tel : {contactPhone}</span>
                                </p>
                            </div>

                            <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4536.049468704533!2d-17.347689314842334!3d14.774519389691868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec10b12f1541b2f%3A0x631624bfe63aeec!2sGroup%20Private%20School%20Bilingual%20Les%20Jumelles!5e1!3m2!1sar!2sma!4v1770277870795!5m2!1sar!2sma"
                                    width="100%"
                                    height="200"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Localisation de l'école"
                                ></iframe>
                            </div>
                        </div>

                        {/* Column 2: Nos Partenaires */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-primary uppercase mb-4">Nos Partenaires</h3>
                            <div className="space-y-3">
                                {/* Placeholder for partner logos - you can add images here */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-100 h-16 rounded flex items-center justify-center text-xs text-gray-400">
                                        AEFE Logo
                                    </div>
                                    <div className="bg-gray-100 h-16 rounded flex items-center justify-center text-xs text-gray-400">
                                        France Logo
                                    </div>
                                    <div className="bg-gray-100 h-16 rounded flex items-center justify-center text-xs text-gray-400">
                                        Ambassade
                                    </div>
                                    <div className="bg-gray-100 h-16 rounded flex items-center justify-center text-xs text-gray-400">
                                        Institut
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 3: Nos Labels */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-primary uppercase mb-4">Nos Labels</h3>
                            <div className="space-y-3">
                                {/* Placeholder for label badges */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gray-100 h-16 rounded flex items-center justify-center text-xs text-gray-400">
                                        Label 1
                                    </div>
                                    <div className="bg-gray-100 h-16 rounded flex items-center justify-center text-xs text-gray-400">
                                        Label 2
                                    </div>
                                    <div className="bg-gray-100 h-16 rounded flex items-center justify-center text-xs text-gray-400">
                                        Label 3
                                    </div>
                                    <div className="bg-gray-100 h-16 rounded flex items-center justify-center text-xs text-gray-400">
                                        Label 4
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 4: Médias */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-primary uppercase mb-4">Médias</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        Journal du Lycée
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        Journal du Primaire
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        Radio Voises of Mermoz
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-primary transition-colors">
                                        + Club "RadioActive"
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 5: Navigation */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-primary uppercase mb-4">Navigation</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>
                                    <Link href="/" className="hover:text-primary transition-colors">
                                        Accueil
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/establishment" className="hover:text-primary transition-colors">
                                        Établissement
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/programs" className="hover:text-primary transition-colors">
                                        Primaire
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/secondary" className="hover:text-primary transition-colors">
                                        Secondaire
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/international" className="hover:text-primary transition-colors">
                                        Section internationale
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/scolarity" className="hover:text-primary transition-colors">
                                        Scolarité
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/activities" className="hover:text-primary transition-colors">
                                        Actualités
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/recruitment" className="hover:text-primary transition-colors">
                                        Recrutement
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section - School Colors Gradient */}
            <div className="bg-linear-to-r from-primary via-violet-700 to-secondary py-6 px-6">
                <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white">
                    <p className="text-center md:text-left">© {new Date().getFullYear()} – Groupe Scolaire Les Jumelles </p>
                    <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-end">
                        <Link href="/protection-donnees" className="hover:underline whitespace-nowrap">
                            Protection des données
                        </Link>
                        <Link href="/partenariats" className="hover:underline whitespace-nowrap">
                            Partenariats
                        </Link>
                        <Link href="/marche-public" className="hover:underline whitespace-nowrap">
                            Marché public
                        </Link>
                        <Link href="/mentions-legales" className="hover:underline whitespace-nowrap">
                            Mentions légales
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
