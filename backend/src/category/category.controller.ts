import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('category')
export class CategoryController {
    constructor(
       private readonly categoryService: CategoryService
    ) {}

    @Get('/')
    getCategories() {
        return this.categoryService.getCategories()
    }

    @Get('/:id')
    async getCategoryName(@Param('id') id: string) {
        const { title } = await this.categoryService.getCategory(id)
        return title
    }

    @Post('/create')
    @UseInterceptors(FileInterceptor('image'))
    createCategory(@Body() data: any, @UploadedFile() image: any) {
        return this.categoryService.createCategory(data, image)
    }
}
