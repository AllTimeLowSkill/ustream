import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { ProfileService } from 'src/profile/profile.service'
import { PostService } from 'src/post/post.service'
import { FollowService } from 'src/follow/follow.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly postService: PostService,
    private readonly followService: FollowService,
  ) {}

  @Get('/:streamkey')
  async getUserByStreamKey(@Param('streamkey') streamkey: string) {
    const { username, id } = await this.userService.getUserByStreamKey(
      streamkey,
    )
    const { avatar } = await this.profileService.getProfile(id)
    return {
      avatar,
      username,
    }
  }

  @Get('/info/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUser(id)
    const profile = await this.profileService.getProfile(id)
    const posts = await this.postService.getPosts(id)
    const followers = await this.followService.getFollowsCounter(id)

    return {
      username: user.username,
      firstname: profile.firstname,
      lastname: profile.lastname,
      avatar: profile.avatar,
      followers,
      posts,
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
