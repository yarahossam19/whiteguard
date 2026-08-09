import Image from "next/image";
import Link from "next/link";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";

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
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-[12px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] transition-opacity hover:opacity-95 lg:max-w-[400px]">
      <Link href={item.href} className="block">
        <div className="relative h-[228px] w-full shrink-0 overflow-hidden rounded-t-[12px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
        </div>
      </Link>

      <div className="flex min-h-0 flex-1 flex-col p-4">
        <Link href={item.href} className="flex flex-1 flex-col gap-2">
          <h3 className="font-jakarta text-[18px] font-normal leading-[30px] tracking-[-0.15px] text-black lg:text-[20px]">
            {item.title}
          </h3>
          <p className="font-jakarta text-14 font-normal leading-[24px] tracking-[0px] text-[#545454] lg:text-[16px]">
            {item.description}
          </p>
        </Link>

        <div className="mt-auto w-full shrink-0 pt-4 [&>a]:block [&>a]:w-full">
          <HoverSwapButton
            href={item.href}
            label="View Details"
            hoverLabel="View Details"
            variant="secondary"
            showChevrons={false}
            className="w-full px-6 py-[14px] font-ano text-[clamp(14px,1.1vw,18px)]"
          />
        </div>
      </div>
    </article>
  );
}
