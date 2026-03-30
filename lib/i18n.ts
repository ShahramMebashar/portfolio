import "server-only";
import type { Locale } from "./types";

const dictionaries = {
  en: () => import("@/i18n/en.json").then((m) => m.default),
  ku: () => import("@/i18n/ku.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
