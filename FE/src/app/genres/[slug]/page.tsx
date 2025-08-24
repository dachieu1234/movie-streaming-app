import MovieCard from "@/components/movie/MovieCard";

async function getData() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/mock/movies`, { cache: "no-store" });
  return res.json();
}

export default async function GenrePage({ params }: { params: { slug: string }}) {
  const list = await getData();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Thể loại: {params.slug.replace(/-/g, " ")}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {list.map((m:any)=> <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}
