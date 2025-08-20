import { DataSource } from "typeorm";
import { User } from "../users/entities/user.entity";
import * as bcrypt from "bcryptjs";

export async function seedUsers(dataSource: DataSource) {
  const repo = dataSource.getRepository(User);

  // Nếu chưa có user thì thêm
  const count = await repo.count();
  if (count === 0) {
    const admin = repo.create({
      username: "admin",
      email: "admin@example.com",
      password_hash: await bcrypt.hash("123456", 10),
      role: "admin",
    });

    const user = repo.create({
      username: "demo",
      email: "demo@example.com",
      password_hash: await bcrypt.hash("123456", 10),
      role: "user",
    });

    await repo.save([admin, user]);
    console.log("✅ Seeded users");
  }
}
