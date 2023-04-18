import { Module } from '@nestjs/common'
import { MiniocloudService } from './miniocloud.service'
import { MiniocloudController } from './miniocloud.controller'

@Module({
  providers: [MiniocloudService],
  controllers: [MiniocloudController],
  exports: [MiniocloudService],
})
export class MiniocloudModule {}
