import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Movie } from "./entities/movie.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie) private movieRepo: Repository<Movie>,
    ) {}

    async createMovie(dto: CreateMovieDto) {
        // 4️⃣ Validate bắt buộc season / video_source
        if (
            (dto.type === 'series' && !dto.seasons?.length) ||
            (dto.type === 'movie' && !dto.video_sources?.length)
        ) {
            throw new UnprocessableEntityException(
                'Series must have at least one season or Movie must have at least one video source',
            );
        }
        const movie = this.movieRepo.create({
            ...dto,
            country: { id: dto.country_id },
            movieGenres: dto.genre_ids?.map((gid) => ({
                genre_id: gid
            })),
            movieActors: dto.actor_ids?.map((aid) => ({
                actor_id: aid,
            })),
            seasons:
                dto.type === 'series'
                    ? dto.seasons?.map((s) => ({
                        ...s,
                        videoSources: s.video_sources?.map((vs) => ({
                            ...vs,
                            subTitles: vs.sub_titles,
                        })),
                    }))
                    : [],
            videoSources:
                dto.type === 'movie'
                    ? dto.video_sources?.map((vs) => ({
                        ...vs,
                        subTitles: vs.sub_titles,
                    }))
                    : [],
        });

        return await this.movieRepo.save(movie);
    }

    async findAll(page = 1, limit = 10) {
        const [items, total] = await this.movieRepo.findAndCount({
            relations: [
                "country",
                "movieGenres.genre",
                "movieActors.actor",
                "seasons",
                "seasons.videoSources",
                "seasons.videoSources.subTitles",
                "videoSources",
                "videoSources.subTitles",
            ],
            skip: (page - 1) * limit,
            take: limit,
            order: { created_at: "DESC" },
        });
    
        return {
            data: items,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    findOne(id: number) {
        return this.movieRepo.findOne({
            where: { id },
            relations: [
                "country",
                "movieGenres.genre",
                "movieActors.actor",
                "seasons",
                "seasons.videoSources",
                "seasons.videoSources.subTitles",
                "videoSources",
                "videoSources.subTitles",
            ],
        });
    }

  update(id: number, dto: Partial<CreateMovieDto>) {
    return this.movieRepo.save({ id, ...dto });
  }

  remove(id: number) {
    return this.movieRepo.delete(id);
  }
}
