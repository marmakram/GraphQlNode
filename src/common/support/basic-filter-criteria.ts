export class BasicFilterCriteria {
    constructor(){
        this.offset=0;
        this.limit=5;
    }
    public limit? :number;
    public offset?:number;
    public freetext?:string;
    public sorts?:string;
}