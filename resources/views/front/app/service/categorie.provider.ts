import { Injectable } from '@angular/core';
import { ServiceProvider } from './service.provider';
import { ConfigProvider }  from './config.provider';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';

@Injectable()
export class CategorieProvider {

    categories : Categorie[];

    constructor(private config: ConfigProvider, private service : ServiceProvider) {
        this.categories = new Array();
    }
    
    getFirstCategories() : Observable<Categorie>{ 
        return this.service.getFirstCategories();
    }

    getCategorie(unix : string) : Observable<Categorie>{
        return this.service.getCategorie(unix);
    }

    getAllCategories() : Observable<Categorie>{
        return this.service.getAllCategories();
    }

    saveCategorie(categorie : Categorie, parents : string[], tags : any[]){
        categorie.informations =null;
        categorie.categories = null;
        let cat : any = { "categorie" : categorie, "parents" : parents, "tags" : tags};
        return this.service.putCategorie(cat);
    }

    deleteCategorie(unix : string) : Observable<any>{
        return this.service.deleteCategorie(unix);
    }
  
    getPotentialParentsUnix(unix : string) : Observable<string[]>{
      return this.service.getPotentialParentsUnix(unix);
    }
    
    getParentsUnix(unix : string) : Observable<string[]>{
      return this.service.getCategorieParentsUnix(unix);
    }
  
    newCategorie(){
        return this.service.getNewCategorie();
    }
  
}
