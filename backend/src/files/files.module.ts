import { Module } from '@nestjs/common'
import { FilesService } from './files.service'
import { MiniocloudModule } from 'src/miniocloud/miniocloud.module'

@Module({
  imports: [MiniocloudModule],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
