enum ItemStatus {
    Available = "available",
    Published = "published",
    Lost = "lost",
}

interface LibraryItemData {
    id:number;
    title:string;
    year:number;
    status:ItemStatus;
    internalNote:string;
}

type PublicData = Omit<LibraryItemData, 'internalNote'>
// const publicData: PublicData = {id:2,title:"Hi",year:2000, status:ItemStatus.Available};
type ItemPreview = Pick<LibraryItemData,"id" | "title">
// const itemPreview: ItemPreview = {id:5,title:"Hello"};
type ItemUpdate = Partial<Omit<LibraryItemData, 'id'>>
// const itemUpdate: ItemUpdate = {};
interface Searchable{
    matches(query:string) : boolean;
}

abstract class LibraryItem {
    #status= ItemStatus.Available;
    constructor(protected title:string,protected year:number){}
    get status() : ItemStatus {
        return this.#status;
    }
    borrow(){
        if(this.#status !== ItemStatus.Published ){
            this.#status = ItemStatus.Published;
            return this.#status;
        }
        else{
            return this.#status;
        }
    }
    abstract describe():string
}

class Book extends LibraryItem implements Searchable {
    #author : string
    constructor(public author: string,protected title:string,protected year:number ){
        super(title,year)
        this.#author = author;
    }
    describe(){
        return `Книга: ${this.title} (${this.year}), автор ${this.#author} `
    }
    matches(query:string):boolean{
        if(this.#author.includes(query) || this.title.includes(query)){
            return true
        }
        else {
            return false
        }
    }
}
const book = new Book('Taras', "Kobzar", 1840)
// console.log(book.matches('Tara'))
console.log(book.describe())
class Magazine extends LibraryItem{
    #issueNumber : number
    constructor(public issueNumber: number,protected title:string,protected year:number ){
        super(title,year)
        this.#issueNumber = issueNumber;
    }
    describe(){
        return `Журнал: ${this.title} , випуск №${this.#issueNumber}`
    }
}
const magazine = new Magazine(23, "Mavka", 1911)
console.log(magazine.describe())
// const library = new LibraryItem('lol',34) Cannot create an instance of an abstract class.
const libraryItems: LibraryItem[] = [
    new Book('Taras', "Kobzar", 1840),
    new Book('Lesya', "Mavka", 1911),
    new Magazine(23, "Mavka", 1911)
]

for(let item of libraryItems){
    console.log(item.describe())
}

