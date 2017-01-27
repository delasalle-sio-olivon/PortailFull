import{ Tag } from './Tag';

export class Element{
    id : number;
    unix : string;
    titre : string;
    resume : string;
    detail : string;
    tags : Tag[];

    constructor(){

    }

    static filterById(element : Element[], id : number) {
        return element.filter(el=>{
            if(el.id === id){
                return true;
            }
            return false;
        });
    }

    static filterLessThanId(element : Element[], id : number) {
        return element.filter(el=>{
            if(el.id < id){
                return true;
            }
            return false;
        });
    }

    static filterMoreThanId(element : Element[], id : number) {
        return element.filter(el=>{
            if(el.id > id){
                return true;
            }
            return false;
        });
    }
  

}