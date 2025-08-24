import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json([
    {
      id: 99,
      title: "Siêu phẩm nổi bật",
      slug: "sieu-pham-noi-bat",
      poster_url: "https://image.tmdb.org/t/p/w500/6AG7sAt4EvsCazTA7kGEXLMaLLM.jpg",
      cover_url: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2400&auto=format&fit=crop",
      type: "movie",
      country: { id: 1, name: "USA" }
    }
  ]);
}
