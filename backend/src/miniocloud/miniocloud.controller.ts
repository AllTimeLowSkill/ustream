import { Controller, Get } from '@nestjs/common'
import { MiniocloudService } from './miniocloud.service'

@Controller('miniocloud')
export class MiniocloudController {
  constructor(private readonly minioService: MiniocloudService) {}

  @Get('/')
  getBuckets() {
    return this.minioService.getBuckets()
  }
}
