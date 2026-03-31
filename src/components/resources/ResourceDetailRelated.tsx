import ResourceCard from "./ResourceCard";
import type { ResourceCardItem } from "./ResourceCard";

interface ResourceDetailRelatedProps {
  items: ResourceCardItem[];
}

export default function ResourceDetailRelated({
  items,
}: ResourceDetailRelatedProps) {
  if (items.length === 0) return null;

  return (
    <section className="w-full py-16">
      <div className="container">
      {/* Section title - 32px, underline 4px #29343d */}
      <div className="mb-5 flex flex-col items-start gap-4">
        <h2 className="font-jakarta   border-b-4 pb-3 border-[#29343D] text-[32px] font-normal capitalize leading-normal tracking-[-0.8px] text-[#29343D]">
          Related Blogs
        </h2>
        <div className="h-[4px] w-[25%] " />
      </div>

      {/* Cards grid  */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[94px]">
        {items.slice(0, 3).map((item) => (
          <div key={item.id} className="w-full lg:max-w-[375px]">
            <ResourceCard item={item} />
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
