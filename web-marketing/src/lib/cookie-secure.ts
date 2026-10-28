/**
 * Cookies written from the browser only get `Secure` when the page itself is
 * served over HTTPS. On http://localhost the flag would make the browser drop
 * the cookie, and during SSR there is no `window` to inspect.
 */
export function secureCookieSuffix(): string {
  if (typeof window === "undefined") return "";
  return window.location.protocol === "https:" ? "; Secure" : "";
}
