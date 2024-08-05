<?php

use App\Http\Controllers\BestSellersController;
use App\Http\Controllers\FavouriteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//GET all bestsellers
Route::get('bestsellers', [BestSellersController::class, 'index']);

//Search for bestsellers
Route::get('bestsellers/search', [BestSellersController::class, 'search']);

//GET all favourite books
Route::get('favourites', [FavouriteController::class, 'index']);

//POST/DELETE book to favourites
Route::post('favourites', [FavouriteController::class, 'toggleFavourite']);

//GET favourite book details
Route::get('favourites/{book}', [FavouriteController::class, 'show']);

//UPDATE favourite book details
Route::put('favourites/{book}', [FavouriteController::class, 'update']);

//DELETE book from favourites
Route::delete('favourites/{book}', [FavouriteController::class, 'destroy']);