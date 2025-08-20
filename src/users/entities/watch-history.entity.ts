import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("watch_history")
export class WatchHistory {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column() 
  user_id: number;
  
  @Column({ nullable: true }) 
  movie_id: number;
  
  @Column({ nullable: true }) 
  episode_id: number;
  
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  watched_at: Date;
 
  @Column({ type: "float", nullable: true }) 
  progress: number;
}
