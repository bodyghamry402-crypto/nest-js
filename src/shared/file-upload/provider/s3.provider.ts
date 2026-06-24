import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Provider {
  private readonly client: S3Client;
  constructor(
    private readonly configService: ConfigService,
  ) {

    this.client = new S3Client({
      region: this.configService.get('s3').region,

      credentials: {
        accessKeyId: this.configService.get('s3').accessKeyId,

        secretAccessKey: this.configService.get('s3').secretAccessKey,
      },
    });
  }

  async upload(file: Express.Multer.File, folder: string = 'public'): Promise<string> {

    const command = new PutObjectCommand({

      Bucket: this.configService.get('s3').bucketName,

      Body: file.buffer,

      Key: `demo-app/${folder}`,

      ContentType: file.mimetype,

    });

    await this.client.send(command);

    return command.input.Key as string;
  }

  async delete(key: string): Promise<void> {

    const command: DeleteObjectCommand = new DeleteObjectCommand({

      Key: key,

      Bucket: this.configService.get('s3').bucketName,

    });

    await this.client.send(command);
  }

  get(key: string): Promise<string> {

    throw new Error('Method not implemented.');
  }
}