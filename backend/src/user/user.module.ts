import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.model'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { ProfileModule } from 'src/profile/profile.module'
import { PostModule } from 'src/post/post.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ProfileModule),
    forwardRef(() => PostModule),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
