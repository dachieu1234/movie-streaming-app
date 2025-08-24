import { Controller, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "common/dto/pagination.dto";

@ApiTags('movies')
@Controller("movies")
export class MoviesController {
    constructor(private svc: MoviesService) {}

    @Post()
    @ApiOperation({ summary: 'Tạo movie hoặc series' })
    async create(@Body() dto: CreateMovieDto) {
        return this.svc.createMovie(dto);
    }

    @ApiOperation({ summary: 'List movies' })
    async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    return this.svc.findAll(+page, +limit);
    }

    @ApiOperation({ summary: 'Detail movie' })
    @Get(":id") findOne(@Param("id") id: string) {
        return this.svc.findOne(+id);
    }

    @ApiOperation({ summary: 'Update movie' })
    @Put(":id") update(
        @Param("id") id: string,
        @Body() dto: Partial<CreateMovieDto>,
    ) {
        return this.svc.update(+id, dto);
    }

    @ApiOperation({ summary: 'Delete movie' })
    @Delete(":id") remove(@Param("id") id: string) {
        return this.svc.remove(+id);
    }
}
