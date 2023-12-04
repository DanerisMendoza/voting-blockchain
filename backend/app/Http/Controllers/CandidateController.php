<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CandidateController extends Controller
{
    public function GetCandidates(Request $request)
    {
        $userDetail = DB::table('candidates')
            ->join('users', 'users.id', 'candidates.user_id')
            ->join('positions', 'positions.id', 'candidates.position_id')
            ->join('partylists', 'partylists.id', 'candidates.partylist_id')
            ->where('positions.id', $request['selectedPositionID'])
            ->select(DB::raw("CONCAT(users.first_name, ' ', users.middle_name, ' ', users.last_name, users.suffix) as candidate_name"), 'positions.name as position_name', 'candidates.id as candidate_id', 'positions.id as position_id', 'partylists.name as party_list', 'users.profile_pic_path')
            ->get()
            ->each(function ($q) {
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

    public function GetAllCandidates()
    {
        $userDetail = DB::table('candidates')
            ->join('users', 'users.id', 'candidates.user_id')
            ->join('positions', 'positions.id', 'candidates.position_id')
            ->join('partylists', 'partylists.id', 'candidates.partylist_id')
            ->select(DB::raw("CONCAT_WS(' ', users.first_name, users.middle_name, users.last_name, users.suffix) as candidate_name"), 'positions.name as position_name', 'candidates.id as candidate_id', 'positions.id as position_id', 'partylists.name as party_list', 'users.profile_pic_path', 'users.gender')
            ->get()
            ->each(function ($q) {
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

    public function AddAsCandidate(Request $request)
    {
        $user_id = Auth::user()->id;

        $candidate = new Candidate();
        $candidate->user_id = $user_id;
        $candidate->position_id = $request->position_id;
        $candidate->partylist_id = $request->partylist_id;
        $candidate->save();

        return response()->json(
            [
                'message' => 'Successfully Applied!',
                'icon' => 'success',
            ],
            200
        );
    }

    public function GetCandidateById()
    {
        $user_id = Auth::user()->id;
        $userDetail = DB::table('candidates')
            ->join('users', 'users.id', 'candidates.user_id')
            ->join('positions', 'positions.id', 'candidates.position_id')
            ->join('partylists', 'partylists.id', 'candidates.partylist_id')
            ->select(DB::raw("CONCAT_WS(' ', users.first_name, users.middle_name, users.last_name, users.suffix) as candidate_name"), 'positions.name as position_name', 'candidates.id as candidate_id', 'positions.id as position_id', 'partylists.name as party_list', 'users.profile_pic_path', 'users.gender')
            ->where('candidates.user_id', $user_id)
            ->first(); // Use first instead of get

        if ($userDetail != null && $userDetail->profile_pic_path != null) {
            $image_type = substr($userDetail->profile_pic_path, -3);
            $image_format = '';
            if ($image_type == 'png' || $image_type == 'jpg') {
                $image_format = $image_type;
            }
            $base64str = '';
            $base64str = base64_encode(file_get_contents(public_path($userDetail->profile_pic_path)));
            $userDetail->base64img = 'data:image/' . $image_format . ';base64,' . $base64str;
        }
        return $userDetail;
    }

    public function CancelApplication()
    {
        $user_id = Auth::user()->id;

        $cancel = Candidate::where('user_id', $user_id)->delete();

        return response()->json(['message' => 'Applications canceled successfully', 'icon' => 'success'], 200);
    }
}
