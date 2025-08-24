import { DataSource } from "typeorm";
import { Genre } from "../movies/entities/genre.entity";

export async function seedGenres(dataSource: DataSource) {
  const repo = dataSource.getRepository(Genre);
  const count = await repo.count();
  if (count === 0) {
    const genres = ["Action", "Comedy", "Drama", "Horror", "Romance"].map(
      (name) => repo.create({ name }),
    );
    await repo.save(genres);
    console.log("✅ Seeded genres");
  }
}
