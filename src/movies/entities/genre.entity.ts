import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MovieGenre } from "./movie-genre.entity";
@Entity("genres")
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => MovieGenre, (mg) => mg.genre)
  movieGenres: MovieGenre[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
