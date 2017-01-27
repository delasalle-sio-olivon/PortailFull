import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FileUploader } from 'ng2-file-upload';
import { InformationProvider } from '../../../service/information.provider';

/**
 * Import model
 */
import { Categorie } from '../../../model/Categorie';
import { Information } from '../../../model/Information';

@Component({
    moduleId: module.id,
    selector: 'informationEditor',
    templateUrl: 'view/informationeditor.component.html',
    styleUrls : ['css/informationeditor.component.css']
})
export class InformationEditorComponent implements OnInit {
    informationSelected : Information;
    oldInformationSelected : Information;
    img : any;
    imgChanged : boolean;
    uploader:FileUploader;
    parents: string[];
    tags : any[];
    @Input() unixList : any;
    @Input('informationSelected')
    set informationSelec (value: Information){
        //se déclenche a chaque changement d'informationSelected
        if(value !== null && value !== undefined ){
            this.informationSelected = new Information(value.unix, value.titre, value.resume, value.detail, value.parent ,value.id, value.tags);
            this.oldInformationSelected = new Information(value.unix, value.titre, value.resume, value.detail, value.parent ,value.id, value.tags);
            this.img = '../resources/views/front/app/resources/img/informations/' + this.informationSelected.id + '.png';
            this.uploader = new FileUploader({url: 'api/images/informations/' + value.id });
        }else{
            this.informationSelected = null;
            this.oldInformationSelected = null;
        }
    }

    @Output() infoSaved : EventEmitter<any>;

    constructor(private sanitizer:DomSanitizer, private informationService : InformationProvider) { 
        this.infoSaved = new EventEmitter<any>();
        this.parents = new Array<string>();
        this.tags = new Array<any>();
    }

    ngOnInit() { }

    /**
     * Test si il ya une information de séléctionné
     */
    hasInformationSelected(){
        if(this.informationSelected === undefined || this.informationSelected === null){
            return false;
        }
        return true;
    }

    change(){
        
    }

    /**
     * Génère les class de l'input titre
     */
    titreClass(){
        let bool : boolean = this.titreIsOk();
        return { "has-error" :  !bool, "has-feedback" : !bool};
    }
    
    /**
     * Test si le titre est valid
     */
    titreIsOk(){
        if(this.informationSelected.titre.length<1){
            return false;
        }
        return true;
    }

    /**
     * Génère les class de l'unix
     */
    unixClass(){
        let bool : boolean = this.unixIsOk();
        return { "has-error" :  !bool, "has-feedback" : !bool};
    }

     /**
      * Test si l'unix est ok
      */
     unixIsOk(){
        if(!/^([a-z0-9]|_)+$/.test(this.informationSelected.unix) || !this.unixIsUnique()){
            return false;
        }
        return true;
    }
    
    /**
     * Test si l'unix est unique
     */
    unixIsUnique(){
       if(this.informationSelected.unix !== this.oldInformationSelected.unix){
          let index = this.unixList.categories.indexOf(this.informationSelected.unix.toLocaleLowerCase());
          let index2 = this.unixList.informations.indexOf(this.informationSelected.unix.toLocaleLowerCase());
          if(index > 0 || index2 > 0){
            return false;
          }
        }
        return true;
    }

    /**
     * Génère les class de l'input résume
     */
    resumeClass(){
         let bool : boolean = this.resumeIsOk();
        return { "has-error" :  !bool, "has-feedback" : !bool};
    }
    
    /**
     * Test si le résume est valid
     */
    resumeIsOk(){
        if(this.informationSelected.resume.length<1){
            return false;
        }
        return true;
    }

    /**
     * Lors d'un changement d'image affiche la nouvelle
     */
    imgChange(input : any){
        //on utilise le sanitizer pour prévenir que l'url n'est pas dangeureuse
        this.img = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(input.files[0]));
        this.imgChanged = true;
    }
  
    /**
     * Set parents
     */
    syncParents(parents : string[]){
        this.parents = parents;
    }
  
    /**
     * Set tags
     */
    syncTags(tags : any[]){
        this.tags = tags;
    }
  
    /**
     * Sauvegarde les changements
     */
    saveChanges(){
      if(this.imgChanged){
          //upload l'image si elle a changé
        this.uploader.uploadAll();
      }
      this.informationService.saveInformation(this.informationSelected, this.parents, this.tags).subscribe(res=>{
        this.infoSaved.emit();
        this.informationSelected = null;
      }, error=>{ this.handleError(error) });
    }
    
    /**
     * Supprime une information
     */
    deleteInfo() : void{
        this.informationService.deleteInformation(this.oldInformationSelected.unix).subscribe(res=>{
            this.infoSaved.emit();
            this.informationSelected = null;
        }, error=>{ this.handleError(error) });
    }
    
    /**
     * Gère les erreurs de reqêtes
     */
    handleError( error : any){
        this.informationSelected = null;
    }
}