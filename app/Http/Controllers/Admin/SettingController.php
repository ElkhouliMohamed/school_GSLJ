<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;

class SettingController extends Controller
{
    public function index()
    {
        // Define default settings we expect
        $keys = [
            // General
            'site_name' => ['type' => 'text', 'label' => 'Site Name'],
            'contact_email' => ['type' => 'text', 'label' => 'Contact Email'],
            'contact_phone' => ['type' => 'text', 'label' => 'Contact Phone'],
            'site_logo' => ['type' => 'image', 'label' => 'Site Logo'],
            'facebook_url' => ['type' => 'text', 'label' => 'Facebook URL'],
            'twitter_url' => ['type' => 'text', 'label' => 'Twitter/X URL'],
            'instagram_url' => ['type' => 'text', 'label' => 'Instagram URL'],

            // Home - Hero
            'hero_title' => ['type' => 'text', 'label' => 'Hero Title'],
            'hero_description' => ['type' => 'textarea', 'label' => 'Hero Description'],
            // 'hero_image' => ['type' => 'image', 'label' => 'Hero Image'], // Deprecated for slider
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

            // Home - Events
            'events_title' => ['type' => 'text', 'label' => 'Events Section Title'],
            'events_description' => ['type' => 'textarea', 'label' => 'Events Section Description'],

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
        ];

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
        // $request->settings is an array of [key => value]
        // Actually, let's receive individual fields or a wrapper.
        // For images, it's tricky with bulk update.
        // Let's assume the form submits everything.

        $inputs = $request->except(['_token', '_method']);

        foreach ($inputs as $key => $value) {
            // Handle file uploads separately if needed, but Inertia form helper handles files nicely if structured right.
            // However, for mixed types, iterating is cleaner.

            // Check if this key is a file upload
            if ($request->hasFile($key)) {
                $file = $request->file($key);
                $path = $file->store('settings', 'public');
                $value = '/storage/' . $path; // Store relative path

                // Determine type based on existing config or file mime
                // For now, simpler: check if key is video_file
                $type = $key === 'video_file' ? 'file' : 'image';

                // Add Validation for Video File
                if ($key === 'video_file') {
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
                }

                // Save for both English and French as media is usually language-agnostic in this context
                Setting::updateOrCreate(
                    ['key' => $key],
                    ['value' => ['en' => $value, 'fr' => $value], 'type' => $type]
                );
            } else {
                // It's a text/array. Our Setting model has Translatable 'value'.
                // If the frontend sends { en: '...', fr: '...' }, it works automatically with spatie/translatable if we pass it as array.
                if (is_array($value) || is_string($value)) {
                    // Check existing type
                    $type = 'text'; // Default
                    if (str_contains($key, 'description'))
                        $type = 'textarea';
                    if ($key === 'theme_color') {
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
