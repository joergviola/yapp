<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->group(function () {
    Route::get('/1.0/{entity}', 'APIController@index');
    Route::get('/1.0/{entity}/{id}', 'APIController@get');
    Route::post('/1.0/{entity}', 'APIController@create');
    Route::put('/1.0/{entity}', 'APIController@update');
    Route::delete('/1.0/{entity}/{id}', 'APIController@delete');
//});
