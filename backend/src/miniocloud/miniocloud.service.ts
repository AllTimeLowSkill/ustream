import { Injectable } from '@nestjs/common'
import { MinioService } from 'nestjs-minio-client'

@Injectable()
export class MiniocloudService {
  constructor(private readonly minioService: MinioService) {}

  uploadFile = async (filename: string, file: any, bucket: string) => {
    return await this.minioService.client.putObject(bucket, filename, file)
  }

  getBuckets = async () => {
    return await this.minioService.client.listBuckets()
  }
}
