<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Settings;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $Settings = new Settings();
        $Settings->private_key = '0x3afc4651978a80301100b53a737018032b15541030c173a2a82095432e6092ae';
        $Settings->url = 'http://192.168.1.5:7545';
        $Settings->save();
    }
}
