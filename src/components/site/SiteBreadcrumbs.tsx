import { SITE_URL } from "@/lib/site";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function SiteBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? new URL(item.href, SITE_URL).toString() : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {item.href && !isCurrent ? (
                  <a href={item.href} className="transition-colors hover:text-[var(--gold)]">
                    {item.label}
                  </a>
                ) : (
                  <span aria-current={isCurrent ? "page" : undefined} className="text-foreground">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
