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
                    'en' => 'To ensure equality, discipline, and a common identity within the establishment, wearing the school uniform is mandatory for all students. Respect for the uniform is required throughout the school year and contributes to establishing a harmonious school climate conducive to learning.',
                    'fr' => 'Afin de garantir l’égalité, la discipline et une identité commune au sein de l’établissement, le port de l’uniforme scolaire est obligatoire pour tous les élèves. Le respect de l’uniforme est exigé durant toute l’année scolaire et contribue à instaurer un climat scolaire harmonieux et propice aux apprentissages.'
                ],
                'details' => [
                    'en' => [
                        'Two polo shirts in school colors',
                        'A sports outfit adapted for physical and sports activities',
                        'A jacket for cooler periods',
                        'A fabric coupon intended for making the regulation trousers',
                        'Mandatory throughout the school year'
                    ],
                    'fr' => [
                        'Deux polos aux couleurs de l’école',
                        'Une tenue de sport adaptée aux activités physiques et sportives',
                        'Une jacket (veste) pour les périodes plus fraîches',
                        'Un coupon de tissu destiné à la confection du pantalon réglementaire',
                        'Obligatoire durant toute l’année scolaire'
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
                    'en' => 'The computer laboratory of GSPB Les Jumelles is a modern and functional space dedicated to learning digital technologies. It is equipped with high-performance computers allowing students to learn about computing, office automation, online research, and digital educational tools.',
                    'fr' => 'Le laboratoire informatique du Groupe Scolaire Privé Bilingue Les Jumelles est un espace moderne et fonctionnel, dédié à l’apprentissage des technologies numériques. Il est équipé d’ordinateurs performants permettant aux élèves de s’initier à l’informatique, à la bureautique, à la recherche en ligne et aux outils numériques éducatifs.'
                ],
                'details' => [
                    'en' => [
                        'High-performance computers',
                        'Office automation and online research',
                        'Digital educational tools',
                        'Supervised by qualified teachers',
                        'Secure and disciplined environment'
                    ],
                    'fr' => [
                        'Ordinateurs performants',
                        'Bureautique et recherche en ligne',
                        'Outils numériques éducatifs',
                        'Encadrement par des enseignants qualifiés',
                        'Environnement sécurisé et discipliné'
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
