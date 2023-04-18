import { Module } from '@nestjs/common'
import { StreamService } from './stream.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Stream } from './stream.model'
import { StreamController } from './stream.controller'
import { UserModule } from 'src/user/user.module'
import { ProfileModule } from 'src/profile/profile.module'
import { StreamInfo } from './streamInfo.model'
import { CategoryModule } from 'src/category/category.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Stream, StreamInfo]),
    UserModule,
    ProfileModule,
    CategoryModule,
  ],
  providers: [StreamService],
  controllers: [StreamController],
})
export class StreamModule {}
