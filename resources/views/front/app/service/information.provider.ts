import { Injectable } from '@angular/core';
import { ServiceProvider } from './service.provider';
import { Observable }     from 'rxjs/Observable';
import { ConfigProvider }  from './config.provider';
/**
 * Model imports
 */
import { Information } from '../model/Information';
//fourni les Information
@Injectable()
export class InformationProvider {
    constructor(private config: ConfigProvider, private service : ServiceProvider) { 

    }

    getInformation(unix : string) : Observable<Information> {
        return this.service.getInformation(unix);
    }
    
    getAllInformations() : Observable<Information[]>{
        return this.service.getInformations();
    }
  
    uploadImgs(imgs : any[]) : Observable<any>{
        let obs : Observable<any>[] = new Array();
        imgs.forEach((img,index)=>{
            obs.push(this.service.putImgInfo(img,index));
        });
        return Observable.forkJoin(obs);
    }
  
    searchWithParent(content:string, parent:string){
      return this.service.getInformationSearchWithParent(content, parent);
    }
    
    search(content:string){
        return this.service.getInformationSearch(content);
    }
  
    saveInformation(information : Information, parents : string[], tags : any[]){
        let info : any = { "information" : information, "parents" : parents, "tags" : tags};
        return this.service.putInformation(info);
    }

    deleteInformation(unix : string){
        return this.service.deleteInformation(unix);
    }

    getParentsUnix(unix : string) : Observable<string[]>{
      return this.service.getInformationParentsUnix(unix);
    }
  
    newInformation() : Observable<Information>{
      return this.service.getNewInformation( ); 
    }
}
