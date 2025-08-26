"use client";

import AdBanner from "@/components/ads/AdBanner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Banner() {
  const router = useRouter();
  const [api, setApi] = useState<any>(null); // embla api
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      id: 1,
      title: "Phim mới cập nhật",
      description: "Nội dung tóm tắt ngắn gọn về bộ phim",
      image:
        "https://static.nutscdn.com/vimg/1920-0/7fb03fc7adc8de125e80bc0d67d0e841.webp",
      genres: [
        { id: 1, name: "Hành động" },
        { id: 2, name: "Phiêu lưu" },
        { id: 3, name: "Viễn tưởng" },
      ],
    },
    {
      id: 2,
      title: "Phim mới cập nhật 2",
      description: "Nội dung tóm tắt ngắn gọn về bộ phim 2",
      image:
        "https://static.nutscdn.com/vimg/1920-0/f105d609e2cc3c8ce1c29f999f42bb9d.webp",
      genres: [
        { id: 1, name: "Hành động 2" },
        { id: 2, name: "Phiêu lưu 2" },
        { id: 3, name: "Viễn tưởng 2" },
      ],
    },
  ];

  // theo dõi khi carousel đổi slide
  useEffect(() => {
    if (!api) return;
    const handler = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    api.on("select", handler);
    handler();
    return () => {
      api.off("select", handler);
    };
  }, [api]);

  return (
    <div className="w-full relative">
      <Carousel className="w-100" setApi={setApi}>
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem
              key={item.id}
              style={{
                backgroundImage: `
                  linear-gradient(to top, #000, transparent 60%),
                  linear-gradient(to bottom, #000, transparent 20%),
                  linear-gradient(to left, #000, transparent 20%),
                  linear-gradient(to right, #000, transparent 20%),
                  url(${item.image})
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="w-full h-[260px] md:h-[500px] lg:h-[100vh] flex-shrink-0 flex items-center justify-center text-white relative"
            >
              <div className="grid items-end content-end justify-center h-full px-2 sm:px-6 cursor-pointer md:mb-[300px] mb-[160px]">
                <div className="text-center mx-auto mb-2 md:mb-5">
                  <h2 className="line-clamp-1 md:line-clamp-2 text-md md:text-2xl font-bold mx-auto mb-2 md:mb-3 md:max-w-3xl">
                    {item.title}
                  </h2>

                  {/* Genres */}
                  <div className="text-center mb-5 hidden md:block">
                    {item.genres.map((genre) => (
                      <Button
                        key={genre.id}
                        className="bg-[#ffffff10] hover:text-[#FFD875] mr-2"
                        onClick={() =>
                          router.push(`/genres/${genre.name.toLowerCase()}`)
                        }
                      >
                        {genre.name}
                      </Button>
                    ))}
                  </div>

                  <p className="max-w-[60%] md:max-w-3xl text-white mx-auto line-clamp-2 lg:line-clamp-4 text-14">
                    {item.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* thumbnail selector */}
      <div className="absolute bottom-0 w-full mb-2">
        <div className="flex gap-1 mx-auto justify-center w-full mb-1 md:mb-3">
          {data.map((inner, index) => (
            <Image
              key={inner.id}
              src={inner.image}
              alt={inner.title}
              width={60}
              height={60}
              onClick={() => api?.scrollTo(index)}
              className={`inline-block mr-1 rounded-full md:rounded w-[20px] md:w-[70px] h-[20px] md:h-auto border cursor-pointer transform transition-transform duration-200 hover:scale-105 ${
                index === activeIndex ? "scale-110 border-yellow-400" : ""
              }`}
            />
          ))}
        </div>
        <AdBanner
          url="https://i.finallygotthexds.site/vpromolink/9b/09/9b09d624b9c8127b0596bf87fce25497/9b09d624b9c8127b0596bf87fce25497.gif"
          imgSrc="https://i.finallygotthexds.site/vpromolink/9b/09/9b09d624b9c8127b0596bf87fce25497/9b09d624b9c8127b0596bf87fce25497.gif"
          imgAlt="Ad Banner"
        />
      </div>
    </div>
  );
}
