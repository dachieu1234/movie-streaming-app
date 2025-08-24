// "use client";
// import { useQuery } from "@tanstack/react-query";
// import { fetchJSON } from "@/lib/api";
// import { Movie } from "@/types/movie";
// import Image from "next/image";
// import Link from "next/link";

// export default function CarouselHero() {
//   const { data } = useQuery<Movie[]>({ queryKey: ["hero"], queryFn: () => fetchJSON("/api/mock/featured") });
//   if (!data?.length) return null;
//   const first = data[0];
//   return (
//     <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
//       <Image src={first.cover_url || first.poster_url} alt={first.title} fill className="object-cover" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
//       <div className="absolute bottom-4 left-4">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">{first.title}</h1>
//         <Link href={`/movies/${first.slug}`} className="mt-3 inline-block bg-brand px-4 py-2 rounded-full text-sm font-semibold">
//           Xem ngay
//         </Link>
//       </div>
//     </div>
//   );
// }
