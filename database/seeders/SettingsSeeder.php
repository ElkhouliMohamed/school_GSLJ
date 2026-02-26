<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General
            [
                'key' => 'site_name',
                'value' => ['en' => 'GSPB Les Jumelles', 'fr' => 'GSPB Les Jumelles'],
                'type' => 'text',
            ],
            [
                'key' => 'contact_email',
                'value' => ['en' => 'lesjumelles221@gmail.com', 'fr' => 'lesjumelles221@gmail.com'],
                'type' => 'text',
            ],
            [
                'key' => 'contact_phone',
                'value' => ['en' => '338378017 / 777677775 / 765598979', 'fr' => '338378017 / 777677775 / 765598979'],
                'type' => 'text',
            ],
            [
                'key' => 'contact_address',
                'value' => ['en' => 'COMICO 4, YEUMBEUL NEAR MILITARY CAMP WALL', 'fr' => 'COMICO 4, YEUMBEUL PRÈS DU MUR DU CAMP MILITAIRE'],
                'type' => 'textarea', // Changed to textarea for potential multiline
            ],
            [
                'key' => 'facebook_url',
                'value' => ['en' => '#', 'fr' => '#'],
                'type' => 'text',
            ],
            [
                'key' => 'youtube_url', // Added based on context
                'value' => ['en' => '#', 'fr' => '#'],
                'type' => 'text',
            ],

            // Documents
            [
                'key' => 'registration_pdf',
                'value' => ['en' => '', 'fr' => ''],
                'type' => 'file',
            ],
            [
                'key' => 'rules_pdf',
                'value' => ['en' => '', 'fr' => ''],
                'type' => 'file',
            ],

            // Home - Why Choose Us
            [
                'key' => 'why_us_title',
                'value' => ['en' => 'Why Choose GSPB Les Jumelles?', 'fr' => 'Pourquoi Choisir le GSLJ ?'],
                'type' => 'text',
            ],
            [
                'key' => 'why_us_description',
                'value' => ['en' => 'The Groupe Scolaire Privé Bilingue LES JUMELLES offers a unique learning framework, combining academic rigor and personal fulfillment.', 'fr' => 'Le Groupe Scolaire Privé Bilingue LES JUMELLES offre un cadre d\'apprentissage unique, alliant rigueur académique et épanouissement personnel.'],
                'type' => 'textarea',
            ],
            [
                'key' => 'why_us_point_1',
                'value' => ['en' => '100% Success in Baccalaureate', 'fr' => '100% de réussite au Baccalauréat'],
                'type' => 'text',
            ],
            [
                'key' => 'why_us_point_2',
                'value' => ['en' => 'Exceptional International Openness', 'fr' => 'Une ouverture internationale exceptionnelle'],
                'type' => 'text',
            ],
            [
                'key' => 'why_us_point_3',
                'value' => ['en' => 'State-of-the-art Sports and Cultural Infrastructures', 'fr' => 'Des infrastructures sportives et culturelles de pointe'],
                'type' => 'text',
            ],
            [
                'key' => 'why_us_point_4',
                'value' => ['en' => 'A World Network AEFE with 500 High Schools', 'fr' => 'Un réseau mondial AEFE fort de 500 lycées'],
                'type' => 'text',
            ],
            [
                'key' => 'why_us_cta_text',
                'value' => ['en' => 'Register Now!', 'fr' => 'Inscrivez-vous !'],
                'type' => 'text',
            ],
            [
                'key' => 'why_us_floating_text',
                'value' => ['en' => 'Excellence & Partage', 'fr' => 'Excellence & Partage'],
                'type' => 'text',
            ],
            // Added Image
            [
                'key' => 'why_us_image',
                'value' => ['en' => 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'fr' => 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                'type' => 'image',
            ],

            // Home - Hero
            [
                'key' => 'hero_title',
                'value' => ['en' => 'Excellence in Education', 'fr' => 'L\'Excellence Éducative'],
                'type' => 'text',
            ],
            [
                'key' => 'hero_description',
                'value' => [
                    'en' => 'Forming competent, responsible, and open-minded students.',
                    'fr' => 'Former des élèves compétents, responsables et ouverts sur le monde.'
                ],
                'type' => 'textarea',
            ],
            [
                'key' => 'hero_image',
                'value' => ['en' => '/images/gslj/hero.jpg', 'fr' => '/images/gslj/hero.jpg'],
                'type' => 'image',
            ],

            // Home - Info Section ("Notre Établissement")
            [
                'key' => 'info_title',
                'value' => ['en' => 'Notre <br /> Établissement', 'fr' => 'Notre <br /> Établissement'],
                'type' => 'text',
            ],
            [
                'key' => 'info_description',
                'value' => [
                    'en' => "Situé à Dakar depuis 2019, le Groupe Scolaire Privé Bilingue LES JUMELLES dispense un enseignement d'excellence conforme aux programmes français, de la maternelle à la terminale.\nPartenaire de l'AEFE, nous accueillons plus de 2500 élèves de toutes nationalités dans un cadre exceptionnel propice à l'épanouissement et à la réussite.",
                    'fr' => "Situé à Dakar depuis 2019, le Groupe Scolaire Privé Bilingue LES JUMELLES dispense un enseignement d'excellence conforme aux programmes français, de la maternelle à la terminale.\nPartenaire de l'AEFE, nous accueillons plus de 2500 élèves de toutes nationalités dans un cadre exceptionnel propice à l'épanouissement et à la réussite."
                ],
                'type' => 'textarea',
            ],
            [
                'key' => 'info_motto',
                'value' => ['en' => 'Excellence, Partage et Engagement sont les valeurs qui nous animent chaque jour.', 'fr' => 'Excellence, Partage et Engagement sont les valeurs qui nous animent chaque jour.'],
                'type' => 'textarea',
            ],
            [
                'key' => 'info_cta_text',
                'value' => ['en' => "Découvrir l'établissement", 'fr' => "Découvrir l'établissement"],
                'type' => 'text',
            ],
            [
                'key' => 'info_image',
                'value' => ['en' => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'fr' => 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
                'type' => 'image',
            ],

            // Home - Directors Word
            [
                'key' => 'director_title',
                'value' => ['en' => 'Word from the Director', 'fr' => 'Le Mot du Directeur'],
                'type' => 'text',
            ],
            [
                'key' => 'director_name',
                'value' => ['en' => 'M. Ahmadou', 'fr' => 'M. Ahmadou'],
                'type' => 'text',
            ],
            [
                'key' => 'director_role',
                'value' => ['en' => 'School Director', 'fr' => 'Directeur de l\'école'],
                'type' => 'text',
            ],
            [
                'key' => 'director_content',
                'value' => [
                    'en' => 'Our educational action is based on fundamental values: Discipline, Respect, Work well done, Responsibility, Solidarity, Excellence, Integrity.',
                    'fr' => 'Notre action éducative repose sur des valeurs fondamentales : Discipline, Respect, Travail bien fait, Responsabilité, Solidarité, Excellence, Intégrité.'
                ],
                'type' => 'textarea',
            ],
            [
                'key' => 'director_image',
                'value' => ['en' => '/images/gslj/director.jpg', 'fr' => '/images/gslj/director.jpg'],
                'type' => 'image',
            ],

            // Home - Video
            [
                'key' => 'video_title',
                'value' => ['en' => 'Discover GSPB Les Jumelles', 'fr' => 'Découvrez GSPB Les Jumelles'],
                'type' => 'text',
            ],
            [
                'key' => 'video_description',
                'value' => ['en' => 'A modern and functional space dedicated to learning.', 'fr' => 'Un espace moderne et fonctionnel, dédié à l\'apprentissage.'],
                'type' => 'textarea',
            ],
            [
                'key' => 'video_url',
                'value' => ['en' => 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'fr' => 'https://www.youtube.com/embed/dQw4w9WgXcQ'],
                'type' => 'text',
            ],

            // Home - News & Events & Stats Titles
            [
                'key' => 'news_title',
                'value' => ['en' => 'Latest News', 'fr' => 'Dernières Actualités'],
                'type' => 'text',
            ],
            [
                'key' => 'news_description',
                'value' => ['en' => 'Follow our latest updates and activities.', 'fr' => 'Suivez nos dernières mises à jour et activités.'],
                'type' => 'textarea',
            ],
            [
                'key' => 'events_title',
                'value' => ['en' => 'Upcoming Events', 'fr' => 'Événements à Venir'],
                'type' => 'text',
            ],
            [
                'key' => 'events_description',
                'value' => ['en' => 'Don\'t miss our upcoming school events.', 'fr' => 'Ne manquez pas nos prochains événements scolaires.'],
                'type' => 'textarea',
            ],
            [
                'key' => 'events_section_image',
                'value' => ['en' => '/images/gslj/events/bg-events.jpg', 'fr' => '/images/gslj/events/bg-events.jpg'],
                'type' => 'image',
            ],
            [
                'key' => 'stats_title',
                'value' => ['en' => 'Our Impact', 'fr' => 'Notre Impact'],
                'type' => 'text',
            ],
            [
                'key' => 'stats_description',
                'value' => ['en' => 'Years of excellence in education.', 'fr' => 'Des années d\'excellence dans l\'éducation.'],
                'type' => 'textarea',
            ],
            [
                'key' => 'partners_title',
                'value' => ['en' => 'Our Partners', 'fr' => 'Nos Partenaires'],
                'type' => 'text',
            ],
            [
                'key' => 'partners_description',
                'value' => ['en' => 'Working together for success.', 'fr' => 'Travailler ensemble pour la réussite.'],
                'type' => 'textarea',
            ],


            // About Page
            [
                'key' => 'about_title',
                'value' => [
                    'en' => 'History & Values',
                    'fr' => 'Historique & Valeurs'
                ],
                'type' => 'text',
            ],
            [
                'key' => 'about_content',
                'value' => [
                    'en' => "Founded with the aim of offering quality education, our school was born from the desire to train competent, responsible, and open-minded students. Since its creation, the establishment has been committed to accompanying children at every stage of their school journey, focusing on academic rigor, discipline, and human values. Over the years, our school has earned the trust of parents thanks to satisfactory results and serious pedagogical supervision.\n\nOur Mission:\nOur mission is to ensure a solid academic training compliant with official programs, foster the intellectual, moral, and social fulfillment of each student, develop autonomy, creativity, and a sense of responsibility, and offer a healthy, secure, and disciplined learning environment.\n\nOur Vision:\nWe aspire to be a reference school in training responsible citizens, an establishment recognized for the excellence of its teaching, and an educational framework that prepares students for tomorrow's school, social, and professional challenges. Our vision is to train learners capable of succeeding locally and internationally.\n\nOur Values:\nOur educational action is based on fundamental values: Discipline, Respect, Work well done, Responsibility, Solidarity, Excellence, Integrity. These values guide the behavior of students, teachers, and the entire educational community.",
                    'fr' => "Historique\nFondée dans le but d’offrir une éducation de qualité, notre école est née de la volonté de former des élèves compétents, responsables et ouverts sur le monde.\nDepuis sa création, l’établissement s’est engagé à accompagner les enfants à chaque étape de leur parcours scolaire, en mettant l’accent sur la rigueur académique, la discipline et les valeurs humaines.\nAu fil des années, notre école a su gagner la confiance des parents grâce à des résultats satisfaisants et un encadrement pédagogique sérieux.\n\nNotre Mission\nNotre mission est de :\nAssurer une formation académique solide conforme aux programmes officiels\nFavoriser l’épanouissement intellectuel, moral et social de chaque élève\nDévelopper l’autonomie, la créativité et le sens des responsabilités\nOffrir un cadre d’apprentissage sain, sécurisé et discipliné\n\nNotre Vision\nNous aspirons à être :\nUne école de référence dans la formation de citoyens responsables\nUn établissement reconnu pour l’excellence de son enseignement\nUn cadre éducatif qui prépare les élèves aux défis scolaires, sociaux et professionnels de demain\nNotre vision est de former des apprenants capables de réussir localement et internationalement.\n\n🤝 Nos Valeurs\nNotre action éducative repose sur des valeurs fondamentales :\nDiscipline\nRespect\nTravail bien fait\nResponsabilité\nSolidarité\nExcellence\nIntégrité\nCes valeurs guident le comportement des élèves, des enseignants et de toute la communauté éducative."
                ],
                'type' => 'textarea',
            ],
            [
                'key' => 'about_mission_title',
                'value' => [
                    'en' => 'Our Mission',
                    'fr' => 'Notre Mission'
                ],
                'type' => 'text',
            ],
            [
                'key' => 'about_mission_content',
                'value' => [
                    'en' => "Our commitment is to nurture passion, desire, and thirst for learning. We form character through values, and rigor through work; developing self-confidence and curiosity to go further are at the heart of our project.\n\nEnabling mind fulfillment through the cultivation of taste, awakening intellectual curiosity, and developing all potentials in harmony with one's environment.\n\nTraining future performers, future managers fully fulfilled and conscious of their responsibilities as business leaders in a changing industry environment.",
                    'fr' => "Notre engagement est de nourrir la passion, l'envie et la soif d'apprendre. Nous formons le caractère par les valeurs, et la rigueur par le travail, le développement de la confiance en soi et la curiosité d'aller plus loin sont au cœur de notre projet.\n\nPermettre un épanouissement de l'esprit, par la culture du goût, l'éveil à la curiosité intellectuelle et le développement de tous les potentiels en harmonie avec son milieu.\n\nFormer de futurs performance, futurs gestionnaires pleinement épanouis conscients de leurs responsabilités de meneur d'entreprise dans un environnement changeant de l'industrie."
                ],
                'type' => 'textarea',
            ],
            [
                'key' => 'about_mission_image',
                'value' => [
                    'en' => 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'fr' => 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                'type' => 'image',
            ],
            [
                'key' => 'about_image',
                'value' => [
                    'en' => '/images/gslj/about.jpg',
                    'fr' => '/images/gslj/about.jpg'
                ],
                'type' => 'image',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
