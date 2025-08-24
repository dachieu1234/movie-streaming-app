"use client";
import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

export default function MovieRow({ title, api }: { title: string; api: string }) {
  // const { data } = useQuery<Movie[]>({ queryKey: [api], queryFn: () => fetchJSON(api) });
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {/* {data?.map((m) => <MovieCard key={m.id} movie={m} />)} */}
      </div>
    </section>
  );
}
