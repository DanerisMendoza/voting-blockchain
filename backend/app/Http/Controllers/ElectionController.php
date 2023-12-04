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

    public function isElection()
    {
        date_default_timezone_set('Asia/Manila');
        $dateNow = now();
    
        $result = DB::table('elections')
            ->where('isActive', true)
            ->whereDate('start_voting_date', '<=', $dateNow)
            ->whereDate('end_voting_date', '>=', $dateNow)
            ->first();
        if ($result) {
            return 'true';
        } else {
            return 'false';
        }
    }
}
