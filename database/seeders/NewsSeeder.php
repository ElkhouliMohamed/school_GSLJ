<?php

namespace Database\Seeders;

use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'slug' => 'excellence-bfem-results',
                'type' => 'news',
                'title' => [
                    'en' => 'Excellence in BFEM Results',
                    'fr' => 'Excellence aux Résultats du BFEM',
                ],
                'content' => [
                    'en' => 'Our students have once again achieved outstanding results in the BFEM examinations, confirming the quality of our teaching methods.',
                    'fr' => 'Nos élèves ont encore une fois obtenu des résultats exceptionnels aux examens du BFEM, confirmant la qualité de nos méthodes d\'enseignement.',
                ],
                'image' => '/images/gslj/news/news1.jpg',
                'published_at' => Carbon::now()->subDays(2),
                'is_published' => true,
            ],
            [
                'slug' => 'school-cultural-week',
                'type' => 'news',
                'title' => [
                    'en' => 'School Cultural Week',
                    'fr' => 'Semaine Culturelle de l\'École',
                ],
                'content' => [
                    'en' => 'The upcoming cultural week promises to be full of activities, performances, and learning opportunities for all students.',
                    'fr' => 'La prochaine semaine culturelle promet d\'être riche en activités, spectacles et opportunités d\'apprentissage pour tous les élèves.',
                ],
                'image' => '/images/gslj/news/news2.jpg',
                'published_at' => Carbon::now()->subDays(5),
                'is_published' => true,
            ],
            [
                'slug' => 'goree-island-visit',
                'type' => 'news',
                'title' => [
                    'en' => 'Visit to Gorée Island',
                    'fr' => 'Visite à Gorée',
                ],
                'content' => [
                    'en' => 'Our students visited Gorée Island to explore its rich history and cultural heritage.',
                    'fr' => 'Nos élèves ont visité l\'île de Gorée pour découvrir son riche patrimoine historique et culturel.',
                ],
                'image' => '/images/gslj/news/news3.jpg',
                'published_at' => Carbon::now()->subDays(10),
                'is_published' => true,
            ],
        ];

        foreach ($posts as $post) {
            $slug = $post['slug'];
            unset($post['slug']);
            Post::updateOrCreate(['slug' => $slug], $post);
        }
    }
}
