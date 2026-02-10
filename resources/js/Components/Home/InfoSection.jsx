import React from 'react';
import useSettings from '@/Hooks/useSettings';

export default function InfoSection() {
    const { getSetting } = useSettings();
    const title = getSetting('info_title', "Notre <br /> Établissement");
    const image = getSetting('info_image', "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80");
    const description = getSetting('info_description', "Situé à Dakar depuis 1976, le Groupe Scolaire Privé Bilingue LES JUMELLES dispense un enseignement d'excellence conforme aux programmes français, de la maternelle à la terminale.\nPartenaire de l'AEFE, nous accueillons plus de 2500 élèves de toutes nationalités dans un cadre exceptionnel propice à l'épanouissement et à la réussite.");
    const motto = getSetting('info_motto', "Excellence, Partage et Engagement sont les valeurs qui nous animent chaque jour.");
    const ctaText = getSetting('info_cta_text', "Découvrir l'établissement");

    return (
        <section className="bg-secondary text-white py-10 relative overflow-hidden">
            {/* Decorative Circles (Approximating the design) */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-purple-900/20 blur-3xl" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold uppercase mb-6 leading-tight">
                        <span dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br />') }} />
                    </h2>
                    <div className="h-1 w-24 bg-white mb-8 mx-auto md:mx-0" />
                    <div className="text-lg opacity-90 mb-6 leading-relaxed whitespace-pre-line">
                        {description}
                    </div>
                    <p className="text-base opacity-80 mb-8 italic">
                        {motto}
                    </p>
                    <a href="/about" className="inline-block bg-primary text-white font-bold uppercase tracking-widest px-8 py-3 rounded-full hover:bg-white hover:text-primary transition-all duration-300 shadow-lg">
                        {ctaText}
                    </a>
                </div>

                {/* Image/Graphic Content */}
                <div className="flex-1 relative">
                    <div className="relative rounded-full overflow-hidden aspect-square border-4 border-white/20 shadow-2xl max-w-md mx-auto">
                        <img
                            src={image}
                            alt={title.replace(/<[^>]*>/g, '')}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                            width="500"
                            height="500"
                            loading="lazy"
                        />
                        {/* Circle Overlay Text - optional aesthetic touch */}
                        <div className="absolute top-10 right-10 w-24 h-24 bg-primary rounded-full flex items-center justify-center text-center p-2 shadow-lg animate-pulse">
                            <span className="text-xs font-bold uppercase">40 ans d'histoire</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
