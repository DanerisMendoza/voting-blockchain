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
}
