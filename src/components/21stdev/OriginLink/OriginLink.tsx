import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from 'react'
import styled from 'styled-components'
import type { OriginFillGeometry, OriginLinkProps } from '../../../types'

function coverDiameter(width: number, height: number, x: number, y: number) {
  const farthestCorner = Math.max(
    Math.hypot(x, y),
    Math.hypot(width - x, y),
    Math.hypot(x, height - y),
    Math.hypot(width - x, height - y),
  )

  return Math.ceil(2 * farthestCorner)
}

export function OriginLink({
  children,
  onBlur,
  onFocus,
  onPointerEnter,
  onPointerLeave,
  ...props
}: OriginLinkProps) {
  const rootRef = useRef<HTMLAnchorElement>(null)
  const [isFilled, setIsFilled] = useState(false)
  const [fill, setFill] = useState<OriginFillGeometry>({ x: 0, y: 0, size: 0 })

  /*
   * Recalcula o diâmetro se o botão mudar de tamanho (fonte da marca que
   * termina de carregar, janela redimensionada): senão o círculo, calculado
   * para o tamanho antigo, deixa um fio do fundo aparecendo na borda.
   */
  useEffect(() => {
    const node = rootRef.current
    if (!node || !isFilled) {
      return
    }

    const observer = new ResizeObserver(() => {
      const { width, height } = node.getBoundingClientRect()
      setFill((current) => {
        const size = coverDiameter(width, height, current.x, current.y)
        return size === current.size ? current : { ...current, size }
      })
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [isFilled])

  const fillFrom = (rect: DOMRect, x: number, y: number) => {
    setFill({ x, y, size: coverDiameter(rect.width, rect.height, x, y) })
    setIsFilled(true)
  }

  const handlePointerEnter = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerEnter?.(event)
    const rect = event.currentTarget.getBoundingClientRect()
    fillFrom(rect, event.clientX - rect.left, event.clientY - rect.top)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLAnchorElement>) => {
    onPointerLeave?.(event)
    setIsFilled(false)
  }

  const handleFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    onFocus?.(event)
    if (!event.currentTarget.matches(':focus-visible')) {
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    fillFrom(rect, rect.width / 2, rect.height / 2)
  }

  const handleBlur = (event: FocusEvent<HTMLAnchorElement>) => {
    onBlur?.(event)
    setIsFilled(false)
  }

  return (
    <Root
      {...props}
      ref={rootRef}
      data-filled={isFilled}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <Fill
        aria-hidden="true"
        data-filled={isFilled}
        style={{ height: fill.size, left: fill.x, top: fill.y, width: fill.size }}
      />
      <Label>{children}</Label>
    </Root>
  )
}

const Root = styled.a`
  isolation: isolate;
  overflow: hidden;
  position: relative;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
`

const Fill = styled.span`
  background-color: var(--origin-fill, var(--color-navy));
  border-radius: 50%;
  pointer-events: none;
  position: absolute;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;

  &[data-filled='true'] {
    transform: translate(-50%, -50%) scale(1);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Label = styled.span`
  align-items: center;
  display: inline-flex;
  gap: 0.5rem;
  justify-content: center;
  position: relative;
  z-index: 1;
`
