<?php

namespace App\Http\Controllers;

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
            ->select('users.password', 'users.username')
            ->first();

        if ($login) {
            if (Hash::check($request->password, $login->password)) {
                $passwordGrantClient = Client::where('password_client', 1)->first();
                $response = [
                    'grant_type'    => 'password',
                    'client_id'     => $passwordGrantClient->id,
                    'client_secret' => $passwordGrantClient->secret,
                    'username'      => $request->username,
                    'password'      => $request->password,
                    'scope'         => '*',
                ];
                if (Auth::attempt($credentials)) {
                    $tokenRequest = Request::create('/oauth/token', 'post', $response);
                    $response = app()->handle($tokenRequest);
                    $data = json_decode($response->getContent());
                    $token = $data->access_token;
                    $responseContent = [
                        'message' => 'success',
                        'token' => $token,
                    ];
                    return response()->json($responseContent, 200);
                }
            } else {
                return response()->json(
                    [
                        'message' => 'The password were incorrect'
                    ],
                );
            }
        } else {
            return response()->json(
                [
                    'message' => 'The username were incorrect'
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
                'users.age',
                'users.gender',
                'users.email',
                'users.address',
                'users.first_name',
                'users.middle_name',
                'users.last_name',
                DB::raw("CONCAT(users.first_name, ' ', users.middle_name, ' ', users.last_name) as name")
            )
            ->first();
        return $userDetail;
    }

    public function Logout(Request $request)
    {
        $user = $request->user();
        $user->token()->revoke();
        return ['message' => 'success'];
    }
}
