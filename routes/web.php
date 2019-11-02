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

Route::get('/', function () {
    return view('welcome');
});
Route::get('/form', [
    'uses'=>'PagesController@info'
]);

Route::post('/save-data', [
    'uses'=>'UsersController@store'
]);
/*
Route::get('/form','PagesController@form');
Route::resource('users','UsersController');