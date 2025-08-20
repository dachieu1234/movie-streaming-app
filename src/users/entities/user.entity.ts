import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("users")
export class User {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column({ unique: true }) 
  username: string;
  
  @Column({ unique: true }) 
  email: string;
  
  @Column("text") 
  password_hash: string;
  
  @Column({ default: "user" }) 
  role: string; // admin | user
  
  @Column("text", { nullable: true }) 
  avatar_url: string;
  
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
