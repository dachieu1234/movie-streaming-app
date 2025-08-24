import { Controller, Get, Query } from "@nestjs/common";
import { InsightsService } from "./insights.service";

@Controller("insights")
export class InsightsController {
  constructor(private svc: InsightsService) {}
  
  @Get("daily") daily(@Query("date") date?: string) {
    return this.svc.upsertDaily(date);
  }

  @Get("top-movies") top(@Query("limit") limit = "10") {
    return this.svc.topMovies(parseInt(limit, 10));
  }
}
