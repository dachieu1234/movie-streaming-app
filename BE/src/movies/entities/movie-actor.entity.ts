// movie_actors.entity.ts
import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { Movie } from "./movie.entity";
import { Actor } from "./actor.entity";

@Entity("movie_actors")
export class MovieActor {
  @PrimaryColumn()
  movie_id: number;

  @PrimaryColumn()
  actor_id: number;  

  @ManyToOne(() => Movie, (m) => m.movieActors, { onDelete: "CASCADE" })
  @JoinColumn({ name: "movie_id" })
  movie: Movie;

  @ManyToOne(() => Actor, (a) => a.movieActors, { onDelete: "CASCADE" })
  @JoinColumn({ name: "actor_id" })
  actor: Actor;
}
