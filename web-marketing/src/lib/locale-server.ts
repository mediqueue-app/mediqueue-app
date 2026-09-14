import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, parseLocale, type StoredLocale } from "@/lib/locale-cookie";

export async function getRequestLocale(): Promise<StoredLocale> {
  const headerLocale = (await headers()).get("x-locale");
  if (headerLocale === "en" || headerLocale === "tr") return headerLocale;
  const jar = await cookies();
  return parseLocale(jar.get(LOCALE_COOKIE)?.value);
}
