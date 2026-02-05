import React from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import axios from 'axios';

export default function MainLayout({ children }) {
    useEffect(() => {
        const handleClick = (e) => {
            const target = e.target.closest('[data-track-click]');
            if (target) {
                const path = window.location.pathname;
                const elementId = target.id || target.getAttribute('data-track-click');

                axios.post('/kpi/click', {
                    path: path,
                    element_id: elementId
                }).catch(err => console.error('Tracking error', err));
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);
    const { settings } = usePage().props;

    // Helper to safely get nested setting values
    const getSettingValue = (key, fallback) => {
        if (!settings || !settings[key]) return fallback;
        const val = settings[key].value;
        // If it's an object (localized), return 'en' or first value, else return string
        if (typeof val === 'object' && val !== null) {
            return val.en || Object.values(val)[0] || fallback;
        }
        return val || fallback;
    };

    // Use theme_color as fallback for primary if specific primary is not set
    const mainThemeColor = getSettingValue('theme_color', '#7c3aed');
    const primaryColor = getSettingValue('theme_color_primary', mainThemeColor);
    const secondaryColor = getSettingValue('theme_color_secondary', '#DC2626');
    const accentColor = getSettingValue('theme_color_accent', '#2563EB');

    return (
        <div
            className="min-h-screen flex flex-col font-sans text-gray-900 bg-neutral-50"
            style={{
                '--color-primary': primaryColor,
                '--color-secondary': secondaryColor,
                '--color-accent': accentColor,
            }}
        >
            <Header />
            <main className="grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
