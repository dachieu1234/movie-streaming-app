import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("seasons")
export class Season {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column() 
  movie_id: number;
  
  @Column() 
  season_number: number;
  
  @Column({ nullable: true }) 
  title: string;
  
  @Column("text", { nullable: true })
  description: string;
}
