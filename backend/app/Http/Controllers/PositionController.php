<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PositionController extends Controller
{
    public function GetPositions()
    {
        $positions = DB::table('positions')
            ->get();
        return $positions;
    }

    public function AddPosition(Request $request)
    {
        $position = $request->name;

        if ($position) {
            $addposition = new Position();

            $addposition->name = $position;
            $addposition->save();

            return response()->json(
                [
                    'message' => 'Adding of Positions Success',
                    'icon' => 'success',
                    'position' => $position
                ],
                200
            );
        } else {
            return response()->json(
                [
                    'message' => 'Something Went Wrong',
                    'icon' => 'error'
                ]
            );
        }
    }
}
