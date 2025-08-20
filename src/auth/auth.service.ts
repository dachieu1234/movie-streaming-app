import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async validate(username: string, password: string) {
    const user = await this.users.findByUsername(username);
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new UnauthorizedException("Invalid credentials");
    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, role: user.role, username: user.username };
    const access_token =  await this.jwt.signAsync(payload)
    return { access_token };
  }
}
