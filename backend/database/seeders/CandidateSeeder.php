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
        $Candidate->position_id = 1;
        $Candidate->partylist_id = 1;
        $Candidate->accepted_date = "2023-12-6";
        $Candidate->save();
        $Candidate = new Candidate();
        $Candidate->user_id = 3;
        $Candidate->position_id = 1;
        $Candidate->partylist_id = 2;
        $Candidate->accepted_date = "2023-12-6";
        $Candidate->save();
        $Candidate = new Candidate();
        $Candidate->user_id = 4;
        $Candidate->position_id = 1;
        $Candidate->partylist_id = 3;
        $Candidate->accepted_date = "2023-12-6";
        $Candidate->save();
        
        $Candidate = new Candidate();
        $Candidate->user_id = 5;
        $Candidate->position_id = 2;
        $Candidate->partylist_id = 1;
        $Candidate->accepted_date = "2023-12-6";
        $Candidate->save();
        $Candidate = new Candidate();
        $Candidate->user_id = 6;
        $Candidate->position_id = 2;
        $Candidate->partylist_id = 2;
        $Candidate->accepted_date = "2023-12-6";
        $Candidate->save();
        $Candidate = new Candidate();
        $Candidate->user_id = 7;
        $Candidate->position_id = 2;
        $Candidate->partylist_id = 3;
        $Candidate->accepted_date = "2023-12-6";
        $Candidate->save();
        
        $Candidate = new Candidate();
        $Candidate->user_id = 8;
        $Candidate->position_id = 3;
        $Candidate->partylist_id = 1;
        $Candidate->accepted_date = "2023-12-6";
        $Candidate->save();
        $Candidate = new Candidate();
        $Candidate->user_id = 9;
        $Candidate->position_id = 3;
        $Candidate->partylist_id = 2;
        $Candidate->accepted_date = "2023-12-6";
        $Candidate->save();
        $Candidate = new Candidate();
        $Candidate->user_id = 10;
        $Candidate->position_id = 3;
        $Candidate->partylist_id = 3;
        $Candidate->accepted_date = "2023-12-6";
        $Candidate->save();
    }
}
