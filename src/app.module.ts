import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-redis-store";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { MoviesModule } from "./movies/movies.module";
import { AdsModule } from "./ads/ads.module";
import { InsightsModule } from "./insights/insights.module";
import { UploadModule } from "./upload/upload.module";
import { MinioService } from "./minio/minio.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || "5432", 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: false, // use migrations
      }),
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      }),
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || "secret",
      signOptions: { expiresIn: process.env.JWT_EXPIRES || "7d" },
    }),
    AuthModule,
    UsersModule,
    MoviesModule,
    AdsModule,
    InsightsModule,
    UploadModule,
  ],
  providers: [MinioService],
})
export class AppModule {}
