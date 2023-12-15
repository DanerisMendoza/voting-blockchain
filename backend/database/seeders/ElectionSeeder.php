<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Election;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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

        $manilaTimezone = 'Asia/Manila';

        $Election = new Election();
        $Election->isActive = true;
        $Election->start_filing_date = Carbon::now($manilaTimezone)->startOfMonth();
        $Election->end_filing_date = Carbon::now($manilaTimezone)->endOfMonth();
        $Election->start_voting_date = Carbon::now($manilaTimezone);
        $Election->end_voting_date = Carbon::now($manilaTimezone)->endOfDay();
        $Election->save();
    }
}
