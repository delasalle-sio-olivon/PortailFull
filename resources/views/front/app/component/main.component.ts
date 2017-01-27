/**
 * Import angular
 */
import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  } from 'rxjs/Observable';
import { DOCUMENT } from '@angular/platform-browser';
/**
 * Import model
 */
import { FileDAriane } from '../model/FileDAriane';
import { Recherche } from '../model/Recherche';
import { Categorie } from '../model/Categorie';
import { Information } from '../model/Information';

/**
 * Import providers
 */
import { CategorieProvider } from '../service/categorie.provider';
import { InformationProvider } from '../service/information.provider';
import { ServiceProvider } from '../service/service.provider';
import { UtilsProvider } from '../service/utils.provider';
/**
 * Main Component traduit le corps de l'application
 */
@Component({
    moduleId: module.id,  
    selector: 'main',
    templateUrl: 'view/main.component.html',
    styleUrls : ["css/main.component.css"]
})
export class MainComponent implements OnInit { 

    /**
     * Attribut
     */
    //correspond au params de la route
    fileDAriane : string[];
    recherche : boolean;
    rechercheContent : string;
    parentRecherche : string;
    categorieSelected : Categorie;
    categories : Categorie[];
    informationSelected : Information;
    informations : Information[];
    nbCol : number;
    col : number[];
    paramsSubscription: any;//any devrait etre de type Subscription
    showUp : boolean;
    //sert a éviter d'afficher des informations incomplete/inéxistante lors de l'init
    loading : boolean;
    error : boolean;
    /**
     * Constructeur
     */
    constructor(private categorieService : CategorieProvider, private informationService : InformationProvider, private router: Router, private route: ActivatedRoute, @Inject(DOCUMENT) private document: Document){
        this.fileDAriane = new Array();
        this.categories = new Array();
        this.informations = new Array();
        this.error = false;
    }
    /**
     * Cycle de vie (a chaque nouvelle instance cette fonction s'éxecute elle permet d'éviter certain bug du Constructeur)
     */
    ngOnInit() {
        //le nombre de colonne dans les quels seronts les Categories
        this.nbCol = 3;
        //le tableau nous permet juste de pourvoir fair une boucle dans la partie vue
        this.col = new Array(this.nbCol);
        this.loadComponent();
    }

    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

    /**
     * Méthodes
     */

    /**
     * Test si le component a une categorieSelected non null/undefined
     */
    hasCategorieSelected() : boolean{
        if(this.categorieSelected === null || this.categorieSelected === undefined){
            return false;
        }
        return true;
    }

    /**
     * Test si le composant a des catégories
     */
    hasCategories() : boolean {
        if (this.categories.length>0){
            return true;
        }
        return false;
    }

    /**
     * Test si le component a une informationSelected non null/undefined
     */
    hasInformationSelected() : boolean{
        if(this.informationSelected === null || this.informationSelected === undefined){
            return false;
        }
        return true;
    }

    /**
     * Test si le composant a des informations
     */
    hasInformations() : boolean {
        if (this.informations.length>0){
            return true;
        }
        return false;
    }

    /**
     * Test si on est a la racine du portail ou non
     */
    isHome() : boolean{
        if(!this.hasCategorieSelected() && !this.hasInformationSelected() && !this.isLoading() ){
            return true;
        }else{
            return false;
        }
    }
    /**
     * Test si on est en train de charger des données
     */
    isLoading() : boolean{
        //si ces 2 données ne sont pas défini alors la page n'en n'est qu'a son charg
        return this.loading;
    }

    /**
     * Notifie le début du chargement
     */
    startLoading() : void {
        this.loading = true;
    }
    
    /**
     * Notifie la fin du chargement
     */
    stopLoading() : void {
        this.loading = false;
    }
    /**
     * Récupère la catégorie/information selectioné (avec ses enfants)
     */
    getSelected(unix : string) : void{
        //on cherche une catégorie via cet unix
        this.categorieService.getCategorie(unix).subscribe(res => {
            this.categorieSelected = res;
            
            if(this.hasCategorieSelected()){
                this.categories = this.categorieSelected.categories;
                this.informations = this.categorieSelected.informations;
            }else{
                //sinon c'est une information et donc on la récupère
                this.informationService.getInformation(unix).subscribe( res => {
                    this.informationSelected = res;
                    this.stopLoading();
                },error=>{ this.handleError(error); });
            }
            this.stopLoading();
        },error=>{ this.handleCategorieSelectedError(error); });
    }

    /**
     * On récupère les catégories de la racine ( enfant de firstoffirst )
     */
    getFirstOfFirst(){
        this.categorieService.getFirstCategories().subscribe( res => {
            this.categories = res.categories;
            this.stopLoading();
        },error=>{ this.handleFirstCategoriesError(error); });
    }

