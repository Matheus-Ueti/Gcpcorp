/**
 * Pontos de quebra do layout, em px. `below` deriva o limite de cima (639px a
 * partir de 640), então não há par de números para manter na mão.
 */
export const PHONE = 480
export const TABLET = 640
export const PILLAR_COLUMNS = 860
export const FOOTER_COLUMNS = 900
export const DESKTOP = 960

export const above = (breakpoint: number) => `(min-width: ${breakpoint}px)`

export const below = (breakpoint: number) => `(max-width: ${breakpoint - 1}px)`
