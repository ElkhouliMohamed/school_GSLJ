<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Facility;

class FacilitySeeder extends Seeder
{
    public function run()
    {
        $facilities = [
            [
                'name' => [
                    'en' => 'School Transportation',
                    'fr' => 'Transport Scolaire'
                ],
                'slug' => 'school-transportation',
                'type' => 'transport',
                'description' => [
                    'en' => 'Safe and reliable transportation services for students, ensuring secure travel to and from school with professional drivers and well-maintained vehicles.',
                    'fr' => 'Services de transport sûrs et fiables pour les élèves, assurant des déplacements sécurisés entre la maison et l\'école avec des conducteurs professionnels et des véhicules bien entretenus.'
                ],
                'details' => [
                    'en' => [
                        'Professional drivers with clean driving records',
                        'Regular vehicle maintenance and safety checks',
                        'Multiple pickup and drop-off points',
                        'Real-time tracking for parents',
                        'Secure and comfortable seating for all students'
                    ],
                    'fr' => [
                        'Conducteurs professionnels avec un bon dossier de conduite',
                        'Entretien régulier et contrôles de sécurité des véhicules',
                        'Points de ramassage et de dépose multiples',
                        'Suivi en temps réel pour les parents',
                        'Sièges sécurisés et confortables pour tous les élèves'
                    ]
                ],
                'order' => 1,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'School Catering',
                    'fr' => 'Restauration Scolaire'
                ],
                'slug' => 'school-catering',
                'type' => 'catering',
                'description' => [
                    'en' => 'Nutritious and delicious meals prepared by our professional kitchen staff, following health guidelines and offering balanced nutrition for growing students.',
                    'fr' => 'Repas nutritifs et délicieux préparés par notre personnel de cuisine professionnel, suivant les directives sanitaires et offrant une nutrition équilibrée pour les élèves en croissance.'
                ],
                'details' => [
                    'en' => [
                        'Fresh and locally sourced ingredients',
                        'Balanced nutrition following dietary guidelines',
                        'Daily changing menu options',
                        'Special dietary accommodations',
                        'Clean and hygienic food preparation'
                    ],
                    'fr' => [
                        'Ingrédients frais et locaux',
                        'Nutrition équilibrée suivant les directives diététiques',
                        'Options de menu changeant quotidiennement',
                        'Accommodements diététiques spéciaux',
                        'Préparation alimentaire propre et hygiénique'
                    ]
                ],
                'order' => 2,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'School Uniform',
                    'fr' => 'Uniforme Scolaire'
                ],
                'slug' => 'school-uniform',
                'type' => 'uniform',
                'description' => [
                    'en' => 'School uniform policy promoting equality, discipline, and a sense of belonging while reducing distractions and fostering a focused learning environment.',
                    'fr' => 'Politique d\'uniforme scolaire favorisant l\'égalité, la discipline et un sentiment d\'appartenance tout en réduisant les distractions et en favorisant un environnement d\'apprentissage concentré.'
                ],
                'details' => [
                    'en' => [
                        'Standardized dress code for all students',
                        'Quality materials and comfortable fit',
                        'Seasonal uniform variations',
                        'Affordable pricing options',
                        'Easy access to uniform suppliers'
                    ],
                    'fr' => [
                        'Code vestimentaire standardisé pour tous les élèves',
                        'Matériaux de qualité et ajustement confortable',
                        'Variations d\'uniforme saisonnières',
                        'Options de prix abordables',
                        'Accès facile aux fournisseurs d\'uniformes'
                    ]
                ],
                'order' => 3,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Computer Laboratory',
                    'fr' => 'Laboratoire Informatique'
                ],
                'slug' => 'computer-laboratory',
                'type' => 'lab',
                'description' => [
                    'en' => 'State-of-the-art computer lab equipped with modern technology, high-speed internet, and educational software to enhance digital literacy and programming skills.',
                    'fr' => 'Laboratoire informatique de pointe équipé de technologies modernes, d\'internet haut débit et de logiciels éducatifs pour améliorer l\'alphabétisation numérique et les compétences en programmation.'
                ],
                'details' => [
                    'en' => [
                        'Latest computer hardware and software',
                        'High-speed internet connectivity',
                        'Educational programming tools',
                        'Digital creativity applications',
                        'Regular technology updates'
                    ],
                    'fr' => [
                        'Dernier matériel et logiciel informatique',
                        'Connectivité Internet haut débit',
                        'Outils de programmation éducatifs',
                        'Applications de créativité numérique',
                        'Mises à jour technologiques régulières'
                    ]
                ],
                'order' => 4,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'School Infrastructure',
                    'fr' => 'Infrastructure Scolaire'
                ],
                'slug' => 'school-infrastructure',
                'type' => 'infrastructure',
                'description' => [
                    'en' => 'Modern and well-maintained school facilities including classrooms, libraries, laboratories, and recreational areas designed to support effective learning.',
                    'fr' => 'Installations scolaires modernes et bien entretenues comprenant des salles de classe, des bibliothèques, des laboratoires et des espaces récréatifs conçus pour soutenir un apprentissage efficace.'
                ],
                'details' => [
                    'en' => [
                        'Spacious and well-lit classrooms',
                        'Well-stocked library with digital resources',
                        'Science laboratories with modern equipment',
                        'Recreational and sports facilities',
                        'Safe and accessible building design'
                    ],
                    'fr' => [
                        'Salles de classe spacieuses et bien éclairées',
                        'Bibliothèque bien fournie avec des ressources numériques',
                        'Laboratoires scientifiques avec équipements modernes',
                        'Installations récréatives et sportives',
                        'Conception architecturale sûre et accessible'
                    ]
                ],
                'order' => 5,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Internal Regulations',
                    'fr' => 'Règlement Intérieur'
                ],
                'slug' => 'internal-regulations',
                'type' => 'regulations',
                'description' => [
                    'en' => 'Comprehensive school regulations outlining expectations for student behavior, academic integrity, and community standards that foster a respectful learning environment.',
                    'fr' => 'Règlement scolaire complet énonçant les attentes en matière de comportement des élèves, d\'intégrité académique et de normes communautaires qui favorisent un environnement d\'apprentissage respectueux.'
                ],
                'details' => [
                    'en' => [
                        'Code of conduct and behavioral expectations',
                        'Academic integrity and honesty policies',
                        'Attendance and punctuality requirements',
                        'Safety and emergency procedures',
                        'Communication protocols between stakeholders'
                    ],
                    'fr' => [
                        'Code de conduite et attentes en matière de comportement',
                        'Politiques d\'intégrité et d\'honnêteté académiques',
                        'Exigences de présence et de ponctualité',
                        'Procédures de sécurité et d\'urgence',
                        'Protocoles de communication entre les parties prenantes'
                    ]
                ],
                'order' => 6,
                'is_active' => true
            ]
        ];

        foreach ($facilities as $facility) {
            Facility::updateOrCreate(
                ['slug' => $facility['slug']],
                $facility
            );
        }
    }
}
