import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Follow } from './follow.model'
import { Repository } from 'typeorm'
import { UserService } from 'src/user/user.service'
import { ProfileService } from 'src/profile/profile.service'

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  createFollows = async (userId: string, followId: string) => {
    const user = await this.userService.getUser(userId)
    const follow = await this.userService.getUserByStreamKey(followId)
    await this.followRepository.save({ user: user, follow: follow.id })

    const { username } = await this.userService.getUser(follow.id)
    const { avatar } = await this.profileService.getProfile(follow.id)
    return {
      avatar,
      username,
    }
  }

  getFollows = async (id: string) => {
    const follow = await this.followRepository.find({
      where: {
        user: {
          id,
        },
      },
    })

    const followsInfo = []
    for (const item of follow) {
      const { id, username } = await this.userService.getUser(item.follow)
      const { avatar } = await this.profileService.getProfile(id)
      followsInfo.push({ username, avatar })
    }

    return followsInfo
  }

  deleteFollow = async (id: string) => {
    await this.followRepository.delete(id)
  }
}
