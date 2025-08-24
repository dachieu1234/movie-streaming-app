"use client";
// import CarouselHero from "@/components/movie/Carousel";
import MovieRow from "@/components/movie/MovieRow";
import Banner from "@/components/layout/Banner";
import AdBanner from "@/components/ads/AdBanner";
export default function HomePage() {
  return (
    <div className="space-y-8">
      <Banner />
      <MovieRow title="Phim mới cập nhật" api="/api/mock/movies" />
      {/* <AdBanner slot="homepage-mid" /> */}
      <MovieRow title="Phim đề xuất" api="/api/mock/movies" />
    </div>
  );
}
