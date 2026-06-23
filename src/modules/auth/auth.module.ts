import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserMongoModule } from 'src/shared/modules/user.mongo.module';
import { MailModule } from 'src/shared/mail/mail.module';
import { PermissionRepository } from 'src/models/permissions/permission.repository';
import { Permission, permissionsSchema } from 'src/models/permissions/permission.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([
     { name: Permission.name, schema: permissionsSchema },
    ]),
    MailModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt').accessSecret,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService,PermissionRepository],
})
export class AuthModule {}