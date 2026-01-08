import React, { useState } from 'react';
import { PlayCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { usePage } from '@inertiajs/react';

export default function VideoTour() {
    const { settings, locale } = usePage().props;
    const [isPlaying, setIsPlaying] = useState(false);

    const title = settings?.video_title?.[locale] || "Watch Campus Life Video Tour";
    const description = settings?.video_description?.[locale] || "Discover our facilities and vibrant student community.";
    const videoUrl = settings?.video_url?.[locale] || "https://www.youtube.com/embed/dQw4w9WgXcQ";
    const videoFile = settings?.video_file?.[locale];

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <section className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
            {!isPlaying && (
                <>
                    <img
                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                        alt=""
                        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
                    />
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            {title}
                        </h2>
                        <p className="mt-4 text-lg text-gray-300">
                            {description}
                        </p>
                        <div className="mt-10 flex justify-center">
                            <button
                                type="button"
                                onClick={handlePlay}
                                className="group relative flex items-center justify-center focus:outline-none"
                            >
                                <PlayCircleIcon className="h-24 w-24 text-yellow-400 opacity-80 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    </div>
                </>
            )}

            {isPlaying && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
                    <button
                        onClick={() => setIsPlaying(false)}
                        className="absolute top-8 right-8 text-white hover:text-gray-300 z-30"
                    >
                        <XMarkIcon className="h-10 w-10" />
                    </button>

                    {videoFile ? (
                        <video
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                        >
                            <source src={videoFile} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <iframe
                            className="w-full h-full"
                            src={`${videoUrl}?autoplay=1`}
                            title="Video Tour"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
            )}
        </section>
    );
}
