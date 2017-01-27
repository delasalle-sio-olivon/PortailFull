import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FileUploader } from 'ng2-file-upload';
import { CategorieProvider } from '../../../service/categorie.provider';
/**
 * Import model
 */
import { Categorie } from '../../../model/Categorie';
import { Information } from '../../../model/Information';

@Component({
    moduleId: module.id,
    selector: 'categorieEditor',
    templateUrl: 'view/categorieeditor.component.html',
    styleUrls : ['css/categorieeditor.component.css']
})
export class CategorieEditorComponent implements OnInit {
    new : boolean;
    oldCategorieSelected : Categorie;
    categorieSelected : Categorie;
    img : any;
    imgChanged : boolean;
    uploader:FileUploader;
    parents : string[];
    tags : any[];
    @Input() unixList : any;
    @Input('categorieSelected')
    set categorieSelect(value : Categorie){
        //se déclenche à chaque changement de categorieSelected
        if(value ===null){
            this.categorieSelected =null;
            this.oldCategorieSelected = null;
        }
        if(value !== undefined && value !== null){
            //préparation du composant
            this.oldCategorieSelected = new Categorie(value.unix, value.titre, value.resume, value.detail, value.id, value.categories, value.informations, value.parents, value.tags);
            this.categorieSelected = new Categorie(value.unix, value.titre, value.resume, value.detail, value.id, value.categories, value.informations, value.parents, value.tags );
            this.img = '../resources/views/front/app/resources/img/categories/' + this.categorieSelected.id + '.png';
            this.uploader = new FileUploader({url: 'api/images/categories/' + value.id });
        }
    }
     
    @Output() catSaved : EventEmitter<any>;
    
    constructor( private sanitizer:DomSanitizer, private categorieService : CategorieProvider) {
        this.catSaved = new EventEmitter<any>();
        this.parents = new Array<string>();
        this.tags = new Array<any>();
     }

    ngOnInit() { 
      
    }

    /**
     * Test si il y a une catégorie de sélectionné
     */
    hasCategorieSelected(){
        if(this.categorieSelected !== null && this.categorieSelected !== undefined){
            return true;
        }
        return false;
    }

    change(){
        
    }

    /**
     * Génère les classes de l'input titre
     */
    titreClass(){
        let bool : boolean = this.titreIsOk();
        return { "has-error" :  !bool, "has-feedback" : !bool};
    }

    /**
     * Test si le titre est valide
     */
    titreIsOk(){
        if(this.categorieSelected.titre.length<1){
            return false;
        }
        return true;
    }

    /**
     * Génère les class de l'input unix
     */
    unixClass(){
        let bool : boolean = this.unixIsOk();
        return { "has-error" :  !bool, "has-feedback" : !bool};
    }

    /**
     * Test si l'unix est valide (en minuscule avec des chiffres et sans caractère spéciaux et unique) 
     */
    unixIsOk(){
        if( !/^([a-z0-9]|_)+$/.test(this.categorieSelected.unix) || !this.unixIsUnique()){
            return false;
        }
        return true;
    }

    /**
     * Test si l'unix est unique
     */
    unixIsUnique(){
        if(this.categorieSelected.unix !== this.oldCategorieSelected.unix){
          let index = this.unixList.categories.indexOf(this.categorieSelected.unix.toLocaleLowerCase());
          let index2 = this.unixList.informations.indexOf(this.categorieSelected.unix.toLocaleLowerCase());
          if(index > 0 || index2 > 0){
            return false;
          }
        }
        return true;
        
    }

    /**
     * Génère les class de l'input resume
     */
    resumeClass(){
        let bool : boolean = this.resumeIsOk();
        return { "has-error" :  !bool, "has-feedback" : !bool};
    }

    /**
     * Test si le resume est valid
     */
    resumeIsOk(){
        if(this.categorieSelected.resume.length<1){
            return false;
        }
        return true;
    }

    /**
     * Test si la catégorie selectionné est la racine 'firstoffirst
     */
    isFirstOfFirst() : boolean{
        if(this.categorieSelected.unix === "firstoffirst"){
            return true;
        }
        return false;
    }

    /**
     * Lors d'un changement d'image permet d'afficher la nouvelle
     */
    imgChange(input : any){
        this.img = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(input.files[0]));
        this.imgChanged = true;
    }
  
    /**
     * Set les parents
     */
    syncParents(parents : string[]){
        this.parents = parents;
    }
  
    /**
     * Set les parents
     */
    syncTags(tags : any[]){
        this.tags = tags;
    }
  
    /**
     * Sauvearde les changments
     */
    saveChanges(){
      if(this.isValid()){
          if(this.imgChanged){
              //upload l'image si elle à changé
              this.uploader.uploadAll();
          }
          this.categorieService.saveCategorie(this.categorieSelected, this.parents, this.tags).subscribe(res=>{
              this.catSaved.emit(); //déclenche l'évement catSaved
              this.categorieSelected = null;
          }, error=>{ this.handleError(error) });
      }
      
    }
      
    /**
     * Test si le formulaire est valide
     */
    isValid(){
      if(this.unixIsOk() && this.titreIsOk() && this.resumeIsOk){
          return true;
      }
      return false;
    }
  
    /**
     * Supprime la catégorie sélectionné
     */
    deleteCat() : void{
        this.categorieService.deleteCategorie(this.oldCategorieSelected.unix).subscribe(res=>{
            this.catSaved.emit();
            this.categorieSelected = null;
        }, error=>{ this.handleError(error) });
    }
    
    handleError( error : any){
        this.categorieSelected = null;
    }
}