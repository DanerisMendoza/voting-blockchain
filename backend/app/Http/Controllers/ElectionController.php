<?php

namespace App\Http\Controllers;

use App\Models\Election;
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

    public function AddSchedule(Request $request)
    {
        $resched = Election::select('isActive', 'id')
            ->where('isActive', 1)->orderBy('id', 'desc')->first();

        if ($resched) {
            $reset = Election::where('id', $resched->id)
                ->update(
                    [
                        'isActive' => 0
                    ]
                );
        }

        $sched = new Election();
        $sched->isActive = 1;
        $sched->start_filing_date = $request->sf_start;
        $sched->end_filing_date = $request->sf_end;
        $sched->start_voting_date = $request->sv_start;
        $sched->end_voting_date = $request->sv_end;
        $sched->save();

        return response()->json(
            [
                'message' => 'Adding of Voting Schedules Success',
                'icon' => 'success'
            ],
            200
        );
    }
}
