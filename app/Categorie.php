<?php
namespace App;
  
use Illuminate\Database\Eloquent\Model;
  
class Categorie extends Element
{
    
	public function tags(){
		return $this->belongsToMany('App\Tag', 'categories_tags', 'idCategorie', 'idTag')->orderBy('nom');
	}
	
	public function parents()
	{
		return $this->belongsToMany('App\Categorie', 'categories_parents', 'idenfant', 'idparent')->orderBy('titre');
	}
	
    public function informations()
    {
    	return $this->belongsToMany('App\Information', 'informations_parents', 'idparent', 'idenfant')->orderBy('titre');
    }
    
    public function scopeWithCategories($query)
    {
    	return $query->with('categories.categories.categories.categories.categories.categories');
    }
    
    public function scopeWithInformation($query)
    {
    	return $query->with('informations', 'categories.informations', 'categories.categories.informations', 'categories.categories.categories.informations', 'categories.categories.categories.categories.informations', 'categories.categories.categories.categories.categories.informations', 'categories.categories.categories.categories.categories.categories.informations');
    }

    public function categories()
    {
    	return $this->belongsToMany('App\Categorie', 'categories_parents', 'idparent', 'idenfant');
    }
    
    public function getEachCategories(){
    	$children = Array();
    	foreach ($this->categories as $child){
    		$children[] = $child;
    		$children = array_merge($children, $child->getEachCategories());
    	}
    	return $children;
    }
    
    public function getEachInformations(){

    	$informations = $this->informations;
    	foreach ($this->categories as $child){
    		$informations = $informations->merge($child->informations);
    		$informations = $informations->merge($child->getEachCategories());
    	}
    	return $informations;
    }
    
    public function syncParents($ids){
    	$res = $this->parents()->sync($ids);
    	if($res["attached"] || $res["detached"]){
	    	$informations = $this->getEachInformations();
	    	$informations->each(function ($item, $key) {
		    	$item->syncElasticsearch();
			});
    	}
    }
    
    public function hasTopTag(){
    	$top = $this->tags->first(function ($index, $tag) {
		    if($tag->nom == 'top'){
		    	return true;
		    }
		    return false;
		});
    	if($top){
    		return true;
    	}
    	return false;
    }
    
}
?>