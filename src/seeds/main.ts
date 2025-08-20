import DataSource from "../data-source";
import { seedUsers } from "./user.seed";
import { seedGenres } from "./genre.seed";

DataSource.initialize()
  .then(async (ds) => {
    await seedUsers(ds);
    await seedGenres(ds);
    console.log("🎉 Seeding completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  });
