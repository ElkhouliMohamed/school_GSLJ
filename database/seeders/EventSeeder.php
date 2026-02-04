<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            [
                'title' => [
                    'fr' => 'Journée Portes Ouvertes',
                    'en' => 'Open House Day'
                ],
                'content' => [
                    'fr' => 'Découvrez notre établissement, rencontrez nos enseignants et visitez nos installations modernes. Inscriptions ouvertes pour l\'année 2025-2026.',
                    'en' => 'Discover our school, meet our teachers and visit our modern facilities. Registration open for the 2025-2026 school year.'
                ],
                'published_at' => now()->addDays(30),
                'image' => 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800',
            ],
            [
                'title' => [
                    'fr' => 'Fête de l\'Excellence',
                    'en' => 'Excellence Celebration'
                ],
                'content' => [
                    'fr' => 'Cérémonie de remise des prix aux meilleurs élèves de l\'année. Venez célébrer la réussite de nos étudiants avec nous.',
                    'en' => 'Award ceremony for the best students of the year. Come celebrate the success of our students with us.'
                ],
                'published_at' => now()->addDays(45),
                'image' => 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
            ],
            [
                'title' => [
                    'fr' => 'Kermesse de Fin d\'Année',
                    'en' => 'End of Year Fair'
                ],
                'content' => [
                    'fr' => 'Grande kermesse avec jeux, spectacles et stands de restauration. Toute la communauté scolaire est invitée à participer.',
                    'en' => 'Large fair with games, shows and food stands. The entire school community is invited to participate.'
                ],
                'published_at' => now()->addDays(60),
                'image' => 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
            ],
            [
                'title' => [
                    'fr' => 'Conférence sur l\'Orientation',
                    'en' => 'Career Guidance Conference'
                ],
                'content' => [
                    'fr' => 'Conférence destinée aux élèves de Terminale sur les choix d\'orientation et les opportunités d\'études supérieures au Sénégal et à l\'étranger.',
                    'en' => 'Conference for final year students on career choices and higher education opportunities in Senegal and abroad.'
                ],
                'published_at' => now()->addDays(20),
                'image' => 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
            ],
        ];

        foreach ($events as $item) {
            Post::create([
                'type' => 'event',
                'title' => $item['title'],
                'content' => $item['content'],
                'slug' => \Illuminate\Support\Str::slug($item['title']['fr']) . '-' . uniqid(),
                'published_at' => $item['published_at'],
                'image' => $item['image'],
                'is_published' => true,
            ]);
        }
    }
}
