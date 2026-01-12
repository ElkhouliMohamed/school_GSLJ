import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { getTranslation } from '../../translations';

const GallerySlider = ({ gallery }) => {
    const { locale } = usePage().props;
    const t = (key) => getTranslation(key, locale);

    // Duplicate items to create infinite scroll effect
    const [width, setWidth] = useState(0);
    const carouselRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        }

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [gallery]);


    if (!gallery || gallery.length === 0) return null;

    // Use a simpler approach for slider: CSS scrolling with framer motion for items
    // Or a manual frame carousel.
    // Given the request for "premium", a continuous heavy slow scroll is nice.

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10 flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-violet-950 sm:text-4xl font-serif">
                        {t('gallery_title') || "Galerie"}
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        {t('gallery_desc') || "Découvrez la vie au sein du Groupe Scolaire GSLJ."}
                    </p>
                </div>
                <Link
                    href={route('gallery.index')}
                    className="group flex items-center gap-2 text-violet-700 font-semibold hover:text-violet-900 transition-colors"
                >
                    {t('view_all') || "Voir tout"}
                    <ChevronRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            {/* Slider Container */}
            <div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
                <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    className="flex gap-6 px-6 lg:px-8"
                    whileTap={{ cursor: "grabbing" }}
                >
                    {gallery.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="min-w-[280px] sm:min-w-[350px] relative rounded-2xl overflow-hidden group shadow-md"
                            style={{ aspectRatio: '4/3' }}
                        >
                            <img
                                src={item.path}
                                alt={item.title?.[locale]}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                draggable="false"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white font-medium text-lg leading-snug">
                                    {item.title?.[locale]}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default GallerySlider;
