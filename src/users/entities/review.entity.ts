import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Movie } from "../../movies/entities/movie.entity";
@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column() 
  user_id: number;
  
  @ManyToOne(() => User, (u) => u.reviews, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column() 
  movie_id: number;
  
  @ManyToOne(() => Movie, (m) => m.reviews, { onDelete: "CASCADE" })
  @JoinColumn({ name: "movie_id" })
  movie: Movie;

  @Column({ type: "int", nullable: true }) 
  rating: number;
  
  @Column("text", { nullable: true }) 
  comment: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
