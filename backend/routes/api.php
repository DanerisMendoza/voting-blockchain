<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\PositionController;


Route::post('/Login', [UserController::class, 'Login']);
Route::middleware('auth:api')->group(function () {
    //USER API
    Route::get('/authenticate', [UserController::class, 'authenticate']);
    Route::get('/GetUserDetails', [UserController::class, 'GetUserDetails']);
    Route::post('/Logout', [UserController::class, 'Logout']);
    //CANDIDATE API
    Route::get('/GetPositions', [PositionController::class, 'GetPositions']);
});
