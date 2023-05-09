import { Body, Controller, Param, Post } from '@nestjs/common'
import { PostService } from './post.service'
import { ProfileService } from 'src/profile/profile.service'

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly profileService: ProfileService,
  ) {}

  @Post('/create/:id')
  async createPost(@Param('id') id: string, @Body() data: any) {
    const profile = await this.profileService.getProfile(id)
    const post = await this.postService.createPost(id, data)
    return {
      post,
      avatar: profile.avatar,
    }
  }
}
