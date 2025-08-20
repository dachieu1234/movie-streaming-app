import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
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
}
