/**
 * Mirrors src/lib/locale-path.ts. Fail the script if helpers drift in tests below.
 */
function stripLocalePath(pathname) {
  if (pathname === "/en" || pathname === "/tr") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  if (pathname.startsWith("/tr/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

function withLocalePath(locale, href) {
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

function switchLocaleUrl(next, pathname, search = "", hash = "") {
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search
  );
  params.delete("lang");
  const query = params.toString();
  const base = withLocalePath(next, stripLocalePath(pathname));
  return `${base}${query ? `?${query}` : ""}${hash}`;
}

const cases = [
  ["strip /en", stripLocalePath("/en"), "/"],
  ["strip /en/clinics", stripLocalePath("/en/clinics"), "/clinics"],
  ["strip /tr/team", stripLocalePath("/tr/team"), "/team"],
  ["strip /clinics", stripLocalePath("/clinics"), "/clinics"],
  ["TR home", withLocalePath("tr", "/"), "/"],
  ["EN home", withLocalePath("en", "/"), "/en"],
  ["EN clinics", withLocalePath("en", "/clinics"), "/en/clinics"],
  ["EN from prefixed", withLocalePath("en", "/en/patients"), "/en/patients"],
  ["hash", withLocalePath("en", "/#lead"), "/en#lead"],
  ["query", withLocalePath("en", "/contact?x=1"), "/en/contact?x=1"],
  ["switch to EN", switchLocaleUrl("en", "/", "?lang=tr", ""), "/en"],
  ["switch to TR", switchLocaleUrl("tr", "/en/clinics", "", ""), "/clinics"],
  ["external", withLocalePath("en", "https://example.com"), "https://example.com"],
];

let failed = 0;
for (const [name, got, want] of cases) {
  if (got !== want) {
    failed += 1;
    console.error(`FAIL ${name}: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`);
  }
}

if (failed) {
  process.exit(1);
}

console.log(`locale-path: ${cases.length} checks ok`);
