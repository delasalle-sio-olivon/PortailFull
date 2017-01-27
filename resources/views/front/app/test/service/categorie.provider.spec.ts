import { TestBed } from '@angular/core/testing';
import { ServiceProvider } from '../../service/service.provider';
import { CategorieProvider } from '../../service/categorie.provider';
import { FakeServiceProvider } from '../bouchon/fake.service.provider';
import { Categorie } from '../../model/Categorie';

describe('Service CategorieProvider', () => {
    let service : CategorieProvider;
    let tab : Categorie[];
    
    beforeEach(() => TestBed.configureTestingModule({
        providers: [{ provide: ServiceProvider, useClass: FakeServiceProvider },CategorieProvider]
    }));

    beforeEach(() => {
        service = TestBed.get(CategorieProvider);
        tab = new Array<Categorie>();
        tab.push(new Categorie("a1","b","c","d"));
        tab.push(new Categorie("a2","b","c","d"));
        tab.push(new Categorie("a3","b","c","d"));
        tab.push(new Categorie("a4","b","c","d"));
        tab.push(new Categorie("a5","b","c","d"));
    });

    it('getFirstCategories()', () => {
        expect(service.getFirstCategories()).toEqual(tab);
    });

    it('getCategorie()', () => {
        expect(service.getCategorie('cat1')).toEqual(tab[0]);
    });
});