import { Entity, PrimaryColumn, Column } from "typeorm";
@Entity("movie_actors")
export class MovieActor {
  @PrimaryColumn() 
  movie_id: number;
  
  @PrimaryColumn() 
  actor_id: number;
  
  @Column({ nullable: true }) 
  role: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
