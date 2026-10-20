
import {
    Injectable,
    NotFoundException,
    BadRequestException,
    forwardRef,
    Inject
} from '@nestjs/common';
import { BooksService } from '../books/books.service';
import { Review } from './review.interface';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
    constructor(@Inject(forwardRef(() => BooksService))private readonly booksService: BooksService){}
    private reviews: Review[] = [
        { id: 1, text: 'Усе гарно', bookId: 1, rating: 5 },
        { id: 2, text: 'Гірше не буває', bookId: 2, rating: 2 },
    ];
    private nextId = 3;

    private withReview(review: Review): Review {
        const book = this.booksService.findOneOrThrow(review.bookId);
        return { ...review, book: book};
    }

    parseId(id: string): number {
        const parsed = Number(id);
        if (Number.isNaN(parsed)) {
            throw new BadRequestException('id має бути числом');
        }
        return parsed;
    }
    findBookById(bookId: number): Review[] {
        return this.reviews.filter((review) => review.bookId === bookId);
    }
    findAll(): Review[] {
        console.log(this.reviews.map((b) => this.withReview(b)))
        return this.reviews.map((b) => this.withReview(b));
    }

    findOneOrThrow(bookId: number): Review {
        const review = this.reviews.find((b) => b.bookId === bookId);
        if (!review) {
            throw new NotFoundException(`Книжку з id=${bookId} не знайдено`);
        }
        return this.withReview(review);
    }

    create(dto: CreateReviewDto): Review {
        if(dto.rating < 1 || dto.rating > 5) throw new BadRequestException('Rating needs to be between from 1 to 5')
        this.booksService.findOneOrThrow(dto.bookId);
        const review: Review = {
            id: dto.id,
            text: dto.text,
            bookId: dto.bookId,
            rating: Math.round(dto.rating),
        };
        this.nextId += 1;
        this.reviews.push(review);
        console.log(this.reviews);
        return this.withReview(review);
    }

    remove(id: number): void {
        this.findOneOrThrow(id);
        this.reviews = this.reviews.filter((b) => b.id !== id);
    }
}
