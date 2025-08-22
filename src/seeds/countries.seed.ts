import { DataSource } from "typeorm";
import { Country } from "../movies/entities/country.entity";

export async function seedCountries(dataSource: DataSource) {
    const repo = dataSource.getRepository(Country);
    const count = await repo.count();
    if (count === 0) {  
        const countries = [
        "Việt Nam",
        "Hoa Kỳ",
        "Hàn Quốc",
        "Nhật Bản",
        "Pháp",
        "Anh",
        "Trung Quốc",
        "Ấn Độ",
        "Thái Lan",
        "Australia",
        "Canada",
        "Nga",
        "Ý",
        "Đức",
        "Brazil",
    ].map((name) => repo.create({ name }));

    await repo.save(countries);
  }
}
