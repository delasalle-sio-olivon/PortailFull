import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * Import model
 */
import { Categorie } from '../../../model/Categorie';
import { Information } from '../../../model/Information';

@Component({
    moduleId: module.id,
    selector: 'tree',
    templateUrl: 'view/tree.component.html',
    styleUrls : ['css/tree.component.css']
})
export class TreeComponent implements OnInit {
    
    show : boolean;

    @Input() data : Categorie;
    @Output() categorieSelected = new EventEmitter<Categorie>();
    @Output() informationSelected = new EventEmitter<Information>();

    constructor() { 
        this.informationSelected = new EventEmitter<Information>();
        this.categorieSelected = new EventEmitter<Categorie>();
    }

    ngOnInit() { 
        this.showMe();
    }

    /**
     * Déclenche l'évenement de sélection de la catégorie du composant
     */
    select() : void{
        this.categorieSelected.emit(this.data);
    }

    /**
     * Déclenche l'évenement de sélection d'une information
     */
    selectInformation(info : Information){
        this.informationSelected.emit(info);
    }

    /**
     * Déclenche l'évenement de sélection d'une catégorie
     */
    selectCategorie(categorie : Categorie) : void{
        this.categorieSelected.emit(categorie);
    }

    /**
     * Test si la catégorie est déroulé
     */
    isShow() : boolean {
        return this.show;
    }

    /**
     * Déroule ou enroule la catégorie
     */
    toggleShow() : void {
        if(this.isShow()){
            this.hideMe();
        }else{
            this.showMe();
        }
    }

    /**
     * Déroule la catégorie
     */
    showMe() : void {
        this.show = true;
    }

    /**
     * Enroule la catégorie
     */
    hideMe() : void{
        this.show = false;
    }
}