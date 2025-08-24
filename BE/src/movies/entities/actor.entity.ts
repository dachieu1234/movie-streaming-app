import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { MovieActor } from "./movie-actor.entity";
@Entity("actors")
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("text", { nullable: true })
  bio: string;

  @Column({ type: "date", nullable: true })
  birth_date: string;

  @Column("text", { nullable: true })
  photo_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => MovieActor, (ma) => ma.actor)
  movieActors: MovieActor[];

}
