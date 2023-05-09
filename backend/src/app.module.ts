import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { User } from './user/user.model'
import { ProfileModule } from './profile/profile.module'
import { StreamModule } from './stream/stream.module'
import { FilesModule } from './files/files.module'
import { FollowModule } from './follow/follow.module'
import { CategoryModule } from './category/category.module'
import { MinioModule } from 'nestjs-minio-client'
import { MiniocloudModule } from './miniocloud/miniocloud.module'
import { ConfigModule } from '@nestjs/config'
import { PostModule } from './post/post.module';
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '..', '.env'),
    }),
    MinioModule.register({
      isGlobal: true,
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS,
      secretKey: process.env.MINIO_SERCRET,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
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
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
