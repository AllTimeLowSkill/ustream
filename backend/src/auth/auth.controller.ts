import { Body, Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/signin')
    signIn(@Body() data: any) {
        return this.authService.signIn(data.email, data.password)
    }

    @Post('/signup')
    @UseInterceptors(FileInterceptor('avatar'))
    signUp (@Body() data: any, @UploadedFile() avatar: any) {
        return this.authService.signUp(data, avatar)
    }
}
