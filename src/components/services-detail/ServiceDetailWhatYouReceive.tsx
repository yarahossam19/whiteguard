import Image from "next/image";
import Link from "next/link";
import { SectionImageSeparator } from "@/components/ui/SectionImageSeparator";

interface ReceiveItem {
  number: string;
  imgSrc: string;
  title: string;
  description: string;
  bg: string;
}

interface ServiceDetailWhatYouReceiveProps {
  heading: string;
  subtitle: string;
  items: ReceiveItem[];
  linkLabel: string;
  linkHref: string;
}

export default function ServiceDetailWhatYouReceive({
  heading,
  subtitle,
  items,
  linkLabel,
  linkHref,
}: ServiceDetailWhatYouReceiveProps) {
  return (
    <>
      <section className="bg-white pb-16 lg:pb-20">
        <div className="container">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 flex flex-col items-center gap-2 text-center">
            <h2 className="font-jakarta text-[28px] font-normal leading-[41.6px] text-[#003859] lg:text-[32px]">
              {heading}
            </h2>
            <p className="font-jakarta text-[16px] font-normal leading-[24px] text-[#52697a]">
              {subtitle}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.number}
                className="relative flex flex-col gap-4 rounded-[16px] p-6 lg:p-8"
                style={{ backgroundColor: item.bg }}
              >
                <Image
                  src={item.imgSrc}
                  alt={item.title}
                  width={34}
                  height={34}
                  className=" object-contain"
                />
                <span
                  style={{ color: "rgba(0, 56, 89, 0.15)" }}
                  className="font-jakarta text-[32px] lg:text-[80px] font-bold  leading-[80px] absolute top-2 right-4 "
                >
                  {item.number}
                </span>
                <h3 className="font-jakarta text-[18px] font-normal leading-[1.2] text-[#003859]">
                  {item.title}
                </h3>
                <p className="font-jakarta text-[16px] font-normal leading-[1.5] text-[#52697a]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href={linkHref}
              className="group inline-flex items-center gap-2 font-jakarta text-[15px] font-normal text-[#003859] transition-colors hover:text-[#006dad]"
            >
              {linkLabel}
              <Image
                src="/images/icons/arrow-right-2.svg"
                alt=""
                width={20}
                height={20}
                className="shrink-0 transition-transform group-hover:translate-x-1 rotate-180"
              />
            </Link>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
