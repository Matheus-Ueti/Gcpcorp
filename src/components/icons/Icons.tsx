import type { IconProps } from '../../types'

/**
 * Conjunto de ícones do site.
 *
 * São SVGs inline (e não arquivos em `assets/`) por dois motivos: herdam a cor
 * do texto via `currentColor` — então o mesmo ícone serve em cima do amarelo do
 * menu e do azul dos botões sociais — e não custam uma requisição cada.
 *
 * Os ícones de navegação são de traço; os de redes sociais são os glifos
 * oficiais das marcas, que só existem em versão preenchida.
 */

/** Base dos ícones de traço: grade 24x24, contorno na cor do texto. */
function OutlineIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

/** Base dos glifos de marca: grade 24x24, preenchidos na cor do texto. */
function BrandIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

/* ── Navegação ───────────────────────────────────────────────────────────── */

export function HomeIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
    </OutlineIcon>
  )
}

export function UsersIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <circle cx="9.5" cy="8" r="3.3" />
      <path d="M3.5 20.5c0-3.4 2.7-5.2 6-5.2s6 1.8 6 5.2" />
      <path d="M16.8 5.2a3.3 3.3 0 0 1 0 6.3" />
      <path d="M18 15.6c1.9.6 3 2.1 3 4.9" />
    </OutlineIcon>
  )
}

export function LayersIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M12 3 2.5 8 12 13l9.5-5L12 3z" />
      <path d="M2.5 12.5 12 17.5l9.5-5" />
      <path d="M2.5 16.8 12 21.8l9.5-5" />
    </OutlineIcon>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="1.6" />
      <path d="m3.2 7 8.8 6 8.8-6" />
    </OutlineIcon>
  )
}

/* ── Jornada "Da migração à IA" ──────────────────────────────────────────── */

/** Servidor com uma seta subindo para a nuvem; a base da nuvem abre para a seta entrar. */
export function ServerCloudIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M10.6 11H8.6a2.7 2.7 0 0 1-.25-5.39 3.4 3.4 0 0 1 6.55-.73A2.5 2.5 0 0 1 15.4 11h-2" />
      <rect x="4" y="15" width="16" height="6" rx="1.6" />
      <path d="M7.5 18h.01" />
      <path d="M10.5 18h.01" />
      <path d="M12 15V6.8" />
      <path d="m10.3 8.5 1.7-1.7 1.7 1.7" />
    </OutlineIcon>
  )
}

/** Banco de dados: o dado consolidado num só lugar (data warehouse). */
export function DatabaseIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
      <path d="M4.5 5.5v13c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5v-13" />
      <path d="M4.5 12c0 1.38 3.36 2.5 7.5 2.5s7.5-1.12 7.5-2.5" />
    </OutlineIcon>
  )
}

/** Chip com a estrela de quatro pontas no centro: IA rodando em produção. */
export function AiChipIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <rect x="5.5" y="5.5" width="13" height="13" rx="2" />
      <path d="M9 2.5v3M15 2.5v3M9 18.5v3M15 18.5v3M2.5 9h3M2.5 15h3M18.5 9h3M18.5 15h3" />
      <path d="M12 8.6c.3 1.8 1.6 3.1 3.4 3.4-1.8.3-3.1 1.6-3.4 3.4-.3-1.8-1.6-3.1-3.4-3.4 1.8-.3 3.1-1.6 3.4-3.4z" />
    </OutlineIcon>
  )
}

export function ShieldIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M12 2.8 4.8 5.9v5.5c0 4.3 3 8.3 7.2 9.8 4.2-1.5 7.2-5.5 7.2-9.8V5.9L12 2.8z" />
      <path d="m8.9 11.8 2.2 2.2 4-4.2" />
    </OutlineIcon>
  )
}

/* ── Sobre nós ───────────────────────────────────────────────────────────── */

