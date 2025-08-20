import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column() 
  user_id: number;
  
  @Column() 
  movie_id: number;
  
  @Column({ type: "int", nullable: true }) 
  rating: number;
  
  @Column("text", { nullable: true }) 
  comment: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
