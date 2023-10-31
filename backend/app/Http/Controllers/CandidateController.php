<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CandidateController extends Controller
{
    public function GetCandidates(Request $request)
    {
        $userDetail = DB::table('candidates')
            ->join('users', 'users.id', 'candidates.user_id')
            ->join('positions', 'positions.id', 'candidates.posistion_id')
            ->where('positions.id',$request['selectedPositionID'])
            ->select(DB::raw("CONCAT(users.first_name, ' ', users.middle_name, ' ', users.last_name) as name"), 'positions.name as position', 'candidates.id')
            ->get();
        return $userDetail;
    }
}
