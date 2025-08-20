import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("subtitles")
export class Subtitle {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ nullable: true })
  movie_id: number;
  
  @Column({ nullable: true })
  episode_id: number;
  
  @Column({ nullable: true }) 
  language: string;
  
  @Column("text") 
  url: string;
}
