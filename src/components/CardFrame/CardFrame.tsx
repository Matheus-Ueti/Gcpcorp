import styled from 'styled-components'

/**
 * Moldura de fio bege e cantos arredondados do layout, usada pelos cards de
 * "Sobre nós" e do Google Workspace.
 *
 * Cuida só da moldura: o espaçamento interno fica com quem usa, via
 * styled(CardFrame).
 */
export const CardFrame = styled.div`
  background-color: var(--color-surface);
  border: 1.5px solid var(--color-border-warm);
  border-radius: clamp(1.25rem, 2.5vw, 2rem);
`
