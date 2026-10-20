import {BookWithAuthor} from '../books/books.service'
export interface Review{
    id: number;
    bookId: number;
    text: string;
    rating: number;
    book?: BookWithAuthor;
}