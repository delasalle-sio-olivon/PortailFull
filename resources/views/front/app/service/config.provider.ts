import { Injectable } from '@angular/core';
import { ServiceProvider } from './service.provider';
import { Observable }     from 'rxjs/Observable';

//fourni les Information
@Injectable()
export class ConfigProvider {
    
    private env : string = 'dev';
    private debug : boolean = false;
    private mocking : boolean = false;
    
    portailAPIUrl : string = "http://portail.tyforge-dev.in.ac-rennes.fr/api/";
    tyForgeAPIUrl : string = "http://tyforge-dev.in.ac-rennes.fr/plugins/ws/";
    
    constructor() { 

    }

    getPortailAPIUrl() : string{
        return this.portailAPIUrl;    
    }
    
    getTyForgeAPIUrl() : string{
        return this.tyForgeAPIUrl;
    }
  
    isMocking(){
        return this.mocking;    
    }
    
}
