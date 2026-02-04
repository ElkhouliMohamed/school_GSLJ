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
                'name' => [
                    'fr' => 'Ministère de l\'Éducation Nationale du Sénégal',
                    'en' => 'Ministry of National Education of Senegal'
                ],
                'logo' => 'https://via.placeholder.com/200x100?text=MEN+Senegal',
                'url' => 'https://www.education.gouv.sn',
                'order' => 1,
            ],
            [
                'name' => [
                    'fr' => 'Université Cheikh Anta Diop',
                    'en' => 'Cheikh Anta Diop University'
                ],
                'logo' => 'https://via.placeholder.com/200x100?text=UCAD',
                'url' => 'https://www.ucad.sn',
                'order' => 2,
            ],
            [
                'name' => [
                    'fr' => 'Alliance Française de Dakar',
                    'en' => 'French Alliance of Dakar'
                ],
                'logo' => 'https://via.placeholder.com/200x100?text=Alliance+Francaise',
                'url' => 'https://www.afdakar.org',
                'order' => 3,
            ],
            [
                'name' => [
                    'fr' => 'Institut Français du Sénégal',
                    'en' => 'French Institute of Senegal'
                ],
                'logo' => 'https://via.placeholder.com/200x100?text=Institut+Francais',
                'url' => 'https://www.if-senegal.com',
                'order' => 4,
            ],
            [
                'name' => [
                    'fr' => 'UNICEF Sénégal',
                    'en' => 'UNICEF Senegal'
                ],
                'logo' => 'https://via.placeholder.com/200x100?text=UNICEF',
                'url' => 'https://www.unicef.org/senegal',
                'order' => 5,
            ],
            [
                'name' => [
                    'fr' => 'Banque Mondiale',
                    'en' => 'World Bank'
                ],
                'logo' => 'https://via.placeholder.com/200x100?text=World+Bank',
                'url' => 'https://www.worldbank.org',
                'order' => 6,
            ],
        ];

        foreach ($partners as $item) {
            Partner::create([
                'name' => $item['name'],
                'logo' => $item['logo'],
                'url' => $item['url'],
                'order' => $item['order'],
                'is_active' => true,
            ]);
        }
    }
}
