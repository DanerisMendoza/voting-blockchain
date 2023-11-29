<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ElectionController extends Controller
{
    public function GetActiveElection(){
        $result = DB::table('elections')
        ->where('isActive',true)
        ->first();
    return $result;
    }
}
