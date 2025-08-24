import Player from "@/components/player/Player";

async function getData(slug: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/mock/movies/${slug}`, { cache: "no-store" });
  return res.json();
}

export default async function WatchPage({ params, searchParams }: { params: { slug: string }, searchParams: { ep?: string }}) {
  const movie = await getData(params.slug);
  const ep = Number(searchParams.ep || "1");
  const url = movie.type === "movie"
    ? movie.videoSources?.[0]?.url
    : movie.seasons?.[0]?.videoSources?.find((v:any)=> v.episode_number === ep)?.url;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Xem: {movie.title} {movie.type === "series" ? `(Tập ${ep})` : ""}</h1>
      {url ? <Player src={url} /> : <div>Không tìm thấy nguồn phát</div>}
    </div>
  );
}
