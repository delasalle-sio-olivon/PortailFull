import { TestBed } from '@angular/core/testing';
import { ServiceProvider } from '../../service/service.provider';
import { InformationProvider } from '../../service/information.provider';
import { FakeServiceProvider } from '../bouchon/fake.service.provider';
import { Information } from '../../model/Information';

describe('Service InformationProvider', () => {
    let service : InformationProvider;
    let tab : Information[];
    
    beforeEach(() => TestBed.configureTestingModule({
        providers: [{ provide: ServiceProvider, useClass: FakeServiceProvider },InformationProvider]
    }));

    beforeEach(() => {
        service = TestBed.get(InformationProvider);
        tab = new Array<Information>();
        tab.push(new Information("a1","b","c","d"));
        tab.push(new Information("a2","b","c","d"));
        tab.push(new Information("a3","b","c","d"));
        tab.push(new Information("a4","b","c","d"));
        tab.push(new Information("a5","b","c","d"));
    });

    it('getCategorieEnfants()', () => {
        expect(service.getInformation('info1')).toEqual(tab[0]);
    });
});