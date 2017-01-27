import { TestBed } from '@angular/core/testing';

import { CategorieComponent } from '../../component/categorie.component';
import { Categorie } from '../../model/Categorie';

describe('Component CategorieComponent', () => {
    it('should have an image', () => {
        TestBed.compileComponents();

        TestBed.configureTestingModule({
            declarations: [CategorieComponent]
        });
        const categorie : Categorie = new Categorie("a","b","c","d");
        const fixture = TestBed.createComponent(CategorieComponent);
        const categorieComponent = fixture.componentInstance;
        categorieComponent.categorie = categorie;

        fixture.detectChanges();

        
        const element = fixture.nativeElement;
        expect(element.querySelector('h3')).toBe(categorie.titre);
    });
});