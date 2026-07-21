import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/metadata";
import { searchSite } from "@/lib/site-search";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim();

  if (query) {
    return buildPageMetadata({
      path: "/search",
      title: `Search: ${query}`,
      description: `Search results for "${query}" on WhiteGuard.`,
      robots: { index: false, follow: true },
    });
  }

  return buildPageMetadata({
    path: "/search",
    title: "Search",
    description: "Search WhiteGuard services, resources, and pages.",
    robots: { index: false, follow: true },
  });
}

const TYPE_LABELS = {
  service: "Service",
  resource: "Article",
  page: "Page",
} as const;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? searchSite(query) : [];

  return (
    <div className="bg-white">
      <div className="container py-16 md:py-24">
        <h1 className="font-jakarta text-3xl font-bold text-[#003859] md:text-4xl">
          Search
        </h1>
        <p className="mt-3 max-w-2xl font-jakarta text-base text-[#52697a]">
          Find services, articles, and pages across whiteguard.io.
        </p>

        <form action="/search" method="get" className="mt-8 max-w-xl">
          <label htmlFor="site-search" className="sr-only">
            Search the site
          </label>
          <div className="flex gap-3">
            <input
              id="site-search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="e.g. penetration testing, SOC, SAMA"
              className="h-[52px] flex-1 rounded-lg border border-[#d0dee8] px-4 font-jakarta text-base text-[#003859] outline-none focus:border-[#0095d9]"
              autoComplete="off"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#0095d9] px-6 font-jakarta text-sm font-semibold text-white transition hover:bg-[#007eb8]"
            >
              Search
            </button>
          </div>
        </form>

        {query ? (
          <div className="mt-10">
            <p className="font-jakarta text-sm text-[#52697a]">
              {results.length === 0
                ? `No results for “${query}”. Try another keyword.`
                : `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”`}
            </p>

            {results.length > 0 ? (
              <ul className="mt-6 space-y-4">
                {results.map((result) => (
                  <li
                    key={result.href}
                    className="rounded-xl border border-[#e8f2f8] p-5"
                  >
                    <p className="font-jakarta text-xs font-semibold uppercase tracking-wide text-[#0095d9]">
                      {TYPE_LABELS[result.type]}
                    </p>
                    <Link
                      href={result.href}
                      className="mt-1 block font-jakarta text-xl font-semibold text-[#003859] hover:text-[#0095d9]"
                    >
                      {result.title}
                    </Link>
                    {result.description ? (
                      <p className="mt-2 font-jakarta text-sm leading-relaxed text-[#52697a]">
                        {result.description}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
