import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable }     from 'rxjs/Observable';

/**
 * Model import
 */
import { Categorie } from '../model/Categorie';
import { FileDAriane } from '../model/FileDAriane';

/**
 * Providers imports
 */
import { CategorieProvider } from '../service/categorie.provider';
import { InformationProvider } from '../service/information.provider';

@Component({
    moduleId: module.id,  
    selector: 'file-d-ariane',
    templateUrl: 'view/fileDAriane.component.html',
    providers : [CategorieProvider, InformationProvider],
    styleUrls : ['css/fileDAriane.component.css']
})
export class FileDArianeComponent implements OnInit {
    fileDArianeObj : FileDAriane;
    loading : boolean;
    //tableau de string correspondant au parametre de la route
    @Input() fileDAriane : string[];
    @Input() recherche : boolean;
    constructor(private categorieService : CategorieProvider, private informationService : InformationProvider, private router: Router, private route: ActivatedRoute) { 
        this.fileDArianeObj = new FileDAriane();
    } 

    ngOnInit() {
        this.startLoading();
        
        
        if(this.fileDAriane.length > 0){
            //pour chaque param on va chercher la catégorie ou l'information correspondante via l'unix pour avoir son titre et l'afficher
          this.load();
          
      }else{
        this.finishLoading();
      }
     }
  
    /**
     * Charge les données du file
     */
    load(){
        let requests : Observable<any>[] = new Array();
        this.fileDAriane.forEach((unix,index) => {
              //on cherche en 1er la catégorie
              let request = this.categorieService.getCategorie(unix);
              requests.push(request);
              request.subscribe( res => {
                  if(res !== null){
                  //si ce n'est pas null alors c'est bien une catégorie
                  this.fileDArianeObj.composites[index]=res;
                  }
              });
              
          });
        //quand toutes les requètes sont terminé on signal que le composant est prêt à afficher
        Observable.forkJoin(requests).subscribe(res=>{
          this.finishLoading();
        }, error=>{ this.handleError(error); });
      
    }
  
    /**
     * Gère les erreur des requètes
     */
    handleError( error : any){
        this.fileDArianeObj = new FileDAriane();
        this.finishLoading();
    }
    
    /**
     * Test si on est à la racine du portail
     */
    isHome() : boolean{
        if(this.fileDArianeObj.composites.length>0){
            return false;
        }
        return true;
    }
    
    /**
     * Redirige vers l'accueil
     */
    home() : void{
         this.router.navigate(['/']);
    }
    
    /**
     * Redirige vers la categorie/information via son index dans fileDArianeObj.position[] : Composite
     */
    selectComposite(index : number) : void{
        let nextRoute : string[] = ['/'].concat(this.fileDAriane.slice(0,index+1));
        this.router.navigate(nextRoute);
    }
    
    /**
     * Signal que le composant est en chargement, empêche l'affichage
     */
    startLoading(){
      this.loading = true;
    }
    
    /**
     * Signal que le composant a fini de charger les données et est prêt à afficher
     */
    finishLoading(){
      this.loading = false;
    } 
  
}