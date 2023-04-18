import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/user/user.module'
import { Profile } from './profile.model'
import { ProfileService } from './profile.service'
import { ProfileController } from './profile.controller'
import { FilesModule } from 'src/files/files.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    forwardRef(() => UserModule),
    FilesModule,
  ],
  providers: [ProfileService],
  exports: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
