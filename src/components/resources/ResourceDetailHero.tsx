import Image from "next/image";

interface ResourceDetailHeroProps {
  image: string;
  alt?: string;
}

export default function ResourceDetailHero({ image, alt = "" }: ResourceDetailHeroProps) {
  return (
    <section className="relative h-[220px] w-full overflow-hidden sm:h-[280px] lg:h-[345px]">
      <div className="absolute inset-0 bg-[#003859]" aria-hidden />
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#003859]/35 to-transparent"
        aria-hidden
      />
    </section>
  );
}
