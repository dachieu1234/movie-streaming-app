import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("watch_history")
export class WatchHistory {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column() 
  user_id: number;
  
  @Column({ nullable: false }) 
  movie_id: number;
  
  @Column() 
  episode_id: number;
  
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  watched_at: Date;
 
  @Column({ type: "float" }) 
  progress: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
