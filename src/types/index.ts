import type { ComponentType, SVGProps } from 'react'

/**
 * Tipos compartilhados entre os componentes do site.
 *
 * Tipos que só interessam a um componente continuam nele; aqui ficam os que
 * atravessam arquivos (dados de seção, formatos de asset, props reutilizadas).
 */

/* ── Ícones ──────────────────────────────────────────────────────────────── */

/** Props aceitas por todos os ícones de `components/icons`. */
export type IconProps = SVGProps<SVGSVGElement>

/** Um componente de ícone, usado nas listas de navegação, soluções e rodapé. */
export type IconComponent = ComponentType<IconProps>

/* ── Cabeçalho ───────────────────────────────────────────────────────────── */

export type Language = 'pt' | 'en' | 'es'

/** Props do botão de idioma no seletor PT | EN | ES. */
export interface LanguageButtonProps {
  $isActive: boolean
}

/* ── Identidade visual ───────────────────────────────────────────────────── */

/**
 * Cores da marca que as seções usam como acento. O valor é o sufixo do token
 * CSS correspondente (`--color-blue`, `--color-green`, ...).
 */
export type BrandAccent = 'blue' | 'green' | 'yellow' | 'red'

/* ── Seções ──────────────────────────────────────────────────────────────── */

/** Props do marcador circular de cada etapa da jornada em `SolutionsGrid`. */
export interface SolutionMarkerProps {
  $accent: BrandAccent
}

/* ── Elemento Hero ───────────────────────────────────────────────────────── */

export type HeroShape =
  | { kind: 'path'; fill: string; d: string }
  | { kind: 'circle'; fill: string; cx: number; cy: number; r: number }

export type HeroRingId = 'green' | 'yellow' | 'blue' | 'red'

export interface HeroRing {
  id: HeroRingId
  /** Duração de uma volta completa, em segundos. */
  durationInSeconds: number
  /** Sentido do giro: horário ou anti-horário. */
  direction: 'clockwise' | 'counterclockwise'
  shapes: HeroShape[]
}

/** Props do `<g>` estilizado que anima cada anel em `HeroRings`. */
export interface HeroRingStyleProps {
  $direction: HeroRing['direction']
  $durationInSeconds: number
}
