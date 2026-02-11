export const getLocalized = (content, locale = 'fr', fallback = '') => {
    if (!content) return fallback;
    if (typeof content === 'string') return content;
    return content[locale] || content['fr'] || content['en'] || Object.values(content)[0] || fallback;
};
