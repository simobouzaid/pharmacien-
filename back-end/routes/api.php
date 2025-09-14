<?php

use App\Http\Controllers\{AuthController,UserController,ProduitController,stockController};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login',[AuthController::class ,'login']);
route::apiResource('/user',UserController::class);



route::middleware('auth:sanctum')->group(function(){


    route::apiResource('/produit',ProduitController::class);
    route::apiResource('/stock',stockController::class);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
 
    
 });