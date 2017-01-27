<?php
  
namespace App\Http\Controllers;
  
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
  
class AuthController extends Controller{
  
	/*public function __construct(){
		$this->middleware('auth');
	}*/
	
    public function index(Request $request){  
        $user = $request->getUser();
        if($user == null){
        	return response()->json("");
        }
        return response()->json($user);
    }
}
?>