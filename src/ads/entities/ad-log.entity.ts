import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("ad_logs")
export class AdLog {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column() 
  ad_id: number;
  
  @Column({ nullable: true }) 
  user_id: number;
  
  @Column() 
  event: string;
  
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
