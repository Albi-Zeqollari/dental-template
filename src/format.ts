import { CLINIC, type TreatmentId } from './config';
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

/** Path to a file in public/images, working under any base path. */
export function img(file: string): string {
  return `${import.meta.env.BASE_URL}images/${file}`;
}

export type Selection = Partial<Record<TreatmentId, number>>;

export interface Estimate {
  italy: number;
  treatment: number;
  trips: number;
  nights: number;
  travel: number;
  total: number;
  saving: number;
  savingPct: number;
  empty: boolean;
}

/**
 * Italy price vs Tirana price + travel. Travel is counted once for the whole
 * plan: the most trips any chosen treatment needs, and the longest stay.
 */
export function estimate(selection: Selection): Estimate {
  let italy = 0;
  let treatment = 0;
  let trips = 0;
  let nights = 0;
  for (const tr of CLINIC.treatments) {
    const qty = selection[tr.id] ?? 0;
    if (!qty) continue;
    italy += qty * tr.italy;
    treatment += qty * tr.tirana;
    trips = Math.max(trips, tr.trips);
    nights = Math.max(nights, tr.nights);
  }
  const travel = trips * CLINIC.trip.flightReturn + trips * nights * CLINIC.trip.hotelPerNight;
  const total = treatment + travel;
  const saving = Math.max(0, italy - total);
  return {
    italy,
    treatment,
    trips,
    nights: trips * nights,
    travel,
    total,
    saving,
    savingPct: italy ? Math.round((saving / italy) * 100) : 0,
    empty: italy === 0,
  };
}

export type OpenState = { open: true } | { open: false; inDays: number; at: string } | { open: false; inDays: null };

/** Whether the clinic is open right now, in the clinic's own time zone. */
export function openState(now = new Date()): OpenState {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: CLINIC.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const minutes = Number(get('hour')) * 60 + Number(get('minute'));

  for (let offset = 0; offset < 8; offset++) {
    const d = ((day + offset) % 7) as 0 | 1 | 2 | 3 | 4 | 5 | 6;
    const hours = CLINIC.openingHours[d];
    if (!hours) continue;
    const [openH, closeH] = hours;
    if (offset === 0 && minutes >= openH * 60 && minutes < closeH * 60) return { open: true };
    if (offset > 0 || minutes < openH * 60) {
      return { open: false, inDays: offset, at: `${String(openH).padStart(2, '0')}:00` };
    }
  }
  return { open: false, inDays: null };
}

/** Link to another page that keeps the current language. */
export function pageHref(page: string, lang: Lang): string {
  return lang === CLINIC.defaultLang ? page : `${page}?lang=${lang}`;
}
