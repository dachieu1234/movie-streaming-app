import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
@Entity("daily_stats")
@Unique(["date"])
export class DailyStats {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ type: "date" }) 
  date: string;

  @Column({ type: "int", default: 0 }) 
  new_users: number;
 
  @Column({ type: "int", default: 0 }) 
  total_users: number;
 
  @Column({ type: "int", default: 0 }) 
  total_views: number;
 
  @Column({ type: "bigint", default: 0 }) 
  total_watch_time: number;
 
  @Column({ type: "int", nullable: true }) 
  top_movie_id: number;
}
