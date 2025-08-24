import MovieCard from "@/components/movie/MovieCard";

async function searchMovies(q: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/mock/movies`, { cache: "no-store" });
  const all = await res.json();
  return all.filter((m:any)=> m.title.toLowerCase().includes(q.toLowerCase()));
}

export default async function SearchPage({ searchParams }: { searchParams: { q?: string }}) {
  const q = searchParams.q || "";
  const list = q ? await searchMovies(q) : [];
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Tìm kiếm: {q}</h1>
      {!q && <p>Nhập từ khóa để tìm phim.</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {list.map((m:any)=> <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}
