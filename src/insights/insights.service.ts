import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DailyStats } from "./entities/daily-stats.entity";
import { WatchHistory } from "../users/entities/watch-history.entity";

@Injectable()
export class InsightsService {
  constructor(
    @InjectRepository(DailyStats) private daily: Repository<DailyStats>,
    @InjectRepository(WatchHistory) private wh: Repository<WatchHistory>,
  ) {}

  async computeViews(date: string) {
    const { count } = await this.wh
      .createQueryBuilder("wh")
      .select("COUNT(*)", "count")
      .where("DATE(wh.watched_at) = :d", { d: date })
      .andWhere("(wh.progress IS NULL OR wh.progress >= 0.1)")
      .getRawOne();
    return parseInt(count, 10) || 0;
  }

  async upsertDaily(date?: string) {
    const d = date || new Date().toISOString().slice(0, 10);
    const views = await this.computeViews(d);
    let row = await this.daily.findOne({ where: { date: d } });
    if (!row) row = this.daily.create({ date: d });
    row.total_views = views;
    return this.daily.save(row);
  }

  async topMovies(limit = 10) {
    return this.wh.query(
      `
      SELECT m.id, m.title, COUNT(*) as views
      FROM watch_history wh JOIN movies m ON m.id = wh.movie_id
      GROUP BY m.id ORDER BY views DESC LIMIT $1
    `,
      [limit],
    );
  }
}
