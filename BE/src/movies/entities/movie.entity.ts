// movies.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn,
  JoinColumn
} from "typeorm";
import { Country } from "./country.entity";
import { MovieGenre } from "./movie-genre.entity";
import { MovieActor } from "./movie-actor.entity";
import { Season } from "./season.entity";
import { VideoSource } from "./video-source.entity";
import { Review } from "../../users/entities/review.entity";

@Entity("movies")
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "date", nullable: true })
  release_date: Date;

  @Column({ type: "int", nullable: true })
  duration: number;

  @Column({ type: "varchar" })
  type: "movie" | "series";

  @Column({ type: "text", nullable: true })
  poster_url: string;

  @Column({ type: "text", nullable: true })
  cover_url: string;

  @ManyToOne(() => Country, (c) => c.movies)
  @JoinColumn({ name: "country_id" })
  country: Country;

  @OneToMany(() => MovieGenre, (mg) => mg.movie, { cascade: true })
  movieGenres: MovieGenre[];

  @OneToMany(() => MovieActor, (ma) => ma.movie, { cascade: true })
  movieActors: MovieActor[];

  @OneToMany(() => Season, (s) => s.movie, { cascade: true })
  seasons: Season[];

  @OneToMany(() => VideoSource, (vs) => vs.movie, { cascade: true })
  videoSources: VideoSource[];

  @OneToMany(() => Review, (r) => r.movie)
  reviews: Review[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}