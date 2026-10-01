import { createGlobalStyle } from 'styled-components'

/*
 * A DEMO da Qurova desenha os algarismos como um carimbo "personal use only"
 * em vez do número, então U+0030-0039 sai da cobertura dela: os dígitos caem
 * na Quicksand e só as letras usam a Qurova.
 *
 * Ao instalar a licença comercial (com uso em web) de
 * https://prioritypeco.com/product/qurova-logo-font/:
 *   1. substitua os quatro .otf em `public/fonts/qurova/`;
 *   2. troque QUROVA_LICENSED para true — a Qurova passa a valer também nos
 *      números e o site fica 100% na mesma tipografia;
 *   3. apague a linha `public/fonts/qurova/` do .gitignore para versioná-los.
 */
const QUROVA_LICENSED = false
const QUROVA_UNICODE_RANGE = QUROVA_LICENSED
  ? ''
  : 'unicode-range: U+0000-002F, U+003A-10FFFF;'

export const GlobalStyle = createGlobalStyle`
  /*
   * Qurova é a versão DEMO (uso pessoal) e fica fora do Git: onde os arquivos
   * não existirem — como no deploy —, a pilha cai na Quicksand.
   */
  @font-face {
    font-display: swap;
    font-family: 'Qurova';
    font-weight: 400;
    src: url('/fonts/qurova/Qurova-Regular.otf') format('opentype');
    ${QUROVA_UNICODE_RANGE}
  }

  @font-face {
    font-display: swap;
    font-family: 'Qurova';
    font-weight: 500;
    src: url('/fonts/qurova/Qurova-Medium.otf') format('opentype');
    ${QUROVA_UNICODE_RANGE}
  }

  @font-face {
    font-display: swap;
    font-family: 'Qurova';
    font-weight: 600;
    src: url('/fonts/qurova/Qurova-SemiBold.otf') format('opentype');
    ${QUROVA_UNICODE_RANGE}
  }

  @font-face {
    font-display: swap;
    font-family: 'Qurova';
    font-weight: 700;
    src: url('/fonts/qurova/Qurova-Bold.otf') format('opentype');
    ${QUROVA_UNICODE_RANGE}
  }

  :root {
    --color-blue: #1a73e8;
    --color-blue-dark: #1557b0;
    --color-red: #ea4335;
    --color-yellow: #fbbc05;
    --color-green: #34a853;

    --color-navy: #132a3a;
    --color-slate: #3f6f7a;

    --color-text-strong: #202124;
    --color-text: #3c4043;

    --color-surface: #ffffff;
    --color-surface-muted: #f8fafc;
    --color-border: #e8eaed;
    --color-border-warm: #dcb68c;
    --color-muted: #9aa5a0;

    --color-cta-background: #ffbd00;
    --color-cta-highlight: #ffcb3d;
    --color-cta-edge: #d99a00;
    --color-cta-shade: #a87300;
    --color-cta-text: #ffffff;

    /* Qurova em todo o site: títulos e texto corrido usam a mesma pilha. */
    --font-display: 'Qurova', 'Quicksand', 'Segoe UI', system-ui, -apple-system, sans-serif;
    --font-body: var(--font-display);

    --layout-max-width: 1200px;
    --layout-gutter: 1.5rem;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }

  body {
    background-color: var(--color-surface);
    color: var(--color-text);
    font-family: var(--font-body);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-display);
  }

  #root {
    min-height: 100vh;
  }

  img,
  svg {
    max-width: 100%;
  }

  ::selection {
    background-color: color-mix(in srgb, var(--color-yellow) 38%, transparent);
    color: var(--color-text-strong);
  }

  :focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 3px;
  }
`
