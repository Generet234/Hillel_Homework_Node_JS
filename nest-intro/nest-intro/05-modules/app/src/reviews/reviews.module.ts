import {forwardRef, Module} from '@nestjs/common';
import { BooksModule } from '../books/books.module';
import {ReviewsController} from "./reviews.controller";
import {ReviewsService} from "./reviews.service";

@Module({
    imports: [forwardRef(()=> BooksModule)],
    controllers: [ReviewsController],
    providers: [ReviewsService],
    exports: [ReviewsService],
})
export class ReviewsModule {}