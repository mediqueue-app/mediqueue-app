import { SmartImage } from "@/components/ui/SmartImage";

export function ClinicGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [main, ...rest] = images;
  const thumbs = rest.slice(0, 4);

  return (
    <div className="grid gap-2 overflow-hidden rounded-2xl md:aspect-[16/7] md:grid-cols-4 md:grid-rows-2">
      <div className="md:col-span-2 md:row-span-2">
        <SmartImage
          src={main}
          alt={`${name} — ana görsel`}
          className="h-64 w-full md:h-full"
        />
      </div>
      {thumbs.map((img, i) => (
        <div key={i} className="hidden md:block">
          <SmartImage
            src={img}
            alt={`${name} — görsel ${i + 2}`}
            className="h-full w-full"
          />
        </div>
      ))}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        {thumbs.slice(0, 3).map((img, i) => (
          <SmartImage
            key={i}
            src={img}
            alt={`${name} — görsel ${i + 2}`}
            className="h-20 w-full rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
