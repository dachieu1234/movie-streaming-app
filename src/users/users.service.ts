import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(dto: any, role: "admin" | "user" = "user") {
    const password_hash = await bcrypt.hash(dto.password, 10);
    return this.repo.save(
      this.repo.create({
        username: dto.username,
        email: dto.email,
        password_hash,
        role,
      }),
    );
  }
  findAll() {
    return this.repo.find();
  }
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
  async findByUsername(username: string) {
    const user = await this.repo.findOne({ where: { username } });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }
}
