import { Controller, Get, Post, Param, Body, UseGuards } from "@nestjs/common";
import { AdsService } from "./ads.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard, Roles } from "../auth/roles.guard";

@Controller("ads")
export class AdsController {
  constructor(private svc: AdsService) {}
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Post()
  create(@Body() dto: any) {
    return this.svc.create(dto);
  }

  @Get() list() {
    return this.svc.all();
  }

  @Post(":id/log") log(@Param("id") id: string, @Body() dto: any) {
    return this.svc.log(+id, dto.event, dto.user_id);
  }
}
