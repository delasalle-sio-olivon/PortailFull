<?php
namespace App;
  
use Illuminate\Database\Eloquent\Model;
  
class Element extends Model
{
     protected $with = ['tags'];
     protected $fillable = ['id','titre', 'unix', 'resume', 'detail'];
    
    public function scopeWithParents($query)
    {
    	return $query->with('parents.parents.parents.parents.parents.parents');
    }
    
    public function scopeFindByUnix($query, $unix)
    {
    	if(is_array($unix)){
    		return $query->whereIn('unix',$unix)->get();
    	}
    	return $query->where('unix',$unix)->get();
    }
    
    public function getEachParent(){
    	$parents = Array();
    	foreach ($this->parents as $parent){
    		$parents[] = $parent;
    		$parents = array_merge($parents, $parent->getEachParent());
    	}
    	return $parents;
    }
    
	public function setUnix($value)
    {
        $this->attributes['unix'] = strtolower($value);
    }
}
?>