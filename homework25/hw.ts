interface Author{
    name: string;
    country: string;
}
interface Book {
    readonly id: number;
    title: string;
    author: Author;
    year: number;
    pages: number;
    genre?: string;
    rating?: number;
}

const bookMain : Book = { id:4 ,title:"Alice in Wonderland ", author:{name:"Lewis Carroll", country: 'USA'}, year:1865, pages:192, genre:"Fairytale", rating:4};
const bookNotMain : Book = {id:2, title:"Alice in Wonderland ", author:{name : "Lewis Carroll", country:'Ukraine'}, year:1865, pages:192};
function printBook(book : Book) {
    if (book.genre) {
        // book.id = 99
        console.log(book.genre, book.author.name, book.pages, book.title);
    }
    else if (book.rating) {
        console.log(book.rating, book.author.name, book.pages, book.title);
    }
    else {
        console.log(book.title, book.author.name);
    }
}
printBook(bookMain );
printBook(bookNotMain );
console.log(bookMain)


let library : Book[] = [{ id:4 ,title:"Alice in Wonderland ", author:{name:"Lewis Carroll", country:'UK'}, year:1865, pages:192, genre:"Fairytale", rating:4},
    {id:2, title:"Harry Potter ", author:{name:"J. K. Rowling",country:'UK'}, year:2997, pages:223, genre:"Fairytale", rating:4},
    {id:1, title:"Bridgerton ", author:{name:"Julia Quinn",country:'UK'}, year:2000, pages:384, genre:"Historical Romance", rating:4.6},
    {id:24, title:"Kolobok ", author:{name:"Folks", country:'Ukraine'}, year:1865, pages:192, genre:"Fairytale", rating:4}
]

function getRecentBooks(books: Book[], afterYear: number): string[] {
    const arrayBooks: string[]  = books.filter((book) => book.year >= afterYear).map(book => book.title);
    return arrayBooks;
}
console.log(getRecentBooks(library, 2000))