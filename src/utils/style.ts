import type { BrandAccent } from '../types'

/** Token CSS da cor de acento da marca (`blue` → `var(--color-blue)`). */
export const accentColor = (accent: BrandAccent) => `var(--color-${accent})`
