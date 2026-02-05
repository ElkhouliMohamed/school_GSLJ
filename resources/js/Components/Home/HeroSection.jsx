import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react'; // Ensure Link is imported
import useSettings from '@/Hooks/useSettings';

const FALLBACK_IMAGES = [
    "https://upload.wikimedia.org/wikipedia/commons/e/e4/Lyc%C3%A9e_Jean_Mermoz_Dakar_Entrance.jpg", // A likely better fallback or placeholder
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
];

export default function HeroSection() {
    const { getSetting } = useSettings();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Construct images array from settings or fallback
    const sliderImages = [
        getSetting('hero_image_1', null),
        getSetting('hero_image_2', null),
        getSetting('hero_image_3', null)
    ].filter(Boolean);

    const imagesToDisplay = sliderImages.length > 0 ? sliderImages : FALLBACK_IMAGES;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % imagesToDisplay.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [imagesToDisplay.length]);

    const title = getSetting('hero_title', "Bienvenue au Groupe Scolaire Privé Bilingue");
    const highlight = getSetting('hero_highlight', "LES JUMELLES");
    const location = getSetting('hero_location', "de Yeumbeul Comico 4");
    const motto = getSetting('hero_motto', "L'EXCELLENCE NOTRE CREDO");
    const currentYear = new Date().getFullYear();

    const nextYear = currentYear + 1;
    const rawBottomText = getSetting('hero_bottom_bar_text', "Inscriptions ouvertes {{}} - {{}} • Places limitées");
    const bottomBarText = rawBottomText
        .replace('{{}}', currentYear)
        .replace('{{}}', nextYear)
        .replace(currentYear - 1, nextYear); // Fallback for the literal 2025 if still present

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gray-900 flex flex-col justify-between">
            {/* Background Slider */}
            {imagesToDisplay.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{ backgroundImage: `url(${img})` }}
                >
                    {/* Overlay Gradient (Darker to ensure text readability) */}
                    <div className="absolute inset-0 bg-black/40 bg-linear-to-b from-black/60 via-transparent to-black/60" />
                </div>
            ))}

            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 mt-20"> {/* Added margin-top to clear fixed header if needed */}
                <span className="text-white/90 text-xl md:text-2xl font-bold uppercase tracking-widest mb-4 animate-fadeIn">
                    {title}
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-2xl mb-2 animate-slideUp">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-200">
                        {highlight}
                    </span>
                </h1>
                <p className="text-xl md:text-3xl text-white font-bold uppercase tracking-widest opacity-90 mb-12">
                    {location}
                </p>

                {/* Motto with styling */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-linear-to-r from-secondary to-primary rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative px-8 py-4 bg-black/50 backdrop-blur-md rounded-lg border border-white/20">
                        <span className="text-2xl md:text-4xl font-serif italic text-white font-bold">
                            "{motto}"
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar Message */}
            <div className="relative z-20 w-full bg-secondary/90 py-4 border-t-4 border-white shadow-2xl">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-white font-bold text-lg uppercase tracking-wider">
                        {bottomBarText}
                    </p>
                </div>
            </div>
        </div>
    );
}