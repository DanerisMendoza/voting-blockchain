<?php

namespace App\Http\Controllers;

use App\Models\PartyList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PartyListController extends Controller
{
    public function AddPartyList(Request $request)
    {
        $newPL = $request->name;

        $partylist = new PartyList();
        $partylist->name = $newPL;
        $partylist->save();

        return response()->json(
            [
                'message' => 'Adding of Party List Success',
                'icon' => 'success'
            ],
            200
        );
    }

    public function GetPartyList()
    {
        $partylists = DB::table('partylists')
            ->get();
        return $partylists;
    }

    public function ViewPartyList(Request $request)
    {
        $partylist_id = $request->id;

        $results = DB::table('users')
            ->select(
                // 'users.first_name',
                // 'users.middle_name',
                // 'users.last_name',
                DB::raw("CONCAT_WS('',users.first_name, ' ', users.middle_name, ' ', users.last_name, ' ', users.suffix ) as full_name"),
                // 'users.suffix',
                'users.gender',
                'positions.id as position_id',
                'positions.name as Position',
                'partylists.name as PLName'
            )
            ->leftJoin('candidates', 'users.id', '=', 'candidates.user_id')
            ->leftJoin('positions', 'candidates.position_id', '=', 'positions.id')
            ->leftJoin('partylists', 'candidates.partylist_id', '=', 'partylists.id')
            ->where('partylists.id', '=', $partylist_id)
            ->get();

        return response()->json($results);
    }
}
