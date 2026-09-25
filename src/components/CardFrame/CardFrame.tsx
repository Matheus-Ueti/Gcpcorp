import styled, { css } from 'styled-components'
import type { CardFrameStyleProps } from '../../types'

/**
 * Moldura de fio bege e cantos arredondados do layout.
 *
 * O card do layout começa em "Sobre nós" e termina depois dos produtos do
 * ecossistema, mas uma faixa cinza de ponta a ponta o corta ao meio. Para cada
 * seção continuar sendo seu próprio componente, o card é desenhado em duas
 * partes: a de cima com a borda inferior aberta e a de baixo com a superior
 * aberta ($openEdge). Encostadas na faixa, as duas leem como um card só.
 *
 * Cuida só da moldura: o espaçamento interno fica com quem usa, via
 * styled(CardFrame).
 */
export const CardFrame = styled.div<CardFrameStyleProps>`
  --card-radius: clamp(1.25rem, 2.5vw, 2rem);

  background-color: var(--color-surface);
  border: 1.5px solid var(--color-border-warm);
  border-radius: var(--card-radius);

  ${({ $openEdge }) =>
    $openEdge === 'bottom' &&
    css`
      border-bottom: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}

  ${({ $openEdge }) =>
    $openEdge === 'top' &&
    css`
      border-top: none;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    `}
`
