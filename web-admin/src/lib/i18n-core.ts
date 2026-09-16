import en from "@/messages/en.json";
import tr from "@/messages/tr.json";
import { getUiLocale, type UiLocale } from "@/lib/ui-locale";

const catalogs: Record<UiLocale, Record<string, unknown>> = { tr, en };

function lookup(tree: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as object)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, tree);
}

function interpolate(
  template: string,
  vars?: Record<string, string | number>
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    vars[name] === undefined ? `{${name}}` : String(vars[name])
  );
}

/** Missing English falls back to Turkish prefixed so UK QA can spot gaps. */
export function translate(
  locale: UiLocale,
  key: string,
  vars?: Record<string, string | number>
): string {
  const primary = lookup(catalogs[locale], key);
  if (typeof primary === "string") return interpolate(primary, vars);
  const trVal = lookup(catalogs.tr, key);
  const enVal = lookup(catalogs.en, key);
  if (locale === "en" && typeof trVal === "string") {
    return `⚠ EN: ${interpolate(trVal, vars)}`;
  }
  if (typeof enVal === "string") return interpolate(enVal, vars);
  if (typeof trVal === "string") return interpolate(trVal, vars);
  return `⚠ ${key}`;
}

export function translateList(locale: UiLocale, key: string): string[] {
  const primary = lookup(catalogs[locale], key);
  if (Array.isArray(primary) && primary.every((x) => typeof x === "string")) {
    return primary;
  }
  const trVal = lookup(catalogs.tr, key);
  if (Array.isArray(trVal) && trVal.every((x) => typeof x === "string")) {
    if (locale === "en") return trVal.map((s) => `⚠ EN: ${s}`);
    return trVal;
  }
  return [];
}

export function tNow(key: string, vars?: Record<string, string | number>) {
  return translate(getUiLocale(), key, vars);
}
