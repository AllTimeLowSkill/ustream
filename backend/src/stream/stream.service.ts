import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stream } from './stream.model';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ProfileService } from 'src/profile/profile.service';
import { StreamInfo } from './streamInfo.model';

@Injectable()
export class StreamService {
    constructor(
        @InjectRepository(Stream) private readonly streamRepository: Repository<Stream>,
        @InjectRepository(StreamInfo) private readonly streamInfoRepository: Repository<StreamInfo>,
        private readonly userService: UserService,
        private readonly profileService: ProfileService
    ) {}

    createStreamData = async (data: any) => {
        const stream = await this.streamRepository.save(data)
        const streamInfoCreated = await this.streamInfoRepository.findOne({ where: {
            streamKey: stream.streamKey
        } })
        const user = await this.userService.getUserByStreamKey(stream.streamKey)
        const profile = await this.profileService.getProfile(user.id)
        if(!streamInfoCreated) {
            const streamInfo = await this.streamInfoRepository.save({ streamKey: stream.streamKey, categoryId: '' })
            return {
                streamId: stream.streamKey,
                username: stream.username,
                avatar: profile.avatar,
                category: streamInfo.categoryId
            } 
        }
        return {
            streamId: stream.streamKey,
            username: stream.username,
            avatar: profile.avatar,
            category: streamInfoCreated.categoryId
        }
    }

    updateStreamCategory = async (id: string, streamKey: string) => {
        const isMatch = await this.streamInfoRepository.update({ streamKey }, {
            categoryId: id
        })

        if(isMatch) {
            return await this.streamInfoRepository.findOne({ where: {
                streamKey
            } })
        }
    }

    getStreams = async () => {
        const streams = await this.streamRepository.find()
        const streamsData = []
        for(const stream of streams) {
            const data = await this.streamInfoRepository.findOne({ where: {
                streamKey: stream.streamKey
            } })
            const user = await this.userService.getUserByStreamKey(stream.streamKey)
            const profile = await this.profileService.getProfile(user.id)

            streamsData.push({
                streamId: stream.streamKey,
                username: stream.username,
                category: data.categoryId,
                avatar: profile.avatar,
            })
        }

        return streamsData
    }

    deleteStreamData = async (streamId: string) => {  
        const stream = await this.streamRepository.findOne({ where: {
            streamId 
        } })
        if(stream) {
            await this.streamRepository.delete(stream.id)
            return await this.streamRepository.find()
        }
    }
}
