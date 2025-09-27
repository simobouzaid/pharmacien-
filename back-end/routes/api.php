<?php

use App\Http\Controllers\{AuthController,UserController,ProduitController,stockController};
use App\Http\Controllers\SearchController;
use App\Http\Controllers\VenteController;
use Illuminate\Support\Facades\Route;

Route::post('/login',[AuthController::class ,'login']);


route::apiResource('/user',UserController::class);

route::middleware('auth:sanctum')->group(function(){
  Route::get('/logout',[AuthController::class ,'logout']);
  
  route::get('/indexUser',[UserController::class,'indexUser']);
  route::apiResource('/produit',ProduitController::class);
  route::apiResource('/stock',stockController::class);
  
  route::get('/indexProduitVente',[VenteController::class ,'indexProduitVente']);
  
  
  // la recherche a produit
  route::get('/stockProduitsearch',[SearchController::class ,'stockProduitsearch']);
  route::get('/searcheProduit',[SearchController::class ,'Produitsearch']);
  route::get('/venteProduitsearch',[SearchController::class ,'venteProduitsearch']);
  //les ventes des produits
  route::apiResource('/vente',VenteController::class) ;
  route::delete('/venteNotValide',[VenteController::class,'suprimmerVenteNonValide']) ;
  route::get('/indexHistorique',[VenteController::class ,'indexHistorique']);
  route::get('/updateVente',[VenteController::class ,'validerVente']);
  
});