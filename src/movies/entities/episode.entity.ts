import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("episodes")
export class Episode {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column() 
  season_id: number;
  
  @Column() 
  episode_number: number;
  
  @Column({ nullable: true }) 
  title: string;
  
  @Column("text", { nullable: true }) 
  description: string;
  
  @Column({ type: "int", nullable: true }) 
  duration: number;
  
  @Column({ type: "date", nullable: true }) 
  release_date: string;
}
