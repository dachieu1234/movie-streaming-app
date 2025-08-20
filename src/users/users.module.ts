import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./entities/user.entity";
import { Review } from "./entities/review.entity";
import { WatchHistory } from "./entities/watch-history.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Review, WatchHistory])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
