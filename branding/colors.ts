/**
 * FutureMark Product Brand Color System — v2.0
 *
 * Each product key maps to:
 *   c1       — gradient start (upper-right, lighter)
 *   c2       — gradient end (lower-left, darker)
 *   primary  — mid-point accent for UI elements
 *   light    — tinted chip / badge background
 *   surface  — dark container background
 *
 * All gradients run at 225° (FM diagonal direction: upper-right → lower-left).
 * Amber (#D4920A) is retired from FRI and reserved for future use.
 * FRI is now Royal Blue — the color of trust and precision.
 */

export const COLORS = {
  // ── Base tokens (shared) ─────────────────────────────────
  ink:        '#0A0806',  // Near-black warm. Text on light backgrounds.
  paper:      '#F9F8F6',  // Off-white warm. Light-mode background.
  silver:     '#8B7F76',  // Warm mid-grey. Secondary text, icons.
  border:     '#E8E2DC',  // Warm light border.
  borderDark: '#2A2320',  // Dark-mode border.

  // ── FM — Future Marketing Studio (Master Brand) ──────────
  fm: {
    c1:      '#2A2320',
    c2:      '#0A0806',
    primary: '#2A2320',
    light:   '#F0EDE8',
    surface: '#0A0806',
    gradient: ['#2A2320', '#0A0806'] as [string, string],
  },

  // ── FRI — Future Review Intelligence — Royal Blue ────────
  fri: {
    c1:      '#2E72F8',
    c2:      '#0E28A0',
    primary: '#1240D6',
    light:   '#DBEAFE',
    surface: '#040B24',
    gradient: ['#2E72F8', '#0E28A0'] as [string, string],
  },

  // ── FSEO — Future SEO — Emerald ──────────────────────────
  fseo: {
    c1:      '#12CC8A',
    c2:      '#067A52',
    primary: '#09966A',
    light:   '#DCFCE7',
    surface: '#011A0E',
    gradient: ['#12CC8A', '#067A52'] as [string, string],
  },

  // ── FA — Future Ads — Orange ─────────────────────────────
  fa: {
    c1:      '#FC7830',
    c2:      '#B23A08',
    primary: '#D4560C',
    light:   '#FFEDD5',
    surface: '#1A0800',
    gradient: ['#FC7830', '#B23A08'] as [string, string],
  },

  // ── FC — Future Content — Green ──────────────────────────
  fc: {
    c1:      '#22C862',
    c2:      '#10783A',
    primary: '#17A050',
    light:   '#DCFCE7',
    surface: '#031408',
    gradient: ['#22C862', '#10783A'] as [string, string],
  },

  // ── FAI — Future AI — Purple ─────────────────────────────
  fai: {
    c1:      '#A860F8',
    c2:      '#6820C8',
    primary: '#8840E0',
    light:   '#F3E8FF',
    surface: '#0C0218',
    gradient: ['#A860F8', '#6820C8'] as [string, string],
  },

  // ── FCRM — Future CRM — Sky Blue ─────────────────────────
  fcrm: {
    c1:      '#18B8F0',
    c2:      '#0568A8',
    primary: '#0A90CC',
    light:   '#E0F2FE',
    surface: '#021018',
    gradient: ['#18B8F0', '#0568A8'] as [string, string],
  },

  // ── FAN — Future Analytics — Teal ────────────────────────
  fan: {
    c1:      '#12D8C8',
    c2:      '#098880',
    primary: '#0DB0A4',
    light:   '#CCFBF1',
    surface: '#021514',
    gradient: ['#12D8C8', '#098880'] as [string, string],
  },

  // ── FAT — Future Automations — Indigo ────────────────────
  fat: {
    c1:      '#7878F8',
    c2:      '#3838C8',
    primary: '#5858E8',
    light:   '#EEF2FF',
    surface: '#060620',
    gradient: ['#7878F8', '#3838C8'] as [string, string],
  },

  // ── FCM — Future Campaigns — Magenta ─────────────────────
  fcm: {
    c1:      '#F040A0',
    c2:      '#A01060',
    primary: '#C82880',
    light:   '#FCE7F3',
    surface: '#180210',
    gradient: ['#F040A0', '#A01060'] as [string, string],
  },
} as const

export type ProductKey = keyof typeof COLORS
export type ProductColor = typeof COLORS[Exclude<ProductKey,
  'ink' | 'paper' | 'silver' | 'border' | 'borderDark'>]
