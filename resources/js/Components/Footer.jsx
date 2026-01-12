import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { settings, locale } = usePage().props;

    const getLocalizedSetting = (setting, fallback) => {
        if (!setting) return fallback;
        if (typeof setting === 'string') return setting;
        return setting[locale] || setting['fr'] || setting['en'] || Object.values(setting)[0] || fallback;
    };

    const siteName = getLocalizedSetting(settings?.site_name, 'École Excellence');
    const contactEmail = getLocalizedSetting(settings?.contact_email, 'contact@ecole-excellence.com');
    const contactPhone = getLocalizedSetting(settings?.contact_phone, '+212 5 22 00 00 00');
    const fbUrl = getLocalizedSetting(settings?.facebook_url, null);
    const twitterUrl = getLocalizedSetting(settings?.twitter_url, null);
    const instaUrl = getLocalizedSetting(settings?.instagram_url, null);

    return (
        <footer className="bg-violet-950" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Pied de page
            </h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <div className="flex items-center">
                            <div className="h-8 w-8 bg-yellow-500 rounded-lg flex items-center justify-center text-violet-950 font-bold mr-2 text-xl serif">
                                {siteName.charAt(0)}
                            </div>
                            <span className="text-white font-bold text-xl tracking-tight font-serif">{siteName}</span>
                        </div>
                        <p className="text-sm leading-6 text-gray-300">
                            Groupe Scolaire GSLJ - Excellence, Rigueur et Réussite. <br />
                            Établissement d'enseignement privé laïc au Sénégal.
                        </p>
                        <div className="flex space-x-6">
                            {/* Social icons kept generic but hover states updated */}
                            {fbUrl && (
                                <a href={fbUrl} className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                </a>
                            )}
                            {instaUrl && (
                                <a href={instaUrl} className="text-gray-400 hover:text-yellow-400 transition-colors">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.418.06 3.723 0 2.304-.013 2.655-.06 3.723-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.419.06-3.808.06-2.389 0-2.742-.012-3.808-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808 0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.573 2.013 9.926 2 12.315 2zm-1.2 2H12c-2.403 0-2.716.01-3.72.056-.994.045-1.535.212-1.895.352-.465.18-.8.396-1.15.746-.35.35-.566.683-.746 1.15-.14.36-.307.901-.352 1.895-.046 1.004-.056 1.317-.056 3.72 0 2.404.01 2.717.056 3.72.045.994.212 1.536.352 1.895.18.466.396.8.746 1.15.35.35.683.566 1.15.746.36.14.901.307 1.895.352 1.004.046 1.317.056 3.72.056 2.403 0 2.716-.01 3.72-.056.994-.045 1.535-.212 1.895-.352.466-.18.8-.396 1.15-.746.35-.35.566-.683.746-1.15.14-.36.307-.901.352-1.895.046-1.004.056-1.317.056-3.72 0-2.403-.01-2.716-.056-3.72-.045-.994-.212-1.536-.352-1.895-.18-.466-.396-.8-.746-1.15-.35-.35-.683-.566-1.15-.746-.36-.14-.901-.307-1.895-.352-1.003-.046-1.318-.056-3.72-.056z" clipRule="evenodd" /></svg>
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">L'École</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li><Link href="/about" className="text-sm leading-6 text-gray-300 hover:text-white">Notre Histoire</Link></li>
                                    <li><Link href="/campus-life" className="text-sm leading-6 text-gray-300 hover:text-white">Vie au Campus</Link></li>
                                    <li><Link href="/gallery" className="text-sm leading-6 text-gray-300 hover:text-white">Galerie Photo</Link></li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Admissions</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li><Link href="/admissions" className="text-sm leading-6 text-gray-300 hover:text-white">Procédure</Link></li>
                                    <li><Link href="/admissions" className="text-sm leading-6 text-gray-300 hover:text-white">Frais de scolarité</Link></li>
                                    <li><Link href="/contact" className="text-sm leading-6 text-gray-300 hover:text-white">Visiter l'école</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Ressources</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li><Link href="/news" className="text-sm leading-6 text-gray-300 hover:text-white">Actualités</Link></li>
                                    <li><Link href="/calendar" className="text-sm leading-6 text-gray-300 hover:text-white">Calendrier</Link></li>
                                    <li><Link href="/login" className="text-sm leading-6 text-gray-300 hover:text-white">Espace Parents</Link></li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Contact</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li className="text-sm leading-6 text-gray-300">GSLJ - Sénégal</li>
                                    <li className="text-sm leading-6 text-gray-300">{contactPhone}</li>
                                    <li className="text-sm leading-6 text-gray-300">{contactEmail}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-400">&copy; {new Date().getFullYear()} {siteName}. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
