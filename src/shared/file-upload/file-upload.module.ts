import { Module } from '@nestjs/common';
import { S3Provider } from './provider/s3.provider';
import { FileUploadController } from './file-upload.controller';

@Module({

  imports: [],

  controllers: [FileUploadController],

  providers: [S3Provider],

  exports: [S3Provider],

})
export class FileUploadModule {}