import { Controller, Post, Body, Get, Param, UseGuards, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiBearerAuth, ApiBody, ApiHeader, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Roles, RolesGuard } from "auth/roles.guard";
import { JwtAuthGuard } from "auth/jwt-auth.guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}
  
  @Post() 
  @ApiBody({ type: CreateUserDto })
  create(@Body() userReq: CreateUserDto) {
    return this.userService.create(userReq);
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get()
  @ApiBearerAuth() 
  @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
  @ApiQuery({ name: "limit", required: false, type: Number, example: 10 })
  findAll(
    @Query("page") page = 1,
    @Query("limit") limit = 10,
  ){
    return this.userService.findAll(+page, +limit);
  }

  @Get(":id") 
  findOne(
    @Param("id") id: string
  ) {
    return this.userService.findOne(+id);
  }
}
