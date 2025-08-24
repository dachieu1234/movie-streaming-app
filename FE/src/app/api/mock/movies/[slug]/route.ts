import { NextResponse } from "next/server";
const movies = [
  {
    id: 1,
    title: "Bộ tứ siêu đẳng",
    slug: "bo-tu-sieu-dang",
    description: "Một nhóm siêu anh hùng với năng lực đặc biệt.",
    poster_url: "https://image.tmdb.org/t/p/w500/6AG7sAt4EvsCazTA7kGEXLMaLLM.jpg",
    cover_url: "https://image.tmdb.org/t/p/original/6AG7sAt4EvsCazTA7kGEXLMaLLM.jpg",
    type: "movie",
    country: { id: 1, name: "USA" },
    videoSources: [{ id: 100, title: "Full HD", url: "https://www.w3schools.com/html/mov_bbb.mp4" }],
    genres: [{ id: 1, name: "Hành động", slug: "hanh-dong"}],
    actors: [{ id: 1, name: "John Doe" }]
  },
  {
    id: 2,
    title: "Hành trình kỳ ảo",
    slug: "hanh-trinh-ky-ao",
    description: "Phiêu lưu khám phá thế giới mới.",
    poster_url: "https://image.tmdb.org/t/p/w500/roY0r3YgQq0w.jpg",
    cover_url: "https://image.tmdb.org/t/p/original/roY0r3YgQq0w.jpg",
    type: "series",
    country: { id: 2, name: "Japan" },
    seasons: [
      { id: 1, season_number: 1, title: "Season 1", videoSources: [
        { id: 11, title: "Tập 1", url: "https://www.w3schools.com/html/mov_bbb.mp4", episode_number: 1 },
        { id: 12, title: "Tập 2", url: "https://www.w3schools.com/html/mov_bbb.mp4", episode_number: 2 }
      ]}
    ]
  }
];
export async function GET(_: Request, { params }: { params: { slug: string }}) {
  const item = movies.find(m => m.slug === params.slug);
  return NextResponse.json(item || null);
}
