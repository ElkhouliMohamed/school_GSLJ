<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class SettingController extends Controller
{
    private function getSettingDefinitions()
    {
        return [
            // General
            'site_name' => ['type' => 'text', 'label' => 'Site Name'],
            'contact_email' => ['type' => 'text', 'label' => 'Contact Email'],
            'contact_phone' => ['type' => 'text', 'label' => 'Contact Phone'],
            'site_logo' => ['type' => 'image', 'label' => 'Site Logo'],
            'facebook_url' => ['type' => 'text', 'label' => 'Facebook URL'],
            'twitter_url' => ['type' => 'text', 'label' => 'Twitter/X URL'],
            'instagram_url' => ['type' => 'text', 'label' => 'Instagram URL'],

            // Home - Info Section
            'info_title' => ['type' => 'text', 'label' => 'Info Section Title'],
            'info_description' => ['type' => 'textarea', 'label' => 'Info Section Description'],
            'info_motto' => ['type' => 'textarea', 'label' => 'Info Section Motto/Footer'],
            'info_cta_text' => ['type' => 'text', 'label' => 'Info Section Button Text'],
            'info_image' => ['type' => 'image', 'label' => 'Info Section Image'],

            // Home - Hero
            'hero_title' => ['type' => 'text', 'label' => 'Hero Title'],
            'hero_highlight' => ['type' => 'text', 'label' => 'Hero Highlight Text'],
            'hero_location' => ['type' => 'text', 'label' => 'Hero Location'],
            'hero_motto' => ['type' => 'text', 'label' => 'Hero Motto'],
            'hero_bottom_bar_text' => ['type' => 'text', 'label' => 'Bottom Bar Text'],
            'hero_description' => ['type' => 'textarea', 'label' => 'Hero Description'],
            'hero_image_1' => ['type' => 'image', 'label' => 'Slider Image 1'],
            'hero_image_2' => ['type' => 'image', 'label' => 'Slider Image 2'],
            'hero_image_3' => ['type' => 'image', 'label' => 'Slider Image 3'],

            // Home - Directors Word
            'director_title' => ['type' => 'text', 'label' => 'Director\'s Title'],
            'director_name' => ['type' => 'text', 'label' => 'Director\'s Name'],
            'director_role' => ['type' => 'text', 'label' => 'Director\'s Role'],
            'director_content' => ['type' => 'textarea', 'label' => 'Director\'s Message'],
            'director_image' => ['type' => 'image', 'label' => 'Director\'s Image'],

            // Home - Video Tour
            'video_title' => ['type' => 'text', 'label' => 'Video Section Title'],
            'video_description' => ['type' => 'textarea', 'label' => 'Video Section Description'],
            'video_url' => ['type' => 'text', 'label' => 'YouTube Video URL'],
            'video_file' => ['type' => 'file', 'label' => 'Upload Video (MP4/WebM)'],

            // Home - News
            'news_title' => ['type' => 'text', 'label' => 'News Section Title'],
            'news_description' => ['type' => 'textarea', 'label' => 'News Section Description'],
            'news_cta_text' => ['type' => 'text', 'label' => 'News Button Text'],

            // Home - Why Choose Us
            'why_us_title' => ['type' => 'text', 'label' => 'Why Choose Us Title'],
            'why_us_description' => ['type' => 'textarea', 'label' => 'Why Choose Us Description'],
            'why_us_point_1' => ['type' => 'text', 'label' => 'Point 1'],
            'why_us_point_2' => ['type' => 'text', 'label' => 'Point 2'],
            'why_us_point_3' => ['type' => 'text', 'label' => 'Point 3'],
            'why_us_point_4' => ['type' => 'text', 'label' => 'Point 4'],
            'why_us_cta_text' => ['type' => 'text', 'label' => 'Button Text'],
            'why_us_floating_text' => ['type' => 'text', 'label' => 'Floating Badge Text'],
            'why_us_image' => ['type' => 'image', 'label' => 'Section Image'],

            // Home - Events
            'events_title' => ['type' => 'text', 'label' => 'Events Section Title'],
            'events_description' => ['type' => 'textarea', 'label' => 'Events Section Description'],
            'events_section_image' => ['type' => 'image', 'label' => 'Events Background Image'],

            // Home - Stats
            'stats_title' => ['type' => 'text', 'label' => 'Stats Section Title'],
            'stats_description' => ['type' => 'textarea', 'label' => 'Stats Section Description'],

            // Home - Partners
            'partners_title' => ['type' => 'text', 'label' => 'Partners Section Title'],
            'partners_description' => ['type' => 'textarea', 'label' => 'Partners Section Description'],

            // About Page
            'about_title' => ['type' => 'text', 'label' => 'About Page Title'],
            'about_content' => ['type' => 'textarea', 'label' => 'About Page Content'],
            'about_image' => ['type' => 'image', 'label' => 'About Page Image'],

            // Theme
            'theme_color' => ['type' => 'color', 'label' => 'Primary Theme Color'],
            'theme_color_primary' => ['type' => 'color', 'label' => 'Primary Theme Color (Tailwind)'],
            'theme_color_secondary' => ['type' => 'color', 'label' => 'Secondary Theme Color'],
            'theme_color_accent' => ['type' => 'color', 'label' => 'Accent Theme Color'],
        ];
    }

    public function index()
    {
        $keys = $this->getSettingDefinitions();

        // Fetch existing settings
        $settings = Setting::whereIn('key', array_keys($keys))->get()->keyBy('key');

        $formattedSettings = [];
        foreach ($keys as $key => $config) {
            $formattedSettings[$key] = [
                'key' => $key,
                'value' => $settings->has($key) ? $settings[$key]->getTranslations('value') : [],
                'type' => $config['type'],
                'label' => $config['label'],
            ];
        }

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $formattedSettings,
        ]);
    }

    public function update(Request $request)
    {
        $definitions = $this->getSettingDefinitions();
        $inputs = $request->except(['_token', '_method']);

        foreach ($inputs as $key => $value) {
            $definition = $definitions[$key] ?? null;
            $type = $definition['type'] ?? 'text'; // Default to text if unknown

            // Check if this key is a file upload
            if ($request->hasFile($key)) {
                $file = $request->file($key);
                $path = $file->store('settings', 'public');
                $value = '/storage/' . $path; // Store relative path

                // Determine type based on explicit definition or default
                // $type from definition is preferred. 
                // Special check for video_file if definition missing (fallback)
                if ($key === 'video_file' || $type === 'video_file' || $type === 'file') {
                    $type = 'file'; // or video_file

                    // Add Validation for Video File
                    $validator = \Illuminate\Support\Facades\Validator::make(
                        [$key => $file],
                        [$key => 'mimes:mp4,webm,ogg|max:51200'], // 50MB Max
                        [
                            $key . '.mimes' => 'The video must be a file of type: mp4, webm, ogg.',
                            $key . '.max' => 'The video size must not exceed 50 MB.',
                        ]
                    );

                    if ($validator->fails()) {
                        return redirect()->back()->withErrors($validator)->withInput();
                    }
                } else {
                    $type = 'image';
                }

                // Save for both English and French as media is usually language-agnostic in this context
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => ['en' => $value, 'fr' => $value], 'type' => $type]
                );
            } else {
                // If it's expected to be an image/file but no file is uploaded, SKIP.
                // Do NOT overwrite with text/null.
                if ($type === 'image' || $type === 'file' || $type === 'video_file') {
                    continue;
                }

                // It's a text/array.
                if (is_array($value) || is_string($value)) {
                    if (in_array($key, ['theme_color', 'theme_color_primary', 'theme_color_secondary', 'theme_color_accent'])) {
                        $type = 'color';
                        // Validate hex color format
                        if (is_string($value) && !preg_match('/^#[0-9A-Fa-f]{6}$/', $value)) {
                            continue; // Skip invalid color
                        }
                        // Color should be same for both languages
                        if (is_string($value)) {
                            $value = ['en' => $value, 'fr' => $value];
                        }
                    }

                    Setting::updateOrCreate(
                        ['key' => $key],
                        ['value' => $value, 'type' => $type]
                    );
                }
            }
        }

        Cache::forget('site_settings'); // Clear cache

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }
}
