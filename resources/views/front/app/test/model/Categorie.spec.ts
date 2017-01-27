import { Categorie } from '../../model/Categorie';
import { Information } from '../../model/Information';


import { TestBed }      from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
 
describe('Model Categorie', () => {
    let categorie : Categorie;
 
    beforeEach(() => {
        categorie = new Categorie("cattest","CatTest", "Catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!");
    });
 
    it('Constructeur', () => {
        let sousCategorie = new Categorie("Sous cattest", "Sous catTest", "Sous catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!", 1);
        let information = new Information("info1","Titre info", "Résumé info", "Information de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!", categorie);
        categorie = new Categorie("cattest", "CatTest", "Catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!", 1,[sousCategorie],[information]);

        expect(categorie.titre).toBe("CatTest");
        expect(categorie.resume).toBe("Catégorie de test");
        expect(categorie.detail).toBe("Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!");
        expect(categorie.id).toBe(1);
        expect(categorie.categories).toEqual([sousCategorie]);
        expect(categorie.informations).toEqual([information]);
    });

    it('getInArrayByUnix()', () => {
        let tab : Categorie[] = new Array();
        tab.push(categorie);
        categorie = new Categorie("souscattest", "Sous catTest", "Sous catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!", 1);
        tab.push(categorie);
        categorie = new Categorie("unixatrouver", "CatTest", "Catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!", 1);
        let categorie2 : Categorie = new Categorie("aussi", "Sous catTest", "Sous catégorie de test", "Catégorie de test, ça permet de se rendre compte des choses qui marchent et qui marchent pas. C'est Sympa!", 1);
        categorie.categories.push(categorie2);
        tab.push(categorie);
        expect(Categorie.getInArrayByUnix(tab,"unixatrouver")).toEqual(categorie);
        expect(Categorie.getInArrayByUnix(tab,"aussi")).toEqual(categorie2);
        expect(Categorie.getInArrayByUnix(tab,"null")).toBeNull();

    });
});