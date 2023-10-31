<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Candidate;

class CandidateSeeder extends Seeder
{
    public function run(): void
    {
        $Candidate = new Candidate();
        $Candidate->user_id = 2;
        $Candidate->posistion_id = 1;
        $Candidate->save();
        $Candidate = new Candidate();
        $Candidate->user_id = 3;
        $Candidate->posistion_id = 1;
        $Candidate->save();
        $Candidate = new Candidate();
        $Candidate->user_id = 4;
        $Candidate->posistion_id = 1;
        $Candidate->save();

        $Candidate = new Candidate();
        $Candidate->user_id = 5;
        $Candidate->posistion_id = 2;
        $Candidate->save();
        $Candidate = new Candidate();
        $Candidate->user_id = 6;
        $Candidate->posistion_id = 2;
        $Candidate->save();
        $Candidate = new Candidate();
        $Candidate->user_id = 7;
        $Candidate->posistion_id = 2;
        $Candidate->save();

        $Candidate = new Candidate();
        $Candidate->user_id = 8;
        $Candidate->posistion_id = 3;
        $Candidate->save();
        $Candidate = new Candidate();
        $Candidate->user_id = 9;
        $Candidate->posistion_id = 3;
        $Candidate->save();
        $Candidate = new Candidate();
        $Candidate->user_id = 10;
        $Candidate->posistion_id = 3;
        $Candidate->save();
    }
}
