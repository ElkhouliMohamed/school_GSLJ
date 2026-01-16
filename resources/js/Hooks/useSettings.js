import { usePage } from '@inertiajs/react';

/**
 * Custom hook to access application settings with localization support.
 * @returns {object} An object containing the raw settings and a helper function to get localized values.
 */
export default function useSettings() {
    const { settings, locale } = usePage().props;

    /**
     * Retrieves a localized setting value.
     * 
     * @param {string|object} value - The setting value which might be a string or an object with locale keys.
     * @param {any} fallback - The fallback value if the setting is missing or empty.
     * @returns {string|any} The localized string or the fallback.
     */
    const getLocalized = (value, fallback = '') => {
        if (!value) return fallback;
        if (typeof value === 'string') return value;
        return value[locale] || value['en'] || Object.values(value)[0] || fallback;
    };

    /**
     * Helper to get a setting by key directly, with optional fallback.
     * 
     * @param {string} key - The setting key (e.g., 'site_name').
     * @param {any} fallback - Default value if not found.
     * @returns {any} The localized value.
     */
    const getSetting = (key, fallback = '') => {
        if (!settings || !settings[key]) return fallback;
        const value = settings[key];
        // If the setting object has a 'value' property (depending on how backend sends it), handle it.
        // Based on HandleInertiaRequests, it sends: settings: { key: value_translations }
        // So settings[key] IS the translation object or string.
        return getLocalized(value, fallback);
    };

    return {
        settings,
        locale,
        getLocalized,
        getSetting
    };
}
