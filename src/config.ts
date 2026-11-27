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
  /** Typical Italian price used in the comparison table, EUR. */
  italy: number;
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
  yearsOfExperience: number;
  patientsPerYear: string;
  treatments: Treatment[];
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

  yearsOfExperience: 12,
  patientsPerYear: '1.500+',

  treatments: [
    { id: 'implant', tirana: 550, italy: 1500 },
    { id: 'crown', tirana: 250, italy: 900 },
    { id: 'veneer', tirana: 300, italy: 900 },
    { id: 'allon4', tirana: 4500, italy: 12000 },
    { id: 'whitening', tirana: 150, italy: 400 },
    { id: 'rootcanal', tirana: 120, italy: 500 },
  ],

  team: [
    { name: 'Dr. Nome Cognome', role: 'implantologist', initials: 'NC', speaksItalian: true },
    { name: 'Dr. Nome Cognome', role: 'prosthodontist', initials: 'NC', speaksItalian: true },
    { name: 'Nome Cognome', role: 'coordinator', initials: 'NC', speaksItalian: true },
  ],
};
