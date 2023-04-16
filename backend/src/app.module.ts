import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.model';
import { ProfileModule } from './profile/profile.module';
import { StreamModule } from './stream/stream.module';
import { FilesModule } from './files/files.module';
import { FollowModule } from './follow/follow.module';
import { CategoryModule } from './category/category.module';
import { MinioModule } from 'nestjs-minio-client';
import { MiniocloudModule } from './miniocloud/miniocloud.module';

@Module({
  imports: [
    MinioModule.register({
      isGlobal: true,
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'W9UqsNXHt1Ifzop4',
      secretKey: 'tkIAObiH7S5PytgFUBsCCxbfJ6QX3sq3'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'hate',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ProfileModule,
    StreamModule,
    FilesModule,
    FollowModule,
    CategoryModule,
    MiniocloudModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
