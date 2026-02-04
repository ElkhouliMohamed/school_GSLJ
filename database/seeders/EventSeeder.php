<?php

namespace Database\Seeders;

use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        Post::create([
            'type' => 'event',
            'title' => [
                'en' => 'Open House Day',
                'fr' => 'Journée Portes Ouvertes',
            ],
            'slug' => 'open-house-day',
            'content' => [
                'en' => 'Join us for our annual Open House Day to meet the teachers and visit our facilities.',
                'fr' => 'Rejoignez-nous pour notre journée portes ouvertes annuelle pour rencontrer les enseignants et visiter nos installations.',
            ],
            'image' => '/images/gslj/events/event1.jpg',
            'start_date' => Carbon::now()->addDays(10),
            'end_date' => Carbon::now()->addDays(10)->addHours(4),
            'location' => 'School Campus / Campus Scolaire',
            'organizer' => 'Administration',
            'is_published' => true,
        ]);

        Post::create([
            'type' => 'event',
            'title' => [
                'en' => 'End of Year Ceremony',
                'fr' => 'Cérémonie de Fin d\'Année',
            ],
            'slug' => 'end-of-year-ceremony',
            'content' => [
                'en' => 'Celebrating the success of our students with awards and performances.',
                'fr' => 'Célébration de la réussite de nos élèves avec des remises de prix et des spectacles.',
            ],
            'image' => '/images/gslj/events/event2.jpg',
            'start_date' => Carbon::now()->addMonths(1),
            'end_date' => Carbon::now()->addMonths(1)->addHours(3),
            'location' => 'Main Hall / Hall Principal',
            'organizer' => 'School Board',
            'is_published' => true,
        ]);
    }
}
