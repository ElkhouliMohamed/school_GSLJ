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
                    'en' => 'At GSPB Les Jumelles, the middle school cycle corresponds to the 6th, 5th, 4th, and 3rd grades. It is a pivotal stage where students consolidate their elementary cycle achievements and prepare for orientation towards high school or vocational training. At the end of the cycle, students take the BFEM exam.',
                    'fr' => 'Au Groupe Scolaire Privé Bilingue Les Jumelles, le cycle moyen correspond aux classes de 6ᵉ, 5ᵉ, 4ᵉ et 3ᵉ. C’est une étape charnière où les élèves consolident leurs acquis du cycle élémentaire et se préparent à l’orientation vers le lycée ou la formation professionnelle. À la fin du cycle, les élèves se présentent au BFEM.'
                ],
                'objectives' => [
                    'en' => [
                        'Deepen knowledge in mathematics, sciences, letters, and languages',
                        'Develop autonomy, critical thinking, and working methods',
                        'Initiate students to ICT (Information and Communication Technologies)',
                        'Foster cultural, artistic, and sporting awakening',
                        'Prepare for the BFEM exam'
                    ],
                    'fr' => [
                        'Approfondir les connaissances en mathématiques, sciences, lettres et langues',
                        'Développer l’autonomie, l’esprit critique et les méthodes de travail',
                        'Initier les élèves aux TIC (Technologies de l’Information et de la Communication)',
                        'Favoriser l’éveil culturel, artistique et sportif',
                        'Préparer au Brevet de fin d\'études Moyennes (BFEM)'
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
            Program::updateOrCreate(
                ['slug' => $program['slug']],
                $program
            );
        }
    }
}
