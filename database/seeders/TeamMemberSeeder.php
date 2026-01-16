<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeamMember;

class TeamMemberSeeder extends Seeder
{
    public function run()
    {
        $teamMembers = [
            [
                'name' => [
                    'en' => 'Dr. Amadou Diop',
                    'fr' => 'Dr. Amadou Diop'
                ],
                'slug' => 'dr-amadou-diop',
                'position' => [
                    'en' => 'School Principal',
                    'fr' => 'Directeur de l\'École'
                ],
                'department' => 'administration',
                'bio' => [
                    'en' => 'Experienced educator with over 15 years in educational leadership, dedicated to academic excellence and student success.',
                    'fr' => 'Éducateur expérimenté avec plus de 15 ans dans le leadership éducatif, dédié à l\'excellence académique et au succès des élèves.'
                ],
                'email' => 'principal@gslj.sn',
                'phone' => '+221330000001',
                'qualifications' => [
                    'en' => [
                        'PhD in Educational Leadership',
                        'Masters in Curriculum Development',
                        'Bachelor of Education',
                        'Certified School Administrator'
                    ],
                    'fr' => [
                        'Doctorat en Leadership Éducatif',
                        'Master en Développement de Programme',
                        'Licence en Éducation',
                        'Administrateur Scolaire Certifié'
                    ]
                ],
                'specialties' => [
                    'en' => ['Educational Leadership', 'Curriculum Development', 'School Management'],
                    'fr' => ['Leadership Éducatif', 'Développement de Programme', 'Gestion Scolaire']
                ],
                'order' => 1,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Fatou Ndiaye',
                    'fr' => 'Fatou Ndiaye'
                ],
                'slug' => 'fatou-ndiaye',
                'position' => [
                    'en' => 'Deputy Principal',
                    'fr' => 'Adjointe du Directeur'
                ],
                'department' => 'administration',
                'bio' => [
                    'en' => 'Passionate administrator with expertise in student affairs and academic planning, focusing on holistic student development.',
                    'fr' => 'Administratrice passionnée avec expertise en affaires étudiantes et en planification académique, axée sur le développement holistique des élèves.'
                ],
                'email' => 'deputy@gslj.sn',
                'phone' => '+221330000002',
                'qualifications' => [
                    'en' => [
                        'Master in Educational Administration',
                        'Bachelor of Science in Education',
                        'Certified Teacher',
                        'Leadership Development Certificate'
                    ],
                    'fr' => [
                        'Master en Administration Éducative',
                        'Licence en Sciences de l\'Éducation',
                        'Professeur Certifié',
                        'Certificat en Développement du Leadership'
                    ]
                ],
                'specialties' => [
                    'en' => ['Student Affairs', 'Academic Planning', 'Educational Policy'],
                    'fr' => ['Affaires Étudiantes', 'Planification Académique', 'Politique Éducative']
                ],
                'order' => 2,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Mamadou Diallo',
                    'fr' => 'Mamadou Diallo'
                ],
                'slug' => 'mamadou-diallo',
                'position' => [
                    'en' => 'Head of Preschool Department',
                    'fr' => 'Chef du Département Préscolaire'
                ],
                'department' => 'teaching',
                'bio' => [
                    'en' => 'Specialized early childhood educator with extensive experience in play-based learning and child development.',
                    'fr' => 'Éducateur spécialisé de la petite enfance avec une vaste expérience dans l\'apprentissage par le jeu et le développement de l\'enfant.'
                ],
                'email' => 'preschool-head@gslj.sn',
                'phone' => '+221330000003',
                'qualifications' => [
                    'en' => [
                        'Master in Early Childhood Education',
                        'Bachelor of Education',
                        'Child Development Specialist Certification',
                        'Play Therapy Training'
                    ],
                    'fr' => [
                        'Master en Éducation de la Petite Enfance',
                        'Licence en Éducation',
                        'Certificat de Spécialiste en Développement de l\'Enfant',
                        'Formation en Thérapie par le Jeu'
                    ]
                ],
                'specialties' => [
                    'en' => ['Early Childhood Development', 'Play-Based Learning', 'Child Psychology'],
                    'fr' => ['Développement de la Petite Enfance', 'Apprentissage par le Jeu', 'Psychologie de l\'Enfant']
                ],
                'order' => 3,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Aminata Fall',
                    'fr' => 'Aminata Fall'
                ],
                'slug' => 'aminata-fall',
                'position' => [
                    'en' => 'Head of Elementary Department',
                    'fr' => 'Chef du Département Élémentaire'
                ],
                'department' => 'teaching',
                'bio' => [
                    'en' => 'Experienced elementary educator specializing in foundational literacy and numeracy, passionate about nurturing young learners.',
                    'fr' => 'Éducatrice primaire expérimentée spécialisée dans la lecture et les mathématiques de base, passionnée par l\'éducation des jeunes apprenants.'
                ],
                'email' => 'elementary-head@gslj.sn',
                'phone' => '+221330000004',
                'qualifications' => [
                    'en' => [
                        'Master in Elementary Education',
                        'Bachelor of Arts in Education',
                        'Certified Elementary Teacher',
                        'Reading Specialist Certificate'
                    ],
                    'fr' => [
                        'Master en Éducation Élémentaire',
                        'Licence en Arts Éducatifs',
                        'Professeur Élémentaire Certifié',
                        'Certificat de Spécialiste en Lecture'
                    ]
                ],
                'specialties' => [
                    'en' => ['Elementary Education', 'Literacy Development', 'Mathematics Instruction'],
                    'fr' => ['Éducation Élémentaire', 'Développement de la Lecture', 'Instruction en Mathématiques']
                ],
                'order' => 4,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Cheikh Sow',
                    'fr' => 'Cheikh Sow'
                ],
                'slug' => 'cheikh-sow',
                'position' => [
                    'en' => 'Head of Middle School Department',
                    'fr' => 'Chef du Département du Collège'
                ],
                'department' => 'teaching',
                'bio' => [
                    'en' => 'Middle school specialist with expertise in adolescent development and transition management between elementary and secondary education.',
                    'fr' => 'Spécialiste du collège avec expertise en développement des adolescents et gestion de la transition entre l\'école élémentaire et le lycée.'
                ],
                'email' => 'middle-head@gslj.sn',
                'phone' => '+221330000005',
                'qualifications' => [
                    'en' => [
                        'Master in Middle Grades Education',
                        'Bachelor of Science in Education',
                        'Adolescent Development Certificate',
                        'Transition Planning Specialist'
                    ],
                    'fr' => [
                        'Master en Éducation des Cycles Moyens',
                        'Licence en Sciences de l\'Éducation',
                        'Certificat en Développement des Adolescents',
                        'Spécialiste en Planification de Transition'
                    ]
                ],
                'specialties' => [
                    'en' => ['Middle School Education', 'Adolescent Development', 'Transition Management'],
                    'fr' => ['Éducation du Collège', 'Développement des Adolescents', 'Gestion de Transition']
                ],
                'order' => 5,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Mariama Gueye',
                    'fr' => 'Mariama Gueye'
                ],
                'slug' => 'mariama-gueye',
                'position' => [
                    'en' => 'Head of High School Department',
                    'fr' => 'Chef du Département du Lycée'
                ],
                'department' => 'teaching',
                'bio' => [
                    'en' => 'High school expert focused on college preparation and career readiness, with extensive experience in AP courses and university counseling.',
                    'fr' => 'Expert du lycée axé sur la préparation universitaire et l\'orientation professionnelle, avec une vaste expérience dans les cours AP et l\'orientation universitaire.'
                ],
                'email' => 'highschool-head@gslj.sn',
                'phone' => '+221330000006',
                'qualifications' => [
                    'en' => [
                        'Master in Secondary Education',
                        'Bachelor of Arts in Education',
                        'University Counseling Certificate',
                        'Advanced Placement Teacher Training'
                    ],
                    'fr' => [
                        'Master en Éducation Secondaire',
                        'Licence en Arts Éducatifs',
                        'Certificat en Orientation Universitaire',
                        'Formation des Professeurs des Cours Avancés'
                    ]
                ],
                'specialties' => [
                    'en' => ['Secondary Education', 'College Preparation', 'Career Guidance'],
                    'fr' => ['Éducation Secondaire', 'Préparation Universitaire', 'Orientation Professionnelle']
                ],
                'order' => 6,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Abdoulaye Mbengue',
                    'fr' => 'Abdoulaye Mbengue'
                ],
                'slug' => 'abdoulaye-mbengue',
                'position' => [
                    'en' => 'Transportation Coordinator',
                    'fr' => 'Coordinateur du Transport'
                ],
                'department' => 'support',
                'bio' => [
                    'en' => 'Transportation specialist ensuring safe and efficient student transportation with focus on security and punctuality.',
                    'fr' => 'Spécialiste du transport assurant un transport d\'élèves sûr et efficace avec un accent sur la sécurité et la ponctualité.'
                ],
                'email' => 'transport-coordinator@gslj.sn',
                'phone' => '+221330000007',
                'qualifications' => [
                    'en' => [
                        'Bachelor in Logistics Management',
                        'Commercial Driver License',
                        'Safety Management Certificate',
                        'Transportation Security Training'
                    ],
                    'fr' => [
                        'Licence en Gestion Logistique',
                        'Permis de Conduire Commercial',
                        'Certificat en Gestion de la Sécurité',
                        'Formation en Sécurité du Transport'
                    ]
                ],
                'specialties' => [
                    'en' => ['Student Transportation', 'Safety Management', 'Logistics Coordination'],
                    'fr' => ['Transport des Élèves', 'Gestion de la Sécurité', 'Coordination Logistique']
                ],
                'order' => 7,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Khady Diallo',
                    'fr' => 'Khady Diallo'
                ],
                'slug' => 'khady-diallo',
                'position' => [
                    'en' => 'Catering Manager',
                    'fr' => 'Gestionnaire de la Restauration'
                ],
                'department' => 'support',
                'bio' => [
                    'en' => 'Nutrition and catering expert dedicated to providing healthy and nutritious meals for students with diverse dietary needs.',
                    'fr' => 'Expert en nutrition et restauration dédié à la fourniture de repas sains et nutritifs pour les élèves avec divers besoins diététiques.'
                ],
                'email' => 'catering-manager@gslj.sn',
                'phone' => '+221330000008',
                'qualifications' => [
                    'en' => [
                        'Degree in Nutrition Science',
                        'Food Safety and Hygiene Certificate',
                        'Catering Management Diploma',
                        'Dietary Planning Certification'
                    ],
                    'fr' => [
                        'Diplôme en Sciences de la Nutrition',
                        'Certificat en Sécurité et Hygiène Alimentaires',
                        'Diplôme en Gestion de la Restauration',
                        'Certification en Planification Diététique'
                    ]
                ],
                'specialties' => [
                    'en' => ['Nutrition Planning', 'Food Safety', 'Dietary Management'],
                    'fr' => ['Planification Nutritionnelle', 'Sécurité Alimentaire', 'Gestion Diététique']
                ],
                'order' => 8,
                'is_active' => true
            ]
        ];

        foreach ($teamMembers as $teamMember) {
            TeamMember::create($teamMember);
        }
    }
}
