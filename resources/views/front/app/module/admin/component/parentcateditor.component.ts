import { Component, OnInit, DoCheck, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

import { CategorieProvider } from '../../../service/categorie.provider';

import { Categorie } from '../../../model/Categorie';

@Component({
    moduleId: module.id,
    selector: 'parentCatEditor',
    templateUrl: 'view/parentcateditor.component.html',
    styleUrls : ["css/ng2-select.css"]
})
export class ParentCatEditorComponent implements OnInit {

    liste : string[];
    a : any[];
    oldCatId : number;
    categorieSelected : Categorie;
    parents : string[];
    
    
    @Input('categorieSelected')
    set categorieSelect(value : Categorie){
        this.categorieSelected = value;
        this.getPotentialList();
    }
    @Input() unixList : any;

    @Output() parentsEmiter : EventEmitter<string[]>;
  
    constructor(private categorieService : CategorieProvider) { 
        this.liste = new Array();
        this.parentsEmiter = new EventEmitter<string[]>();
    }
  
    ngOnInit() {
        
    }

    /**
     * Se déclence lors de la séléction d'un parent
     */
    public selected(value : string):void {
        
    }
    
    /**
     * Se déclenche lors de l'ajout d'un parent
     */
    public removed(value : string):void {

    }

    /**
     * Se déclenche lors d'un chagement de parent
     */
    public refreshValue(values:any[]):void {
        this.parents = new Array<string>();
        values.forEach(value=>{
            this.parents.push(value.id);
        });
        this.emitParents();
    }

    /**
     * Récupère la liste des parents
     */
    getSelectList() : void{
      let selectList : string[] = new Array();
      this.categorieService.getParentsUnix(this.categorieSelected.unix).subscribe(res=>{
            this.parents = res;
            this.emitParents();
      }, error=>{this.handleError(error)});
    }
    
    /**
     * Récupère les parents que pourrait avoir la catégorie
     */
    getPotentialList() : void{
      this.categorieService.getPotentialParentsUnix(this.categorieSelected.unix).subscribe(res=>{
          this.liste = res;
          this.getSelectList();
        }, error=>{this.handleError(error)});
    }
  
    /**
     * Déclenche l'évenement parentsEmiter
     */
    emitParents(){
      this.parentsEmiter.emit(this.parents);
    }
    
    /**
     * Gère les erreur de requète
     */
    handleError(error : any){
        
    }
}