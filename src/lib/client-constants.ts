export const SHOP = "https://carlos-lingan.site.fuxion.com/prunex1/";
export const CHAT_ENDPOINT_PUBLIC = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/prunex1-chat";
export const PRICE = "S/ 76.00";
export const PRICE_SHORT = "S/ 76";
export const PRICE_PER_STICK = "S/ 2.71";
export const VISITOR_KEY = "px_visitor";
export const OPEN_CHAT_EVENT = "px:open-chat";

export function getVisitor() {
  try {
    let v = localStorage.getItem(VISITOR_KEY);
    if (!v) {
      v = "v-" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem(VISITOR_KEY, v);
    }
    return v;
  } catch {
    return "anon";
  }
}

/** Registra un clic hacia la tienda oficial (sendBeacon, sin bloquear la navegación). */
export function trackClick(source: string, extra: Record<string, unknown> = {}) {
  try {
    const body = JSON.stringify({
      mode: "track_click",
      source,
      visitor_id: getVisitor(),
      shop_url: SHOP,
      page_url: window.location.href,
      ...extra,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(CHAT_ENDPOINT_PUBLIC, new Blob([body], { type: "text/plain" }));
    } else {
      fetch(CHAT_ENDPOINT_PUBLIC, { method: "POST", body, keepalive: true }).catch(() => {});
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag?.("event", "click_tienda", { source });
  } catch {
    /* noop */
  }
}
