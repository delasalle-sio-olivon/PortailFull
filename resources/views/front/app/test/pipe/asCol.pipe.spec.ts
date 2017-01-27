import { AsColPipe } from '../../pipe/asCol.pipe';

import { TestBed }      from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
 
describe('Pipe tier', () => {
    

    beforeEach(() => {
        
    });

    it('| tier:3:0', () => {
        let tier : AsColPipe;
        let tab : number[] = [1,2,3,4,5,6,7,8,9];
        let tab1 : number[] = [1,4,7];
        tier = new AsColPipe();

        expect(tier.transform(tab,3,0)).toEqual(tab1);
    });

    it('| tier:3:1', () => {
        let tier : AsColPipe;
        let tab : number[] = [1,2,3,4,5,6,7,8,9];
        let tab2 : number[] = [2,5,8];
        tier = new AsColPipe();

        expect(tier.transform(tab,3,1)).toEqual(tab2);
    });

    it('| tier:3:2', () => {
        let tier : AsColPipe;
        let tab : number[] = [1,2,3,4,5,6,7,8,9];
        let tab3 : number[] = [3,6,9];
        tier = new AsColPipe();
        
        expect(tier.transform(tab,3,2)).toEqual(tab3);
    });
});