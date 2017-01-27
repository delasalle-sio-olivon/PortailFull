import { Injectable } from '@angular/core';
import { Http, Jsonp, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { ConfigProvider }  from './config.provider';
/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';
import { Information } from '../model/Information';
import { ServiceProvider } from './service.provider';
import { MdSnackBar } from '@angular/material';

//fourni les données peux les garder en cache
@Injectable()
export class ServiceMockedProvider {
  
}
