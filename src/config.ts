/*
 * Clinic settings — the ONLY file you need to edit for a new clinic
 * (plus the texts in i18n.ts if you want to change wording).
 *
 * Everything below is SAMPLE data for the demo. Replace it with the
 * clinic's real details, and have the clinic confirm every price,
 * guarantee and medical claim before going live.
 */
import type { Lang } from './i18n';

export type TreatmentId = 'implant' | 'crown' | 'veneer' | 'allon4' | 'whitening' | 'rootcanal';
export type Role = 'implantologist' | 'prosthodontist' | 'coordinator';

export interface Treatment {
  id: TreatmentId;
  /** Starting price at the clinic, EUR. */
  tirana: number;
  /** Typical Italian price used in the comparison, EUR. */
  italy: number;
  /** Highest quantity the calculator allows. */
  maxQty: number;
  /** Trips to Tirana usually needed (implants: 2, healing in between). */
  trips: number;
  /** Nights in Tirana per trip, roughly. */
  nights: number;
}

/** 0 = Sunday … 6 = Saturday; [opening hour, closing hour] in clinic local time. */
export type OpeningHours = Partial<Record<0 | 1 | 2 | 3 | 4 | 5 | 6, [number, number]>>;

export interface Preset {
  id: 'single' | 'smile' | 'fullarch';
  items: Partial<Record<TreatmentId, number>>;
}

export interface TeamMember {
  name: string;
  role: Role;
  initials: string;
  speaksItalian: boolean;
}

export interface ClinicConfig {
  name: string;
  city: string;
  /** false before delivery: hides the demo banner and every <DemoOnly> block. */
  demo: boolean;
  defaultLang: Lang;
  languages: Lang[];
  /** International format, digits only (used for wa.me links). */
  whatsapp: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  address: string;
  mapsUrl: string;
  timeZone: string;
  openingHours: OpeningHours;
  yearsOfExperience: number;
  patientsPerYear: number;
  treatments: Treatment[];
  /** Travel estimate used by the savings calculator, EUR. */
  trip: { flightReturn: number; hotelPerNight: number };
  presets: Preset[];
  team: TeamMember[];
}

export const CLINIC: ClinicConfig = {
  name: 'Nova Dental',
  city: 'Tirana',
  demo: true,

  defaultLang: 'it',
  languages: ['it', 'en', 'sq'],

  whatsapp: '355690000000',
  phoneDisplay: '+355 69 000 0000',
  phoneHref: '+355690000000',
  email: 'info@example.com',
  address: 'Rruga Shembull 1, 1001 Tiranë, Shqipëri',
  mapsUrl: 'https://maps.google.com/?q=Tirana',

  timeZone: 'Europe/Tirane',
  // Keep in sync with the "contact.hoursValue" text in i18n.ts.
  openingHours: { 1: [9, 19], 2: [9, 19], 3: [9, 19], 4: [9, 19], 5: [9, 19], 6: [9, 19] },

  yearsOfExperience: 12,
  patientsPerYear: 1500,

  treatments: [
    { id: 'implant', tirana: 550, italy: 1500, maxQty: 12, trips: 2, nights: 4 },
    { id: 'crown', tirana: 250, italy: 900, maxQty: 28, trips: 1, nights: 5 },
    { id: 'veneer', tirana: 300, italy: 900, maxQty: 20, trips: 1, nights: 6 },
    { id: 'allon4', tirana: 4500, italy: 12000, maxQty: 2, trips: 2, nights: 5 },
    { id: 'whitening', tirana: 150, italy: 400, maxQty: 1, trips: 1, nights: 1 },
    { id: 'rootcanal', tirana: 120, italy: 500, maxQty: 6, trips: 1, nights: 2 },
  ],

  trip: { flightReturn: 150, hotelPerNight: 60 },

  // The first preset is pre-selected when the calculator loads.
  presets: [
    { id: 'smile', items: { veneer: 8, whitening: 1 } },
    { id: 'fullarch', items: { allon4: 1 } },
    { id: 'single', items: { implant: 1 } },
  ],

  team: [
    { name: 'Dr. Nome Cognome', role: 'implantologist', initials: 'NC', speaksItalian: true },
    { name: 'Dr. Nome Cognome', role: 'prosthodontist', initials: 'NC', speaksItalian: true },
    { name: 'Nome Cognome', role: 'coordinator', initials: 'NC', speaksItalian: true },
  ],
};
