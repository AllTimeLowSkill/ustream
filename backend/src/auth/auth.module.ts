import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ProfileModule } from 'src/profile/profile.module';
import { FollowModule } from 'src/follow/follow.module';

@Module({
  imports: [UserModule, ProfileModule, FollowModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
