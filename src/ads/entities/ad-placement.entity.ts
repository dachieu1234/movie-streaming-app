import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity("ad_placements")
export class AdPlacement {
  @PrimaryGeneratedColumn() id: number;
  
  @Column() 
  ad_id: number;
  
  @Column() 
  page: string;
  
  @Column() 
  slot: string;
}
