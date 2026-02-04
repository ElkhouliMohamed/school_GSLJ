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
            'site_name' => ['en' => 'Groupe Scolaire Privé Bilingue Les Jumelles', 'fr' => 'Groupe Scolaire Privé Bilingue Les Jumelles'],
            'contact_email' => ['en' => 'contact@lesjumelles.sn', 'fr' => 'contact@lesjumelles.sn'],
            'contact_phone' => ['en' => '+221 33 000 00 00', 'fr' => '+221 33 000 00 00'],
            'address' => ['en' => 'Yeumbeul Comico 4, Dakar, Sénégal', 'fr' => 'Yeumbeul Comico 4, Dakar, Sénégal'],
            'facebook_url' => ['en' => 'https://facebook.com/lesjumelles', 'fr' => 'https://facebook.com/lesjumelles'],
            'twitter_url' => ['en' => 'https://twitter.com/lesjumelles', 'fr' => 'https://twitter.com/lesjumelles'],
            'instagram_url' => ['en' => 'https://instagram.com/lesjumelles', 'fr' => 'https://instagram.com/lesjumelles'],

            // Home - Hero
            'hero_title' => [
                'en' => 'Welcome to Excellence',
                'fr' => 'Bienvenue à l\'Excellence'
            ],
            'hero_description' => [
                'en' => 'L\'Excellence Notre Credo - Quality bilingual education in Senegal',
                'fr' => 'L\'Excellence Notre Credo - Éducation bilingue de qualité au Sénégal'
            ],

            // Home - Directors Word
            'director_title' => ['en' => 'Principal\'s Message', 'fr' => 'Message du Directeur'],
            'director_name' => ['en' => 'Mr. Ahmadou Diallo', 'fr' => 'M. Ahmadou Diallo'],
            'director_role' => ['en' => 'School Principal', 'fr' => 'Directeur de l\'École'],
            'director_content' => [
                'en' => 'We are committed to providing quality bilingual education that prepares our students for success in a globalized world. Our dedicated team works tirelessly to ensure each student reaches their full potential.',
                'fr' => 'Nous nous engageons à fournir une éducation bilingue de qualité qui prépare nos élèves à réussir dans un monde globalisé. Notre équipe dévouée travaille sans relâche pour que chaque élève atteigne son plein potentiel.'
            ],

            // Home - Video Tour
            'video_title' => ['en' => 'Virtual Tour', 'fr' => 'Visite Virtuelle'],
            'video_description' => ['en' => 'Discover our modern campus in Dakar.', 'fr' => 'Découvrez notre campus moderne à Dakar.'],
            'video_url' => ['en' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'fr' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'],

            // Home - News
            'news_title' => ['en' => 'Latest News', 'fr' => 'Dernières Nouvelles'],
            'news_description' => ['en' => 'Stay updated with our school activities.', 'fr' => 'Restez informés de nos activités scolaires.'],

            // Home - Events
            'events_title' => ['en' => 'Latest News & Events', 'fr' => 'Dernières Actualités & Événements'],
            'events_description' => ['en' => 'Stay informed about what\'s happening in our school.', 'fr' => 'Restez informés de ce qui se passe dans notre établissement.'],

            // Home - Stats
            'stats_title' => ['en' => 'Our Achievements', 'fr' => 'Nos Réalisations'],
            'stats_description' => ['en' => 'Excellence in numbers.', 'fr' => 'L\'excellence en chiffres.'],

            // Home - Partners
            'partners_title' => ['en' => 'Our Partners', 'fr' => 'Nos Partenaires'],
            'partners_description' => ['en' => 'We collaborate with leading educational institutions.', 'fr' => 'Nous collaborons avec les meilleures institutions éducatives.'],

            // About Page
            'about_title' => ['en' => 'About Les Jumelles', 'fr' => 'À Propos des Jumelles'],
            'about_content' => [
                'en' => 'Founded with a vision of educational excellence, Groupe Scolaire Les Jumelles has been a pillar of quality bilingual education in Yeumbeul, Dakar. We believe in a holistic approach to education, balancing academic rigor with character development.',
                'fr' => 'Fondé avec une vision d\'excellence éducative, le Groupe Scolaire Les Jumelles est un pilier de l\'éducation bilingue de qualité à Yeumbeul, Dakar. Nous croyons en une approche holistique de l\'éducation, équilibrant la rigueur académique avec le développement du caractère.'
            ],
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
