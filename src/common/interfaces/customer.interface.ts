import { GenderEnum } from "../enums/gender.enum";

export interface ICustomer {
  userName: string;

  email: string;

  phoneNumber: string;

  password: string;

  gender: GenderEnum;

  address: string;
}