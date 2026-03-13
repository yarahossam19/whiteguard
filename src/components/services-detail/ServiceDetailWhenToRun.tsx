import Image from "next/image";

interface ServiceDetailWhenToRunProps {
  heading: string;
  items: string[];
}

export default function ServiceDetailWhenToRun({
  heading,
  items,
}: ServiceDetailWhenToRunProps) {
  return (
    <section className="bg-white px-4 pb-16 lg:pb-20">
      <div className="mx-auto max-w-[768px]">
        <h2 className="mb-12 text-center font-jakarta text-[28px] font-normal leading-[41.6px] text-[#003859] lg:text-[32px]">
          {heading}
        </h2>
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 rounded-[14px] bg-[rgba(224,230,235,0.25)] px-6 py-4"
            >
              <Image
                src="/images/icons/check-circle.svg"
                alt=""
                width={24}
                height={24}
                className="shrink-0"
              />
              <p className="font-jakarta text-[15px] font-normal leading-[24px] text-[#52697a]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
