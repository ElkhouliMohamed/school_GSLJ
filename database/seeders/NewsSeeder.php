<?php

namespace Database\Seeders;

use App\Models\Post;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        Post::create([
            'type' => 'news',
            'title' => [
                'en' => 'Excellence in BFEM Results',
                'fr' => 'Excellence aux Résultats du BFEM',
            ],
            'slug' => 'excellence-bfem-results',
            'content' => [
                'en' => 'Our students have once again achieved outstanding results in the BFEM examinations, confirming the quality of our teaching methods.',
                'fr' => 'Nos élèves ont encore une fois obtenu des résultats exceptionnels aux examens du BFEM, confirmant la qualité de nos méthodes d\'enseignement.',
            ],
            'image' => '/images/gslj/news/news1.jpg',
            'published_at' => Carbon::now()->subDays(2),
            'is_published' => true,
        ]);

        Post::create([
            'type' => 'news',
            'title' => [
                'en' => 'School Cultural Week',
                'fr' => 'Semaine Culturelle de l\'École',
            ],
            'slug' => 'school-cultural-week',
            'content' => [
                'en' => 'The upcoming cultural week promises to be full of activities, performances, and learning opportunities for all students.',
                'fr' => 'La prochaine semaine culturelle promet d\'être riche en activités, spectacles et opportunités d\'apprentissage pour tous les élèves.',
            ],
            'image' => '/images/gslj/news/news2.jpg',
            'published_at' => Carbon::now()->subDays(5),
            'is_published' => true,
        ]);
    }
}
