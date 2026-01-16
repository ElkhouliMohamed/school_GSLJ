<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General
            'site_name' => ['en' => 'GSLJ', 'fr' => 'GSLJ'],
            'contact_email' => ['en' => 'info@myschool.com', 'fr' => 'info@monecole.com'],
            'contact_phone' => ['en' => '+1234567890', 'fr' => '+1234567890'],
            'facebook_url' => ['en' => 'https://facebook.com', 'fr' => 'https://facebook.com'],
            'twitter_url' => ['en' => 'https://twitter.com', 'fr' => 'https://twitter.com'],
            'instagram_url' => ['en' => 'https://instagram.com', 'fr' => 'https://instagram.com'],

            // Home - Hero
            'hero_title' => [
                'en' => 'Welcome to Excellence',
                'fr' => 'Bienvenue à l\'Excellence'
            ],
            'hero_description' => [
                'en' => 'Nurturing minds, building futures.',
                'fr' => 'Nourrir les esprits, construire l\'avenir.'
            ],
            // 'hero_image' => ... (skip image for now or use placeholder URL)

            // Home - Directors Word
            'director_title' => ['en' => 'Principal\'s Message', 'fr' => 'Message du Directeur'],
            'director_name' => ['en' => 'Mr. Ahmadou', 'fr' => 'M. Ahmadou'],
            'director_role' => ['en' => 'School Principal', 'fr' => 'Directeur de l\'École'],
            'director_content' => [
                'en' => 'We are committed to providing the best education...',
                'fr' => 'Nous nous engageons à fournir la meilleure éducation...'
            ],

            // Home - Video Tour
            'video_title' => ['en' => 'Virtual Tour', 'fr' => 'Visite Virtuelle'],
            'video_description' => ['en' => 'Take a look around our campus.', 'fr' => 'Jetez un coup d\'œil à notre campus.'],
            'video_url' => ['en' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'fr' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'],

            // Home - News
            'news_title' => ['en' => 'Latest News', 'fr' => 'Dernières Nouvelles'],
            'news_description' => ['en' => 'Stay updated with our activities.', 'fr' => 'Restez à jour avec nos activités.'],

            // Home - Events
            'events_title' => ['en' => 'Upcoming Events', 'fr' => 'Événements à Venir'],
            'events_description' => ['en' => 'Join us in our next events.', 'fr' => 'Rejoignez-nous lors de nos prochains événements.'],

            // Home - Stats
            'stats_title' => ['en' => 'Our Achievements', 'fr' => 'Nos Réalisations'],
            'stats_description' => ['en' => 'We are proud of our numbers.', 'fr' => 'Nous sommes fiers de nos chiffres.'],

            // Home - Partners
            'partners_title' => ['en' => 'Our Partners', 'fr' => 'Nos Partenaires'],
            'partners_description' => ['en' => 'We collaborate with the best.', 'fr' => 'Nous collaborons avec les meilleurs.'],
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $value,
                    'type' => str_contains($key, 'description') || str_contains($key, 'content') ? 'textarea' : 'text'
                ]
            );
        }
    }
}
