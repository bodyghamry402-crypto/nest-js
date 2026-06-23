import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
  imports: [
    // register mailer config >> transporter >> {user , pass}

    MailerModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('mailer').host,
          port: configService.get('mailer').port,

          auth: {
            user: configService.get('mailer').auth.user,
            pass: configService.get('mailer').auth.pass,
          },
        },

        defaults: {
          from: '"demo app" <BODY279@gmail.com>',
        },
      }),
    }),
  ],

  controllers: [],

  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}