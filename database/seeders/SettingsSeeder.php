<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General
            [
                'key' => 'site_name',
                'value' => ['en' => 'Excellence Academy', 'fr' => 'Académie Excellence'],
                'type' => 'text',
            ],
            [
                'key' => 'contact_email',
                'value' => ['en' => 'info@excellence.edu', 'fr' => 'info@excellence.edu'],
                'type' => 'text',
            ],
            [
                'key' => 'contact_phone',
                'value' => ['en' => '+1 234 567 890', 'fr' => '+1 234 567 890'],
                'type' => 'text',
            ],
            [
                'key' => 'facebook_url',
                'value' => ['en' => '#', 'fr' => '#'], // Default empty link
                'type' => 'text',
            ],
            [
                'key' => 'twitter_url',
                'value' => ['en' => '#', 'fr' => '#'],
                'type' => 'text',
            ],
            [
                'key' => 'instagram_url',
                'value' => ['en' => '#', 'fr' => '#'],
                'type' => 'text',
            ],

            // Home - Hero
            [
                'key' => 'hero_title',
                'value' => ['en' => 'Shaping Future Leaders', 'fr' => 'Former les Leaders de Demain'],
                'type' => 'text',
            ],
            [
                'key' => 'hero_description',
                'value' => [
                    'en' => 'We provide a world-class education that empowers students to achieve their full potential.',
                    'fr' => 'Nous offrons une éducation de classe mondiale qui permet aux étudiants d\'atteindre leur plein potentiel.'
                ],
                'type' => 'textarea',
            ],
            [
                'key' => 'hero_image',
                'value' => ['en' => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80', 'fr' => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80'],
                'type' => 'image',
            ],

            // Home - Directors Word
            [
                'key' => 'director_title',
                'value' => ['en' => 'A World From The Director', 'fr' => 'Le Mot du Directeur'],
                'type' => 'text',
            ],
            [
                'key' => 'director_name',
                'value' => ['en' => 'Mr. Ahmadou', 'fr' => 'M. Ahmadou'],
                'type' => 'text',
            ],
            [
                'key' => 'director_role',
                'value' => ['en' => 'School Principal', 'fr' => 'Directeur de l\'école'],
                'type' => 'text',
            ],
            [
                'key' => 'director_content',
                'value' => [
                    'en' => 'Education is not just about filling a bucket, but lighting a fire. At our academy, we strive to ignite the passion for learning in every student.',
                    'fr' => 'L\'éducation ne consiste pas seulement à remplir un seau, mais à allumer un feu. À notre académie, nous nous efforçons d\'allumer la passion d\'apprendre chez chaque élève.'
                ],
                'type' => 'textarea',
            ],
            [
                'key' => 'director_image',
                'value' => ['en' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'fr' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                'type' => 'image',
            ],

            // Home - Video Tour
            [
                'key' => 'video_title',
                'value' => ['en' => 'Campus Tour', 'fr' => 'Visite du Campus'],
                'type' => 'text',
            ],
            [
                'key' => 'video_description',
                'value' => ['en' => 'Discover our state-of-the-art facilities.', 'fr' => 'Découvrez nos installations de pointe.'],
                'type' => 'textarea',
            ],
            [
                'key' => 'video_url',
                'value' => ['en' => 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'fr' => 'https://www.youtube.com/embed/dQw4w9WgXcQ'],
                'type' => 'text',
            ],
            [
                'key' => 'video_file',
                'value' => ['en' => null, 'fr' => null],
                'type' => 'file',
            ],

            // Home - News
            [
                'key' => 'news_title',
                'value' => ['en' => 'Latest News', 'fr' => 'Dernières Actualités'],
                'type' => 'text',
            ],
            [
                'key' => 'news_description',
                'value' => ['en' => 'Keep up with the latest happenings at our school.', 'fr' => 'Restez au courant des derniers événements de notre école.'],
                'type' => 'textarea',
            ],

            // Home - Events
            [
                'key' => 'events_title',
                'value' => ['en' => 'Upcoming Events', 'fr' => 'Événements à Venir'],
                'type' => 'text',
            ],
            [
                'key' => 'events_description',
                'value' => ['en' => 'Join us for these exciting events.', 'fr' => 'Rejoignez-nous pour ces événements passionnants.'],
                'type' => 'textarea',
            ],

            // Home - Stats
            [
                'key' => 'stats_title',
                'value' => ['en' => 'Our Achievements', 'fr' => 'Nos Réalisations'],
                'type' => 'text',
            ],
            [
                'key' => 'stats_description',
                'value' => ['en' => 'We take pride in our numbers.', 'fr' => 'Nous sommes fiers de nos chiffres.'],
                'type' => 'textarea',
            ],

            // Home - Partners
            [
                'key' => 'partners_title',
                'value' => ['en' => 'Our Partners', 'fr' => 'Nos Partenaires'],
                'type' => 'text',
            ],
            [
                'key' => 'partners_description',
                'value' => ['en' => 'Collaborating for a better future.', 'fr' => 'Collaborer pour un avenir meilleur.'],
                'type' => 'textarea',
            ],

            // About Page
            [
                'key' => 'about_title',
                'value' => [
                    'en' => 'About Excellence Academy',
                    'fr' => 'À Propos de l\'Académie Excellence'
                ],
                'type' => 'text',
            ],
            [
                'key' => 'about_content',
                'value' => [
                    'en' => 'Founded with a vision of excellence, our school has been a pillar of the community for years. We believe in a holistic approach to education, balancing academic rigor with character development.

Our mission is to provide a nurturing environment where every student can discover their unique talents and develop the skills needed to thrive in an ever-changing world. We are committed to fostering critical thinking, creativity, and a lifelong love of learning.

With state-of-the-art facilities, dedicated teachers, and a diverse community of learners, we prepare our students not just for academic success, but for meaningful lives as engaged global citizens.',
                    'fr' => 'Fondée avec une vision d\'excellence, notre école est un pilier de la communauté depuis des années. Nous croyons en une approche holistique de l\'éducation, équilibrant rigueur académique et développement du caractère.

Notre mission est de fournir un environnement bienveillant où chaque élève peut découvrir ses talents uniques et développer les compétences nécessaires pour s\'épanouir dans un monde en constante évolution. Nous nous engageons à favoriser la pensée critique, la créativité et l\'amour de l\'apprentissage tout au long de la vie.

Avec des installations de pointe, des enseignants dévoués et une communauté diversifiée d\'apprenants, nous préparons nos élèves non seulement à la réussite scolaire, mais aussi à des vies significatives en tant que citoyens du monde engagés.'
                ],
                'type' => 'textarea',
            ],
            [
                'key' => 'about_image',
                'value' => [
                    'en' => 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1670&q=80',
                    'fr' => 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1670&q=80'
                ],
                'type' => 'image',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
