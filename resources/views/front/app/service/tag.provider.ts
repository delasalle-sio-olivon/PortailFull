import { Injectable } from '@angular/core';
import { ServiceProvider } from './service.provider';
import { Observable }     from 'rxjs/Observable';
import { ConfigProvider }  from './config.provider';
/**
 * Model imports
 */
import { Tag } from '../model/Tag';

@Injectable()
export class TagProvider {
    constructor(private config: ConfigProvider, private service : ServiceProvider) { 

    }

     getList() : Observable<any>{
          return this.service.getTagsList();
     }
  
}
