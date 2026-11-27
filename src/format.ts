import { CLINIC } from './config';
import { LOCALES, type Lang } from './i18n';

export function formatEur(amount: number, lang: Lang): string {
  return new Intl.NumberFormat(LOCALES[lang], {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function savingPct(tirana: number, italy: number): number {
  return Math.round((1 - tirana / italy) * 100);
}

/**
 * Headline figure ("up to X% less"): the best saving in the price list,
 * rounded DOWN to the nearest 10 so the claim is never higher than the table.
 */
export function headlineSavingPct(): number {
  const best = Math.max(0, ...CLINIC.treatments.map((tr) => savingPct(tr.tirana, tr.italy)));
  return Math.floor(best / 10) * 10;
}

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${CLINIC.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Link to another page that keeps the current language. */
export function pageHref(page: string, lang: Lang): string {
  return lang === CLINIC.defaultLang ? page : `${page}?lang=${lang}`;
}
