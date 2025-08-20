import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesService } from "./movies.service";
import { MoviesController } from "./movies.controller";
import { Movie } from "./entities/movie.entity";
import { Country } from "./entities/country.entity";
import { Genre } from "./entities/genre.entity";
import { MovieGenre } from "./entities/movie-genre.entity";
import { Actor } from "./entities/actor.entity";
import { MovieActor } from "./entities/movie-actor.entity";
import { Season } from "./entities/season.entity";
import { Episode } from "./entities/episode.entity";
import { VideoSource } from "./entities/video-source.entity";
import { Subtitle } from "./entities/subtitle.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie,
      Country,
      Genre,
      MovieGenre,
      Actor,
      MovieActor,
      Season,
      Episode,
      VideoSource,
      Subtitle,
    ]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
