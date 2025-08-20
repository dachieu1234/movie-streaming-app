import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("ads")
export class Ad {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column() 
  name: string;
  
  @Column() 
  type: string;
  
  @Column() 
  position: string;
  
  @Column("text", { nullable: true }) 
  media_url: string;
  
  @Column("text", { nullable: true }) 
  target_url: string;
  
  @Column({ type: "date", nullable: true }) 
  start_date: string;
  
  @Column({ type: "date", nullable: true }) 
  end_date: string;
  
  @Column({ type: "int", default: 0 }) 
  impressions: number;
  
  @Column({ type: "int", default: 0 }) 
  clicks: number;
  
  @Column({ type: "boolean", default: true }) 
  is_active: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
