import { Injectable } from '@angular/core';
import { Categorie } from '../../model/Categorie';
import { Information } from '../../model/Information';

@Injectable()
export class FakeServiceProvider {

    tab : Categorie[];
    tab2 : Information[];

    constructor() {
        this.tab = new Array<Categorie>();
        this.tab.push(new Categorie("a1","b","c","d"));
        this.tab.push(new Categorie("a2","b","c","d"));
        this.tab.push(new Categorie("a3","b","c","d"));
        this.tab.push(new Categorie("a4","b","c","d"));
        this.tab.push(new Categorie("a5","b","c","d"));

        this.tab2 = new Array<Information>();
        this.tab2.push(new Information("a1","b","c","d"));
        this.tab2.push(new Information("a2","b","c","d"));
        this.tab2.push(new Information("a3","b","c","d"));
        this.tab2.push(new Information("a4","b","c","d"));
        this.tab2.push(new Information("a5","b","c","d"));

     }

    getFirstCategories() : Categorie[]{
        return this.tab;
    }

    getCategorieEnfants(unix : string) : Categorie[]{
        return this.tab;
    }

    getCategorie(unix : string) : Categorie{
        return this.tab[0];
    }

     getInformation(unix : string) : Information {
        return this.tab2[0];
    }

    getInformationsOfCategorie(unix : string) : Information[]{
        return this.tab2;
    }
}