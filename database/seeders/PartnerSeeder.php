<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    public function run(): void
    {
        $partners = [
            [
                'name' => ['en' => 'Association of Parents (APE)', 'fr' => 'Association des Parents d\'Élèves (APE)'],
                'logo' => '/images/gslj/partners/APE.jpg',
                'url' => null,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'name' => ['en' => 'Ministry of Education', 'fr' => 'Ministère de l\'Éducation'],
                'logo' => '/images/gslj/partners/Ministry.jpg',
                'url' => 'https://education.sn',
                'order' => 2,
                'is_active' => true,
            ],
        ];

        foreach ($partners as $partner) {
            // Use 'order' as the unique key (Partners have no slug)
            Partner::updateOrCreate(
                ['order' => $partner['order']],
                $partner
            );
        }
    }
}
