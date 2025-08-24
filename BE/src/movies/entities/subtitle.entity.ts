import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { VideoSource } from "./video-source.entity";
@Entity("subtitles")
export class Subtitle {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ nullable: false })
  video_source_id: number;
  
  @ManyToOne(() => VideoSource, (vs) => vs.subTitles, { onDelete: "CASCADE" })
  @JoinColumn({ name: "video_source_id" })
  videoSource: VideoSource;

  @Column({ nullable: false }) 
  language: string;
  
  @Column("text") 
  url: string;
}
