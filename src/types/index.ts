import type { AnchorHTMLAttributes, ComponentType, SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement>

export type IconComponent = ComponentType<IconProps>

export type OriginLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export interface SparkParticle {
  x: number
  y: number
  dx: number
  dy: number
  color: string
}

export interface OriginFillGeometry {
  x: number
  y: number
  size: number
}

export type Language = 'pt' | 'en' | 'es'

export interface MenuStyleProps {
  $isOpen: boolean
}

export interface LanguageButtonProps {
  $isActive: boolean
}

export type BrandAccent = 'blue' | 'green' | 'yellow' | 'red'

export interface AccentStyleProps {
  $accent: BrandAccent
}

export interface PartnerBadgeProps {
  height: string
}

export interface PartnerBadgeStyleProps {
  $height: string
}

export type JourneyStageKey = 'migrate' | 'organizeData' | 'applyAi' | 'continuous'

export type CloudProductKey =
  | 'computeEngine'
  | 'gke'
  | 'cloudStorage'
  | 'bigQuery'
  | 'dataflow'
  | 'looker'
  | 'vertexAi'
  | 'gemini'
  | 'documentAi'
  | 'securityCommandCenter'
  | 'cloudIam'
  | 'cloudMonitoring'

export interface JourneyStage {
  key: JourneyStageKey
  products: CloudProductKey[]
  Icon: IconComponent
  accent: BrandAccent
}

export interface ProductChipsProps {
  products: CloudProductKey[]
  accent: BrandAccent
}

export interface ProductChipProps {
  product: CloudProductKey
  accent: BrandAccent
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

export interface IllustratedJourneyStage extends JourneyStage {
  image: string
}

export interface JourneyShowcaseProps {
  stages: IllustratedJourneyStage[]
  activeIndex: number
}

export interface ActiveStyleProps {
  $isActive: boolean
}

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

export interface WorkspaceProduct {
  key: WorkspaceProductKey
  icon: string
}

export type SocialNetworkKey = 'linkedin' | 'instagram'

export interface SocialNetwork {
  key: SocialNetworkKey
  name: string
  href: string
  Icon: IconComponent
  fill: string
}

export interface SocialLinksProps {
  size: string
}

export interface SocialLinkStyleProps {
  $size: string
}

export interface SocialFillStyleProps {
  $fill: string
}

export type TestimonialKey = 'industry' | 'retail' | 'services'

export interface Testimonial {
  key: TestimonialKey
  initials: string
  accent: BrandAccent
}

export interface ShowNameProps {
  $showName: boolean
}

export interface TestimonialButtonProps extends AccentStyleProps, ActiveStyleProps, ShowNameProps {}

export interface FadingTextProps {
  $isFading: boolean
}

export interface ContactLink {
  text: string
  href: string
}

export type ContactWordKey = 'connected' | 'intelligent' | 'productive' | 'secure'

export interface ContactWord {
  key: ContactWordKey
  accent: BrandAccent
}

export type RotatingWordState = 'active' | 'leaving' | 'waiting'

export interface RotatingWordStyleProps {
  $state: RotatingWordState
}

export type SolutionKey = 'migration' | 'licensing' | 'ai' | 'cloud' | 'governance' | 'security'

export interface OrbitSolution {
  key: SolutionKey
  Icon: IconComponent
  accent: BrandAccent
  related: SolutionKey[]
}

export type OrbitNodeState = 'idle' | 'selected' | 'related' | 'dimmed'

export interface OrbitNodeStyleProps {
  $angle: number
  $accent: BrandAccent
  $state: OrbitNodeState
}

export interface WorkspaceAppProps {
  product: WorkspaceProduct
  name: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

export type HeroShape =
  | { kind: 'path'; fill: string; d: string }
  | { kind: 'circle'; fill: string; cx: number; cy: number; r: number }

export type HeroRingId = 'green' | 'yellow' | 'blue' | 'red'

export interface HeroRing {
  id: HeroRingId
  durationInSeconds: number
  direction: 'clockwise' | 'counterclockwise'
  shapes: HeroShape[]
}

export interface HeroRingStyleProps {
  $direction: HeroRing['direction']
  $durationInSeconds: number
}
