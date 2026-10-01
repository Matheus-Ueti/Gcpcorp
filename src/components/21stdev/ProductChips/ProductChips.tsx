import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { useTranslation } from 'react-i18next'
import styled, { keyframes } from 'styled-components'
import { CLOUD_PRODUCT_NAMES } from '../../../data/cloudProducts'
import type {
  AccentStyleProps,
  BrandAccent,
  CloudProductKey,
  ProductChipProps,
  ProductChipsProps,
} from '../../../types'

/** Distância mínima (px) entre o balão e a borda da tela. */
const VIEWPORT_MARGIN = 12

/**
 * Tags dos produtos do Google Cloud de uma etapa da jornada.
 *
 * Os nomes são prova técnica para quem conhece a plataforma, mas "Dataflow" ou
 * "Cloud IAM" não dizem nada para quem decide a compra. Passar o mouse (ou
 * focar pelo teclado) abre um balão com uma frase explicando o produto, sem
 * tirar ninguém da página. No toque, onde não há hover, o clique abre e fecha.
 *
 * Um balão aberto por vez; também fecha ao tocar fora ou apertar Esc.
 */
export function ProductChips({ products, accent }: ProductChipsProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const [openKey, setOpenKey] = useState<CloudProductKey | null>(null)

  useEffect(() => {
    if (!openKey) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!listRef.current?.contains(event.target as Node)) {
        setOpenKey(null)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenKey(null)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openKey])

  return (
    <List ref={listRef}>
      {products.map((product) => (
        <ProductChip
          key={product}
          product={product}
          accent={accent}
          isOpen={openKey === product}
          onOpen={() => setOpenKey(product)}
          onClose={() => setOpenKey((current) => (current === product ? null : current))}
          onToggle={() => setOpenKey((current) => (current === product ? null : product))}
        />
      ))}
    </List>
  )
}

/** Uma tag: o nome do produto e, quando aberto, o balão com a explicação. */
function ProductChip({ product, accent, isOpen, onOpen, onClose, onToggle }: ProductChipProps) {
  const { t } = useTranslation()
  const chipRef = useRef<HTMLButtonElement>(null)
  const bubbleRef = useRef<HTMLSpanElement>(null)
  /** Tipo do último ponteiro que apertou a tag: define o que o clique faz. */
  const lastPointerType = useRef<string>('')

  const name = CLOUD_PRODUCT_NAMES[product]
  const description = t(`solutions.products.${product}`)
  const bubbleId = `produto-${product}`

  const handlePointerEnter = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse') {
      onOpen()
    }
  }

  const handlePointerLeave = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse') {
      onClose()
    }
  }

  /*
   * No mouse, o hover já abriu o balão: o clique só o mantém aberto (alternar
   * aqui fecharia o balão que a pessoa acabou de ver). No toque, alterna.
   */
  const handleClick = () => {
    if (lastPointerType.current === 'mouse') {
      onOpen()
    } else {
      onToggle()
    }
  }

  /* Foco pelo teclado (Tab) abre; o foco que vem de um clique não conta. */
  const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      onOpen()
    }
  }

  /*
   * O balão fica centrado sob a tag, mas nas tags das pontas ele sairia da
   * tela. Antes da pintura, mede e empurra o balão para dentro; a seta
   * compensa o deslocamento e continua apontando para a tag.
   */
  useLayoutEffect(() => {
    const chip = chipRef.current
    const bubble = bubbleRef.current
    if (!isOpen || !chip || !bubble) {
      return
    }

    const chipRect = chip.getBoundingClientRect()
    const center = chipRect.left + chipRect.width / 2
    const half = bubble.offsetWidth / 2
    const viewportWidth = document.documentElement.clientWidth
    const overflowLeft = Math.max(VIEWPORT_MARGIN - (center - half), 0)
    const overflowRight = Math.max(center + half - (viewportWidth - VIEWPORT_MARGIN), 0)

    bubble.style.setProperty('--edge-shift', `${overflowLeft - overflowRight}px`)
  }, [isOpen])

  return (
    <Item>
      <Chip
        ref={chipRef}
        type="button"
        data-open={isOpen}
        aria-describedby={isOpen ? bubbleId : undefined}
        onBlur={onClose}
        onClick={handleClick}
        onFocus={handleFocus}
        onPointerDown={(event) => {
          lastPointerType.current = event.pointerType
        }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {name}
      </Chip>
      {isOpen && (
        <Bubble ref={bubbleRef} id={bubbleId} role="tooltip">
          <BubbleName $accent={accent}>{name}</BubbleName>
          {description}
        </Bubble>
      )}
    </Item>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const accentColor = (accent: BrandAccent) => `var(--color-${accent})`

const bubbleIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  list-style: none;
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  position: relative;
`

/**
 * Mesma pílula de antes; agora é um botão, porque revela informação. O
 * tracejado embaixo é a dica visual de que há algo a ver ali — a mesma
 * convenção de um termo com definição.
 */
const Chip = styled.button`
  /* Quem usa as tags sobre fundo branco troca o fundo delas por --chip-background. */
  background-color: var(--chip-background, var(--color-surface));
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-text);
  cursor: help;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.3125rem 0.75rem;
  text-decoration: underline dotted color-mix(in srgb, var(--color-text) 45%, transparent);
  text-underline-offset: 3px;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;

  &:hover,
  &[data-open='true'] {
    border-color: var(--color-slate);
    color: var(--color-text-strong);
  }

  &:focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

/*
 * Centralizado sob a tag via "translate" (propriedade própria, separada de
 * "transform"), para a animação de entrada poder usar o transform sem desfazer
 * a centralização nem o ajuste de borda (--edge-shift).
 */
const Bubble = styled.span`
  animation: ${bubbleIn} 0.22s ease-out;
  background-color: var(--color-navy);
  border-radius: 0.75rem;
  box-shadow: 0 10px 24px color-mix(in srgb, var(--color-navy) 30%, transparent);
  color: color-mix(in srgb, var(--color-surface) 88%, transparent);
  font-size: 0.8125rem;
  font-weight: 400;
  left: 50%;
  line-height: 1.45;
  padding: 0.625rem 0.875rem;
  pointer-events: none;
  position: absolute;
  top: calc(100% + 0.75rem);
  translate: calc(-50% + var(--edge-shift, 0px)) 0;
  width: max-content;
  max-width: min(18rem, calc(100vw - 2rem));
  z-index: 5;

  /* Seta apontando para a tag, compensando o ajuste de borda. */
  &::before {
    background-color: inherit;
    border-radius: 2px;
    content: '';
    height: 0.625rem;
    left: calc(50% - var(--edge-shift, 0px));
    position: absolute;
    top: 0;
    transform: translate(-50%, -40%) rotate(45deg);
    width: 0.625rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

/** O nome repetido dentro do balão, na cor da etapa: liga a explicação à tag. */
const BubbleName = styled.strong<AccentStyleProps>`
  color: ${({ $accent }) => accentColor($accent)};
  display: block;
  font-weight: 600;
  margin-bottom: 0.125rem;
`
