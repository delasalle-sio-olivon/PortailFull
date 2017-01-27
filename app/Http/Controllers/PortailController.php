<?php
  
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Categorie;
use App\Information;
use Illuminate\Http\Request;

class PortailController extends Controller{
	
    public function index(){
  
        return view('front/index');
  
    }
    
    public function loginPath($params){
    	
    	return new RedirectResponse('/#/'.$params);
    
    }
    
    public function login(){
    
    	return new RedirectResponse('/');
    
    }
    
    public function getUnix() {
    	$categories = Categorie::select('unix')->get();
    	$information = Information::select('unix')->get();
    	$unix = Array();
    	foreach ($categories as $cat){
    		$unix["categories"][] = $cat->unix;
    	}
    	foreach ($information as $info){
    		$unix["informations"][] = $info->unix;
    	}
    	return response()->json($unix);
    }
}
?>