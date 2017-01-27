/**
 * Import angular
 *  */
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';//pour navigateur
import { HttpModule, JsonpModule } from '@angular/http'

/**
 * Les imports de nos components
 */
import { MainComponent }  from './component/main.component';
import { BarreComponent }  from './component/barre.component';
import { CategorieComponent }  from './component/categorie.component';
import { InformationComponent }  from './component/information.component';
import { FileDArianeComponent }  from './component/fileDAriane.component';
import { AppComponent }  from './component/app.component';
import { SearchComponent }  from './component/search.component';
import { PiedDePageComponent }  from './component/piedDePage.component';

/**
 * Import des modules du portail
 */
import { ShareModule }  from './module/share/share.module';
import { AdminModule }  from './module/admin/admin.module';
import { AppRoutingModule } from './module/app-routing/app-routing.module';

@NgModule({
  imports: [ BrowserModule,
             HttpModule,
             JsonpModule,
             AppRoutingModule,
             AdminModule,
             ShareModule ],
  declarations: [ MainComponent,
                  BarreComponent,
                  CategorieComponent,
                  InformationComponent,
                  FileDArianeComponent,
                  AppComponent,
                  SearchComponent,
                  PiedDePageComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
