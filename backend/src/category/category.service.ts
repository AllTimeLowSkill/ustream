import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.model';
import { Repository } from 'typeorm';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
        private readonly filesService: FilesService
    ) {}

    createCategory = async (data: any, avatar: any) => {
        const fileName = await this.filesService.createFile(avatar, 'category-image')
        return await this.categoryRepository.save({ ...data, image: fileName })
    }

    getCategories = async () => {
        return await this.categoryRepository.find()
    }

    getCategory = async (id: string) => {
        return await this.categoryRepository.findOne({ where: {
            id
        } })
    }

    deleteCategory = async (id: string) => {
        const isDeleted = await this.categoryRepository.delete(id)
        if(isDeleted) {
            return await this.categoryRepository.find()
        }
    }

}
