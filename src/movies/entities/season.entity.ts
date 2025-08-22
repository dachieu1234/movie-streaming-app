import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Movie } from "./movie.entity";
import { VideoSource } from "./video-source.entity";
@Entity("seasons")
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  season_number: number;

  @Column({ type: "varchar", nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @ManyToOne(() => Movie, (m) => m.seasons, { onDelete: "CASCADE" })
  @JoinColumn({ name: "movie_id" })
  movie: Movie;

  @OneToMany(() => VideoSource, (vs) => vs.season, { cascade: true })
  videoSources: VideoSource[];
}
