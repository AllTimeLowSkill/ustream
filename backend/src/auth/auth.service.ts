import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'
import { ProfileService } from 'src/profile/profile.service';
import { FollowService } from 'src/follow/follow.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly profileService: ProfileService,
        private readonly followsService: FollowService
    ) {}

    private saltOfRounds = 10

    signIn = async (email: string, password: string) => {
        const condidate = await this.userService.getUserByEmailAndPassword(email)
        if(condidate) {
            const isMatch = await bcrypt.compare(password, condidate.password)
            if(isMatch) {
                const profile = await this.profileService.getProfile(condidate.id)
                const follows = await this.followsService.getFollows(condidate.id)
                return {
                    user: {
                        id: condidate.id,
                        username: condidate.username,
                        email: condidate.email,
                        streamKey: condidate.streamKey
                    },
                    profile: {
                        firstname: profile.firstname,
                        lastname: profile.lastname,
                        aboutMe: profile.aboutMe,
                        avatar: profile.avatar
                    },
                    follows
                 }
            } 
        }

        return new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN)
    }

    signUp = async (data: any, avatar: any) => {
        const condidate = await this.userService.getUserByEmailAndPassword(data.email)
        if(condidate !== false) {
            return new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN)
        }

        const hash = await bcrypt.hash(data.password, this.saltOfRounds)

        const streamKey = uuidv4()

        const user = await this.userService.createUser({...data, streamKey: streamKey, password: hash})
        const profile = await this.profileService.createProfile(user.id, avatar)
        const follows = await this.followsService.getFollows(user.id)
        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                streamKey: user.streamKey
            },
            profile: {
                firstname: profile.firstname,
                lastname: profile.lastname,
                aboutMe: profile.aboutMe,
                avatar: profile.avatar
            },
            follows
        }
    }
}
