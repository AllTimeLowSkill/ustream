import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './post.model'
import { Repository } from 'typeorm'
import { UserService } from 'src/user/user.service'
import { ProfileService } from 'src/profile/profile.service'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  getPosts = async (userId: string) => {
    const response = []
    const posts = await this.postRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    })
    const { avatar } = await this.profileService.getProfile(userId)
    for (const post of posts) {
      response.push({ post, avatar })
    }

    return response
  }

  createPost = async (id: string, data: any) => {
    const user = await this.userService.getUser(id)
    return await this.postRepository.save({ ...data, user: user })
  }
}
