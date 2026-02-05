import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import useSettings from '@/Hooks/useSettings';
import { Phone, Mail, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

export default function Footer() {
    const { getSetting } = useSettings();
    const { url } = usePage();

    // Helper to determine active state
    const isActive = (href) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    };

    const LinkItem = ({ href, children }) => (
        <li>
            <Link
                href={href}
                className={`group flex items-center gap-2 text-sm transition-all duration-300 transform hover:translate-x-1 ${isActive(href) ? 'text-primary font-bold' : 'text-gray-400 hover:text-white'
                    }`}
            >
                <ArrowRight className={`w-3 h-3 transition-opacity ${isActive(href) ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-100 text-primary'}`} />
                {children}
            </Link>
        </li>
    );

    const siteName = getSetting('site_name', 'Lycée Français Jean Mermoz');
    const logo = getSetting('site_logo') || "/logo.svg";
    const contactEmail = getSetting('contact_email', 'contact@gslj.sn');
    const contactPhone = getSetting('contact_phone', '(+ 221) 33 860 45 33');
    const address = getSetting('address', 'Avenue Cheikh Anta Diop\nBP 3222 - Dakar, SÉNÉGAL');

    return (
        <footer className="bg-gray-900 text-gray-300 font-sans border-t border-primary/20">
            {/* Top decorative line */}
            <div className="w-full h-1 bg-gradient-to-r from-primary via-violet-600 to-secondary"></div>

            {/* Main Footer Content */}
            <div className="py-16 px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                        {/* Column 1: Brand & About */}
                        <div className="space-y-6">
                            <Link href="/" className="block">
                                <div className="flex items-center gap-3">
                                    <img src={logo} alt="Logo" className="h-14 w-auto brightness-0 invert opacity-90" />
                                    <div>
                                        <h3 className="font-bold text-white uppercase text-sm leading-tight tracking-wider">
                                            Groupe Scolaire <br />
                                            <span className="text-primary text-lg">Les Jumelles</span>
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Un établissement d'excellence offrant un enseignement bilingue de qualité, de la maternelle au lycée. Formons les leaders de demain dans un cadre épanouissant.
                            </p>

                            {/* Social Icons */}
                            <div className="flex gap-4 pt-2">
                                {/* Placeholders for social icons - add real links if available */}
                                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary text-gray-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/30"
                                    >
                                        <span className="sr-only">{social}</span>
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                                            {/* Generic Circle Icon for demo - replace with svg paths */}
                                            <circle cx="12" cy="12" r="10" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Navigation */}
                        <div>
                            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 relative inline-block">
                                Navigation
                                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
                            </h3>
                            <ul className="space-y-3">
                                <LinkItem href="/">Accueil</LinkItem>
                                <LinkItem href="/about">Notre Établissement</LinkItem>
                                <LinkItem href="/programs">Nos Programmes</LinkItem>
                                <LinkItem href="/team">Notre Équipe</LinkItem>
                                <LinkItem href="/admissions">Admissions</LinkItem>
                                <LinkItem href="/news">Actualités</LinkItem>
                                <LinkItem href="/gallery">Galerie</LinkItem>
                                <LinkItem href="/contact">Contact</LinkItem>
                            </ul>
                        </div>

                        {/* Column 3: Contact Info */}
                        <div>
                            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 relative inline-block">
                                Contact
                                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-secondary rounded-full"></span>
                            </h3>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div className="text-sm pt-1">
                                        <p className="font-semibold text-white mb-1">Adresse</p>
                                        <p className="text-gray-400 whitespace-pre-line">{address}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div className="text-sm pt-1">
                                        <p className="font-semibold text-white mb-1">Téléphone</p>
                                        <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-white transition-colors">
                                            {contactPhone}
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="text-sm pt-1">
                                        <p className="font-semibold text-white mb-1">Email</p>
                                        <a href={`mailto:${contactEmail}`} className="text-gray-400 hover:text-white transition-colors">
                                            {contactEmail}
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Map & Media */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-6 relative inline-block">
                                Localisation
                                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-violet-500 rounded-full"></span>
                            </h3>

                            <div className="rounded-xl overflow-hidden border-2 border-gray-700 shadow-2xl hover:border-primary transition-colors duration-300">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4536.049468704533!2d-17.347689314842334!3d14.774519389691868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec10b12f1541b2f%3A0x631624bfe63aeec!2sGroup%20Private%20School%20Bilingual%20Les%20Jumelles!5e1!3m2!1sar!2sma!4v1770277870795!5m2!1sar!2sma"
                                    width="100%"
                                    height="180"
                                    style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2)' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Localisation de l'école"
                                    className="hover:filter-none transition-all duration-500"
                                ></iframe>
                            </div>

                            <div className="pt-4">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Liens Rapides</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Pronote', 'E-Learning', 'Blog'].map((tag) => (
                                        <a key={tag} href="#" className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-400 hover:bg-violet-600 hover:text-white transition-colors border border-gray-700 hover:border-violet-500">
                                            {tag}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-gray-950 py-6 border-t border-gray-800">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p className="text-center md:text-left">
                        © {new Date().getFullYear()} <span className="text-white font-medium">Groupe Scolaire Les Jumelles</span>. Tous droits réservés.
                    </p>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</Link>
                        <Link href="/protection-donnees" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
                        <Link href="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
