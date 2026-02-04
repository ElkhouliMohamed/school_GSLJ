<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            SettingSeeder::class,
            SettingsSeeder::class,
            ProgramSeeder::class,
            FacilitySeeder::class,
            TeamMemberSeeder::class,
            NewsSeeder::class,
            EventSeeder::class,
            PartnerSeeder::class,
        ]);
    }
}
