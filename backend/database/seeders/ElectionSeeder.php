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
        $Election->start_filing_date = "2020-01-01";
        $Election->end_filing_date = "2020-02-01";
        $Election->start_voting_date = "2020-03-01";
        $Election->end_voting_date = "2020-04-01";
        $Election->save();

        $Election = new Election();
        $Election->isActive = true;
        $Election->start_filing_date = "2023-01-01";
        $Election->end_filing_date = "2023-02-01";
        $Election->start_voting_date = "2023-03-01";
        $Election->end_voting_date = "2023-12-30";
        $Election->save();
    }
}
