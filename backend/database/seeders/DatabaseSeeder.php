<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\PositionSeeder;
use Database\Seeders\CandidateSeeder;
use Database\Seeders\ElectionSeeder;
use Database\Seeders\PartyListSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PositionSeeder::class,
            CandidateSeeder::class,
            SettingsSeeder::class,
            ElectionSeeder::class,
            PartyListSeeder::class,
        ]);
    }
}
