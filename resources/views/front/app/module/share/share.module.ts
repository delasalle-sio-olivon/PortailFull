import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http'
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import 'npm:hammerjs/hammer.js';
/**
 * Imports de ng2-bootstrap https://valor-software.com/ng2-bootstrap
 */
import { DropdownModule, TypeaheadModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { SelectModule } from 'ng2-select';
/**
 * https://ng-bootstrap.github.io
 */
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FileUploadModule } from 'ng2-file-upload';
/**
 * Les imports de nos pipes
 */
import { AsColPipe } from '../../pipe/asCol.pipe';

/**
 * Service
 */
import { CategorieProvider } from '../../service/categorie.provider';
import { InformationProvider } from '../../service/information.provider';
import { ServiceProvider } from '../../service/service.provider';
import { ServiceMockedProvider } from '../../service/servicemocked.provider';
import { TagProvider } from '../../service/tag.provider';
import { ConfigProvider }  from '../../service/config.provider';

@NgModule({
    imports: [ CommonModule, DropdownModule.forRoot(), TypeaheadModule.forRoot(), AlertModule.forRoot(),MaterialModule.forRoot()],
    exports: [ CommonModule,
               HttpModule,
               JsonpModule,
               AsColPipe,
               SelectModule,
               DropdownModule,
               TypeaheadModule,
               FileUploadModule,
               FormsModule,
               AlertModule,
               MaterialModule ],
    declarations: [AsColPipe],
    providers: [CategorieProvider, InformationProvider, TagProvider, ServiceProvider, ServiceMockedProvider, ConfigProvider],
})
export class ShareModule { }
