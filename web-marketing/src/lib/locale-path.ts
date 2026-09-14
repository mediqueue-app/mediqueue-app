import type { Locale } from "@/content";

export function stripLocalePath(pathname: string): string {
  if (pathname === "/en" || pathname === "/tr") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  if (pathname.startsWith("/tr/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function withLocalePath(locale: Locale, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const queryIndex = withoutHash.indexOf("?");
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex) : "";
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  const stripped = stripLocalePath(pathname);
  const prefixed =
    locale === "en" ? (stripped === "/" ? "/en" : `/en${stripped}`) : stripped;

  return `${prefixed}${query}${hash}`;
}

export function switchLocaleUrl(
  next: Locale,
  pathname: string,
  search = "",
  hash = ""
): string {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  params.delete("lang");
  const query = params.toString();
  const base = withLocalePath(next, stripLocalePath(pathname));
  return `${base}${query ? `?${query}` : ""}${hash}`;
}
