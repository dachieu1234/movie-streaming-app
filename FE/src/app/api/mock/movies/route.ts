import { NextResponse } from "next/server";
const movies = [
  {
    id: 1,
    title: "Bộ tứ siêu đẳng",
    slug: "bo-tu-sieu-dang",
    poster_url: "https://image.tmdb.org/t/p/w500/6AG7sAt4EvsCazTA7kGEXLMaLLM.jpg",
    cover_url: "https://image.tmdb.org/t/p/original/6AG7sAt4EvsCazTA7kGEXLMaLLM.jpg",
    type: "movie",
    country: { id: 1, name: "USA" },
    genres: [{ id: 1, name: "Hành động", slug: "hanh-dong"}]
  },
  {
    id: 2,
    title: "Hành trình kỳ ảo",
    slug: "hanh-trinh-ky-ao",
    poster_url: "https://image.tmdb.org/t/p/w500/roY0r3YgQq0w.jpg",
    cover_url: "https://image.tmdb.org/t/p/original/roY0r3YgQq0w.jpg",
    type: "series",
    country: { id: 2, name: "Japan" },
    genres: [{ id: 2, name: "Phiêu lưu", slug: "phieu-luu"}],
    seasons: [
      { id: 1, season_number: 1, title: "Season 1", videoSources: [
        { id: 11, title: "Tập 1", url: "https://www.w3schools.com/html/mov_bbb.mp4", episode_number: 1 },
        { id: 12, title: "Tập 2", url: "https://www.w3schools.com/html/mov_bbb.mp4", episode_number: 2 }
      ]}
    ]
  }
];
export async function GET() { return NextResponse.json(movies); }
