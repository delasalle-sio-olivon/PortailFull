import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Model imports
 */
import { Information } from '../model/Information';

/**
 * Providers import
 */
import { Utils } from '../service/Utils';

@Component({
    moduleId: module.id,  
    selector: 'information',
    templateUrl: 'view/information.component.html',
    styleUrls : ['css/information.component.css']
})
export class InformationComponent {
    //attribut entrant de main
    @Input() information: Information;
    @Input() recherche : boolean;

    constructor(private router: Router, private route: ActivatedRoute) {

     }
    
     /**
      * Redirige vers l'information
      */
    selectInformation(){
        
    }
    
    /**
     * Redirige vers le parent sélectionner
     */
    linkToParent(unix: string){
        this.router.navigate(['/'+unix]);
    }
}