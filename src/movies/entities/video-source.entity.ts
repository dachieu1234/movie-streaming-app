import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("video_sources")
export class VideoSource {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column({ nullable: true }) 
  movie_id: number;
  
  @Column({ nullable: true }) 
  episode_id: number;
  
  @Column({ nullable: true }) 
  quality: string;
  
  @Column({ nullable: true }) 
  language: string;
  
  @Column("text") 
  url: string;
}
