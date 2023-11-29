<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\ElectionController;


Route::post('/Login', [UserController::class, 'Login']);
Route::middleware('auth:api')->group(function () {
    //USER API
    Route::get('/authenticate', [UserController::class, 'authenticate']);
    Route::get('/GetUserDetails', [UserController::class, 'GetUserDetails']);
    Route::post('/Logout', [UserController::class, 'Logout']);
    //CANDIDATE API
    Route::get('/GetCandidates', [CandidateController::class, 'GetCandidates']);
    //POSISTION API
    Route::get('/GetPositions', [PositionController::class, 'GetPositions']);
    //SETTINGS API
    Route::get('/GetSettings', [SettingsController::class, 'GetSettings']);
    //ELECTION API
    Route::get('/GetActiveElection', [ElectionController::class, 'GetActiveElection']);
});
