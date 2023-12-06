<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Passport\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function Login(Request $request)
    {
        $credentials = $request->validate([
            'username'    => 'required',
            'password' => 'required'
        ]);
        $login = DB::table('users')
            ->where('username', $request->username)
            ->select('users.password', 'users.username', 'users.user_role')
            ->first();

        if ($login) {
            $userrole = $login->user_role;
        } else {
            return response()->json(
                [
                    'message' => 'Please Check the Username or Password.',
                    'icon' => 'error'
                ]
            );
        }

        if ($login) {
            if (Hash::check($request->password, $login->password)) {
                $passwordGrantClient = Client::where('password_client', 1)->first();
                $response = [
                    'grant_type'    => 'password',
                    'client_id'     => $passwordGrantClient->id,
                    'client_secret' => $passwordGrantClient->secret,
                    'username'      => $request->username,
                    'user_role'      => $userrole,
                    'password'      => $request->password,
                    'scope'         => '*',
                ];
                if (Auth::attempt($credentials)) {
                    $tokenRequest = Request::create('/oauth/token', 'post', $response);
                    $response = app()->handle($tokenRequest);
                    $data = json_decode($response->getContent());
                    $token = $data->access_token;
                    $responseContent = [
                        'message' => 'Login Successfully!',
                        'icon' => 'success',
                        'token' => $token,
                        'user_role' => $userrole,
                    ];
                    return response()->json($responseContent, 200);
                }
            } else {
                return response()->json(
                    [
                        'message' => 'The password were incorrect',
                        'icon' => 'error'
                    ],
                );
            }
        } else {
            return response()->json(
                [
                    'message' => 'The username were incorrect',
                    'icon' => 'error'
                ],
            );
        }
    }

    public function GetUserDetails()
    {
        $userId = Auth::user()->id;
        $userDetail = DB::table('users')
            ->where('users.id', $userId)
            ->select(
                'users.id',
                'users.age',
                'users.gender',
                'users.email',
                'users.address',
                'users.first_name',
                'users.middle_name',
                'users.last_name',
                'LastVoteDate',
                DB::raw("CONCAT(users.first_name, ' ', users.middle_name, ' ', users.last_name) as name"),
                'users.profile_pic_path'
            )
            ->first();
        if ($userDetail->profile_pic_path != null) {
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

    public function Logout(Request $request)
    {
        $user = $request->user();
        $user->token()->revoke();
        return ['message' => 'success'];
    }

    public function Register(Request $request)
    {
        $pass = Hash::make($request->password);
        // Create a new user
        $newVoter = new User();
        $newVoter->first_name = $request->firstname;
        $newVoter->middle_name = $request->midname;
        $newVoter->last_name = $request->lastname;
        $newVoter->user_role = 2;
        $newVoter->suffix = $request->suffix;
        $newVoter->email = $request->email;
        $newVoter->age = $request->age;
        $newVoter->address = $request->address;
        $newVoter->gender = $request->gender;
        $newVoter->username = $request->username;
        $newVoter->password = $pass;
        // Save the user to the database
        $newVoter->save();
        // return $newVoter;
        return response()->json(['message' => 'Successfully Registered'], 200);
    }

    public function UpdateLastVoteDate()
    {
        $User = User::find(Auth::user()->id);
        $User->LastVoteDate = now();
        $User->save();
    }

    public function IsVoted()
    {
        $result = DB::table('elections')
            ->where('isActive', true)
            ->first();
        $startVotingDate = \Carbon\Carbon::parse($result->start_voting_date);
        $endVotingDate = \Carbon\Carbon::parse($result->end_voting_date);
        $User = User::where('id',Auth::user()->id)->first();
        $LastVoteDate = $User->LastVoteDate;
        if ($LastVoteDate != null && $startVotingDate <= $LastVoteDate && $LastVoteDate <= $endVotingDate) {
            return 'true';
        } 
        else{
            return 'false';
        }
    }
}
