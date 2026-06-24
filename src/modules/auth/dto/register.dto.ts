import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class RegisterDto {

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsPhoneNumber('EG')
  phoneNumber: string;
}
