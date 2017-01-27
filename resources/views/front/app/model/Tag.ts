import{Information} from './Information';
import{Categorie} from './Categorie';
/**
 * Tag
 */
export class Tag {
    id : number;
    nom : string;
    resume : string;
    categories : Categorie[];
    informations : Information[];

    constructor(nom : string, resume : string, id : number = -1, categories : Categorie[] = new Array<Categorie>(), informations : Information[] = new Array<Information>()) {
        this.nom = nom;
        this.resume = resume;
        this.id = id;
        this.categories = categories;
        this.informations = informations;
    }
}