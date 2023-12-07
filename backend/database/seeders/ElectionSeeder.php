<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Election;

class ElectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $Election = new Election();
        $Election->isActive = false;
        $Election->start_filing_date = "2020-01-01 00:00:00";
        $Election->end_filing_date = "2020-02-01 23:59:59";
        $Election->start_voting_date = "2020-03-01 00:00:00";
        $Election->end_voting_date = "2020-04-01 23:59:59";
        $Election->save();

        $Election = new Election();
        $Election->isActive = true;
        $Election->start_filing_date = "2023-01-01 00:00:00";
        $Election->end_filing_date = "2023-02-01 23:59:59";
        $Election->start_voting_date = "2023-12-7 00:00:00";
        $Election->end_voting_date = "2023-12-7 23:59:59";
        $Election->save();
    }
}