/**
 * Janela com lupa. As bordas da janela param antes da lupa em vez de passar
 * por baixo dela, para os dois traços não se cruzarem.
 */
export function AnalysisIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M20.5 10.2V6A1.5 1.5 0 0 0 19 4.5H5A1.5 1.5 0 0 0 3.5 6v11A1.5 1.5 0 0 0 5 18.5h6.2" />
      <path d="M3.5 8.2h17" />
      <circle cx="16.4" cy="15.4" r="3.4" />
      <path d="m18.9 17.9 2.6 2.6" />
    </OutlineIcon>
  )
}

export function TechnologyIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <rect x="3" y="4" width="18" height="12.5" rx="1.6" />
      <path d="M12 16.5V20" />
      <path d="M8.5 20h7" />
      <path d="m9.8 8.2-2.4 2.05 2.4 2.05" />
      <path d="m14.2 8.2 2.4 2.05-2.4 2.05" />
    </OutlineIcon>
  )
}

/* ── Órbita de soluções ──────────────────────────────────────────────────── */

/** Banco de dados com uma seta saindo: dados indo para outro lugar. */
export function MigrationIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <ellipse cx="8" cy="5.5" rx="5" ry="2" />
      <path d="M3 5.5v11c0 1.1 2.24 2 5 2s5-.9 5-2v-11" />
      <path d="M3 11c0 1.1 2.24 2 5 2s5-.9 5-2" />
      <path d="M15.5 12h6" />
      <path d="m18.5 9 3 3-3 3" />
    </OutlineIcon>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="m4.5 12.5 5 5L19.5 7" />
    </OutlineIcon>
  )
}

/** Estrela de quatro pontas preenchida, o símbolo usual de IA. */
export function SparkleIcon(props: IconProps) {
  return (
    <OutlineIcon {...props} fill="currentColor" stroke="none">
      <path d="M12 3c.7 5 3.9 8.3 9 9-5.1.7-8.3 4-9 9-.7-5-3.9-8.3-9-9 5.1-.7 8.3-4 9-9z" />
    </OutlineIcon>
  )
}

/** Nuvem simples, sem seta: a nuvem como produto, não como migração. */
export function CloudOutlineIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M7 18.5a4.5 4.5 0 0 1-.4-8.98 5.5 5.5 0 0 1 10.6-1.2A4 4 0 0 1 17.5 18.5H7z" />
    </OutlineIcon>
  )
}

/** Três nós interligados: estrutura, políticas, controle. */
export function NetworkIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <circle cx="12" cy="5.5" r="2.2" />
      <circle cx="5.5" cy="17" r="2.2" />
      <circle cx="18.5" cy="17" r="2.2" />
      <path d="M10.9 7.4 6.6 15.1" />
      <path d="m13.1 7.4 4.3 7.7" />
      <path d="M7.7 17h8.6" />
    </OutlineIcon>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </OutlineIcon>
  )
}

/* ── Contato ─────────────────────────────────────────────────────────────── */

export function PhoneIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M6.3 3.5h3l1.5 3.8-1.9 1.4a11 11 0 0 0 5.4 5.4l1.4-1.9 3.8 1.5v3a1.8 1.8 0 0 1-2 1.8A15.8 15.8 0 0 1 4.5 5.5a1.8 1.8 0 0 1 1.8-2z" />
    </OutlineIcon>
  )
}

export function MapPinIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M12 21.2c4-3.9 6-7.2 6-9.9a6 6 0 1 0-12 0c0 2.7 2 6 6 9.9z" />
      <circle cx="12" cy="11" r="2.4" />
    </OutlineIcon>
  )
}

/* ── Redes sociais ───────────────────────────────────────────────────────── */

export function LinkedInIcon(props: IconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm15.11 13.02h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
    </BrandIcon>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.67-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.93 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0z" />
      <path d="M12 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
      <circle cx="18.41" cy="5.6" r="1.44" />
    </BrandIcon>
  )
}
