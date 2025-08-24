import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Movie } from "./movie.entity";
import { Season } from "./season.entity";
import { Subtitle } from "./subtitle.entity";
import { WatchHistory } from "../../users/entities/watch-history.entity";
@Entity("video_sources")
export class VideoSource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  quality: string;

  @Column({ type: "varchar" })
  language: string;

  @Column({ type: "text" })
  url: string;

  @Column({ type: "int", nullable: true })
  episode_number: number;

  @Column({ type: "int", nullable: true })
  duration: number;

  @Column({ type: "varchar", nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "date", nullable: true })
  release_date: Date;

  @ManyToOne(() => Movie, (m) => m.videoSources, { onDelete: "CASCADE" })
  @JoinColumn({ name: "movie_id" })
  movie: Movie;

  @ManyToOne(() => Season, (s) => s.videoSources, { onDelete: "CASCADE" })
  @JoinColumn({ name: "season_id" })
  season: Season;

  @OneToMany(() => Subtitle, (st) => st.videoSource, { cascade: true })
  subTitles: Subtitle[];

  @OneToMany(() => WatchHistory, (wh) => wh.videoSource)
  watchHistories: WatchHistory[];
}