import Image from "next/image";
import Link from "next/link";

export interface ResourceCardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

interface ResourceCardProps {
  item: ResourceCardItem;
}

export default function ResourceCard({ item }: ResourceCardProps) {
  return (
    <Link
      href={item.href}
      className="group flex w-full flex-col overflow-hidden rounded-[12px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] gap-4 transition-opacity hover:opacity-95 lg:max-w-[400px]"
    >
      {/* Image */}
      <div className="relative h-[228px] w-full shrink-0 overflow-hidden rounded-t-[12px]  ">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />
      </div>
      {/* Content */}
      <div className="flex flex-col gap-0 pt-0 p-4">
        <h3 className="font-jakarta text-[18px] font-normal leading-[30px] tracking-[-0.15px] text-black lg:text-[20px]">
          {item.title}
        </h3>
        <p className="font-jakarta text-14 lg:text-[16px] font-normal leading-[24px] tracking-[0px] text-[#545454]">
          {item.description}
        </p>
      </div>
    </Link>
  );
}
