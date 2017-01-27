<?php
namespace App;
  
use Illuminate\Database\Eloquent\Model;
use Elasticsearch\ClientBuilder;
  
class Information extends Element
{
     protected $table = "informations";
     
     public function parents()
     {
     	return $this->belongsToMany('App\Categorie', 'informations_parents', 'idenfant', 'idparent')->orderBy('titre');
     }
     
     public function tags(){
     	return $this->belongsToMany('App\Tag', 'informations_tags', 'idInformation', 'idTag')->orderBy('nom');
     }
     
     public function syncElasticsearch(){
     	$client = ClientBuilder::create()->build();
     	$parents = $this->getEachParent();
     	$idsParent = Array();
     	foreach ($parents as $parent){
     		$idsParent[] = $parent->id;
     	}
     	$params = [
     			'index' => 'portail',
     			'type' => 'information',
     			'id' => $this->id,
     			'body' =>	['unix' => $this->unix,
     					'titre' => $this->titre,
     					'resume' => $this->resume,
     					'detail' => $this->detail,
     					'parent' => $idsParent]
     	];
     	$response = $client->index($params);
     }
}
?>