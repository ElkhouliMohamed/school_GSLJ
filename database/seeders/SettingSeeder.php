<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General
            'site_name' => ['en' => 'Groupe Scolaire Privé Bilingue Les Jumelles', 'fr' => 'Groupe Scolaire Privé Bilingue Les Jumelles'],
            'contact_email' => ['en' => 'contact@lesjumelles.sn', 'fr' => 'contact@lesjumelles.sn'],
            'contact_phone' => ['en' => '+221 33 000 00 00', 'fr' => '+221 33 000 00 00'],
            'address' => ['en' => 'Yeumbeul Comico 4, Dakar, Sénégal', 'fr' => 'Yeumbeul Comico 4, Dakar, Sénégal'],
            'facebook_url' => ['en' => 'https://facebook.com/lesjumelles', 'fr' => 'https://facebook.com/lesjumelles'],
            'twitter_url' => ['en' => 'https://twitter.com/lesjumelles', 'fr' => 'https://twitter.com/lesjumelles'],
            'instagram_url' => ['en' => 'https://instagram.com/lesjumelles', 'fr' => 'https://instagram.com/lesjumelles'],

            // Helper for SMTP
            'mail_mailer' => ['en' => 'smtp', 'fr' => 'smtp'],
            'mail_host' => ['en' => 'smtp.resend.com', 'fr' => 'smtp.resend.com'],
            'mail_port' => ['en' => '465', 'fr' => '465'],
            'mail_username' => ['en' => 'resend', 'fr' => 'resend'],
            'mail_password' => ['en' => 're_hkGTV8wP_CGfJWDMvcTTsLQpevV82NHGD', 'fr' => 're_hkGTV8wP_CGfJWDMvcTTsLQpevV82NHGD'],
            'mail_encryption' => ['en' => 'tls', 'fr' => 'tls'],
            'mail_from_address' => ['en' => 'noreplay@briefurl.app', 'fr' => 'noreplay@briefurl.app'],
            'mail_from_name' => ['en' => 'Groupe Scolaire Privé Bilingue Les Jumelles', 'fr' => 'Groupe Scolaire Privé Bilingue Les Jumelles'],

            // Home - Hero
            'hero_title' => [
                'en' => 'Welcome to Excellence',
                'fr' => 'Bienvenue à l\'Excellence'
            ],
            'hero_description' => [
                'en' => 'L\'Excellence Notre Credo - Quality bilingual education in Senegal',
                'fr' => 'L\'Excellence Notre Credo - Éducation bilingue de qualité au Sénégal'
            ],
            'hero_motto' => [
                'en' => 'L\'EXCELLENCE NOTRE CREDO',
                'fr' => 'L\'EXCELLENCE NOTRE CREDO'
            ],

            // Home - Directors Word
            'director_title' => ['en' => 'Principal\'s Message', 'fr' => 'Message du Directeur'],
            'director_name' => ['en' => 'Mr. Ahmadou Diallo', 'fr' => 'M. Ahmadou Diallo'],
            'director_role' => ['en' => 'School Principal', 'fr' => 'Directeur de l\'École'],
            'director_content' => [
                'en' => 'We are committed to providing quality bilingual education that prepares our students for success in a globalized world. Our dedicated team works tirelessly to ensure each student reaches their full potential.',
                'fr' => 'Nous nous engageons à fournir une éducation bilingue de qualité qui prépare nos élèves à réussir dans un monde globalisé. Notre équipe dévouée travaille sans relâche pour que chaque élève atteigne son plein potentiel.'
            ],

            // Home - Video Tour
            'video_title' => ['en' => 'Virtual Tour', 'fr' => 'Visite Virtuelle'],
            'video_description' => ['en' => 'Discover our modern campus in Dakar.', 'fr' => 'Découvrez notre campus moderne à Dakar.'],
            'video_url' => ['en' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'fr' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'],

            // Home - News
            'news_title' => ['en' => 'Latest News', 'fr' => 'Dernières Nouvelles'],
            'news_description' => ['en' => 'Stay updated with our school activities.', 'fr' => 'Restez informés de nos activités scolaires.'],

            // Home - Events
            'events_title' => ['en' => 'Latest News & Events', 'fr' => 'Dernières Actualités & Événements'],
            'events_description' => ['en' => 'Stay informed about what\'s happening in our school.', 'fr' => 'Restez informés de ce qui se passe dans notre établissement.'],

            // Home - Stats
            'stats_title' => ['en' => 'Our Achievements', 'fr' => 'Nos Réalisations'],
            'stats_description' => ['en' => 'Excellence in numbers.', 'fr' => 'L\'excellence en chiffres.'],

            // Home - Partners
            'partners_title' => ['en' => 'Our Partners', 'fr' => 'Nos Partenaires'],
            'partners_description' => ['en' => 'We collaborate with leading educational institutions.', 'fr' => 'Nous collaborons avec les meilleures institutions éducatives.'],

            // About Page
            'about_title' => ['en' => 'About Les Jumelles', 'fr' => 'Historique'],
            'about_content' => [
                'en' => 'Founded with a vision of educational excellence, Groupe Scolaire Les Jumelles has been a pillar of quality bilingual education in Yeumbeul, Dakar. We believe in a holistic approach to education, balancing academic rigor with character development.',
                'fr' => 'Fondé avec une vision d\'excellence éducative, le Groupe Scolaire Les Jumelles est un pilier de l\'éducation bilingue de qualité à Yeumbeul, Dakar. Nous croyons en une approche holistique de l\'éducation, équilibrant la rigueur académique avec le développement du caractère.'
            ],

            // Admissions Page
            'admissions_hero_title' => ['en' => 'Join Excellence', 'fr' => 'Rejoignez l\'Excellence'],
            'admissions_hero_description' => [
                'en' => 'Discover our admission process and take the first step toward a bright future. We welcome motivated and curious students from kindergarten to high school.',
                'fr' => 'Découvrez notre processus d\'admission et faites le premier pas vers un avenir brillant. Nous accueillons des élèves motivés et curieux de la maternelle au lycée.',
            ],
            'admissions_process_title' => ['en' => 'Procedure', 'fr' => 'Procédure'],
            'admissions_process_subtitle' => ['en' => 'How to enroll?', 'fr' => 'Comment s\'inscrire ?'],
            'admissions_process_description' => [
                'en' => 'Our admission process is designed to be simple and transparent.',
                'fr' => 'Notre processus d\'admission est conçu pour être simple et transparent.',
            ],
            'admissions_step_1_name' => ['en' => '1. Application File', 'fr' => '1. Dossier de candidature'],
            'admissions_step_1_description' => [
                'en' => 'Fill out the online pre-registration form or pick up a file at the school\'s secretary office.',
                'fr' => 'Remplissez le formulaire de pré-inscription en ligne ou retirez un dossier au secrétariat de l\'école.',
            ],
            'admissions_step_2_name' => ['en' => '2. Interview / Test', 'fr' => '2. Entretien / Test'],
            'admissions_step_2_description' => [
                'en' => 'A meeting with the teaching team and a level test (depending on the class) to evaluate prior knowledge.',
                'fr' => 'Une rencontre avec l\'équipe pédagogique et un test de niveau (selon la classe) pour évaluer les acquis.',
            ],
            'admissions_step_3_name' => ['en' => '3. Final Enrollment', 'fr' => '3. Inscription définitive'],
            'admissions_step_3_description' => [
                'en' => 'Once the file is approved, proceed with the registration fee payment to reserve the place.',
                'fr' => 'Après validation du dossier, procédez au règlement des frais d\'inscription pour réserver la place.',
            ],
            'admissions_docs_title' => ['en' => 'Required Documents', 'fr' => 'Documents Requis'],
            'admissions_docs_description' => [
                'en' => 'To complete enrollment, please prepare the following documents. Make sure to have the originals and copies.',
                'fr' => 'Pour compléter l\'inscription, veuillez préparer les documents suivants. Assurez-vous d\'avoir les originaux et des copies.',
            ],
            'admissions_cta_title' => [
                'en' => 'Ready to join us? Start enrollment today.',
                'fr' => 'Prêt à nous rejoindre ? Commencez l\'inscription aujourd\'hui.',
            ],
            'admissions_cta_description' => [
                'en' => 'Contact our admissions office for any questions or to arrange a visit to the school.',
                'fr' => 'Contactez notre service d\'admission pour toute question ou pour organiser une visite de l\'établissement.',
            ],

            // Campus Life Page
            'campus_hero_title' => ['en' => 'Live your school life to the fullest', 'fr' => 'Vivez pleinement votre scolarité'],
            'campus_hero_description' => [
                'en' => 'Beyond academic excellence, we offer a dynamic environment where every student can thrive through cultural, sporting and social activities.',
                'fr' => 'Au-delà de l\'excellence académique, nous offrons un environnement dynamique où chaque élève peut s\'épanouir à travers des activités culturelles, sportives et sociales.',
            ],
            'campus_activities_title' => ['en' => 'Activities & Facilities', 'fr' => 'Activités & Installations'],
            'campus_activities_subtitle' => ['en' => 'An environment conducive to flourishing', 'fr' => 'Un environnement propice à l\'épanouissement'],
            'campus_activity_1_name' => ['en' => 'Sports & Competitions', 'fr' => 'Sports et Compétitions'],
            'campus_activity_1_description' => [
                'en' => 'Modern facilities for football, basketball and swimming. Our teams regularly participate in inter-school tournaments.',
                'fr' => 'Des installations modernes pour le football, le basketball et la natation. Nos équipes participent régulièrement aux tournois inter-écoles.',
            ],
            'campus_activity_2_name' => ['en' => 'Arts & Culture', 'fr' => 'Arts et Culture'],
            'campus_activity_2_description' => [
                'en' => 'Theater, music and painting workshops to develop creativity. Annual exhibitions and performances.',
                'fr' => 'Ateliers de théâtre, musique et peinture pour développer la créativité. Expositions et spectacles annuels.',
            ],
            'campus_activity_3_name' => ['en' => 'Science Clubs', 'fr' => 'Clubs Scientifiques'],
            'campus_activity_3_description' => [
                'en' => 'Robotics, coding and scientific experiments for curious minds. Participation in olympiads.',
                'fr' => 'Robotique, codage et expériences scientifiques pour les esprits curieux. Participation aux olympiades.',
            ],
            'campus_activity_4_name' => ['en' => 'Library & Media Center', 'fr' => 'Bibliothèque et Médiathèque'],
            'campus_activity_4_description' => [
                'en' => 'A quiet, resource-rich space for reading, research and personal study.',
                'fr' => 'Un espace calme et riche en ressources pour la lecture, la recherche et l\'étude personnelle.',
            ],
            'campus_testimonials_title' => ['en' => 'Testimonials', 'fr' => 'Témoignages'],
            'campus_testimonials_subtitle' => ['en' => 'What our students say', 'fr' => 'Ce que disent nos élèves'],
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $value,
                    'type' => str_contains($key, 'description') || str_contains($key, 'content') ? 'textarea' : 'text'
                ]
            );
        }
    }
}
