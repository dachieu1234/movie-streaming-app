import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Movie } from "./movie.entity";
@Entity("countries")
export class Country {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column({ unique: true }) 
  name: string;
  
  @OneToMany(() => Movie, (m) => m.country)
  movies: Movie[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
