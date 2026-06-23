import { AbstractRepository } from '../abstract.repository';
import { IUser } from '../../common/interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './user.schema';

@Injectable()
export class UserRepository extends AbstractRepository<IUser> {
  constructor(@InjectModel(User.name) userModel: Model<IUser>) {
    super(userModel);
  }
}

// nestJS handle create userRepo = new UserRepository(models => User);