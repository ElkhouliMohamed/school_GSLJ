import React, { useState, useEffect } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { ChevronRightIcon, AcademicCapIcon, UserGroupIcon, StarIcon } from '@heroicons/react/20/solid';
import useSettings from '@/Hooks/useSettings';

const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
];

export default function HeroSection() {
    const { getSetting } = useSettings();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Construct images array from settings or fallback
    const sliderImages = [
        getSetting('hero_image_1', null),
        getSetting('hero_image_2', null),
        getSetting('hero_image_3', null)
    ].filter(Boolean); // Remove nulls

    const imagesToDisplay = sliderImages.length > 0 ? sliderImages : FALLBACK_IMAGES;

    // Auto-advance slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % imagesToDisplay.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [imagesToDisplay.length]);

    // Fallback content
    const title = getSetting('hero_title', "L'Excellence Éducative au Sénégal");
    const subtitle = getSetting('hero_description', "Bienvenue au Groupe Scolaire GSLJ. Nous formons les leaders de demain à travers un programme rigoureux alliant tradition académique et ouverture sur le monde.");

    return (
        <div className="relative isolate overflow-hidden bg-white">
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="0787a7c5-9781-4f66-8381-0d604234624d"
                        width={200}
                        height={200}
                        x="50%"
                        y={-1}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-9781-4f66-8381-0d604234624d)" />
            </svg>

            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:items-center lg:gap-x-10 xl:gap-x-32 lg:px-8 lg:py-40 ">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 ">
                    <div className="mt-24 sm:mt-32 lg:mt-16">
                        <Link href={route('admissions')} className="inline-flex space-x-6">
                            <span className="rounded-full bg-violet-600/10 px-3 py-1 text-sm font-semibold leading-6 text-violet-600 ring-1 ring-inset ring-violet-600/10">
                                Inscriptions {new Date().getFullYear()}-{new Date().getFullYear() + 1}
                            </span>
                        </Link>
                    </div>
                    <h1 className="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl font-serif">
                        Groupe Scolaire <span className="text-violet-700">GSLJ</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        {subtitle}
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <Link
                            href={route('admissions')}
                            className="rounded-md bg-violet-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-all hover:scale-105"
                        >
                            Dossier d'inscription
                        </Link>

                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-10 flex gap-x-6 sm:gap-x-10 text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                            <AcademicCapIcon className="h-5 w-5 text-yellow-600" />
                            <span>Programme d'Excellence</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <UserGroupIcon className="h-5 w-5 text-yellow-600" />
                            <span>Succès aux examens</span>
                        </div>
                    </div>
                </div>

                {/* Image Slider Side */}
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:max-w-none lg:flex-1">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none w-full">
                        <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">

                            {/* UPDATED CONTAINER BELOW */}
                            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[3/2] lg:w-full lg:h-auto xl:aspect-auto xl:w-[48rem] xl:h-[30rem] rounded-md shadow-2xl ring-1 ring-gray-900/10 overflow-hidden">
                                {imagesToDisplay.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Slide ${index + 1}`}
                                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                            }`}
                                    />
                                ))}

                                {/* Slider Indicators */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {imagesToDisplay.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}