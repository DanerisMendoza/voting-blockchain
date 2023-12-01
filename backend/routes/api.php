<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\PartyListController;
use App\Http\Controllers\PositionController;


Route::post('/Login', [UserController::class, 'Login']);
Route::post('/Register', [UserController::class, 'Register']);
Route::middleware('auth:api')->group(function () {
    //USER API
    Route::get('/authenticate', [UserController::class, 'authenticate']);
    Route::get('/GetUserDetails', [UserController::class, 'GetUserDetails']);
    Route::post('/Logout', [UserController::class, 'Logout']);
    //CANDIDATE API
    Route::get('/GetCandidates', [CandidateController::class, 'GetCandidates']);
    //POSISTION API
    Route::get('/GetPositions', [PositionController::class, 'GetPositions']);
    Route::post('/AddPosition', [PositionController::class, 'AddPosition']);
    //PARTY LIST API
    Route::post('/AddPartyList', [PartyListController::class, 'AddPartyList']);
    Route::get('/GetPartyList', [PartyListController::class, 'GetPartyList']);
    Route::post('/ViewPartyList', [PartyListController::class, 'ViewPartyList']);
});
