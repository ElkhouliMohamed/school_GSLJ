export const translations = {
    en: {
        // Blog
        'latest_news_title': 'Latest News & Events',
        'latest_news_desc': 'Stay updated with what\'s happening at our school.',
        'read_more': 'Read more', // In case we want to add this later or if it's implicit

        // Gallery
        'gallery_title': 'Our Gallery',
        'gallery_desc': 'Moments captured from around our campus.',
        'tab_all': 'All',
        'tab_photos': 'Photos',
        'tab_videos': 'Videos',
        'watch_video': 'Watch Video',
        'external_video': 'External Video Link',
        'watch_provider': 'Watch on Provider',

        // Common
        'home': 'Home',
        'about': 'About',
        'admissions': 'Admissions',
        'campus_life': 'Campus Life',
        'contact': 'Contact',
        'programs': 'Programs',
        'facilities': 'Facilities',
        'services': 'Services',
        'team': 'Team',
        'gallery': 'Gallery',
        'news': 'News',
        'events': 'Events',
        'partners': 'Partners',
        'view_all': 'View All',
    },
    fr: {
        // Blog
        'latest_news_title': 'Dernières Actualités & Événements',
        'latest_news_desc': 'Restez informés de ce qui se passe dans notre établissement.',
        'read_more': 'Lire la suite',

        // Gallery
        'gallery_title': 'Notre Galerie',
        'gallery_desc': 'Moments capturés autour de notre campus.',
        'tab_all': 'Tout',
        'tab_photos': 'Photos',
        'tab_videos': 'Vidéos',
        'watch_video': 'Regarder la vidéo',
        'external_video': 'Lien vidéo externe',
        'watch_provider': 'Regarder sur le fournisseur',

        // Common
        'home': 'Accueil',
        'about': 'À propos',
        'admissions': 'Admissions',
        'campus_life': 'Vie du Campus',
        'contact': 'Contact',
        'programs': 'Programmes',
        'facilities': 'Installations',
        'services': 'Services',
        'team': 'Équipe',
        'gallery': 'Galerie',
        'news': 'Actualités',
        'events': 'Événements',
        'partners': 'Partenaires',
        'view_all': 'Voir tout',
    }
};

export const getTranslation = (key, locale = 'fr') => {
    const lang = translations[locale] || translations['fr']; // Default to French if locale not found
    return lang[key] || key; // Return key if translation missing
};
