import { useEffect, useState } from "react";

const CONSENT_KEY = "cotepiercing-analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function enableGoogleAnalytics() {
  if (document.querySelector('script[data-cotepiercing-gtag="true"]')) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  window.gtag("js", new Date());
  window.gtag("config", "AW-18170149975");

  const script = document.createElement("script");
  script.async = true;
  script.dataset.cotepiercingGtag = "true";
  script.src = "https://www.googletagmanager.com/gtag/js?id=AW-18170149975";
  document.head.appendChild(script);
}

export function ConsentBanner() {
  const [choice, setChoice] = useState<string | null>("loading");

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    setChoice(saved);
    if (saved === "accepted") enableGoogleAnalytics();

    const trackWhatsApp = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest('a[href*="wa.me"]');
      if (link && window.gtag) {
        window.gtag("event", "generate_lead", {
          event_category: "contact",
          event_label: "whatsapp",
        });
      }
    };
    document.addEventListener("click", trackWhatsApp);
    return () => document.removeEventListener("click", trackWhatsApp);
  }, []);

  if (choice) return null;

  const choose = (value: "accepted" | "rejected") => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setChoice(value);
    if (value === "accepted") enableGoogleAnalytics();
  };

  return (
    <aside className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl border border-border bg-background p-5 shadow-xl sm:p-6">
      <p className="text-sm leading-relaxed text-foreground/80">
        Usamos analítica para entender qué contenidos ayudan a reservar. Puedes aceptar o continuar
        sin medición publicitaria.{" "}
        <a href="/privacidad" className="text-[var(--gold)] underline underline-offset-4">
          Política de privacidad
        </a>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="border border-border px-5 py-2.5 text-xs uppercase tracking-widest"
        >
          Rechazar
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="bg-[var(--gold)] px-5 py-2.5 text-xs uppercase tracking-widest text-white"
        >
          Aceptar
        </button>
      </div>
    </aside>
  );
}
