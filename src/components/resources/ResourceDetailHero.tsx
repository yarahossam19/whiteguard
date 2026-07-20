import Image from "next/image";

interface ResourceDetailHeroProps {
  image: string;
  alt?: string;
}

export default function ResourceDetailHero({ image, alt = "" }: ResourceDetailHeroProps) {
  return (
    <section className="relative h-[345px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-[#003859]" aria-hidden />
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
    </section>
  );
}
