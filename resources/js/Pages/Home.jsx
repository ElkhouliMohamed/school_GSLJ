import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import HeroSection from '@/Components/Home/HeroSection';
import DirectorsWord from '@/Components/Home/DirectorsWord';
import VideoTour from '@/Components/Home/VideoTour';
import NewsSection from '@/Components/Home/NewsSection';
import EventsSection from '@/Components/Home/EventsSection';
import StatsSection from '@/Components/Home/StatsSection';
import PartnersSection from '@/Components/Home/PartnersSection';
import GallerySlider from '@/Components/Home/GallerySlider';
import SchoolDescription from '@/Components/Home/SchoolDescription';
import NewsletterSection from '@/Components/Home/NewsletterSection';

export default function Home({ news, events, partners, gallery }) {
    return (
        <MainLayout>
            <Head title="Accueil" />

            <main>
                <HeroSection />
                <SchoolDescription />
                <GallerySlider gallery={gallery} />
                <DirectorsWord />
                <VideoTour />
                <NewsSection news={news} />
                <EventsSection events={events} />
                <StatsSection />
                <NewsletterSection />
                <PartnersSection partners={partners} />
            </main>
        </MainLayout>
    );
}
