import { useEffect, useState } from "react";
import {
  GA4_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  GTM_CONTAINER_ID,
  adsConversionTarget,
  analyticsConfig,
  googleMarketingEnabled,
  type ConversionCta,
} from "@/lib/analytics";

const CONSENT_KEY = "cotepiercing-analytics-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
}

function loadGtm() {
  if (!analyticsConfig.gtmEnabled) return;
  if (document.querySelector('script[data-cotepiercing-gtm="true"]')) return;
  ensureDataLayer();
  window.dataLayer?.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.dataset.cotepiercingGtm = "true";
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_CONTAINER_ID)}`;
  document.head.appendChild(script);
}

function loadGtag() {
  if (!analyticsConfig.ga4Enabled && !analyticsConfig.googleAdsEnabled) return;
  if (document.querySelector('script[data-cotepiercing-gtag="true"]')) return;
  ensureDataLayer();
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  window.gtag("js", new Date());
  if (analyticsConfig.ga4Enabled) window.gtag("config", GA4_MEASUREMENT_ID);
  if (analyticsConfig.googleAdsEnabled) window.gtag("config", GOOGLE_ADS_ID);

  const script = document.createElement("script");
  script.async = true;
  script.dataset.cotepiercingGtag = "true";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    GA4_MEASUREMENT_ID || GOOGLE_ADS_ID,
  )}`;
  document.head.appendChild(script);
}

function enableGoogleMarketing() {
  if (!googleMarketingEnabled) return;
  loadGtm();
  loadGtag();
}

export function ConsentBanner() {
  const [choice, setChoice] = useState<string | null>("loading");

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    setChoice(saved);
    if (saved === "accepted") enableGoogleMarketing();

    const trackCta = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a[data-cta]");
      if (
        !link ||
        window.localStorage.getItem(CONSENT_KEY) !== "accepted" ||
        !googleMarketingEnabled
      ) {
        return;
      }

      const cta = link.dataset.cta as ConversionCta | undefined;
      if (!cta) return;

      window.dataLayer?.push({
        event: "cotepiercing_cta_click",
        cta_type: cta,
        cta_href: link.href,
      });

      if (window.gtag) {
        window.gtag("event", "cta_click", {
          event_category: "contact",
          event_label: cta,
        });

        const sendTo = adsConversionTarget();
        if (sendTo) {
          window.gtag("event", "conversion", {
            send_to: sendTo,
            event_label: cta,
          });
        }
      }
    };
    document.addEventListener("click", trackCta);
    return () => document.removeEventListener("click", trackCta);
  }, []);

  if (!googleMarketingEnabled) return null;
  if (choice) return null;

  const choose = (value: "accepted" | "rejected") => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setChoice(value);
    if (value === "accepted") enableGoogleMarketing();
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
