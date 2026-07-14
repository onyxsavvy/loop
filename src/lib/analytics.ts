// Analytics utility — fires custom events for conversion tracking
// Drop in GA4, Vercel Analytics, or Mixpanel event calls here

type LoopEvent =
  | "reserve_cta_click"
  | "call_click"
  | "whatsapp_click"
  | "directions_click"
  | "instagram_click"
  | "menu_view_click";

export function trackEvent(event: LoopEvent, data?: Record<string, string>) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Loop Analytics] ${event}`, data);
  }

  // Google Analytics 4
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
      "event",
      event,
      data
    );
  }
}
