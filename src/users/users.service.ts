import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role, User } from "./entities/user.entity";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>
    ) {}

    async create(dto: any) {
        const existUser = await this.userRepo.findOne({
            where: [{ username: dto.username }, { email: dto.email }],
        });

        if (existUser) {
        if (existUser.username === dto.username) {
            throw new UnprocessableEntityException('Username already taken');
        }
        if (existUser.email === dto.email) {
            throw new UnprocessableEntityException('Email already registered');
        }
        }

        const user = this.userRepo.create({
            ...dto,
            password_hash: await bcrypt.hash(dto.password, 10),
        });
        return this.userRepo.save(user);
    }

    async findAll(page = 1, limit = 10) {
        const [items, total] = await this.userRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { id: "ASC" }, 
        });

        return {
            items,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    findOne(id: number) {
        const user = this.userRepo.findOneBy({ id });
        if(!user) throw new NotFoundException("User not found");
        return this.userRepo.findOneBy({ id });
    }

    async findByUsername(username: string) {
        const user = await this.userRepo.findOne({ where: { username } });
        if (!user) throw new NotFoundException("User not found");
        return user;
    }
}
