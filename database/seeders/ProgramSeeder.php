<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Program;

class ProgramSeeder extends Seeder
{
    public function run()
    {
        $programs = [
            [
                'name' => [
                    'en' => 'Preschool Program',
                    'fr' => 'Programme Préscolaire'
                ],
                'slug' => 'preschool-program',
                'level' => 'preschool',
                'description' => [
                    'en' => 'Our preschool program focuses on early childhood development through play-based learning, social skills, and foundational literacy and numeracy skills.',
                    'fr' => 'Notre programme préscolaire met l\'accent sur le développement de la petite enfance par le jeu, les compétences sociales et les bases de la lecture et des mathématiques.'
                ],
                'objectives' => [
                    'en' => [
                        'Develop social and emotional skills',
                        'Build foundational literacy skills',
                        'Introduce basic numeracy concepts',
                        'Encourage creativity and imagination',
                        'Promote physical development'
                    ],
                    'fr' => [
                        'Développer les compétences sociales et émotionnelles',
                        'Construire les bases de la littératie',
                        'Introduire les concepts numériques de base',
                        'Encourager la créativité et l\'imagination',
                        'Promouvoir le développement physique'
                    ]
                ],
                'curriculum' => [
                    'en' => [
                        'Play-based Learning',
                        'Social Skills Development',
                        'Early Literacy',
                        'Basic Math Concepts',
                        'Art and Creativity',
                        'Physical Activities'
                    ],
                    'fr' => [
                        'Apprentissage par le jeu',
                        'Développement des compétences sociales',
                        'Premières compétences en lecture',
                        'Concepts mathématiques de base',
                        'Art et créativité',
                        'Activités physiques'
                    ]
                ],
                'order' => 1,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Elementary School Program',
                    'fr' => 'Programme Élémentaire'
                ],
                'slug' => 'elementary-school-program',
                'level' => 'elementary',
                'description' => [
                    'en' => 'Our elementary program builds strong academic foundations in core subjects while fostering critical thinking and problem-solving skills.',
                    'fr' => 'Notre programme élémentaire construit des bases académiques solides dans les matières principales tout en développant la pensée critique et les compétences en résolution de problèmes.'
                ],
                'objectives' => [
                    'en' => [
                        'Master fundamental academic skills',
                        'Develop critical thinking abilities',
                        'Build confidence in learning',
                        'Foster creativity and innovation',
                        'Prepare for middle school transition'
                    ],
                    'fr' => [
                        'Maîtriser les compétences académiques fondamentales',
                        'Développer les capacités de pensée critique',
                        'Construire la confiance en soi',
                        'Favoriser la créativité et l\'innovation',
                        'Se préparer à la transition vers le collège'
                    ]
                ],
                'curriculum' => [
                    'en' => [
                        'Mathematics',
                        'Language Arts',
                        'Science',
                        'Social Studies',
                        'Foreign Languages',
                        'Art and Music',
                        'Physical Education'
                    ],
                    'fr' => [
                        'Mathématiques',
                        'Langue française',
                        'Sciences',
                        'Études sociales',
                        'Langues étrangères',
                        'Arts plastiques et musique',
                        'Éducation physique'
                    ]
                ],
                'order' => 2,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Middle School Program',
                    'fr' => 'Programme Collège'
                ],
                'slug' => 'middle-school-program',
                'level' => 'middle',
                'description' => [
                    'en' => 'Our middle school program bridges elementary and secondary education, preparing students for advanced academic challenges while developing independence.',
                    'fr' => 'Notre programme de collège fait le lien entre l\'école élémentaire et le lycée, préparant les élèves à des défis académiques avancés tout en développant leur autonomie.'
                ],
                'objectives' => [
                    'en' => [
                        'Strengthen academic rigor',
                        'Develop study and organizational skills',
                        'Prepare for advanced coursework',
                        'Build leadership qualities',
                        'Encourage personal growth'
                    ],
                    'fr' => [
                        'Renforcer la rigueur académique',
                        'Développer les compétences d\'étude et d\'organisation',
                        'Se préparer aux cours avancés',
                        'Développer les qualités de leadership',
                        'Encourager le développement personnel'
                    ]
                ],
                'curriculum' => [
                    'en' => [
                        'Advanced Mathematics',
                        'Literature and Composition',
                        'Physical Sciences',
                        'History and Geography',
                        'Foreign Languages',
                        'Technology and Computing',
                        'Elective Courses'
                    ],
                    'fr' => [
                        'Mathématiques avancées',
                        'Littérature et composition',
                        'Sciences physiques',
                        'Histoire et géographie',
                        'Langues étrangères',
                        'Technologie et informatique',
                        'Cours optionnels'
                    ]
                ],
                'order' => 3,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'High School Program',
                    'fr' => 'Programme Lycée'
                ],
                'slug' => 'high-school-program',
                'level' => 'secondary',
                'description' => [
                    'en' => 'Our high school program prepares students for university studies and future careers through rigorous academics and real-world applications.',
                    'fr' => 'Notre programme de lycée prépare les élèves aux études universitaires et aux carrières futures grâce à des enseignements rigoureux et des applications concrètes.'
                ],
                'objectives' => [
                    'en' => [
                        'Excel in advanced academic subjects',
                        'Prepare for university entrance exams',
                        'Develop professional skills',
                        'Engage in community service',
                        'Plan for career pathways'
                    ],
                    'fr' => [
                        'Exceller dans les matières académiques avancées',
                        'Se préparer aux examens d\'entrée universitaire',
                        'Développer les compétences professionnelles',
                        'S\'engager dans le service communautaire',
                        'Planifier les parcours professionnels'
                    ]
                ],
                'curriculum' => [
                    'en' => [
                        'Advanced Placement Courses',
                        'University Preparation',
                        'Research and Analysis',
                        'Advanced Sciences',
                        'Humanities and Social Sciences',
                        'Career Exploration',
                        'Community Service'
                    ],
                    'fr' => [
                        'Cours avancés',
                        'Préparation universitaire',
                        'Recherche et analyse',
                        'Sciences avancées',
                        'Humanités et sciences sociales',
                        'Exploration de carrière',
                        'Service communautaire'
                    ]
                ],
                'order' => 4,
                'is_active' => true
            ]
        ];

        foreach ($programs as $program) {
            Program::create($program);
        }
    }
}
