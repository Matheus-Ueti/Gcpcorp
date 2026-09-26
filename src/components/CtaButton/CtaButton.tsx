import styled from 'styled-components'
import { OriginLink } from '../OriginLink/OriginLink'

/**
 * Botão de ação principal do site ("Fale com a GCP Corp.", "Encontre a solução
 * para sua empresa").
 *
 * Amarelo com a borda inferior mais escura (sombra interna) e um brilho no
 * topo: o leve relevo de botão pressionável do layout. No hover, o OriginLink
 * derrama o azul-marinho da marca a partir do ponto onde o mouse entrou; o
 * texto branco fica ainda mais legível sobre ele. No clique, afunda levemente.
 */
export const CtaButton = styled(OriginLink)`
  --origin-fill: var(--color-navy);

  background: linear-gradient(var(--color-cta-highlight), var(--color-cta-background) 40%);
  border-radius: 0.75rem;
  box-shadow:
    inset 0 -3px 0 var(--color-cta-edge),
    0 4px 10px color-mix(in srgb, var(--color-cta-edge) 28%, transparent);
  color: var(--color-cta-text);
  display: inline-block;
  font-family: var(--font-display);
  font-size: clamp(1.0625rem, 1.875vw, 1.5rem);
  font-weight: 700;
  line-height: 1.2;
  padding: clamp(0.875rem, 1.3vw, 1.125rem) clamp(1.5rem, 2.5vw, 2rem);
  text-decoration: none;
  /* Sombra âmbar de 1px: ajuda a leitura do branco sobre o amarelo. */
  text-shadow: 0 1px 1px var(--color-cta-edge);
  transition:
    box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    text-shadow 0.3s ease,
    transform 0.15s ease;

  /* Coberto pelo azul-marinho: a sombra acompanha a cor nova e o contorno âmbar do texto some. */
  &[data-filled='true'] {
    box-shadow:
      inset 0 -3px 0 var(--color-cta-edge),
      0 6px 16px color-mix(in srgb, var(--color-navy) 30%, transparent);
    text-shadow: none;
  }

  &:active {
    transform: scale(0.985);
  }

  &:focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:active {
      transform: none;
    }
  }
`
