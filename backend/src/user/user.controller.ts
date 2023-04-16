import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ProfileService } from 'src/profile/profile.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly profileService: ProfileService
    ) {}

    @Get('/:streamkey')
    async getUserByStreamKey(@Param('streamkey') streamkey: string) {
        const { username, id } = await this.userService.getUserByStreamKey(streamkey)
        const { avatar } = await this.profileService.getProfile(id)
        return {
            avatar,
            username
        }
    }


    @Get('/check/:streamkey')
    async checkUserByStreamKey(@Param('streamkey') streamkey: string) {
        return await this.userService.checkUserByStreamKey(streamkey)
    }

    @Put('/update/:id')
    updateUser(@Param('id') id: string, @Body() data: any) {
        return this.userService.updateUser(id, data)
    }

    @Post('/find')
    findUser(@Body() data: any) {
        return this.userService.findUsers(data.username)
    }
}
