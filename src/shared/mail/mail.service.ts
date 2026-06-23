import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {

  constructor(private readonly mailerService: MailerService) {}

  async send(options: ISendMailOptions) {

    await this.mailerService.sendMail(options);
  }
}