import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { MailModule } from 'src/shared/mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
