import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './post.model'
import { PostService } from './post.service'
import { UserModule } from 'src/user/user.module'
import { PostController } from './post.controller'
import { ProfileModule } from 'src/profile/profile.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    forwardRef(() => UserModule),
    ProfileModule,
  ],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
