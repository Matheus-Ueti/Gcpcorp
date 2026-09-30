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

/** Props de estilo do menu do celular e do botão que o abre (☰ / ✕). */
export interface MenuStyleProps {
  $isOpen: boolean
}

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

/** Props de estilo de qualquer elemento tingido por uma cor da marca. */
export interface AccentStyleProps {
  $accent: BrandAccent
}

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

/* ── Seções ──────────────────────────────────────────────────────────────── */

/** Props do marcador circular de cada etapa da jornada em `SolutionsGrid`. */
export interface SolutionMarkerProps {
  $accent: BrandAccent
}

/**
 * Chave de uma etapa da jornada "Da migração à IA" nas traduções: as três
 * etapas (`solutions.stages.<key>`) e a faixa contínua de segurança.
 */
export type JourneyStageKey = 'migrate' | 'organizeData' | 'applyAi' | 'continuous'

/** Produtos do Google Cloud citados na jornada (nomes em `data/cloudProducts`). */
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

/** Uma etapa da jornada: produtos do Google Cloud usados nela, ícone e cor. */
export interface JourneyStage {
  key: JourneyStageKey
  products: CloudProductKey[]
  Icon: IconComponent
  accent: BrandAccent
}

/** Props da fileira de tags de produto de uma etapa. */
export interface ProductChipsProps {
  products: CloudProductKey[]
  /** Cor da etapa a que os produtos pertencem. */
  accent: BrandAccent
}

/** Props de uma tag de produto, que abre um balão explicando o que ele é. */
export interface ProductChipProps {
  product: CloudProductKey
  /** Cor da etapa a que o produto pertence: tinge o nome dentro do balão. */
  accent: BrandAccent
  isOpen: boolean
  /** Abre o balão deste produto (hover do mouse, foco pelo teclado). */
  onOpen: () => void
  /** Fecha o balão, se for o deste produto que está aberto. */
  onClose: () => void
  /** Alterna o balão (toque, onde não existe hover). */
  onToggle: () => void
}

/** Uma das três etapas em sequência: além dos dados da etapa, a foto do painel. */
export interface IllustratedJourneyStage extends JourneyStage {
  /** URL da foto, importada de `assets/journey`. */
  image: string
}

/** Props do painel fixo que mostra, com foto, a etapa da jornada em foco. */
export interface JourneyShowcaseProps {
  stages: IllustratedJourneyStage[]
  /** Índice da etapa que cruza o meio da tela. */
  activeIndex: number
}

/** Props de estilo de um elemento que muda quando está ativo (etapa em foco). */
export interface ActiveStyleProps {
  $isActive: boolean
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

/* ── Redes sociais ───────────────────────────────────────────────────────── */

export type SocialNetworkKey = 'linkedin' | 'instagram'

/** Uma rede social da GCP Corp., com a cor oficial que preenche o botão no hover. */
export interface SocialNetwork {
  /** Chave do rótulo acessível nas traduções (`brand.social.<key>`). */
  key: SocialNetworkKey
  /** Nome da rede, mostrado no balão — nome de marca, não se traduz. */
  name: string
  href: string
  Icon: IconComponent
  /** Qualquer `background` CSS: cor sólida ou degradê (o do Instagram). */
  fill: string
}

/** Props dos botões de redes sociais do cabeçalho e do rodapé. */
export interface SocialLinksProps {
  /** Diâmetro de cada botão, em qualquer unidade CSS. */
  size: string
}

export interface SocialLinkStyleProps {
  $size: string
}

export interface SocialFillStyleProps {
  $fill: string
}

/* ── Depoimentos ─────────────────────────────────────────────────────────── */

export type TestimonialKey = 'industry' | 'retail' | 'services'

/** Um depoimento: chave nas traduções, iniciais do avatar e cor da marca. */
export interface Testimonial {
  /** Chave do texto nas traduções (`testimonials.items.<key>`). */
  key: TestimonialKey
  /** Iniciais no círculo, já que não há foto de pessoa real. */
  initials: string
  accent: BrandAccent
}

/** Mostra o nome ao lado das iniciais: o ativo, ou o que está sob o mouse. */
export interface ShowNameProps {
  $showName: boolean
}

/** Props de estilo do botão de um depoimento na fileira de baixo. */
export interface TestimonialButtonProps extends AccentStyleProps, ActiveStyleProps, ShowNameProps {}

/** Props de estilo do bloco de texto que troca ao escolher outro depoimento. */
export interface FadingTextProps {
  $isFading: boolean
}

/* ── Contato ─────────────────────────────────────────────────────────────── */

/** Um canal de contato: o texto exibido e o link (`mailto:`, `tel:`). */
export interface ContactLink {
  text: string
  href: string
}

/** Palavras que se revezam no título da chamada final (`contact.words.<key>`). */
export type ContactWordKey = 'connected' | 'intelligent' | 'productive' | 'secure'

export interface ContactWord {
  key: ContactWordKey
  accent: BrandAccent
}

/**
 * Momento de cada palavra no revezamento: a da vez, a que acabou de sair
 * (sobe e some) e as que esperam, escondidas abaixo.
 */
export type RotatingWordState = 'active' | 'leaving' | 'waiting'

export interface RotatingWordStyleProps {
  $state: RotatingWordState
}

/* ── Órbita de soluções ──────────────────────────────────────────────────── */

export type SolutionKey = 'migration' | 'licensing' | 'ai' | 'cloud' | 'governance' | 'security'

/** Uma solução na órbita: ícone, cor do anel e com quais outras ela se conecta. */
export interface OrbitSolution {
  /** Chave do título e da descrição nas traduções (`ecosystem.orbit.items.<key>`). */
  key: SolutionKey
  Icon: IconComponent
  accent: BrandAccent
  /** Soluções relacionadas: pulsam quando esta é aberta. */
  related: SolutionKey[]
}

/** Estado visual de um nó quando alguma solução está aberta. */
export type OrbitNodeState = 'idle' | 'selected' | 'related' | 'dimmed'

/** Props de estilo de um nó da órbita. */
export interface OrbitNodeStyleProps {
  /** Posição do nó no anel, em graus (0 = direita, -90 = topo). */
  $angle: number
  $accent: BrandAccent
  $state: OrbitNodeState
}

/** Props de um aplicativo clicável da fileira do Google Workspace. */
export interface WorkspaceAppProps {
  product: WorkspaceProduct
  /** Nome já traduzido — texto alternativo do ícone e conteúdo do balão. */
  name: string
  isOpen: boolean
  /** Abre o balão deste app (hover do mouse, foco pelo teclado). */
  onOpen: () => void
  /** Fecha o balão, se for o deste app que está aberto. */
  onClose: () => void
  /** Alterna o balão (toque, onde não existe hover). */
  onToggle: () => void
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
