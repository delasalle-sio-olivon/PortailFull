<?php
namespace App;
  
use Illuminate\Database\Eloquent\Model;
  
class Tag extends Model
{
     
     //protected $fillable = [];
    
    public function categories()
    {
    	return $this->belongsToMany('App\Categorie', 'categories_tags', 'idTag', 'idCategorie');
    }
    
    public function informations()
    {
    	return $this->belongsToMany('App\Information', 'informations_tags', 'idTag', 'idInformation');
    }
    
}
?>