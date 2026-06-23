import { AbstractRepository } from '../abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.schema';
import { Injectable } from '@nestjs/common';
import { IAdmin } from 'src/common/interfaces/admin.interface';

@Injectable()
export class AdminRepository extends AbstractRepository<IAdmin> {
  constructor(@InjectModel(Admin.name) adminModel: Model<IAdmin>) {
    super(adminModel);
  }
}