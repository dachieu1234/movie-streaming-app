import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Movie } from "./entities/movie.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private repo: Repository<Movie>) {}
  create(dto: CreateMovieDto) {
    return this.repo.save(this.repo.create(dto as any));
  }
  findAll() {
    return this.repo.find();
  }
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
  update(id: number, dto: Partial<CreateMovieDto>) {
    return this.repo.save({ id, ...dto });
  }
  remove(id: number) {
    return this.repo.delete(id);
  }
}
