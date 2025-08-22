import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("subtitles")
export class Subtitle {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ nullable: false })
  video_source_id: number;
  
  @Column({ nullable: false }) 
  language: string;
  
  @Column("text") 
  url: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
