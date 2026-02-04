<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kpi;
use Carbon\Carbon;

class KpiSeeder extends Seeder
{
    public function run(): void
    {
        $countries = [
            ['code' => 'DE', 'name' => 'Germany'],
            ['code' => 'ES', 'name' => 'Spain'],
            ['code' => 'US', 'name' => 'United States'],
            ['code' => 'FR', 'name' => 'France'],
            ['code' => 'NL', 'name' => 'Netherlands'],
            ['code' => 'GB', 'name' => 'United Kingdom'],
            ['code' => 'SN', 'name' => 'Senegal'],
            ['code' => 'MA', 'name' => 'Morocco'],
        ];

        $paths = ['/', 'programs/preschool-program', 'programs/elementary-school-program', 'about', 'admissions', 'team', 'contact', 'news', 'facilities'];

        $ips = [
            '172.69.150.49',
            '172.68.134.8',
            '172.69.6.102',
            '172.70.127.60',
            '172.70.108.190',
            '172.71.127.65',
            '162.159.122.9',
            '188.114.111.213',
            '104.23.172.41',
        ];

        $userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ];

        // Generate visits for the last 30 days
        for ($i = 30; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $visitsPerDay = rand(50, 150);

            for ($j = 0; $j < $visitsPerDay; $j++) {
                $country = $countries[array_rand($countries)];

                Kpi::create([
                    'type' => 'visit',
                    'path' => $paths[array_rand($paths)],
                    'ip_address' => $ips[array_rand($ips)],
                    'user_agent' => $userAgents[array_rand($userAgents)],
                    'country_code' => $country['code'],
                    'country_name' => $country['name'],
                    'created_at' => $date->copy()->addMinutes(rand(0, 1439)),
                    'updated_at' => $date->copy()->addMinutes(rand(0, 1439)),
                ]);
            }
        }

        // Generate some clicks
        for ($i = 0; $i < 20; $i++) {
            $country = $countries[array_rand($countries)];

            Kpi::create([
                'type' => 'click',
                'path' => $paths[array_rand($paths)],
                'element_id' => 'btn-' . rand(1, 10),
                'ip_address' => $ips[array_rand($ips)],
                'user_agent' => $userAgents[array_rand($userAgents)],
                'country_code' => $country['code'],
                'country_name' => $country['name'],
                'created_at' => Carbon::now()->subDays(rand(0, 30)),
                'updated_at' => Carbon::now()->subDays(rand(0, 30)),
            ]);
        }
    }
}
