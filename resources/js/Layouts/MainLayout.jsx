import React from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

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
    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-neutral-50">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
