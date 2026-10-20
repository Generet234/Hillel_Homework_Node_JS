import { Body, Controller, Delete, Query, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import {Review} from './review.interface'
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Get()
    findOne(@Query('bookId') bookId: string): Review | Review[] {
        if(bookId) return this.reviewsService.findOneOrThrow(this.reviewsService.parseId(bookId));
        else return this.reviewsService.findAll();
    }

    @Post()
    create(@Body() dto: CreateReviewDto): Review  {
        return <Review>this.reviewsService.create(dto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string): void {
        this.reviewsService.remove(this.reviewsService.parseId(id));
    }
}