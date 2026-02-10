import React from 'react';
import { Link } from '@inertiajs/react';
import useSettings from '@/Hooks/useSettings';

export default function WhyChooseUsSection() {
    const { getSetting } = useSettings();

    const title = getSetting('why_us_title', "Pourquoi Choisir le GSLJ ?");
    // Ensure we handle potential newlines if user inputs them as \n or just renders text
    const description = getSetting('why_us_description', "Le Groupe Scolaire Privé Bilingue LES JUMELLES offre un cadre d'apprentissage unique, alliant rigueur académique et épanouissement personnel.");

    const points = [
        getSetting('why_us_point_1', "100% de réussite au Baccalauréat"),
        getSetting('why_us_point_2', "Une ouverture internationale exceptionnelle"),
        getSetting('why_us_point_3', "Des infrastructures sportives et culturelles de pointe"),
        getSetting('why_us_point_4', "Un réseau mondial AEFE fort de 500 lycées"),
    ].filter(Boolean);

    const ctaText = getSetting('why_us_cta_text', "Inscrivez-vous !");
    const floatingText = getSetting('why_us_floating_text', "Excellence & Partage");
    const image = getSetting('why_us_image', "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");


    return (
        <section className="bg-secondary py-10 relative overflow-hidden text-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
                {/* Text Content */}
                <div className="lg:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-bold uppercase mb-8 leading-tight">
                        {/* Allow HTML for breaks if needed or just render string */}
                        <span dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }} />
                    </h2>
                    <div className="space-y-6 text-lg opacity-90">
                        <p>
                            {description}
                        </p>
                        <ul className="space-y-4 font-semibold">
                            {points.map((point, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-white rounded-full" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-10">
                        <Link
                            href="/admissions"
                            className="inline-block bg-white text-secondary font-bold uppercase tracking-widest px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all shadow-lg"
                        >
                            {ctaText}
                        </Link>
                    </div>
                </div>

                {/* Image Composition */}
                <div className="lg:w-1/2 relative">
                    <div className="relative">
                        {/* Main Image in Shape */}
                        <div className="w-full aspect-square max-w-md mx-auto relative rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl border-4 border-white/20">
                            <img
                                src={image}
                                alt="Students"
                                className="w-full h-full object-cover"
                                width="500"
                                height="500"
                                loading="lazy"
                            />
                        </div>
                        {/* Floating Element */}
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary rounded-full items-center justify-center p-4 text-center shadow-xl animate-bounce-slow hidden md:flex">
                            <span className="font-bold text-xs uppercase leading-tight" dangerouslySetInnerHTML={{ __html: floatingText.replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
