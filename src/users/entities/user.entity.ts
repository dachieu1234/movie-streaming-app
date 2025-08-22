import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Review } from "./review.entity";
import { WatchHistory } from "./watch-history.entity";

export type Role = 'admin' | 'user'; 

@Entity("users")
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column({ unique: true, nullable: false }) 
  username: string;
  
  @Column({ unique: true, nullable: false }) 
  email: string;
  
  @Column("text", { nullable: false })  
  password_hash: string;
  
  @Column({ type: 'text', default: 'user', nullable: false })
  role: string;
  
  @Column("text", { nullable: true }) 
  avatar_url: string;
  
  @OneToMany(() => Review, (r) => r.user)
  reviews: Review[];

  @OneToMany(() => WatchHistory, (wh) => wh.user)
  watchHistories: WatchHistory[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}