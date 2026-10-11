"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemStatus;
(function (ItemStatus) {
    ItemStatus["Available"] = "available";
    ItemStatus["Published"] = "published";
    ItemStatus["Lost"] = "lost";
})(ItemStatus || (ItemStatus = {}));
class LibraryItem {
    title;
    year;
    #status = ItemStatus.Available;
    constructor(title, year) {
        this.title = title;
        this.year = year;
    }
    get status() {
        return this.#status;
    }
    borrow() {
        if (this.#status !== ItemStatus.Published) {
            this.#status = ItemStatus.Published;
        }
        else {
            return this.#status;
        }
    }
}
class Book extends LibraryItem {
    author;
    title;
    year;
    #author;
    constructor(author, title, year) {
        super(title, year);
        this.author = author;
        this.title = title;
        this.year = year;
        this.#author = author;
    }
    describe() {
        return `Книга: ${this.title} (${this.year}), автор ${this.#author} `;
    }
    matches(query) {
        if (this.#author.includes(query) || this.title.includes(query)) {
            return true;
        }
        else {
            return false;
        }
    }
}
const book = new Book('Taras', "Kobzar", 1840);
// console.log(book.matches('Tara'))
console.log(book.describe());
class Magazine extends LibraryItem {
    issueNumber;
    title;
    year;
    #issueNumber;
    constructor(issueNumber, title, year) {
        super(title, year);
        this.issueNumber = issueNumber;
        this.title = title;
        this.year = year;
        this.#issueNumber = issueNumber;
    }
    describe() {
        return `Журнал: ${this.title} , випуск №${this.#issueNumber}`;
    }
}
const magazine = new Magazine(23, "Mavka", 1911);
console.log(magazine.describe());
// const library = new LibraryItem('lol',34) Cannot create an instance of an abstract class.
const libraryItems = [
    new Book('Taras', "Kobzar", 1840),
    new Book('Lesya', "Mavka", 1911),
    new Magazine(23, "Mavka", 1911)
];
for (let item of libraryItems) {
    console.log(item.describe());
}
//# sourceMappingURL=library.js.map