import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movies/${movie.slug}`} className="card group">
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={movie.poster_url || "/placeholder.png"}
          alt={movie.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold leading-tight line-clamp-2">{movie.title}</h3>
        {movie.country?.name && (
          <p className="text-xs text-gray-400 mt-1">{movie.country.name}</p>
        )}
      </div>
    </Link>
  );
}
