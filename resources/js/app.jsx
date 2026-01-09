import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import { route } from 'ziggy-js';
import { Ziggy } from './ziggy.js';

createInertiaApp({
    title: (title) => `${title} - School Name`,
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx');
        const pattern = `Pages/${name}.jsx`;

        // Try strict match
        if (pages[`./${pattern}`]) {
            return resolvePageComponent(`./${pattern}`, pages);
        }

        // Try fuzzy match (e.g. if glob returns diff path format)
        for (const path in pages) {
            if (path.endsWith(pattern)) {
                return resolvePageComponent(path, pages);
            }
        }

        console.error(`Page not found: ${name}. Available pages:`, Object.keys(pages));
        return resolvePageComponent(`./Pages/${name}.jsx`, pages); // Will throw
    },
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
