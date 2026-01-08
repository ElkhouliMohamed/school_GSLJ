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

export default function Home({ news, events, partners }) {
    return (
        <MainLayout>
            <Head title="Accueil" />

            <main>
                <HeroSection />
                <DirectorsWord />
                <VideoTour />
                <NewsSection news={news} />
                <EventsSection events={events} />
                <StatsSection />
                <PartnersSection partners={partners} />
            </main>
        </MainLayout>
    );
}
