import styled, { keyframes } from 'styled-components'
import { HERO_CENTER, HERO_RINGS, HERO_VIEWBOX_SIZE } from './heroRingsData'
import type { HeroRingStyleProps, HeroShape } from '../../types'

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

function renderShape(shape: HeroShape, index: number) {
  if (shape.kind === 'circle') {
    return <circle key={index} cx={shape.cx} cy={shape.cy} r={shape.r} fill={shape.fill} />
  }

  return <path key={index} d={shape.d} fill={shape.fill} />
}

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
 * `transform-box: view-box` resolve a transform-origin contra o viewBox. Sem
 * isso cada anel giraria em torno do próprio bounding box e a arte se
 * desmontaria.
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
