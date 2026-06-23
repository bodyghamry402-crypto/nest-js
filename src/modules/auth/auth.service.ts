import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from '../../models/customer/customer.repository';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Types } from 'mongoose';
import { MailService } from 'src/shared/mail/mail.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';


@Injectable()
export class AuthService{
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly jwtservice: JwtService,
    private readonly mailservice: MailService,
    @Inject(CACHE_MANAGER)private readonly chacheManager: Cache,
    ){}

  async register(registerDto: RegisterDto,) {
    // 1. check user exist -> inject customerRepository to AuthService
    const customerExist = await this.customerRepository.getOne({
      email: registerDto.email,
    });
    // 2. if yes >> throw error >> user already exist
    if (customerExist) {
      throw new ConflictException('user already exists!');
    }
    // 3. hash-password [prepare data]
    // 4. send email with otp to verify
    const otp: number = Math.floor(Math.random() * 100000 + 99999);
    await this.mailservice.send({
     to: registerDto.email,
     subject: 'verify your account',
     html: `<p>your otp to verify your account is ${otp}</p>`,
    });
    // 5. save otp and userDate into cache
    await this.chacheManager.set(`otp:${registerDto.email}`, otp);
    const otpCached = await this.chacheManager.get<string>(
      `otp:${registerDto.email}`,
    );
    console.log({ otpCached });
    // todo: remove this step
    // 6. when verify account >> create User into DB , remove OTP
    return await this.customerRepository.create(registerDto);
  }
  
  async login(loginDto: LoginDto) {
  // 1. check user exist
  const customer = await this.customerRepository.getOne({
    email: loginDto.email,
  });
  // 2. if no , throw error user not found
  if (!customer) {
    throw new NotFoundException('user not found!');
  }
  // 3. check password
  // 4. if no , throw error
  // 5. generate token >> nestjs/jwt [JwtModule (setup/register) , JwtService(sign , verify)] >> jsonwebtoken >> sign , verify
  const accessToken = this.jwtservice.sign({
    sub: customer._id,
    role: customer['role'],
  });
  const refreshToken = this.jwtservice.sign(
    {
      sub: customer._id,
      role: customer['role'],
    },
    { expiresIn: '7d' },
  );
  return { accessToken, refreshToken };
  }

  async getProfile(userId: Types.ObjectId) {
  return await this.customerRepository.getOne({ _id: userId });
  }
}