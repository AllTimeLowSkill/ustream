import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Profile } from './profile.model'
import { FilesService } from 'src/files/files.service'

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly filesService: FilesService,
  ) {}

  createProfile = async (id: string, avatar: any) => {
    if (avatar) {
      const fileName = await this.filesService.createFile(avatar, 'avatars')
      return await this.profileRepository.save({
        firstname: '',
        lastname: '',
        aboutMe: '',
        userId: id,
        avatar: fileName,
      })
    }

    return await this.profileRepository.save({
      firstname: '',
      lastname: '',
      aboutMe: '',
      userId: id,
      avatar: '',
    })
  }

  getProfile = async (id: string) => {
    return await this.profileRepository.findOne({
      where: {
        userId: id,
      },
    })
  }

  updateAvatar = async (id: string, avatar: any) => {
    const fileName = await this.filesService.createFile(avatar, 'avatars')
    const isUpdated = await this.profileRepository.update(
      { userId: id },
      {
        avatar: fileName,
      },
    )
    if (isUpdated) {
      return await this.profileRepository.findOne({
        where: {
          userId: id,
        },
      })
    }
  }

  updateProfile = async (id: string, data: any) => {
    const isUpdated = await this.profileRepository.update(
      { userId: id },
      {
        firstname: data.firstname,
        lastname: data.lastname,
        aboutMe: data.aboutMe,
        address: data.address,
        date: data.date,
      },
    )

    if (isUpdated) {
      return await this.profileRepository.findOne({
        where: {
          userId: id,
        },
      })
    }
  }
}
