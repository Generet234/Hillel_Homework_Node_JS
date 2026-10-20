"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const books_service_1 = require("../books/books.service");
let ReviewsService = class ReviewsService {
    booksService;
    constructor(booksService) {
        this.booksService = booksService;
    }
    reviews = [
        { id: 1, text: 'Усе гарно', bookId: 1, rating: 5 },
        { id: 2, text: 'Гірше не буває', bookId: 2, rating: 2 },
    ];
    nextId = 3;
    withReview(review) {
        const book = this.booksService.findOneOrThrow(review.bookId);
        return { ...review, book: book };
    }
    parseId(id) {
        const parsed = Number(id);
        if (Number.isNaN(parsed)) {
            throw new common_1.BadRequestException('id має бути числом');
        }
        return parsed;
    }
    findBookById(bookId) {
        return this.reviews.filter((review) => review.bookId === bookId);
    }
    findAll() {
        console.log(this.reviews.map((b) => this.withReview(b)));
        return this.reviews.map((b) => this.withReview(b));
    }
    findOneOrThrow(bookId) {
        const review = this.reviews.find((b) => b.bookId === bookId);
        if (!review) {
            throw new common_1.NotFoundException(`Книжку з id=${bookId} не знайдено`);
        }
        return this.withReview(review);
    }
    create(dto) {
        if (dto.rating < 1 || dto.rating > 5)
            throw new common_1.BadRequestException('Rating needs to be between from 1 to 5');
        this.booksService.findOneOrThrow(dto.bookId);
        const review = {
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
    remove(id) {
        this.findOneOrThrow(id);
        this.reviews = this.reviews.filter((b) => b.id !== id);
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => books_service_1.BooksService))),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map