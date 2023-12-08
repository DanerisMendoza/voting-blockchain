<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\PartyListController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\ElectionController;


Route::post('/Login', [UserController::class, 'Login']);
Route::post('/Register', [UserController::class, 'Register']);
Route::middleware('auth:api')->group(function () {
    //USER API
    Route::get('/authenticate', [UserController::class, 'authenticate']);
    Route::get('/GetUserDetails', [UserController::class, 'GetUserDetails']);
    Route::post('/Logout', [UserController::class, 'Logout']);
    Route::patch('/UpdateLastVoteDate', [UserController::class, 'UpdateLastVoteDate']);
    Route::get('/IsVoted', [UserController::class, 'IsVoted']);
    Route::get('/GetToday', [UserController::class, 'GetToday']);
    //CANDIDATE API
    Route::get('/GetCandidates', [CandidateController::class, 'GetCandidates']);
    Route::get('/GetAllCandidates', [CandidateController::class, 'GetAllCandidates']);
    Route::post('/AddAsCandidate', [CandidateController::class, 'AddAsCandidate']);
    Route::get('/GetCandidateById', [CandidateController::class, 'GetCandidateById']);
    Route::delete('/CancelApplication', [CandidateController::class, 'CancelApplication']);
    //POSISTION API
    Route::get('/GetPositions', [PositionController::class, 'GetPositions']);
    //SETTINGS API
    Route::get('/GetSettings', [SettingsController::class, 'GetSettings']);
    //ELECTION API
    Route::get('/GetElectionStatus', [ElectionController::class, 'GetElectionStatus']);
    Route::get('/GetActiveElection', [ElectionController::class, 'GetActiveElection']);
    Route::post('/AddPosition', [PositionController::class, 'AddPosition']);
    Route::post('/AddSchedule', [ElectionController::class, 'AddSchedule']);
    //PARTY LIST API
    Route::post('/AddPartyList', [PartyListController::class, 'AddPartyList']);
    Route::get('/GetPartyList', [PartyListController::class, 'GetPartyList']);
    Route::post('/ViewPartyList', [PartyListController::class, 'ViewPartyList']);
});
