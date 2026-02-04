<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing partners to avoid duplicates if re-seeding without migrating:fresh
        // Partner::truncate(); // Optional, use with caution

        Partner::create([
            'name' => [
                'en' => 'Association of Parents (APE)',
                'fr' => 'Association des Parents d\'Éleves (APE)',
            ],
            'logo' => '/images/gslj/partners/APE.jpg',
            'website' => null,
            'is_featured' => true,
            'order' => 1,
            'is_active' => true,
        ]);

        Partner::create([
            'name' => [
                'en' => 'Ministry of Education',
                'fr' => 'Ministère de l\'Éducation',
            ],
            'logo' => '/images/gslj/partners/Ministry.jpg',
            'website' => 'https://education.sn',
            'is_featured' => true,
            'order' => 2,
            'is_active' => true,
        ]);
    }
}
