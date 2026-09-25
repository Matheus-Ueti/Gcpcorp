import type { AnchorHTMLAttributes, ComponentType, SVGProps } from 'react'

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

/* ── Botões e links ──────────────────────────────────────────────────────── */

/** Props do link com preenchimento "origin": aceita tudo que um <a> aceita. */
export type OriginLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

/** Uma faísca do rastro do cursor (`MouseSpark`): posição, velocidade e cor. */
export interface SparkParticle {
  x: number
  y: number
  dx: number
  dy: number
  color: string
}

/** Centro (relativo ao botão) e diâmetro do círculo de preenchimento, em px. */
export interface OriginFillGeometry {
  x: number
  y: number
  size: number
}

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

/* ── Marca ───────────────────────────────────────────────────────────────── */

/** Props do selo "Google Cloud Partner" (com o divisor que o separa do logo). */
export interface PartnerBadgeProps {
  /** Altura do selo e do divisor, em qualquer unidade CSS — acompanha o logo ao lado. */
  height: string
}

/** Props de estilo compartilhadas pelo divisor e pela imagem do selo. */
export interface PartnerBadgeStyleProps {
  $height: string
}

/* ── Card com moldura ────────────────────────────────────────────────────── */

/**
 * Lado do card que fica "aberto" (sem fio e sem canto arredondado), para a
 * moldura continuar na seção vizinha — como o card que a faixa do
 * ecossistema corta ao meio.
 */
export interface CardFrameStyleProps {
  $openEdge?: 'top' | 'bottom'
}

/* ── Seções ──────────────────────────────────────────────────────────────── */

/** Props do marcador circular de cada etapa da jornada em `SolutionsGrid`. */
export interface SolutionMarkerProps {
  $accent: BrandAccent
}

/**
 * Props de estilo de um pilar em "Sobre nós": a cor do próprio anel e, se
 * houver um pilar seguinte, a cor dele — a linha que os liga vai de uma à outra.
 */
export interface PillarStyleProps {
  $accent: BrandAccent
  $nextAccent?: BrandAccent
}

export type WorkspaceProductKey =
  | 'gmail'
  | 'drive'
  | 'calendar'
  | 'meet'
  | 'docs'
  | 'sheets'
  | 'slides'
  | 'gemini'
  | 'forms'
  | 'keep'
  | 'sites'
  | 'appsheet'
  | 'chat'

/** Um produto do Google Workspace na seção de ecossistema. */
export interface WorkspaceProduct {
  /**
   * Chave do nome nas traduções (`ecosystem.workspace.products.<key>`): o
   * Google localiza vários nomes ("Planilhas Google", "Hojas de cálculo de
   * Google"), e o nome é também o texto alternativo do ícone.
   */
  key: WorkspaceProductKey
  /** URL do ícone oficial, importado de `assets/workspace`. */
  icon: string
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
