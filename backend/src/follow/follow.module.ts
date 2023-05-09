import { Module, forwardRef } from '@nestjs/common'
import { FollowService } from './follow.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Follow } from './follow.model'
import { UserModule } from 'src/user/user.module'
import { ProfileModule } from 'src/profile/profile.module'
import { FollowController } from './follow.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Follow]),
    forwardRef(() => UserModule),
    ProfileModule,
  ],
  providers: [FollowService],
  controllers: [FollowController],
  exports: [FollowService],
})
export class FollowModule {}
