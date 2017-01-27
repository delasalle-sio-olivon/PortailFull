import { Component, OnInit } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
/**
 * Import providers
 */
import { CategorieProvider } from '../../../service/categorie.provider';
import { InformationProvider } from '../../../service/information.provider';
import { ServiceProvider } from '../../../service/service.provider';
import { UtilsProvider } from '../../../service/utils.provider';

/**
 * Import model
 */
import { Categorie } from '../../../model/Categorie';
import { Information } from '../../../model/Information';


@Component({
    moduleId: module.id,
    selector: 'admin',
    templateUrl: 'view/admin.component.html',
    styleUrls : ['css/admin.component.css'],
    providers : [CategorieProvider, ServiceProvider, InformationProvider, UtilsProvider]
})
export class AdminComponent implements OnInit {
    ready : boolean;    
    //true quand une sauvegarde c'est fini et bien déroulé
    saveEnded : boolean;
    //categorie selectionné par l'utilisateur dans l'arbre
    categorieSelected : Categorie;
    //information selectionné dans l'arbre
    informationSelected : Information;
  
    data : Categorie;
    unixList : any;
    alerts: any[] = [];

    constructor(private categorieService : CategorieProvider, private informationService : InformationProvider, private utilsService : UtilsProvider) { 
      this.ready = false;
      this.saveEnded = false;
    }

    ngOnInit() { 
      this.load();
    }

    /**
     * Sélectionne une catégorie, déselectionne une information si il y en a
     */
    selectCategorie(categorie : Categorie){
      this.unselectInformation(); 
      this.categorieSelected = categorie;
    }

    /**
     * Déselectionne une catégorie
     */
    unselectCategorie(){
      this.categorieSelected = null;
    }

    /**
     * Sélectionne une information, déselectionne une catégorie si il y en a
     */
    selectInformation(info : Information){
      this.unselectCategorie()
      this.informationSelected = info;  
    }
    
    /**
     * Déselectionne une information
     */
    unselectInformation(){
      this.informationSelected = null;
    }
    
    unSelectAll(){
      this.unselectCategorie();
      this.unselectInformation();
    }
    
    /**
     * Creation d'une nouvelle catégorie
     */
    newCategorie() : void {
      
      this.categorieService.newCategorie().subscribe(res=>{
        this.selectCategorie(res);
      }, error=>{ this.handleError(error)});
      
    }

    /**
     * Creation d'une nouvelle information
     */
    newInformation() : void {

      this.informationService.newInformation().subscribe(res=>{
        this.selectInformation(res);
      }, error=>{ this.handleError(error)});

    }
    

    /**
     * Supprime une catégorie de l'interface
     */
    deleteCat(){
      //supprime les liens concerné par la catégorie supprimé
      this.load();
    }

    /**
     * Supprime une info de l'interface
     */
    deleteInfo(){
      this.load();
    }

    /**
     * Signal que le composant est en chargement
     */
    start(){
      this.ready = true;
    }
    
    /**
     * Signal que le composant à fini de charger ses données
     */
    stop(){
      this.ready = false;
    }
    
    /**
     * Test si le composant est prêt
     */
    isReady() : boolean{
      return this.ready;
    }
    
    /**
     * Charge les données du composant
     */
    load(){
      this.stop();
        //on indique que le composant est pret à afficher
      this.categorieService.getAllCategories().subscribe(res=>{
          this.data = res;
        this.start();
      }, error=>{ this.handleError(error)});
      
      this.utilsService.getUnixList().subscribe(res=>{
        this.unixList = res;
      }, error=>{ this.handleError(error) });
    }
    
    /**
     * Signal qu'un enregistrement s'est terminé
     */
    categorieSaved(){
      this.saved();
    }
    
    /**
     * Test si un enregistrement à été fini
     */
    isSaved(){
      return this.saveEnded;
    }
    
    /**
     * Affiche une alert de modification reussi
     */
    saveShowEnded(){
        this.alerts.push({
                  type: 'success',
                  msg: 'Les modifications sont enregistrées!',
                  timeout: 5000
        });
        
    }
    
     /**
     * Signal qu'un enregistrement s'est terminé
     */
    informationSaved(){
      this.saved();
    }
    
    /**
     * Signal qu'un enregistrement s'est terminé
     */
    saved(){
        this.load();
        this.saveShowEnded();
    }
    
    /**
     * Gère les erreur de requête
     */
    handleError(error : any){
        this.alerts.push({
                  type: 'error',
                  msg: 'Une erreur est survenue, il se peut que les modification ne soit pas prit en compte.',
                  timeout: 5000
        });
    }
}