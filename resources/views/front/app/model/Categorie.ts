import{Element} from './Element';
import{Information} from './Information';
import{ Tag } from './Tag';

/**
 * Categorie
 */
export class Categorie extends Element{
    id : number;
    unix : string;
    titre : string;
    resume : string;
    detail : string;
    categories : Categorie[];
    informations : Information[];
    parents : Categorie[];
    tags : Tag[];

    constructor(unixP : string,titreP : string, resumeP : string, detailP : string, idP : number = -1, categories = new Array(), informations = new Array(), parents = new Array(), tags : Tag[] = new Array<Tag>()) {
        super();
        this.unix = unixP;
        this.titre = titreP;
        this.resume = resumeP;
        this.detail = detailP;
        this.id = idP;
      
        this.categories = categories;
        this.informations = informations;
        this.parents = parents;
        this.tags = tags;
    }
    
    /**
     * Test si la categorie à des informations
     */
    hasInformations(){
        if(this.informations.length>0){
            return true;
        }
        return false;
    }

    static getInArrayByUnix(tab : Array<Categorie>, unix : string) : Categorie{
        let catCherche : Categorie = null;

        for(let i = 0; i < tab.length; i++){
            if(tab[i].unix == unix){
                return tab[i];
            }else{
                catCherche = Categorie.getInArrayByUnix(tab[i].categories, unix);
                if(catCherche !== null){
                    return catCherche;
                }
            }
        }
        return catCherche;
    }

    static getInArrayById(tab : Array<Categorie>, id : number) : Categorie{
        let catCherche : Categorie = null;
        for(let i = 0; i < tab.length; i++){
            if(tab[i].id == id){
                return tab[i];
            }else{
                if(tab[i].categories !== undefined){
                    catCherche = Categorie.getInArrayById(tab[i].categories, id);
                    if(catCherche !== null){
                        return catCherche;
                    }
                }
            }
        }
        return catCherche;
    }

    static createCategoriesFromRows(rows : any[]){
        let categories : Array<Categorie> = new Array<Categorie>();
        rows.forEach(row => {
            categories.push(new Categorie(row.unix, row.titre, row.resume, row.detail,row.id));
        });
        return categories;
    }

    static filterById(element : Categorie[], id : number) {
        return element.filter(el=>{
            if(el.id === id){
                return true;
            }
            return false;
        });
    }

    static filterLessThanId(element : Categorie[], id : number) {
        return element.filter(el=>{
            if(el.id < id){
                return true;
            }
            return false;
        });
    }

    static filterMoreThanId(element : Categorie[], id : number) {
        return element.filter(el=>{
            if(el.id > id){
                return true;
            }
            return false;
        });
    }
}