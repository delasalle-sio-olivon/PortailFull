<?php
  
namespace App\Http\Controllers;
  
use App\Categorie;
use App\Information;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Intervention\Image\Facades\Image;
  
class ImageController extends Controller{

    public function updateImageInformation(Request $request,$id)
    {
		$this->saveAsPng("informations", $request, $id);
    }
    
    public function updateImageCategorie(Request $request,$id)
    {
    	$this->saveAsPng("categories", $request, $id);
    }
    
    public function saveAsPng($folder, $request, $id){
    	if ($request->hasFile('file') && isset($id)) {
    		$file = $request->file('file');
    		$img = Image::make($file)->encode('png');
    		$img->save('../resources/views/front/app/resources/img/'.$folder.'/'.$id.'.png' );
    	}
    }
}
?>