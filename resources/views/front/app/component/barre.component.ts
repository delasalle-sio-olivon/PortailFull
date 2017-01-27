import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'

import { UtilsProvider } from '../service/utils.provider';
/**
 * La barre du menu
 */
@Component({
    moduleId: module.id,  
    selector: 'barre',
    templateUrl: 'view/barre.component.html',
    styleUrls : ['css/barre.component.css'],
    providers : [UtilsProvider]

})
export class BarreComponent implements OnInit{
    navIsTop: boolean;
    userUnix : String;
    userRealName : String;
    userProjects : any[];
    loginUrl : String;
    registerUrl : String;
    lostPwUrl : String;
    logoutUrl : String;
    accountUrl : String;
    tyforgeUrl : String;
    hostPortail : String;
    hostTyforge : String;
    HTTP : String;
    colStyle : any;
    colRow : number;
  
    constructor(private utilsProvider : UtilsProvider, @Inject(DOCUMENT) private document: Document, private route: ActivatedRoute, private sanitizer:DomSanitizer) { 
    
        this.colRow = 10;
        this.navIsTop = true;
      
    }

    ngOnInit() { 
        
        this.userUnix = "";
        this.userRealName = "";
        this.userProjects = null;
        this.HTTP = 'http://';
        //on récupère le pseudo de l'utilisateur (si il n'est pas connecté la valeur sera null)
        this.utilsProvider.getUserUnixName().subscribe(res=>{this.setUserValue(res)}, error=>{ this.handleUserError(error)});

        //génération des liens vers TyForge
        this.hostPortail = window.location.hostname;
        this.hostTyforge = window.location.hostname.replace('portail.', '');
        
        this.loginUrl = this.HTTP + '' + this.hostPortail + '/login/';
        this.registerUrl = this.HTTP + '' + this.hostTyforge + '/account/register.php';
        this.lostPwUrl = this.HTTP + '' + this.hostTyforge + '/account/lostpw.php';
        this.logoutUrl = this.HTTP + '' + this.hostPortail + '/logout' ;
        this.accountUrl = this.HTTP + '' + this.hostTyforge + '/my';
        this.tyforgeUrl = this.HTTP + '' + this.hostTyforge;
    }
    
    /**
     * Set le unix name de l'utilisateur puis récupère son RealName et ses projets
     */
    setUserValue(name : String){
          this.userUnix = name;
          if(this.userIsConnected()){
              //si l'utilisateur est connecté
              //on récupère le RealName
              this.utilsProvider.getUserRealName(name).subscribe(res=> { this.setUserRealName(res) }, error=>{ this.handleUserError(error) });
              //on récupère les projets de l'utilisateur
              this.utilsProvider.getUserProjects(name).subscribe(res=> { this.setUserProjects(res) }, error=>{ this.handleUserError(error) });
          }
    }
    
    /**
     * Set user RealName
     */
    setUserRealName(realName : String ){
        this.userRealName = realName;
    }
    
    /**
     * Gestion des erreurs des API
     */
    handleUserError(error : any){
        this.userProjects = null;
        this.userRealName = null;
        this.userUnix = null;
    }
  
    /**
     * Set user Projects et génère leur style (en colonnes)
     */
    setUserProjects(projects : any[]){
        this.userProjects = projects;
        let colCount : number = Math.ceil(this.userProjects.length/this.colRow);
        this.colStyle = this.sanitizer.bypassSecurityTrustStyle("-moz-column-count  : " + colCount + "; -webkit-column-count:" + colCount + " ; column-count : " + colCount + ";");
    }
    
    /**
     * Listener du scroll pour le changement de style du composant
     */
    @HostListener("window:scroll", [])
    onWindowScroll() {
        let number = this.document.body.scrollTop;
        if (number > 20) {
            this.navIsTop = false;
        } else {
            this.navIsTop = true;
        }
    }
    
    /**
     * Test si l'utilisateur est connecté
     */
    userIsConnected() : boolean{
        //Si le pseudo est null l'utilisateur n'est pas connecté
        if(this.userUnix === null || this.userUnix === "" || this.userUnix === undefined){
            return false;
        }else{
            return true;
        }
    }
    
    /**
     * Test si l'utilisateurs à des projets
     */
    userHasProjects() : boolean{
        //Si le pseudo est null l'utilisateur n'est pas connecté
        if(!this.userIsConnected){
            return false;
        }
        if(this.userProjects !== null){
            return true;
        }
        return false;
        
    }

    /**
     * Retourne l'url pour se connecter et revenir sur la même page ensuite
     */
    getLoginUrl() : String{
        return window.location.href.replace('#', 'login');
    }
}
