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

export function StoreIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M5.6 8h12.8l-1 12.2a1 1 0 0 1-1 .8H7.6a1 1 0 0 1-1-.8L5.6 8z" />
      <path d="M9 8V6.4a3 3 0 0 1 6 0V8" />
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

/* ── Soluções ────────────────────────────────────────────────────────────── */

export function CloudIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M7 19a4.5 4.5 0 0 1-.4-8.98 5.5 5.5 0 0 1 10.6-1.2A4 4 0 0 1 17.5 19H7z" />
      <path d="M12 16.5v-6" />
      <path d="m9.5 13 2.5-2.5 2.5 2.5" />
    </OutlineIcon>
  )
}

export function ChartIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M3.5 3.5v15a2 2 0 0 0 2 2h15" />
      <path d="M7.5 16.5v-4" />
      <path d="M12 16.5v-8" />
      <path d="M16.5 16.5v-5.5" />
      <path d="M20.5 16.5v-9" />
    </OutlineIcon>
  )
}

export function SparkIcon(props: IconProps) {
  return (
    <OutlineIcon {...props}>
      <path d="M12 2.8 13.9 8 19 9.9 13.9 11.8 12 17l-1.9-5.2L5 9.9 10.1 8 12 2.8z" />
      <path d="M18.5 15.5 19.4 18l2.5.9-2.5.9-.9 2.5-.9-2.5-2.5-.9 2.5-.9.9-2.5z" />
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
