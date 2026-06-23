import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { Action } from 'src/common/decorators/action.decorator';
import { RBACGuard } from 'src/common/guards/rbac.guard';


@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // auth/register

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const createdCustomer = await this.authService.register(registerDto);

    return {
      message: 'user created successfully',
      success: true,
      data: { createdCustomer },
    };
  }

  @Post('login')
  @IsPublic()
  async login(@Body() loginDto: LoginDto) {
    const objResult = await this.authService.login(loginDto);

    return {
     message: 'login successfully',
     success: true,
     data: objResult,
    };
  }

  // binding

  @Get('profile/me')
  @Action('get-profile')
  @UseGuards(RBACGuard)
  async getProfile(@User() user: any) {
   const customer = await this.authService.getProfile(user.sub);

    return {
     message: 'user get successfully',
      success: true,
      data: customer,
    };
  }
}