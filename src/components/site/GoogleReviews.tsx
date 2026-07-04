import { ExternalLink, MoreVertical, Share2, Star, ThumbsUp } from "lucide-react";
import { SITE } from "@/lib/site";

const reviews = [
  {
    author: "Jordan Rivera",
    reviewCount: "4 reseñas",
    relativeTime: "Hace 3 semanas",
    text: "Trabajo de calidad, muy buena atención.",
    avatar: "JR",
    avatarClass: "bg-[var(--gold)] text-white",
  },
  {
    author: "Andres Silva",
    reviewCount: "1 reseña",
    relativeTime: "Hace 5 días",
    text: "La mejor buena atención 100 % recomendable.",
    avatar: "A",
    avatarClass: "bg-[#0b64a0] text-white",
  },
  {
    author: "Maria martha Dura",
    reviewCount: "2 reseñas",
    relativeTime: "Hace 3 semanas",
    text: "La mejoooor, ella le puso piercing a mi hija con joyería de titanio en el ombligo y en su labio. Hasta el día de hoy no ha tenido ningún problema. 100% recomendable.",
    avatar: "MD",
    avatarClass: "bg-[#6e4456] text-white",
  },
  {
    author: "Carlos Encina",
    reviewCount: "1 reseña",
    relativeTime: "Hace 3 semanas",
    text: "Excelente atención, 100% recomendable. Joyería de calidad, muy buena atención. Iré nuevamente.",
    avatar: "CE",
    avatarClass: "bg-[#8b4f1d] text-white",
  },
  {
    author: "Olga Becerra",
    reviewCount: "1 reseña",
    relativeTime: "Hace 3 semanas",
    text: "Buena atención, muy simpática Cote. Mucha paciencia tuvo con mi hija en piercing en su nariz. Excelencia.",
    avatar: "O",
    avatarClass: "bg-[#08735f] text-white",
  },
  {
    author: "Joselyn Fuentes Becerra",
    reviewCount: "1 reseña",
    relativeTime: "Hace 3 semanas",
    text: "Recomiendo a Cote, excelente experiencia, higiene y cuidados. Aros de titanio, lindos modelos.",
    avatar: "JF",
    avatarClass: "bg-[var(--stone)] text-foreground",
  },
];

function RatingStars() {
  return (
    <div className="flex gap-0.5" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, star) => (
        <Star key={star} className="h-3.5 w-3.5 fill-[var(--gold)] text-[var(--gold)]" />
      ))}
    </div>
  );
}

export function GoogleReviews() {
  return (
    <section aria-labelledby="google-reviews-title" className="bg-[var(--stone)]/40 py-12 lg:py-16">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <p className="eyebrow">Opiniones verificadas</p>
        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="google-reviews-title" className="font-serif text-3xl leading-tight lg:text-4xl">
              Reseñas de Cotepiercing en Google
            </h2>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]" />
              <strong className="text-foreground">5.0</strong>
              Opiniones recientes de clientes
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={SITE.googleBusinessUrl}
              data-cta="reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[var(--gold)] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]"
            >
              Ver reseñas <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href={SITE.googleBusinessUrl}
              data-cta="reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[var(--gold)] px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white"
            >
              Dejar una reseña <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-7 rounded-xl border border-border bg-background/70 p-3 shadow-sm sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-1 pb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gold)]">
                Widget de reseñas
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="font-serif text-3xl leading-none text-foreground">5.0</span>
                <div>
                  <RatingStars />
                  <p className="mt-1 text-xs text-muted-foreground">Basado en reseñas de Google</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Desliza hacia el lado para ver más comentarios.
              </p>
            </div>
            <a
              href={SITE.googleBusinessUrl}
              data-cta="reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              Google <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 scroll-smooth">
            {reviews.map((review) => (
              <article
                key={review.author}
                className="flex min-h-[220px] w-[82vw] shrink-0 snap-start flex-col rounded-lg border border-border bg-white p-5 shadow-[0_18px_40px_-32px_rgba(60,50,40,0.55)] transition-colors hover:border-[var(--gold)] sm:w-[320px]"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${review.avatarClass}`}
                  >
                    {review.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="truncate text-sm font-medium text-foreground">
                          {review.author}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">{review.reviewCount}</p>
                      </div>
                      <MoreVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <RatingStars />
                      <span className="text-xs text-muted-foreground">{review.relativeTime}</span>
                      <span className="rounded border border-border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-foreground/70">
                        Nueva
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 line-clamp-5 text-sm leading-relaxed text-foreground/80">
                  {review.text}
                </p>

                <div className="mt-auto flex items-center gap-5 pt-5 text-xs font-medium text-foreground/75">
                  <span className="inline-flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    Me gusta
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Compartir
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
