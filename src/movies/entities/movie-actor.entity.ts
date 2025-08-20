import { Entity, PrimaryColumn, Column } from "typeorm";
@Entity("movie_actors")
export class MovieActor {
  @PrimaryColumn() 
  movie_id: number;
  
  @PrimaryColumn() 
  actor_id: number;
  
  @Column({ nullable: true }) 
  role: string;
}
