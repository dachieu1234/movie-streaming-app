import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("video_sources")
export class VideoSource {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column({ nullable: false }) 
  movie_id: number;

  @Column() 
  season_id: number;
  
  @Column() 
  quality: string;
  
  @Column() 
  language: string;
  
  @Column("text") 
  url: string;

  @Column() 
  episode_number: number;
  
  @Column({ nullable: true }) 
  title: string;
  
  @Column("text", { nullable: true }) 
  description: string;
  
  @Column({ type: "int", nullable: true }) 
  duration: number;
  
  @Column({ type: "date", nullable: true }) 
  release_date: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
