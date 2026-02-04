<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $news = [
            [
                'title' => [
                    'fr' => 'Rentrée Scolaire 2024-2025',
                    'en' => 'School Year 2024-2025 Opening'
                ],
                'content' => [
                    'fr' => 'Nous sommes heureux d\'annoncer le début de la nouvelle année scolaire 2024-2025. Les cours débuteront le 2 septembre 2024. Nous souhaitons la bienvenue à tous nos élèves, nouveaux et anciens.',
                    'en' => 'We are pleased to announce the start of the new 2024-2025 school year. Classes will begin on September 2, 2024. We welcome all our students, new and returning.'
                ],
                'published_at' => now()->subDays(5),
                'image' => 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
            ],
            [
                'title' => [
                    'fr' => 'Journée Portes Ouvertes - 15 Mars 2025',
                    'en' => 'Open House Day - March 15, 2025'
                ],
                'content' => [
                    'fr' => 'Venez découvrir notre établissement lors de notre journée portes ouvertes le 15 mars 2025. Visitez nos installations, rencontrez nos enseignants et découvrez nos programmes pédagogiques innovants.',
                    'en' => 'Come discover our school during our open house on March 15, 2025. Visit our facilities, meet our teachers, and learn about our innovative educational programs.'
                ],
                'published_at' => now()->subDays(10),
                'image' => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
            ],
            [
                'title' => [
                    'fr' => 'Résultats Exceptionnels au Baccalauréat 2024',
                    'en' => 'Exceptional Baccalaureate Results 2024'
                ],
                'content' => [
                    'fr' => 'Nous sommes fiers d\'annoncer un taux de réussite de 98% au Baccalauréat 2024. Félicitations à tous nos élèves et à notre équipe pédagogique pour cet excellent résultat.',
                    'en' => 'We are proud to announce a 98% success rate in the 2024 Baccalaureate. Congratulations to all our students and our teaching staff for this excellent result.'
                ],
                'published_at' => now()->subDays(15),
                'image' => 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
            ],
            [
                'title' => [
                    'fr' => 'Nouveau Laboratoire de Sciences',
                    'en' => 'New Science Laboratory'
                ],
                'content' => [
                    'fr' => 'Notre établissement vient d\'inaugurer un nouveau laboratoire de sciences équipé des dernières technologies. Cet espace moderne permettra à nos élèves de développer leurs compétences scientifiques dans les meilleures conditions.',
                    'en' => 'Our school has just inaugurated a new science laboratory equipped with the latest technology. This modern space will allow our students to develop their scientific skills in the best conditions.'
                ],
                'published_at' => now()->subDays(20),
                'image' => 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
            ],
            [
                'title' => [
                    'fr' => 'Partenariat avec l\'Université Cheikh Anta Diop',
                    'en' => 'Partnership with Cheikh Anta Diop University'
                ],
                'content' => [
                    'fr' => 'Nous avons signé un partenariat stratégique avec l\'Université Cheikh Anta Diop de Dakar pour faciliter l\'orientation et l\'accès de nos élèves à l\'enseignement supérieur.',
                    'en' => 'We have signed a strategic partnership with Cheikh Anta Diop University in Dakar to facilitate guidance and access for our students to higher education.'
                ],
                'published_at' => now()->subDays(25),
                'image' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
            ],
            [
                'title' => [
                    'fr' => 'Compétition Sportive Inter-Écoles',
                    'en' => 'Inter-School Sports Competition'
                ],
                'content' => [
                    'fr' => 'Nos élèves ont brillé lors de la compétition sportive inter-écoles de Dakar, remportant 5 médailles d\'or en athlétisme et basketball. Bravo à nos champions!',
                    'en' => 'Our students shone at the Dakar inter-school sports competition, winning 5 gold medals in athletics and basketball. Congratulations to our champions!'
                ],
                'published_at' => now()->subDays(30),
                'image' => 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
            ],
        ];

        foreach ($news as $item) {
            Post::create([
                'type' => 'news',
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
