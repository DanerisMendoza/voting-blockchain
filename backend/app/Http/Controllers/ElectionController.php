<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ElectionController extends Controller
{
    public function GetActiveElection()
    {
        $result = DB::table('elections')
            ->where('isActive', true)
            ->first();
        return $result;
    }

    public function GetElectionStatus()
    {
        date_default_timezone_set('Asia/Manila');
        $now = now();
    
        $result = DB::table('elections')
            ->where('isActive', true)
            ->first();
    
        $startVotingDate = \Carbon\Carbon::parse($result->start_voting_date);
        $endVotingDate = \Carbon\Carbon::parse($result->end_voting_date);
    
        if ($startVotingDate <= $now && $now <= $endVotingDate) {
            return 'ongoing';
        } else {
            if ($now > $endVotingDate) {
                return 'finished';
            } else {
                return 'closed';
            }
        }
    }
    
}
