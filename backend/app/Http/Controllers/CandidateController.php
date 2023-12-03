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
            ->join('positions', 'positions.id', 'candidates.position_id')
            ->join('partylists', 'partylists.id', 'candidates.partylist_id')
            ->where('positions.id',$request['selectedPositionID'])
            ->select(DB::raw("CONCAT(users.first_name, ' ', users.middle_name, ' ', users.last_name) as candidate_name"), 'positions.name as position_name', 'candidates.id as candidate_id', 'positions.id as position_id','partylists.name as party_list','users.profile_pic_path')
            ->get()
            ->each(function ($q){
                if ($q->profile_pic_path != null) {
                    $image_type = substr($q->profile_pic_path, -3);
                    $image_format = '';
                    if ($image_type == 'png' || $image_type == 'jpg') {
                        $image_format = $image_type;
                    }
                    $base64str = '';
                    $base64str = base64_encode(file_get_contents(public_path($q->profile_pic_path)));
                    $q->base64img = 'data:image/' . $image_format . ';base64,' . $base64str;
                }
            });
        return $userDetail;
    }
}
