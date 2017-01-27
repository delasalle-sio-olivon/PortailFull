import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
/**
 * Component imports
 */
import { AdminComponent } from '../admin/component/admin.component'
import { MainComponent } from '../../component/main.component'


@NgModule({
  imports: [ 
    RouterModule.forRoot([
        { path: 'recherche/:content', component: MainComponent }, 
        { path: 'admin', component: AdminComponent },
        { path: ':categorie1/:categorie2/:categorie3/:categorie4/:parent/recherche/:content', component: MainComponent },
        { path: ':categorie1/:categorie2/:categorie3/:parent/recherche/:content', component: MainComponent },
        { path: ':categorie1/:categorie2/:parent/recherche/:content', component: MainComponent },
        { path: ':categorie1/:parent/recherche/:content', component: MainComponent },
        { path: ':parent/recherche/:content', component: MainComponent },
        
        { path: '', component: MainComponent },
        { path: 'admin', component: AdminComponent },
        { path: ':categorie1/:categorie2/:categorie3/:categorie4/:categorie5', component: MainComponent },
        { path: ':categorie1/:categorie2/:categorie3/:categorie4', component: MainComponent },
        { path: ':categorie1/:categorie2/:categorie3', component: MainComponent },
        { path: ':categorie1/:categorie2', component: MainComponent },
        { path: ':categorie1', component: MainComponent }
    ], { useHash : true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
