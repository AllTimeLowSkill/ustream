import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid'
import { MiniocloudService } from 'src/miniocloud/miniocloud.service';
import { MinioService } from 'nestjs-minio-client'

@Injectable()
export class FilesService {
    constructor(
        private readonly minioService: MiniocloudService,
        private readonly Minio: MinioService
    ) {}

    createFile = async (file: any, bucket: string) => {
        const fileName = uuid.v4() + '.jpg'
        this.Minio.client.bucketExists(bucket, async (err, exist) => {
            if(err) {
                return new HttpException('Excepton with create file', HttpStatus.INTERNAL_SERVER_ERROR)
            }
            if(!exist) {
                await this.Minio.client.makeBucket(bucket)
            }
            await this.minioService.uploadFile(fileName, file.buffer, bucket)
        })
        
        return fileName
    }
}
