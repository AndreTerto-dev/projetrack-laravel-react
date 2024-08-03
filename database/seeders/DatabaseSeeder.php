<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Terto',
            'email' => 'terto@example.com',
            'password' => bcrypt('123.321A'),
            'email_verified_at' => time()
        ]);

        $this->call([
            ProjectAndTaskSeeder::class,
        ]);

    }
}
