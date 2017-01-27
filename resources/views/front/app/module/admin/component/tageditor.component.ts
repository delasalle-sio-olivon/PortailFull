import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TagProvider } from '../../../service/tag.provider';

import { Tag } from '../../../model/Tag';

@Component({
    moduleId: module.id,
    selector: 'tagEditor',
    templateUrl: 'view/multipleselecteditor.component.html',
    styleUrls : ["css/ng2-select.css"]
})
export class TagEditorComponent implements OnInit {
    tagsSelected : Tag[];
    tags : any[];
    select : any[];
    list : any[];
    label : string;
    placeholder : string;
  
    @Input('tagsSelected')
    set tagsSelect(value : Tag[]){
        //se déclenche a chaque changement de tagSelected
        this.tagsSelected = value;
        this.setSelectList();
    }

    @Output() listEmiter : EventEmitter<string[]>;
  
    ngOnInit(){
        this.setList();
        this.label = "Tags : ";
        this.placeholder = "Selectionner un ou plusieurs tag";
    }
  
    constructor(private tagService : TagProvider) { 
        this.listEmiter = new EventEmitter<string[]>();
        this.list = Array<any[]>();
        this.select = Array<any[]>();
    }
    
    /**
     * Se déclenche à chaque ajout de tag
     */
    public selected(value : string):void {
        
    }

    /**
     * Se déclenche a chaque suppression de tag
     */
    public removed(value : string):void {

    }

    /**
     * Se déclenche à chaque changement de tag
     */
    public refreshValue(values:any[]):void {
        this.tags = new Array<number>();
        values.forEach(value=>{
            this.tags.push(value.id);
        });
        this.emitList();
    }

    /**
     * Set la liste de tags selectionné 
     */
    setSelectList() : void{
        this.select = new Array<any[]>();
        this.tagsSelected.forEach(tag=>{
            this.select.push({ 'id' : tag.id, 'text' : tag.nom });
        });
    }
    
    /**
     * Recupère tous les tags 
     */
    setList() : void{
        this.tagService.getList().subscribe(res=>{
            this.list = res;
        }, error=>{this.handleError(error)});
    }
  
    /**
     * Déclenche l'évenement listEmiter
     */
    emitList(){
      this.listEmiter.emit(this.tags);
    }
    
    /**
     * Gère les erreur de requète
     */
    handleError(error : any){
        
    }
}