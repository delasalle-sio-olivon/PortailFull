import { NgModule } from '@angular/core';

/**
 * Component
 */
import { AdminComponent }  from './component/admin.component';
import { TreeComponent }  from './component/tree.component';
import { CategorieEditorComponent }  from './component/categorieeditor.component';
import { ParentCatEditorComponent }  from './component/parentcateditor.component';
import { InformationEditorComponent }  from './component/informationeditor.component';
import { ParentInfoEditorComponent }  from './component/parentinfoeditor.component';
import { TagEditorComponent }  from './component/tageditor.component';

/**
 * Module
 */
import { ShareModule } from '../share/share.module';

@NgModule({
    imports: [ ShareModule ],
    exports: [AdminComponent],
    declarations: [AdminComponent,
                  TreeComponent,
                  CategorieEditorComponent,
                  ParentCatEditorComponent,
                  InformationEditorComponent,
                  ParentInfoEditorComponent,
                  TagEditorComponent  ],
})
export class AdminModule { }
