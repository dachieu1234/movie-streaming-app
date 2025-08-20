import { Entity, PrimaryColumn } from "typeorm";
@Entity("movie_genres")
export class MovieGenre {
  @PrimaryColumn() 
  movie_id: number;
  
  @PrimaryColumn() 
  genre_id: number;
}
