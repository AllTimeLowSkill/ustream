import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { FilesModule } from 'src/files/files.module';
import { CategoryController } from './category.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category]),
        FilesModule
    ],
    providers: [CategoryService],
    exports: [
        CategoryService
    ],
    controllers: [CategoryController]
})
export class CategoryModule {}
