//classe de fonction utilitaire
export class Utils {
    
    constructor() { }

    static replaceSpaceByUnderscore(txt : string) : string {
        txt = txt.trim();
        return txt.split(' ').join('_');
    }

    static isUndefined(test : any) : boolean {
        if(test === undefined){
            return true;
        }
        return false;
        
    }

    /**
     * Détache l'élément du tableau via son index
     * @return Link détaché du tableau
     */
    static popByIndex(tab : any[], index : number){
        return tab.splice(index, 1);
    }
}