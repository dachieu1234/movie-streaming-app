import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("countries")
export class Country {
  @PrimaryGeneratedColumn() 
  id: number;
  
  @Column({ unique: true }) 
  name: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
