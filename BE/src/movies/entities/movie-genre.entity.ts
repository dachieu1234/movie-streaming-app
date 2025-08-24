import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Movie } from "./movie.entity";
import { Genre } from "./genre.entity";

@Entity("movie_genres")
export class MovieGenre {
  @PrimaryColumn()
  movie_id: number;

  @PrimaryColumn()
  genre_id: number;  

  @ManyToOne(() => Movie, (m) => m.movieGenres, { onDelete: "CASCADE" })
  @JoinColumn({ name: "movie_id" })
  movie: Movie;

  @ManyToOne(() => Genre, (g) => g.movieGenres, { onDelete: "CASCADE" })
  @JoinColumn({ name: "genre_id" })
  genre: Genre;
}
