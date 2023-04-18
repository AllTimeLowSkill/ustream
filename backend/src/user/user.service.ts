import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser = async (data: any) => {
    return await this.userRepository.save(data)
  }

  checkUserByStreamKey = async (streamKey: string) => {
    const condidate = await this.userRepository.findOne({
      where: {
        streamKey,
      },
    })

    if (condidate) {
      return true
    }

    return false
  }

  getUserByStreamKey = async (streamKey: string) => {
    const user = await this.userRepository.findOne({
      where: {
        streamKey,
      },
    })

    return user
  }

  getUser = async (id: string) => {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    })
  }

  getUserByEmailAndPassword = async (email: string) => {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    })

    if (!user) {
      return false
    }

    return user
  }

  updateUser = async (id: string, data: any) => {
    const isMatch = await this.userRepository.update(
      { id },
      {
        email: data.email,
      },
    )

    if (isMatch) {
      return await this.userRepository.findOne({
        where: {
          id: data.id,
        },
      })
    }
  }

  findUsers = async (username: string) => {
    const users = await this.userRepository.find()
    return users.filter((user) =>
      user.username.toLocaleLowerCase().includes(username.toLocaleLowerCase()),
    )
  }
}
