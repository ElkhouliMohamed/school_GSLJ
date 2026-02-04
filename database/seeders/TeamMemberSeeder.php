<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeamMember;

class TeamMemberSeeder extends Seeder
{
    public function run()
    {
        // Truncate existing records to remove old data
        TeamMember::query()->delete();

        $teamMembers = [
            [
                'name' => [
                    'en' => 'Papa Malang SANÉ',
                    'fr' => 'Papa Malang SANÉ'
                ],
                'slug' => 'papa-malang-sane',
                'position' => [
                    'en' => 'Director and Accounting Manager',
                    'fr' => 'Directeur et Gestionnaire de la comptabilité'
                ],
                'department' => 'administration',
                'bio' => [
                    'en' => 'Ensures the smooth running of the school through effective coordination. Manages student payments with rigor and transparency, contributing to financial stability. Promotes cohesion and a healthy professional climate among colleagues. His leadership contributes to excellent exam results.',
                    'fr' => 'M. SANÉ veille à la bonne marche de l\'établissement à travers une coordination efficace de ses collaborateurs. Il assure avec rigueur et transparence la gestion des paiements des élèves, contribuant ainsi à la stabilité administrative et financière de l\'école. Attaché aux valeurs de cohésion, d’entente entre collègues et de rigueur dans le travail, il encourage un climat professionnel sain et motivant. Son leadership et son sens de l’organisation favorisent l’atteinte d’excellents résultats aux examens.'
                ],
                'email' => 'direction@gslj.sn',
                'phone' => '+221330000001',
                'qualifications' => [
                    'en' => [
                        'Licence in English (UCAD)',
                        'Licence in Accounting and Management (ESP)'
                    ],
                    'fr' => [
                        'Licence en Anglais (UCAD)',
                        'Licence en Comptabilité et Gestion (ESP)'
                    ]
                ],
                'specialties' => [
                    'en' => ['School Administration', 'Accounting', 'Management'],
                    'fr' => ['Administration Scolaire', 'Comptabilité', 'Gestion']
                ],
                'order' => 1,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Waly FAYE',
                    'fr' => 'Waly FAYE'
                ],
                'slug' => 'waly-faye',
                'position' => [
                    'en' => 'Head of Elementary Cycle & CM2 Teacher',
                    'fr' => 'Responsable du cycle élémentaire et enseignant de la classe de CM2'
                ],
                'department' => 'teaching',
                'bio' => [
                    'en' => 'Plays a decisive role in the pedagogical supervision of students and teachers. Has been congratulated by the IEF of Keur Massar for excellent results at the CFEE exams. He is invested in monitoring learning and the general functioning of the elementary cycle. Described as a pillar of the school\'s success due to his leadership and dedication.',
                    'fr' => 'Très engagé et toujours disponible, il joue un rôle déterminant dans l’encadrement pédagogique des élèves et l’accompagnement des enseignants du cycle élémentaire. Son implication constante a largement contribué aux excellents résultats obtenus au CFEE, résultats pour lesquels il a été à plusieurs reprises félicité par l’IEF de Keur Massar. Veillant rigoureusement à la bonne marche du cycle élémentaire, il s’investit pleinement dans le suivi des apprentissages et le bon fonctionnement général du cycle.'
                ],
                'email' => 'elementaire@gslj.sn',
                'phone' => '+221330000002',
                'qualifications' => [
                    'en' => [
                        'CAP (Certificat d\'Aptitude Pédagogique)'
                    ],
                    'fr' => [
                        'CAP (Certificat d’Aptitude Pédagogique)'
                    ]
                ],
                'specialties' => [
                    'en' => ['Elementary Education', 'Pedagogical Supervision'],
                    'fr' => ['Éducation Élémentaire', 'Encadrement Pédagogique']
                ],
                'order' => 2,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Monsieur Diarra',
                    'fr' => 'Monsieur Diarra'
                ],
                'slug' => 'monsieur-diarra',
                'position' => [
                    'en' => 'General Supervisor & Physics-Chemistry Professor',
                    'fr' => 'Surveillant général et Professeur de Physique-Chimie'
                ],
                'department' => 'teaching',
                'bio' => [
                    'en' => 'Recognized for his rigor, discipline, and commitment to work. Actively participates in the preparation of BFEM candidates, achieving satisfactory and constant results. His professionalism is a major asset for the quality of teaching.',
                    'fr' => 'M. Diarra est reconnu pour sa grande rigueur, son sens élevé de la discipline et son attachement au travail bien fait. Très engagé dans l’accompagnement pédagogique des élèves, il participe activement à la préparation et à la réussite des candidats au BFEM, avec des résultats satisfaisants et constants. Son professionnalisme et son sérieux constituent un atout majeur pour la qualité de l’enseignement.'
                ],
                'email' => 'surveillant@gslj.sn',
                'phone' => '+221330000003',
                'qualifications' => [
                    'en' => [
                        'Master 1 in Physical Sciences Education (UCAD)'
                    ],
                    'fr' => [
                        'Master 1 en enseignement des Sciences Physiques (UCAD)'
                    ]
                ],
                'specialties' => [
                    'en' => ['Physics', 'Chemistry', 'Discipline Management'],
                    'fr' => ['Physique', 'Chimie', 'Gestion de la Discipline']
                ],
                'order' => 3,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Mme PREIRA (Anna Basse)',
                    'fr' => 'Mme PREIRA (Anna Basse)'
                ],
                'slug' => 'mme-preira-anna-basse',
                'position' => [
                    'en' => 'CI Teacher',
                    'fr' => 'Enseignante de la classe de CI'
                ],
                'department' => 'teaching',
                'bio' => [
                    'en' => 'Dedicated to the education of toddlers, guiding them into reading and writing. Described as punctual, devoted, professional, and gentle. Creates a reassuring and stimulating climate that fosters curiosity and a love for school.',
                    'fr' => 'Depuis de nombreuses années, elle se consacre avec passion à l’éducation des tout-petits, les accompagnant patiemment dans leurs premiers pas vers la lecture et l’écriture. Ponctuelle, dévouée et très professionnelle, Mme Pereira fait preuve d’une grande douceur et d’un sens pédagogique remarquable. Elle sait instaurer un climat rassurant et stimulant, favorisant l’éveil, la curiosité et l’amour de l’école chez ses élèves.'
                ],
                'email' => 'ci@gslj.sn',
                'phone' => '+221330000004',
                'qualifications' => [
                    'en' => [
                        'CEAP (Certificat Élémentaire d\'Aptitude Pédagogique)'
                    ],
                    'fr' => [
                        'CEAP (Certificat Élémentaire d’Aptitude Pédagogique)'
                    ]
                ],
                'specialties' => [
                    'en' => ['Early Childhood Education', 'Reading and Writing Initiation'],
                    'fr' => ['Éducation de la Petite Enfance', 'Initiation à la Lecture et l\'Écriture']
                ],
                'order' => 4,
                'is_active' => true
            ],
            [
                'name' => [
                    'en' => 'Seynabou Sarr',
                    'fr' => 'Seynabou Sarr'
                ],
                'slug' => 'seynabou-sarr',
                'position' => [
                    'en' => 'Head of Preschool & Grande Section Teacher',
                    'fr' => 'Responsable du préscolaire et maîtresse de la Grande Section'
                ],
                'department' => 'teaching',
                'bio' => [
                    'en' => 'An experienced and serious teacher committed to the awakening and supervision of toddlers. Ensures the smooth running of preschool learning with rigor and benevolence. Contributes to building a solid foundation for the students\' future schooling.',
                    'fr' => 'Enseignante expérimentée, sérieuse et engagée, Madame Sarr met son savoir-faire pédagogique au service de l’éveil, de l’encadrement et de la réussite des tout-petits. Elle veille avec rigueur et bienveillance au bon déroulement des apprentissages au préscolaire, contribuant ainsi à une base solide pour la scolarité des élèves.'
                ],
                'email' => 'prescolaire@gslj.sn',
                'phone' => '+221330000005',
                'qualifications' => [
                    'en' => [
                        'Holder of a CAP'
                    ],
                    'fr' => [
                        'Titulaire du CAP'
                    ]
                ],
                'specialties' => [
                    'en' => ['Preschool Education', 'Child Development'],
                    'fr' => ['Éducation Préscolaire', 'Développement de l\'Enfant']
                ],
                'order' => 5,
                'is_active' => true
            ]
        ];

        foreach ($teamMembers as $teamMember) {
            TeamMember::create($teamMember);
        }
    }
}
