import Image from "next/image";
import Link from "next/link";
import Player from "@/components/player/Player";
import AdBanner from "@/components/ads/AdBanner";

async function getData(slug: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/mock/movies/${slug}`, { cache: "no-store" });
  return res.json();
}

export default async function MovieDetail({ params }: { params: { slug: string }}) {
  const movie = await getData(params.slug);
  if (!movie) return <div>Không tìm thấy phim</div>;
  const playUrl = movie.type === "movie" ? movie.videoSources?.[0]?.url : movie.seasons?.[0]?.videoSources?.[0]?.url;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="relative h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden">
          <Image src={movie.cover_url || movie.poster_url} alt={movie.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <h1 className="text-2xl md:text-3xl font-black">{movie.title}</h1>
            <div className="text-sm text-gray-300 mt-1">
              {movie.genres?.map((g:any)=> g.name).join(", ")} · {movie.country?.name}
            </div>
          </div>
        </div>
        {playUrl && <Player src={playUrl} />}
        {movie.type === "series" && (
          <div className="card p-3">
            <h3 className="font-semibold mb-2">Danh sách tập</h3>
            <div className="flex flex-wrap gap-2">
              {movie.seasons?.[0]?.videoSources?.map((ep:any) => (
                <Link key={ep.id} href={`/watch/${movie.slug}?ep=${ep.episode_number}`} className="px-3 py-1 rounded bg-neutral-800">
                  Tập {ep.episode_number}
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="card p-4">
          <h3 className="font-semibold">Nội dung</h3>
          <p className="text-gray-300 mt-2">{movie.description || "Đang cập nhật..."}</p>
        </div>
      </div>
      <aside className="space-y-4">
        <AdBanner slot="detail-sidebar-top" />
        <div className="card p-3">
          <h3 className="font-semibold mb-2">Diễn viên</h3>
          <div className="text-sm text-gray-300">{
            movie.actors?.map((a:any)=>a.name).join(", ") || "Đang cập nhật"
          }</div>
        </div>
        <AdBanner slot="detail-sidebar-bottom" />
      </aside>
    </div>
  );
}
