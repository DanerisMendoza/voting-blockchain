<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PartyList;

class PartyListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $PartyList = new PartyList();
        $PartyList->name = 'Independent';
        $PartyList->save();
        $PartyList = new PartyList();
        $PartyList->name = 'Party-List-A';
        $PartyList->save();
        $PartyList = new PartyList();
        $PartyList->name = 'Party-List-B';
        $PartyList->save();
        $PartyList = new PartyList();
        $PartyList->name = 'Party-List-C';
        $PartyList->save();
    }
}
