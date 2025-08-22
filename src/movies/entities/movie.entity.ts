import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
@Entity("movies")
export class Movie {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column() 
  title: string;
  
  @Column({ unique: true }) 
  slug: string;
  
  @Column("text", { nullable: true }) 
  description: string;
  
  @Column({ type: "date", nullable: true }) 
  release_date: string;
  
  @Column({ type: "int", nullable: true }) 
  duration: number;
  
  @Column() 
  type: string;
  
  @Column("text", { nullable: true })
  poster_url: string;
  
  @Column("text", { nullable: true }) 
  cover_url: string;
  
  @Column({ type: "int", nullable: true }) 
  country_id: number;

  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
}


