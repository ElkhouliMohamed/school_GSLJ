import React from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
