/**
 * Import model
 */
import{Element} from './Element';
import{Categorie} from './Categorie';

/**
 * FileDAriane
 */
export class FileDAriane {
    composites : Element[];  
    constructor() {
        this.composites = new Array<Element>();
    }
    
    clean() : void {
        this.composites = new Array();
    }
}