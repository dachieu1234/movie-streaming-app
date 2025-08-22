import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity("movie_genres")
export class MovieGenre {
  @PrimaryColumn() 
  movie_id: number;
  
  @PrimaryColumn() 
  genre_id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
