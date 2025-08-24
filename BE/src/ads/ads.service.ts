import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ad } from "./entities/ad.entity";
import { AdLog } from "./entities/ad-log.entity";

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(Ad) private ads: Repository<Ad>,
    @InjectRepository(AdLog) private logs: Repository<AdLog>,
  ) {}
  
  create(dto: any) {
    return this.ads.save(this.ads.create(dto));
  }
 
  all() {
    return this.ads.find();
  }

  log(ad_id: number, event: "impression" | "click", user_id?: number) {
    return this.logs.save({ ad_id, event, user_id });
  }
}
