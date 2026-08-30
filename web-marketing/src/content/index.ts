import { en } from "./en";
import { tr } from "./tr";
import type { Locale, SiteContent } from "./types";

export const content: Record<Locale, SiteContent> = { en, tr };

export type { Locale, SiteContent };
