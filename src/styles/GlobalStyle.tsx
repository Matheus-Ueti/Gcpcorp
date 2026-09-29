import { createGlobalStyle } from 'styled-components'

/**
 * Tokens de design e reset global.
 *
 * Toda cor, fonte e medida de layout reutilizável mora aqui como custom
 * property: os componentes consomem os tokens em vez de repetir valores
 * literais, então ajustar a identidade visual é mexer em um lugar só.
 */
export const GlobalStyle = createGlobalStyle`
  /*
   * Qurova, a fonte de títulos da marca. Os arquivos ficam em public/fonts/qurova
   * e estão fora do Git (ver .gitignore): hoje são a versão DEMO, só para uso
   * pessoal. Onde eles não existirem — como no deploy —, --font-display cai na
   * Quicksand, que tem desenho parecido.
   */
  @font-face {
    font-display: swap;
    font-family: 'Qurova';
    font-weight: 400;
    src: url('/fonts/qurova/Qurova-Regular.otf') format('opentype');
  }

  @font-face {
    font-display: swap;
    font-family: 'Qurova';
    font-weight: 500;
    src: url('/fonts/qurova/Qurova-Medium.otf') format('opentype');
  }

  @font-face {
    font-display: swap;
    font-family: 'Qurova';
    font-weight: 600;
    src: url('/fonts/qurova/Qurova-SemiBold.otf') format('opentype');
  }

  @font-face {
    font-display: swap;
    font-family: 'Qurova';
    font-weight: 700;
    src: url('/fonts/qurova/Qurova-Bold.otf') format('opentype');
  }

  :root {
    /* Paleta Google, base da identidade da GCP Corp */
    --color-blue: #1a73e8;
    --color-blue-dark: #1557b0;
    --color-red: #ea4335;
    --color-yellow: #fbbc05;
    --color-green: #34a853;

    /* Tons do próprio logo GCP Corp. (o azul-marinho de "cp") */
    --color-navy: #132a3a;
    --color-slate: #3f6f7a;

    /* Texto */
    --color-text-strong: #202124;
    --color-text: #3c4043;

    /* Superfícies */
    --color-surface: #ffffff;
    --color-surface-muted: #f8fafc;
    --color-border: #e8eaed;
    --color-border-warm: #dcb68c;
    --color-muted: #9aa5a0;

    /*
     * Ação principal: amarelo com borda inferior mais escura, que dá o leve
     * relevo de botão pressionável do layout aprovado.
     */
    --color-cta-background: #ffbd00;
    --color-cta-highlight: #ffcb3d;
    --color-cta-edge: #d99a00;
    /* Borda inferior funda da pílula do menu (medida no layout: #e8a300 → #8c5f00). */
    --color-cta-shade: #a87300;
    --color-cta-text: #ffffff;

    /*
     * Fontes da marca: Qurova (arredondada) nos títulos e no botão, Poppins no
     * texto corrido e na interface. A Quicksand é o substituto da Qurova
     * enquanto os arquivos licenciados não estão no repositório.
     */
    --font-display: 'Qurova', 'Quicksand', 'Segoe UI', system-ui, -apple-system, sans-serif;
    --font-body: 'Poppins', 'Segoe UI', system-ui, -apple-system, sans-serif;

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

  /*
   * Ao clicar no menu, a página desliza até a seção em vez de saltar. O
   * scroll-padding compensa o cabeçalho fixo, que cobriria o topo da seção.
   */
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

  /* Evita que imagens e SVGs estourem a largura do container. */
  img,
  svg {
    max-width: 100%;
  }

  /*
   * Superfícies desenhadas pelo navegador. Sem isto elas chegam com o azul
   * padrão do sistema, que não pertence a nenhuma identidade.
   */
  ::selection {
    background-color: color-mix(in srgb, var(--color-yellow) 38%, transparent);
    color: var(--color-text-strong);
  }

  :focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 3px;
  }
`
