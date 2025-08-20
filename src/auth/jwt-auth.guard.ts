import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const auth = req.headers["authorization"];
    if (!auth || !auth.startsWith("Bearer ")) throw new UnauthorizedException();
    const token = auth.slice(7);
    try {
      req.user = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_SECRET || "secret",
      });
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
