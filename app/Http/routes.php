<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->version();
});

$app->group(['prefix' => 'api', 'namespace' => 'App\Http\Controllers'], function () use ($app) {
    /*
    Categories
    */
    $app->get('categories','CategorieController@index');

    $app->get('categories/{unix}','CategorieController@getCategorie');
      
    $app->post('categories','CategorieController@createCategorie');
      
    $app->put('categories','CategorieController@updateCategorie');
      
    $app->delete('categories/{unix}','CategorieController@deleteCategorie');


    $app->get('categories/{unix}/enfants/categories','CategorieController@getCategorieEnfantsCategories');

    /*
    Informations
    */
    $app->get('informations','InformationController@index');
  
    $app->get('informations/{unix}','InformationController@getInformation');
      
    $app->post('informations','InformationController@createInformation');
      
    $app->put('informations','InformationController@updateInformation');
      
    $app->delete('informations/{unix}','InformationController@deleteInformation');

    $app->get('categories/{unix}/enfants/informations','InformationController@getCategorieEnfantsInformations');

    $app->post('images/informations/{id}','ImageController@updateImageInformation');
    
    $app->post('images/categories/{id}','ImageController@updateImageCategorie');

    $app->get('copy','InformationController@copyDbToElastic'); 
    
    $app->get('recherche/{content}/{parent}','InformationController@recherche');
    
    $app->get('recherche/{content}','InformationController@rechercheAll');

    /*  User  */
    $app->get('user','AuthController@index');
    
    $app->get('unix', 'PortailController@getUnix');
    
    $app->get('potentialparent/{unix}', 'CategorieController@getPotentialParentUnix');
    
    $app->get('categories/{unix}/parents/unix', 'CategorieController@getParentsUnix');
    
    $app->get('informations/{unix}/parents/unix', 'InformationController@getParentsUnix');
    
    /* Tags */
    $app->get('tagslist', 'TagController@getList');
    
});

$app->group(['prefix' => '', 'namespace' => 'App\Http\Controllers'], function () use ($app) {
    $app->get('','PortailController@index');
    $app->get('login/{params:.*}', 'PortailController@loginPath');
    $app->get('login', 'PortailController@login');
});
	
	
	