    /**
     * Recupère les résultat de la recherche depuis une catégorie
     */
    searchWithParent(content : string, parent : string) : void{
        this.informationService.searchWithParent(content, parent).subscribe(informations=>{
            this.informations = informations;
        },error=>{ this.handleError(error); });
    }
    
    /**
     * Récupère les résultats de la recherche depuis la racine
     */
    search(content : string) : void{
        this.informationService.search(content).subscribe(informations=>{
            this.informations = informations;
        },error=>{ this.handleError(error); });
    }
    /**
     * Charge les données du composants en fonction de l'action demandé ( racine, navigation, recherche..)
     */
    loadComponent(){
    this.startLoading();
        //on regarde les params de la route
        this.paramsSubscription = this.route.params.subscribe(params => {
            this.fileDAriane = new Array();
            //tableau de params
            let ids : string[] = new Array();
            this.recherche = false;
            //Il y a beaucoup de if car les routes sont faites à la main 
            //si le params existe on le push dans le tableau            
            if(params['categorie1'] != undefined || (params['content'] !== undefined && params['content'] !== '' && params['content'] !== null) ){
                if(params['categorie1'] !== undefined && params['categorie1'] !== '' && params['categorie1'] !== null){
                    ids.push(params['categorie1']);
                }
                if(params['categorie2'] != undefined){
                    ids.push(params['categorie2']);
                    if(params['categorie3'] != undefined){
                        ids.push(params['categorie3']);
                        if(params['categorie4'] != undefined){
                            ids.push(params['categorie4']);
                            if(params['categorie5'] != undefined){
                                ids.push(params['categorie5']);
                            }
                        }
                    }
                }
                //si il y a au moins un params
                if(params['content'] !== undefined && params['content'] !== '' && params['content'] !== null){
                    //si 'content' est là on est donc dans une recherche
                    if(params['parent'] !== undefined && params['parent'] !== '' && params['parent'] !== null){
                        //si 'parent' est là on est donc positionné dans une catégorie et on éffectue une recherche
                        this.searchWithParent(params['content'], params['parent']);
                        ids.push(params['parent']);
                        this.parentRecherche = params['parent'];
                     }else{
                        //sinon on éffectue une recherche depuis la racine du portail
                        this.search(params['content']);
                     }
                     //on signal que l'on est dans le contexte d'une recherche
                      this.recherche = true;
                      this.rechercheContent = params['content'];
                   }else{
                      //nous ne sommes pas dans un contexte de recherche donc c'est de la navigation
                      //on récupère le dernier unix qui correspond au element séléctionné
                      let unix = ids.pop();
                      this.getSelected(unix);
                      //on remet l'unix dans le tableau
                      ids.push(unix);
                  }
                  //on construit ensuite le fileDAriane
                  ids.forEach(unixFile => {
                      this.fileDAriane.push(unixFile);
                  });
                  
              }else{
                  //si il n'y a pas de params on est donc sans element selectionné et donc à la racine 
                  this.categorieSelected = null;
                  this.informationSelected = null;
                  this.getFirstOfFirst();
              }
          
        });
    
  }
  
  /**
   * Test si on est dans un contexte de recherche
   */
  isRecherche(){
    if(this.recherche === null || this.recherche === undefined || !this.recherche){
      return false;
    }else{
    return true;
    }
  }
  
  /**
   * Test si on est dans un contexte de recherche avec parent
   */
  hasParentRecherche(){
    if(this.parentRecherche !== undefined && this.parentRecherche !== null && this.parentRecherche !== ''){
      return true;
    }else{
      return false;
    }
  }
  
   /**
    * Listener du scroll pour afficher les bouton 'retour en haut de page'
    */
  @HostListener("window:scroll", [])
    onWindowScroll() {
        let number = this.document.body.scrollTop;
        if (number > 300) {
            this.showUp = true;
        } else {
            this.showUp = false;
        }
    }
    
    /**
     * Redirige vers le haut de page
     */
    scrollTop(){
        this.document.body.scrollTop = 0;
    }
    
    /**
     * Gère les erreurs de requète
     */
    handleError(error : any){
        this.stopLoading();
    }
  
    /**
     * Gère l'erreur de la requète de récupération de la catégorie séléctionné
     */
    handleCategorieSelectedError(error : any){
        this.categorieSelected = null;
        this.categories = new Array<Categorie>();
        this.error = true;
    }
    
    /**
     * Gère l'erreur de la requète de récupération de la catégorie firstoffirst
     */
    handleFirstCategoriesError(error : any){
        this.categories = new Array<Categorie>();
        this.error = true;
    }
}