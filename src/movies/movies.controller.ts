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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('movies')
@Controller("movies")
export class MoviesController {
    constructor(private svc: MoviesService) {}

    @Post()
    @ApiOperation({ summary: 'Tạo movie hoặc series' })
    @ApiResponse({ status: 201, description: 'Movie created successfully' })
    @ApiResponse({ status: 422, description: 'Validation failed' })
    async create(@Body() dto: CreateMovieDto) {
        return this.svc.createMovie(dto);
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
