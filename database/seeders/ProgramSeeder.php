<?php

namespace Database\Seeders;

use App\Models\Program;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            [
                'name' => [
                    'en' => 'Preschool',
                    'fr' => 'Préscolaire'
                ],
                'slug' => 'prescolaire',
                'level' => 'preschool',
                'description' => [
                    'en' => 'Small Section, Middle Section, Big Section',
                    'fr' => 'Petite section, Moyenne section, Grande section'
                ],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => [
                    'en' => 'Elementary',
                    'fr' => 'Élémentaire'
                ],
                'slug' => 'elementaire',
                'level' => 'elementary',
                'description' => [
                    'en' => 'From CI to CM2',
                    'fr' => 'Du CI au CM2'
                ],
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => [
                    'en' => 'Middle / High School',
                    'fr' => 'Moyen / Secondaire'
                ],
                'slug' => 'moyen-secondaire',
                'level' => 'secondary',
                'description' => [
                    'en' => 'From 6th Grade to 12th Grade',
                    'fr' => 'De la 6ème à la Terminale'
                ],
                'order' => 3,
                'is_active' => true,
            ],
            [
                'name' => [
                    'en' => 'Vocational Training',
                    'fr' => 'Formation Professionnelle'
                ],
                'slug' => 'formation-professionnelle',
                'level' => 'vocational',
                'description' => [
                    'en' => 'Information coming soon.',
                    'fr' => 'Informations à venir.'
                ],
                'order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($programs as $program) {
            Program::updateOrCreate(
                ['slug' => $program['slug']],
                [
                    'name' => $program['name'],
                    'level' => $program['level'],
                    'description' => $program['description'],
                    'order' => $program['order'],
                    'is_active' => $program['is_active'],
                ]
            );
        }
    }
}
