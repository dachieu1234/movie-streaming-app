import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBody } from "@nestjs/swagger";

@Controller("users")
export class UsersController {
  constructor(private svc: UsersService) {}
  
  @Post() 
  @ApiBody({ type: CreateUserDto })
  create(@Body() dto: CreateUserDto) {
    return this.svc.create(dto);
  }
  
  @Get() 
  findAll() {
    return this.svc.findAll();
  }

  @Get(":id") 
  findOne(
    @Param("id") id: string
  ) {
    return this.svc.findOne(+id);
  }
}
