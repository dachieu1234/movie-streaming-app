import DataSource from "../data-source";
import * as fs from "fs";
import * as path from "path";

async function runSeeds() {
  const seedsDir = path.join(__dirname); // thư mục seeds
  const files = fs.readdirSync(seedsDir).filter(
    (file) => file.endsWith(".seed.ts") || file.endsWith(".seed.js")
  );

  for (const file of files) {
    const seedPath = path.join(seedsDir, file);
    const seedModule = await import(seedPath);

    // mỗi file export 1 function seedXxx
    const seedFn = Object.values(seedModule)[0] as Function;
    if (typeof seedFn === "function") {
      await seedFn(DataSource);
      console.log(`✅ Seeded: ${file}`);
    }
  }
}

DataSource.initialize()
  .then(async (ds) => {
    await runSeeds();
    console.log("🎉 All seeding completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  });
