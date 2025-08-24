export default function AdBanner({ url, imgSrc, imgAlt }: { url?: string; imgSrc?: string; imgAlt?: string }) {
  return (
    <div className="max-w-[890px] bg-gray-300 mx-auto flex items-center justify-center border-white border-2">
      <a
        href={url || "https://example.com"} 
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer block w-full h-full"
      >
        <img
          src={imgSrc || "https://via.placeholder.com/728x90.png"}
          alt={imgAlt || "Ad Banner"}
          className="w-100 h-auto"
        />
      </a>
    </div>
  );
}
