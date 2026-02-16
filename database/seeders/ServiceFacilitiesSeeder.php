<?php

namespace Database\Seeders;

use App\Models\Facility;
use Illuminate\Database\Seeder;

class ServiceFacilitiesSeeder extends Seeder
{
    public function run()
    {
        $facilities = [
            [
                'name' => [
                    'fr' => 'Restauration Scolaire',
                    'en' => 'School Canteen'
                ],
                'slug' => 'canteen', // Matching the slug we used in Header
                'type' => 'catering',
                'description' => [
                    'fr' => "Notre cantine propose des menus variés, élaborés par des nutritionnistes pour garantir l'équilibre alimentaire de vos enfants. Nous privilégions les produits frais et locaux.",
                    'en' => "Our canteen offers varied menus, designed by nutritionists to ensure a balanced diet for your children. We prioritize fresh and local products."
                ],
                'details' => [
                    'fr' => [
                        "Menus équilibrés et variés",
                        "Produits frais et locaux",
                        "Encadrement pendant le repas",
                        "Respect des régimes alimentaires spécifiques"
                    ],
                    'en' => [
                        "Balanced and varied menus",
                        "Fresh and local products",
                        "Supervision during meals",
                        "Respect for specific dietary requirements"
                    ]
                ],
                'images' => [
                    "https://images.unsplash.com/photo-1577308856961-8e9ec50d0c67?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                ],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => [
                    'fr' => 'Transport Scolaire',
                    'en' => 'School Transport'
                ],
                'slug' => 'transport',
                'type' => 'transport',
                'description' => [
                    'fr' => "Nous assurons le ramassage scolaire dans plusieurs quartiers de la ville. Nos bus sont confortables, climatisés et respectent toutes les normes de sécurité.",
                    'en' => "We provide school bus services in several city districts. Our buses are comfortable, air-conditioned, and meet all safety standards."
                ],
                'details' => [
                    'fr' => [
                        "Flotte de bus moderne et climatisée",
                        "Chauffeurs expérimentés et formés",
                        "Accompagnateurs dans chaque bus",
                        "Couverture de plusieurs zones géographiques"
                    ],
                    'en' => [
                        "Modern and air-conditioned bus fleet",
                        "Experienced and trained drivers",
                        "Chaperones in every bus",
                        "Coverage of multiple geographical zones"
                    ]
                ],
                'images' => [
                    "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                ],
                'order' => 2,
                'is_active' => true,
            ],
            [
                'name' => [
                    'fr' => 'Bibliothèque',
                    'en' => 'Library'
                ],
                'slug' => 'library',
                'type' => 'infrastructure',
                'description' => [
                    'fr' => "Notre bibliothèque dispose d'un large choix d'ouvrages pour tous les âges. C'est un lieu calme propice à la lecture, à l'étude et à l'épanouissement intellectuel.",
                    'en' => "Our library has a wide selection of books for all ages. It is a quiet place conducive to reading, study, and intellectual development."
                ],
                'details' => [
                    'fr' => [
                        "Large collection de livres et ouvrages",
                        "Espaces de lecture calmes",
                        "Accès informatique pour la recherche",
                        "Animations culturelles régulières"
                    ],
                    'en' => [
                        "Large collection of books",
                        "Quiet reading spaces",
                        "Computer access for research",
                        "Regular cultural activities"
                    ]
                ],
                'images' => [
                    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                ],
                'order' => 3,
                'is_active' => true,
            ],
            [
                'name' => [
                    'fr' => 'Infirmerie',
                    'en' => 'Infirmary'
                ],
                'slug' => 'infirmary',
                'type' => 'infrastructure',
                'description' => [
                    'fr' => "Une infirmerie équipée est disponible au sein de l'établissement pour assurer les premiers soins et veiller à la santé des élèves tout au long de la journée.",
                    'en' => "An equipped infirmary is available within the establishment to provide first aid and ensure the health of students throughout the day."
                ],
                'details' => [
                    'fr' => [
                        "Personnel de santé qualifié",
                        "Premiers secours et soins d'urgence",
                        "Suivi médical des élèves",
                        "Campagnes de prévention et d'hygiène"
                    ],
                    'en' => [
                        "Qualified health personnel",
                        "First aid and emergency care",
                        "Student medical monitoring",
                        "Prevention and hygiene campaigns"
                    ]
                ],
                'images' => [
                    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                ],
                'order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($facilities as $data) {
            Facility::updateOrCreate(
                ['slug' => $data['slug']], // Check key
                $data // Content to update/create
            );
        }
    }
}
