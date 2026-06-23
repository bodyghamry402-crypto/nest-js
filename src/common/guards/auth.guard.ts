import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflactor: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // have is_public metadata == true
    const isPublic: any = this.reflactor.getAllAndOverride(IS_PUBLIC, [
      context.getHandler(), // true
      context.getClass(), // not
    ]);
    if (isPublic) return true;
    // logic of code
    const request: any = context.switchToHttp().getRequest();

    const authorization: any = request.headers.authorization; // 'Bearer token'

    if (!authorization) {
      throw new UnauthorizedException('token is missing!');
    }

    const token = authorization.split(' ')[1];

    request.user = this.jwtService.verify(token); // {sub:id,role:string , iat:number , exp:number} | error

    return true; // next()
  }
}