const env = import.meta.env;

function publicConfig(name: string) {
  return (env[`VITE_${name}`] ?? env[name] ?? "").trim();
}

export const GTM_CONTAINER_ID = publicConfig("GTM_CONTAINER_ID");
export const GA4_MEASUREMENT_ID = publicConfig("GA4_MEASUREMENT_ID");
export const GOOGLE_ADS_ID = publicConfig("GOOGLE_ADS_ID");
export const GOOGLE_ADS_CONVERSION_LABEL = publicConfig("GOOGLE_ADS_CONVERSION_LABEL");

export const analyticsConfig = {
  gtmContainerId: GTM_CONTAINER_ID,
  ga4MeasurementId: GA4_MEASUREMENT_ID,
  googleAdsId: GOOGLE_ADS_ID,
  googleAdsConversionLabel: GOOGLE_ADS_CONVERSION_LABEL,
  gtmEnabled: GTM_CONTAINER_ID.length > 0,
  ga4Enabled: GA4_MEASUREMENT_ID.length > 0,
  googleAdsEnabled: GOOGLE_ADS_ID.length > 0,
  googleAdsConversionsEnabled: GOOGLE_ADS_ID.length > 0 && GOOGLE_ADS_CONVERSION_LABEL.length > 0,
} as const;

export const googleMarketingEnabled =
  analyticsConfig.gtmEnabled || analyticsConfig.ga4Enabled || analyticsConfig.googleAdsEnabled;

export type ConversionCta = "whatsapp" | "phone" | "location" | "reviews" | "reservation";

export function adsConversionTarget() {
  if (!analyticsConfig.googleAdsConversionsEnabled) return null;
  return `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`;
}
