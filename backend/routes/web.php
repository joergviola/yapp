<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/api/1.0/login', 'APIController@login');
Route::middleware('auth')->group(function () {
    Route::post('/api/1.0/logout', 'APIController@logout');
    Route::get('/api/1.0/{entity}', 'APIController@index');
    Route::get('/api/1.0/{entity}/{id}', 'APIController@get');
    Route::post('/api/1.0/{entity}', 'APIController@create');
    Route::put('/api/1.0/{entity}', 'APIController@update');
    Route::delete('/api/1.0/{entity}/{id}', 'APIController@delete');
});
