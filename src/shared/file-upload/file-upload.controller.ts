import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { S3Provider } from './provider/s3.provider';
import { IsPublic } from 'src/common/decorators/public.decorator';


@Controller('upload')
@IsPublic()
export class FileUploadController {
  constructor(private readonly s3Provider: S3Provider) {}

  // 1. handler handle single image

  @Post('/image')
  @UseInterceptors(FileInterceptor('file')) // req >> parse >> busboy >> file
  async uploadSingleFile(@UploadedFile() file: Express.Multer.File,) {
    const url = await this.s3Provider.upload(file);
    return { success: true, data: { url } };
  }
  
  // 2. handler handle multi imags

  //@Post('/images')
  //@UseInterceptors(FilesInterceptor('file', 5)) // req >> parse >> busboy >> file
  //async uploadMultiFile(@UploadedFiles() files: Express.Multer.File[]) {
    //const url = await this.s3Provider.upload(files);
   //return { success: true, data: { url } };
  //}
}