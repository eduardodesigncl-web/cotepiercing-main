import { Nav } from "./Nav";
import { SiteFooter } from "./SiteFooter";

export function ContentPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />
      <main>
        <header className="border-b border-border bg-[var(--stone)]/35 pb-16 pt-36 lg:pb-24 lg:pt-44">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              {intro}
            </p>
          </div>
        </header>
        <div className="mx-auto max-w-5xl px-6 py-14 lg:px-10 lg:py-20">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
