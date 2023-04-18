import { Controller } from '@nestjs/common';
import { Body, Get, Param, Put, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService
    ) {}

    @Get('/:id')
    getProfile(@Param('id') id: string) {
        return this.profileService.getProfile(id)
    }

    @Put('/update/avatar/:id')
    @UseInterceptors(FileInterceptor('avatar'))
    updateAvatar(@Param('id') id: string, @UploadedFile() avatar: any) {
        return this.profileService.updateAvatar(id, avatar)
    }

    @Put('/update/:id')
    updateProfile(@Param('id') id: string, @Body() data: any) {
        return this.profileService.updateProfile(id, data)
    }
}
