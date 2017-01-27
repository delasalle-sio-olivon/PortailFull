import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { InformationProvider } from '../../../service/information.provider';
/**
 * Import model
 */
import { Categorie } from '../../../model/Categorie';
import { Information } from '../../../model/Information';

@Component({
    moduleId: module.id,
    selector: 'parentInfoEditor',
    templateUrl: 'view/parentinfoeditor.component.html',
    styleUrls : ['css/parentinfoeditor.component.css']
})
export class ParentInfoEditorComponent implements OnInit {
    liste : any[];
    a : any[];
    oldInfoId : number;
    parents : string[];
    informationSelected : Information;
    constructor(private informationService : InformationProvider) { 
        this.liste = new Array();
        this.parentsEmiter = new EventEmitter<string[]>();
    }

    @Input('informationSelected')
    set informationSelect(value : Information){
        //se déclenche lors d'un changement d'information sélectionné
        this.informationSelected = value;
        this.getCatParent();
    }

    @Input() unixList : any;
  
    @Output() parentsEmiter : EventEmitter<string[]>;
  
    ngOnInit() {

    }

    /**
     * Se déclenche lors d'un ajout de parent
     */
    public selected(value:any):void {
       
    }

    /**
     * Se déclenche lors d'une suppresion de parent
     */
    public removed(value:any):void {
        
    }

    /**
     * Se déclenche lors d'un changement de parent
     */
    public refreshValue(values:any[]):void {
        this.parents = new Array<string>();
        values.forEach(value=>{
            this.parents.push(value.id);
        });
        this.emitParents();
    }

    /**
     * Récupère les parents 
     */
    getCatParent(){
        this.informationService.getParentsUnix(this.informationSelected.unix).subscribe(res=>{
            this.parents = res;
            this.emitParents();
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