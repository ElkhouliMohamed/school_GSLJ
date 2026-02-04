import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import HeroSection from '@/Components/Home/HeroSection';
import NewsSection from '@/Components/Home/NewsSection';
import EventsSection from '@/Components/Home/EventsSection';
import InfoSection from '@/Components/Home/InfoSection';
import CursusSection from '@/Components/Home/CursusSection';
import WhyChooseUsSection from '@/Components/Home/WhyChooseUsSection';
import PartnersSection from '@/Components/Home/PartnersSection';

export default function Home({ news, events, partners, gallery }) {
    return (
        <MainLayout>
            <Head title="Accueil" />

            <main>
                <HeroSection />
                <NewsSection news={news} />
                <EventsSection events={events} />
                <InfoSection />
                <CursusSection />
                <WhyChooseUsSection />

                {/* Optional: Keep Partners if relevant to the school */}
                {partners && partners.length > 0 && <PartnersSection partners={partners} />}
            </main>
        </MainLayout>
    );
}
