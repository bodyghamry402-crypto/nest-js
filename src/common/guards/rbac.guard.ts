import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PermissionRepository } from '../../models/permissions/permission.repository';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RBACGuard implements CanActivate {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: any = context.switchToHttp().getRequest();
    const action: any = this.reflector.get('action', context.getHandler()); // create-product
    // req.user.sub
    // get all permissions for user
    const userPermissions = await this.permissionRepository.getOne({
      userId: request.user.sub,
    });
    if (!userPermissions?.permission.includes(action)) {
      throw new UnauthorizedException(`you are not allowed to ${action}`);
    }
    return true;
  }
}