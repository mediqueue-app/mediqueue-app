import { cookies } from "next/headers";
import { LOCALE_COOKIE, parseLocale, type StoredLocale } from "@/lib/locale-cookie";

export async function getRequestLocale(): Promise<StoredLocale> {
  const jar = await cookies();
  return parseLocale(jar.get(LOCALE_COOKIE)?.value);
}
