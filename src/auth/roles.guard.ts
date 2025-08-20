import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  SetMetadata,
} from "@nestjs/common";
export const Roles = (...roles: string[]) => SetMetadata("roles", roles);

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const roles = (Reflect.getMetadata("roles", ctx.getHandler()) ||
      []) as string[];
    if (!roles.length) return true;
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user || !roles.includes(user.role))
      throw new ForbiddenException("Insufficient role");
    return true;
  }
}
