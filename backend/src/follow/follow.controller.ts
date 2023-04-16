import { Controller, Post, Body } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
    constructor(
        private readonly followService: FollowService
    ) {}

    @Post('/create')
    async createFollow(@Body() data: any) {
        return await this.followService.createFollows(data.id, data.follow)
    }
}
