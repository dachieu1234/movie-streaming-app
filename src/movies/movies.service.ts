import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Movie } from "./entities/movie.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { MovieGenre } from "./entities/movie-genre.entity";
import { MovieActor } from "./entities/movie-actor.entity";
import { Season } from "./entities/season.entity";
import { VideoSource } from "./entities/video-source.entity";
import { Subtitle } from "./entities/subtitle.entity";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie) private movieRepo: Repository<Movie>,
        @InjectRepository(MovieGenre) private movieGenreRepo: Repository<MovieGenre>,
        @InjectRepository(MovieActor) private movieActorRepo: Repository<MovieActor>,
        @InjectRepository(Season) private seasonRepo: Repository<Season>,
        @InjectRepository(VideoSource) private videoRepo: Repository<VideoSource>,
        @InjectRepository(Subtitle) private subtitleRepo: Repository<Subtitle>,
    ) {}

    async createMovie(dto: CreateMovieDto) {
        return await this.movieRepo.manager.transaction(async (manager) => {
            // 1️⃣ Tạo movie
            const movie = await manager.save(this.movieRepo.create({ ...dto }));

            // 2️⃣ Genres
            if (dto.genre_ids?.length) {
                const movieGenres = dto.genre_ids.map(gid => this.movieGenreRepo.create({ movie_id: movie.id, genre_id: gid }));
                await manager.save(movieGenres);
            }

            // 3️⃣ Actors
            if (dto.actor_ids?.length) {
                const movieActors = dto.actor_ids.map(aid => this.movieActorRepo.create({ movie_id: movie.id, actor_id: aid }));
                await manager.save(movieActors);
            }

            if(
                (dto.type === "series" && !dto.seasons?.length) ||
                (dto.type === "movie" && !dto.video_sources?.length)
            ) {
                throw new UnprocessableEntityException("Series must have at least one season"); 
            }

            // 4️⃣ Series → Seasons + Video Sources + Subtitles
            if (dto.type === "series" && dto.seasons?.length) {
                const seasons = dto.seasons.map(s => this.seasonRepo.create({ movie_id: movie.id, ...s }));
                const savedSeasons = await manager.save(seasons);

                // Video Sources và Subtitles
                const videoSources: VideoSource[] = [];
                const subtitles: Subtitle[] = [];

                savedSeasons.forEach((season, idx) => {
                    const s = dto.seasons[idx];
                    if (s.video_sources?.length) {
                        s.video_sources.forEach(vs => {
                            const vsEntity = this.videoRepo.create({ movie_id: movie.id, season_id: season.id, ...vs });
                            videoSources.push(vsEntity);

                            if (vs.sub_titles?.length) {
                                vs.sub_titles.forEach(st => {
                                    subtitles.push(this.subtitleRepo.create({ video_source_id: vsEntity.id, ...st }));
                                });
                            }
                        });
                    }
                });

                if (videoSources.length) await manager.save(videoSources);
                if (subtitles.length) await manager.save(subtitles);

            } else if (dto.video_sources?.length) {  // 5️⃣ Non-series → Video Sources + Subtitles
                const videoSources: VideoSource[] = [];
                const subtitles: Subtitle[] = [];

                dto.video_sources.forEach(vs => {
                    const vsEntity = this.videoRepo.create({ movie_id: movie.id, ...vs });
                    videoSources.push(vsEntity);

                    if (vs.sub_titles?.length) {
                        vs.sub_titles.forEach(st => {
                            subtitles.push(this.subtitleRepo.create({ video_source_id: vsEntity.id, ...st }));
                        });
                    }
                });

                if (videoSources.length) await manager.save(videoSources);
                if (subtitles.length) await manager.save(subtitles);
            }

            return movie;
        });
    }


  findAll() {
    return this.movieRepo.find();
  }

  findOne(id: number) {
    return this.movieRepo.findOneBy({ id });
  }

  update(id: number, dto: Partial<CreateMovieDto>) {
    return this.movieRepo.save({ id, ...dto });
  }

  remove(id: number) {
    return this.movieRepo.delete(id);
  }
}
