<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::post('/Login', [UserController::class, 'Login']);
Route::middleware('auth:api')->group(function () {
    //USER API
    Route::get('/authenticate', [UserController::class, 'authenticate']);
    Route::post('/Logout', [UserController::class, 'Logout']);
});
