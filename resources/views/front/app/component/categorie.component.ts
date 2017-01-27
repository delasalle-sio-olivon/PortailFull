import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Model imports
 */
import { Categorie } from '../model/Categorie';
import { Information } from '../model/Information';
import { Element } from '../model/Element';
/**
 * Providers import
 */
import { Utils } from '../service/Utils';

@Component({
    moduleId: module.id,  
    selector: 'categorie',
    templateUrl: 'view/categorie.component.html',
    styleUrls : ['css/categorie.component.css']
})
export class CategorieComponent {
    children : Element[];
    childrenClass : any[];
    @Input() categorie: Categorie;
    @Input() home : boolean;
  
    constructor(private router: Router, private route: ActivatedRoute) {
        this.childrenClass = new Array();
     }

    ngOnInit(){
        
        this.sortCategories();
        this.sortInformations();
        this.setMiniList();
    }
    
    /**
     * Trie les catégories, si la catégorie à le tag top et par ordre alphabétique
     */
    sortCategories(){
        this.categorie.categories.sort((cat1,cat2) => {
              let has1 = this.hasTag(cat1,'top');
              let has2 = this.hasTag(cat2,'top');
            
              if( has1 === has2 ){
                  return 0;
              }
              
              if(has1){
                  return -1;
              }
             
              return 1;
          });    
    }
    /**
     * Trie les informations, si la catégorie à le tag top et par ordre alphabétique
     */
    sortInformations(){
        this.categorie.informations.sort((info1,info2) => {
              let has1 = this.hasTag(info1,'top');
              let has2 = this.hasTag(info2,'top');
            
              if( has1 === has2 ){
                  return 0;
              }
              
              if(has1){
                  return -1;
              }
            
              return 1;
          });    
    }
    
    /**
     * Set la mini liste d'enfant
     */
    setMiniList(){
        
        if(this.categorie.categories.length>1){
            //si il y a au moins 2 catégories on les utilise
            this.children = this.categorie.categories.slice(0,2);
            //on met l'icon de catégorie au 2
            let icon = { "glyphicon-folder-open" : true };
            this.childrenClass.push(icon);
            this.childrenClass.push(icon);
        }else if(this.categorie.categories.length<1){
            //si il n'y a pas de catégories on prends 2 informations
            //si il n'y pas ou qu'une seul information la méthode slice ne renverra pas d'erreur
            this.children = this.categorie.informations.slice(0,2);
            //on met l'icon d'information au 2
            let icon = { "glyphicon-file" : true };
            this.childrenClass.push(icon);
            this.childrenClass.push(icon);
        }else{
            //sinon il n'y a qu'une seul catégorie dans ce cas on utilise une catégorie et une information
            this.children = this.categorie.categories;
            this.children.push(this.categorie.informations[0]);
            //on met l'icon de catégorie à la première
            let icon = { "glyphicon-folder-open" : true };
            this.childrenClass.push(icon);
            //on met l'icon d'informaiton à la deuxième
            let icon2 = { "glyphicon-file" : true };
            this.childrenClass.push(icon2);
        }    
    }
    
    /**
    * Redirection vers la page de l'élément
    */
    selectChild(el : Element = this.categorie){
        if(el === this.categorie){
            this.router.navigate([el.unix], { relativeTo: this.route }); 
        }else{
            this.router.navigate([this.categorie.unix,el.unix], { relativeTo: this.route });
        }
    }
    
    /**
     * Test si l'élément à le tag donné (via le nom de tag)
     */
    public hasTag(element : Element , nom : string) : boolean{
        let tag = element.tags.find(tag=>{
            if(tag.nom === nom){
                return true;
            }
        });
        if(tag !== null && tag !== undefined){
            return true;
        }
        return false;
    }
  
}