type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Server component — injects JSON-LD structured data for search engines. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
