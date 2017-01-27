<?php
  
namespace App\Http\Controllers;
  
use App\Tag;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

  
class TagController extends Controller{	
	
    function getList(){
    	$tags = Tag::all();
    	$tagsList = Array();
    	foreach ($tags as $tag){
    		$tagsList[] = ["id"=> $tag->id, "text" => $tag->nom];
    	}
    	return response()->json($tagsList);
    }
    
}
?>