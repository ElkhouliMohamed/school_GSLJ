import '../css/app.css';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import { route } from 'ziggy-js';
import { Ziggy } from './ziggy.js';

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Function to inject theme color as CSS variables
function injectThemeColor(settings) {
    const themeColor = settings?.theme_color?.en || settings?.theme_color || '#7c3aed';
    const rgb = hexToRgb(themeColor);

    if (rgb) {
        document.documentElement.style.setProperty('--theme-color', themeColor);
        document.documentElement.style.setProperty('--theme-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    }
}

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

        // Inject theme color on initial load
        if (props.initialPage.props.settings) {
            injectThemeColor(props.initialPage.props.settings);
        }

        // Update theme color on page navigation
        router.on('navigate', (event) => {
            if (event.detail.page.props.settings) {
                injectThemeColor(event.detail.page.props.settings);
            }
        });

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
