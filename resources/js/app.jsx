import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import { route } from 'ziggy-js';
import { Ziggy } from './ziggy.js';

createInertiaApp({
    title: (title) => `${title} - School Name`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Make route globally available with config
        window.route = (name, params, absolute, config = window.Ziggy || Ziggy) => route(name, params, absolute, config);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
