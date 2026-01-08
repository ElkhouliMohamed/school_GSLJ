<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin Role
        $role = Role::firstOrCreate(['name' => 'admin']);

        // Create Admin User
        $user = User::firstOrCreate(
            ['email' => 'admin@school.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
            ]
        );

        $user->assignRole($role);
    }
}
