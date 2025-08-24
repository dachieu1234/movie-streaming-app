import AdBanner from "@/components/ads/AdBanner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export default function Banner() {
  return (
    <div className="w-full relative">
      <Carousel className="w-100">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem 
              key={index}   
                style={{
                  backgroundImage: `
                    linear-gradient(to top, rgba(30,33,36,1), transparent 30%),
                    linear-gradient(to bottom, rgba(30,33,36,1), transparent 20%),
                    linear-gradient(to left, rgba(30,33,36,1), transparent 20%),
                    linear-gradient(to right, rgba(30,33,36,1), transparent 20%),
                    url("https://static.nutscdn.com/vimg/1920-0/7fb03fc7adc8de125e80bc0d67d0e841.webp")
                  `,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              className="w-full h-[240px] md:h-[100vh]"
            >


          
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* ads */}
      <div className="absolute bottom-2 w-full">
        <AdBanner
          url="https://i.finallygotthexds.site/vpromolink/9b/09/9b09d624b9c8127b0596bf87fce25497/9b09d624b9c8127b0596bf87fce25497.gif"
          imgSrc="https://i.finallygotthexds.site/vpromolink/9b/09/9b09d624b9c8127b0596bf87fce25497/9b09d624b9c8127b0596bf87fce25497.gif"
          imgAlt="Ad Banner"
        />
      </div>
    </div>
  );
}
