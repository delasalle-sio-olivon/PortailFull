<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    private $unix;
    
    function __construct($unix) {
    	$this->setUnix($unix);
    }
    
    function getUnix(){
    	return $this->unix;
    }
    
    function setUnix($unix) {
    	$this->unix = $unix;
    }
}
