import styled, { keyframes } from 'styled-components'
import { HERO_CENTER, HERO_RINGS, HERO_VIEWBOX_SIZE } from './heroRingsData'
import type { HeroRingStyleProps, HeroShape } from '../../types'

/**
 * "Elemento Hero" da marca, com cada anel concêntrico girando de forma
 * independente.
 *
 * A arte é decorativa: quem carrega o significado da seção é o título do hero,
 * por isso o SVG fica fora da árvore de acessibilidade (`aria-hidden`).
 */
export function HeroRings() {
  return (
    <Svg
      viewBox={`0 0 ${HERO_VIEWBOX_SIZE} ${HERO_VIEWBOX_SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {HERO_RINGS.map((ring) => (
        <Ring key={ring.id} $direction={ring.direction} $durationInSeconds={ring.durationInSeconds}>
          {ring.shapes.map(renderShape)}
        </Ring>
      ))}
    </Svg>
  )
}

/**
 * Os traços são estáticos e nunca reordenados, então o índice é uma `key`
 * estável.
 */
function renderShape(shape: HeroShape, index: number) {
  if (shape.kind === 'circle') {
    return <circle key={index} cx={shape.cx} cy={shape.cy} r={shape.r} fill={shape.fill} />
  }

  return <path key={index} d={shape.d} fill={shape.fill} />
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Svg = styled.svg`
  display: block;
  width: 100%;
  height: auto;
`

/**
 * `transform-box: view-box` faz a `transform-origin` ser resolvida contra o
 * viewBox do SVG, e não contra a caixa de cada grupo. Sem isso cada anel giraria
 * em torno do centro do próprio bounding box — que, num arco, não coincide com o
 * centro da circunferência — e a arte se desmontaria.
 */
const Ring = styled.g<HeroRingStyleProps>`
  transform-box: view-box;
  transform-origin: ${HERO_CENTER}px ${HERO_CENTER}px;
  will-change: transform;
  animation: ${spin} ${({ $durationInSeconds }) => $durationInSeconds}s linear infinite;
  animation-direction: ${({ $direction }) =>
    $direction === 'counterclockwise' ? 'reverse' : 'normal'};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
