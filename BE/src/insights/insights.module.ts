import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InsightsController } from "./insights.controller";
import { InsightsService } from "./insights.service";
import { DailyStats } from "./entities/daily-stats.entity";
import { WatchHistory } from "../users/entities/watch-history.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DailyStats, WatchHistory])],
  controllers: [InsightsController],
  providers: [InsightsService],
})
export class InsightsModule {}
