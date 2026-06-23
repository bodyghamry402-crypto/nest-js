import { AbstractRepository } from '../abstract.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './customer.schema';
import { Injectable } from '@nestjs/common';
import { ICustomer } from 'src/common/interfaces/customer.interface';

@Injectable()
export class CustomerRepository extends AbstractRepository<ICustomer> {
  constructor(@InjectModel(Customer.name) customerModel: Model<ICustomer>) {
    super(customerModel);
  }
}