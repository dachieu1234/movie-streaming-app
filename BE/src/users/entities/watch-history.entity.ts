import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Movie } from "../../movies/entities/movie.entity";
import { VideoSource } from "../../movies/entities/video-source.entity";
@Entity("watch_history")
export class WatchHistory {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column() 
  user_id: number;

  @ManyToOne(() => User, (u) => u.watchHistories, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
  
  @Column({ nullable: false }) 
  movie_id: number;
  
  @ManyToOne(() => Movie, (m) => m.videoSources, { onDelete: "CASCADE" })
  @JoinColumn({ name: "movie_id" })
  movie: Movie;
  
  @Column() 
  video_source_id: number;

  @ManyToOne(() => VideoSource, (vs) => vs.watchHistories, { onDelete: "CASCADE" })
  @JoinColumn({ name: "video_source_id" })
  videoSource: VideoSource;
  
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  watched_at: Date;
 
  @Column({ type: "float" }) 
  progress: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
