import { createGlobalStyle } from 'styled-components'

/**
 * Tokens de design e reset global.
 *
 * Toda cor, fonte e medida de layout reutilizável mora aqui como custom
 * property: os componentes consomem os tokens em vez de repetir valores
 * literais, então ajustar a identidade visual é mexer em um lugar só.
 */
export const GlobalStyle = createGlobalStyle`
  :root {
    /* Paleta Google, base da identidade da GCP Corp */
    --color-blue: #1a73e8;
    --color-blue-dark: #1557b0;
    --color-red: #ea4335;
    --color-yellow: #fbbc05;
    --color-green: #34a853;

    /* Texto */
    --color-text-strong: #202124;
    --color-text: #3c4043;

    /* Superfícies */
    --color-surface: #ffffff;
    --color-border: #e8eaed;
    --color-muted: #9aa5a0;

    /* Ação principal */
    --color-cta-background: #fbbc05;
    --color-cta-background-hover: #f2b300;
    --color-cta-text: #202124;

    /*
     * Fonte de exibição da marca. Trocar a família aqui (e o <link> do Google
     * Fonts no index.html) reflete em todo o site.
     */
    --font-display: 'Quicksand', 'Segoe UI', system-ui, -apple-system, sans-serif;

    /* Layout */
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

  /* Compensa o header fixo ao pular para âncoras como #solucoes. */
  html {
    scroll-padding-top: 5rem;
  }

  body {
    background-color: var(--color-surface);
    color: var(--color-text);
    font-family: var(--font-display);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  #root {
    min-height: 100vh;
  }

  /* Evita que imagens e SVGs estourem a largura do container. */
  img,
  svg {
    max-width: 100%;
  }
`
