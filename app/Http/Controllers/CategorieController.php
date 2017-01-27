<?php
  
namespace App\Http\Controllers;
  
use App\Categorie;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

  
class CategorieController extends Controller{	
	
    public function index(Request $request){
    	
        $Categorie  = Categorie::withCategories()->withInformation()->findByUnix('firstoffirst')->first();
        return response()->json($Categorie);
    }

    public function getCategorie($unix){
        $Categorie  = Categorie::with('categories.categories','informations','tags', 'categories.informations')->where('unix', $unix)->first();
        if(isset($Categorie->id)){
            return response()->json($Categorie);
        }
        
    }
 
    public function createCategorie(Request $request){
        $categorie = Categorie::firstOrCreate(['unix' => 'new', 'titre' => 'new', 'resume' => 'new', 'detail'=> 'new']);
        $first = Categorie::findByUnix('firstoffirst')->first();
        $categorie->parents()->detach();
        $categorie->parents()->save($first);
        return response()->json($categorie);
    }

    public function updateCategorie(Request $request){
       	$categorie = $request->input('categorie');
       	$categorieObj = Categorie::firstOrCreate(['id'=>$categorie['id']]);
       	$parents = Categorie::findByUnix($request->input('parents'));
       	$tagsIds = $request->input('tags');
       	$parentsIds = Array();
       	foreach ($parents as $parent){
       		$parentsIds[] = $parent->id;
       	}
       	$categorieObj->unix = $categorie['unix'];
       	$categorieObj->titre = $categorie['titre'];
       	$categorieObj->resume = $categorie['resume'];
       	$categorieObj->detail = $categorie['detail'];
       	$informations = $categorieObj->informations;
       	$categories = $categorieObj->categories;
       	$categorieObj->syncParents($parentsIds);
       	$categorieObj->tags()->sync($tagsIds);
       	$first = Categorie::findByUnix('firstoffirst')->first();
       	if($categorieObj->parents->isEmpty()){
       		$categorieObj->parents()->attach($first);
       	}
       	$categorieObj->save();
       	foreach($categories as $child){
       		if($child->parents->isEmpty()){
       			$child->parents()->attach($first);
       		}
       	}
       	foreach($informations as $information){
       		if($information->parents->isEmpty()){
       			$information->parents()->attach($first);
       		}
       	}
       	
        return response()->json($categorieObj);

    }

    public function deleteCategorie($unix){
        $categorie  = Categorie::with('categories', 'informations')->findByUnix($unix)->first();
        if(!isset($categorie->id)){
        	throw new \Exception("Categorie introuvable", 404);
        }
        $children = $categorie->categories;
        $informations = $categorie->informations;
        $categorie->categories()->detach();
        $categorie->informations()->detach();
        $categorie->parents()->detach();
        $categorie->delete();
        $first = Categorie::findByUnix('firstoffirst')->first();
        if(!isset($first->id)){
        	throw new \Exception("Categorie firstoffirst introuvable", 404);
        }
        foreach($children as $child){
        	if($child->parents->isEmpty()){
        		$child->parents()->attach($first);
        	}
        }
        foreach($informations as $information){
        	if($information->parents->isEmpty()){
        		$information->parents()->attach($first);
        	}
        }

        return response()->json('deleted');
    }

    
    public function getCategorieEnfantsCategories($unix){
        $CategorieParent = Categorie::with('categories', 'categories.tags')->where('unix', $unix)->first();
        if(!isset($CategorieParent->id)){
        	throw new \Exception("Categorie introuvable", 404);
        }
        $categories = $CategorieParent->categories;
        $categories = $categories->sortBy(function ($categorie, $key) {
		    if($categorie->hasTopTag()){
		    	return 0;
		    }
		    return 1;
		});
        
        return response()->json($categories);
      	
    }
    
    public function getPotentialParentUnix($unix){
    	$categorie = Categorie::withCategories()->findByUnix($unix)->first();
    	if(!isset($categorie->id)){
    		throw new \Exception("Categorie introuvable", 404);
    	}
    	$children = $categorie->getEachCategories();
    	$unixChildren = Array();
    	foreach ($children as $child){
    		$unixChildren[] = $child->unix;
    	}
    	$unixChildren[] = $categorie->unix;
    	$potentialParent = Categorie::whereNotIn('unix', $unixChildren)->get();
		
    	$unixParents = Array();
    	foreach ($potentialParent as $parent){
    		$unixParents[] = $parent->unix;
    	}
    	
    	return response()->json($unixParents);
    }
    
    public function getParentsUnix($unix){
    	$categorie = Categorie::with('parents')->findByUnix($unix)->first();
    	if(!isset($categorie->id)){
    		throw new \Exception("Categorie introuvable", 404);
    	}
    	$parents = $categorie->parents;
    	$unixParents = Array();
    	foreach ($parents as $parent){
    		$unixParents[] = $parent->unix;
    	}
    	 
    	return response()->json($unixParents);
    }
    
}
?>