<?php
  
namespace App\Http\Controllers;

use App\Categorie;
use App\Information;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Elasticsearch\ClientBuilder;
class InformationController extends Controller{
	
    public function index(){
  
        $Information  = Information::all();
  
        return response()->json($Information);
  
    }

    public function getInformation($unix){
        $Information  = Information::where('unix', $unix)->first();
        if(isset($Information->id)){
            return response()->json($Information);
        }

   		throw new \Exception("Information introuvable", 404);

    }
 
    public function createInformation(Request $request){
        $information = Information::firstOrCreate(['unix' => 'new_info', 'titre' => 'new', 'resume' => 'new', 'detail'=> 'new']);
        $first = Categorie::findByUnix('firstoffirst')->first();
        $information->parents()->detach();
        $information->parents()->save($first);
        if(!isset($information->id)){
        	throw new \Exception("Impossible de créer l'information", 404);
        }
        return response()->json($information);
    }

    public function updateInformation(Request $request){
        $information = $request->input('information');
       	$informationObj = Information::firstOrCreate(['id'=>$information['id']]);
       	$parents = Categorie::findByUnix($request->input('parents'));
       	$tagsIds = $request->input('tags');
       	$parentsIds = Array();
       	foreach ($parents as $parent){
       		$parentsIds[] = $parent->id;
       	}
       	$informationObj->unix = $information['unix'];
       	$informationObj->titre = $information['titre'];
       	$informationObj->resume = $information['resume'];
       	$informationObj->detail = $information['detail'];
       	if(count($parentsIds)<1){
       		$parentsIds[] = Categorie::findByUnix('firstoffirst')->first()->id;
       	}
       	$informationObj->parents()->sync($parentsIds);
       	$informationObj->tags()->sync($tagsIds);
       	$informationObj->save();
        return response()->json($informationObj);
    }

    public function deleteInformation($unix){
        $information  = Information::findByUnix($unix)->first();
        if(!isset($information->id)){
        	throw new \Exception("Information introuvable", 404);
        }
        $information->parents()->detach();
        $information->delete();
        return response()->json('deleted');
    }

    public function getCategorieEnfantsInformations($unix){
        $CategorieParent = Categorie::where('unix', $unix)->first();
        if(isset($CategorieParent->id)){
            $Informations  = DB::select('SELECT * FROM informations, informations_parents WHERE id = idEnfant AND idParent = ?', [$CategorieParent->id]);
            return response()->json($Informations);
        }
        return response()->json("failed");
    }

    public function getParentsUnix($unix){
    	$information = Information::with('parents')->findByUnix($unix)->first();
    	if(!isset($information->id)){
    		throw new \Exception("Information introuvable", 404);
    	}
    	$parents = $information->parents;
    	$unixParents = Array();
    	foreach ($parents as $parent){
    		$unixParents[] = $parent->unix;
    	}
    	
    	return response()->json($unixParents);
    }
    
    public function copyDbToElastic(){
    	$Informations = Information::all();
    	
    	$client = ClientBuilder::create()->build();
    	
    	foreach ($Informations as $info) {
    		$parents = $info->getEachParent();
    		$idsParent = Array();
    		foreach ($parents as $parent){
    			$idsParent[] = $parent->id;
    		}
    		$params = [
    				'index' => 'portail',
    				'type' => 'information',
    				'id' => $info->id,
    				'body' =>	['unix' => $info->unix,
    									'titre' => $info->titre,
    									'resume' => $info->resume,
    									'detail' => $info->detail,
    									'parent' => $idsParent]
    		];
    		
    		$response = $client->index($params);
    	}
    }
    
    public function recherche($content, $parent){
    	$content = str_replace( '_', ' ',$content);
    	$client = ClientBuilder::create()->build();
    	$parent = Categorie::where('unix', $parent)->first();
    	$json = '
    	{
		  "_source": false,
		  "query": {
		    "bool": {
		      "must": [
		        {"term": {"parent": '.$parent->id.'}},
		        {"match": { "_all": {
		              "query": "'.$content.'",
		              "fuzziness": 2
		            }}}
		        ]
		    }
		  }
		}';
    	$params = [
    			'index' => 'portail',
    			'type' => 'information',
    			'body' => $json];
    	$response = $client->search($params);
    	foreach($response['hits']['hits'] as $hit){
    		$ids[] = $hit['_id'];
    	}
    	$ids[] = -1;
    	$informations = Information::with('parents')->find($ids);
    	return response()->json($informations);
    }
    
    public function rechercheAll($content){
    	$content = str_replace( '_', ' ',$content);
    	$client = ClientBuilder::create()->build();
    	$json = '
    	{
		  "_source": false,
		  "query": {
		    "bool": {
		      "must": [
		        {
		          "match": {
		            "_all": {
		              "query": "'.$content.'",
		              "fuzziness": 2
		            }
		          }
		        }
		      ]
		    }
		  }
		}';
    	$params = [
    			'index' => 'portail',
    			'type' => 'information',
    			'body' => $json];
    	$response = $client->search($params);
    	foreach($response['hits']['hits'] as $hit){
    		$ids[] = $hit['_id'];
    	}
    	if(isset($ids)){
    		$informations = Information::with('parents')->find($ids);
    		return response()->json($informations);
    	}
    	return response()->json(null);
    }
    
    private function indexInformation($information){
    	$client = ClientBuilder::create()->build();
    	$parents = $information->getEachParent();
    	$idsParent = Array();
    	foreach ($parents as $parent){
    		$idsParent[] = $parent->id;
    	}
    	$params = [
    			'index' => 'portail',
    			'type' => 'information',
    			'id' => $information->id,
    			'body' =>	['unix' => $information->unix,
    					'titre' => $information->titre,
    					'resume' => $information->resume,
    					'detail' => $information->detail,
    					'parent' => $idsParent]
    	];
    	
    	$response = $client->index($params);
    }
}
?>