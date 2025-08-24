import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdsController } from "./ads.controller";
import { AdsService } from "./ads.service";
import { Ad } from "./entities/ad.entity";
import { AdLog } from "./entities/ad-log.entity";
import { AdPlacement } from "./entities/ad-placement.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Ad, AdLog, AdPlacement])],
  controllers: [AdsController],
  providers: [AdsService],
  exports: [AdsService],
})
export class AdsModule {}
