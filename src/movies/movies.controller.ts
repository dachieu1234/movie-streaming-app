import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Controller("movies")
export class MoviesController {
  constructor(private svc: MoviesService) {}
  @Post() create(@Body() dto: CreateMovieDto) {
    return this.svc.create(dto);
  }
  @Get() findAll() {
    return this.svc.findAll();
  }
  @Get(":id") findOne(@Param("id") id: string) {
    return this.svc.findOne(+id);
  }
  @Put(":id") update(
    @Param("id") id: string,
    @Body() dto: Partial<CreateMovieDto>,
  ) {
    return this.svc.update(+id, dto);
  }
  @Delete(":id") remove(@Param("id") id: string) {
    return this.svc.remove(+id);
  }
}
