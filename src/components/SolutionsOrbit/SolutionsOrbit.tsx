import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css, keyframes } from 'styled-components'
import {
  CheckIcon,
  CloseIcon,
  CloudOutlineIcon,
  MigrationIcon,
  NetworkIcon,
  ShieldIcon,
  SparkleIcon,
} from '../icons/Icons'
import type {
  AccentStyleProps,
  BrandAccent,
  OrbitNodeState,
  OrbitNodeStyleProps,
  OrbitSolution,
  SolutionKey,
} from '../../types'

/** Símbolo "g" da marca: o mesmo arquivo do favicon, já recortado só no símbolo. */
const SYMBOL_SRC = '/favicon.svg'

/**
 * Soluções na ordem em que aparecem no anel, no sentido horário a partir do
 * topo, como no layout. Cada uma tem a cor do seu anel e as soluções com que
 * se conecta — elas pulsam quando esta é aberta.
 */
const SOLUTIONS: OrbitSolution[] = [
  { key: 'migration', Icon: MigrationIcon, accent: 'blue', related: ['cloud', 'governance'] },
  { key: 'licensing', Icon: CheckIcon, accent: 'yellow', related: ['governance', 'cloud'] },
  { key: 'ai', Icon: SparkleIcon, accent: 'red', related: ['cloud', 'security'] },
  {
    key: 'cloud',
    Icon: CloudOutlineIcon,
    accent: 'green',
    related: ['migration', 'ai', 'security'],
  },
  { key: 'governance', Icon: NetworkIcon, accent: 'yellow', related: ['licensing', 'security'] },
  { key: 'security', Icon: ShieldIcon, accent: 'green', related: ['governance', 'cloud'] },
]

/** Ângulo entre dois nós vizinhos. */
const STEP = 360 / SOLUTIONS.length
/** Giro automático: uma volta a cada 60s, a mesma velocidade do componente original. */
const DEGREES_PER_SECOND = 6
/** Duração do giro que leva a solução escolhida até o topo. */
const FOCUS_DURATION_MS = 700
const DETAIL_ID = 'orbita-detalhe'

/** Ângulo base de cada nó: o primeiro no topo (-90°), os demais no sentido horário. */
const baseAngle = (index: number) => index * STEP - 90

const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3

const accentOf = (key: SolutionKey): BrandAccent =>
  SOLUTIONS.find((solution) => solution.key === key)?.accent ?? 'blue'

/**
 * Órbita de soluções: o símbolo da marca no centro e as soluções girando ao
 * redor. Ao clicar numa solução, ela gira até o topo, o detalhe aparece e as
 * soluções relacionadas pulsam. Fecha clicando fora, no fundo da órbita ou
 * apertando Esc. O detalhe fica no miolo do anel quando há espaço e desce para
 * baixo da órbita no celular.
 *
 * O giro não passa pelo React: um requestAnimationFrame escreve só a variável
 * CSS --orbit-angle, e cada nó se posiciona por transform. Ele pausa com o
 * mouse em cima (para dar para clicar num alvo parado), com foco de teclado
 * dentro, com a seção fora da tela e para quem pediu movimento reduzido.
 */
export function SolutionsOrbit() {
  const { t } = useTranslation()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const angleRef = useRef(0)
  const [selectedKey, setSelectedKey] = useState<SolutionKey | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocusWithin, setHasFocusWithin] = useState(false)
  const [isOnScreen, setIsOnScreen] = useState(false)
  const [prefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const selected = SOLUTIONS.find((solution) => solution.key === selectedKey) ?? null
  const isRotating =
    !prefersReducedMotion && !selected && !isHovered && !hasFocusWithin && isOnScreen

  useEffect(() => {
    const orbit = orbitRef.current
    if (!orbit) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => setIsOnScreen(entry.isIntersecting))
    observer.observe(orbit)
    return () => observer.disconnect()
  }, [])

  /* Giro automático, retomando do ângulo em que parou. */
  useEffect(() => {
    const orbit = orbitRef.current
    if (!orbit || !isRotating) {
      return
    }

    let frame = 0
    let previous = performance.now()
    const tick = (now: number) => {
      angleRef.current = (angleRef.current + ((now - previous) / 1000) * DEGREES_PER_SECOND) % 360
      previous = now
      orbit.style.setProperty('--orbit-angle', `${angleRef.current}deg`)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isRotating])

  /*
   * Leva a solução escolhida até o topo pelo caminho mais curto. O nó fica no
   * topo quando o ângulo da órbita é -índice·STEP (o base dele é índice·STEP-90).
   */
  useEffect(() => {
    const orbit = orbitRef.current
    const index = SOLUTIONS.findIndex((solution) => solution.key === selectedKey)
    if (!orbit || index < 0) {
      return
    }

    const from = angleRef.current
    const delta = ((((-index * STEP - from) % 360) + 540) % 360) - 180
    const apply = (angle: number) => {
      angleRef.current = angle
      orbit.style.setProperty('--orbit-angle', `${angle}deg`)
    }

    if (prefersReducedMotion) {
      apply(from + delta)
      return
    }

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / FOCUS_DURATION_MS, 1)
      apply(from + delta * easeOutCubic(progress))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [selectedKey, prefersReducedMotion])

  /*
   * Com uma solução aberta: clicar fora (da órbita e do detalhe) ou apertar Esc
   * fecha. Usa o wrapper, que contém os dois — no celular o detalhe fica fora
   * da órbita, e clicar nele não pode fechá-lo.
   */
  useEffect(() => {
    if (!selectedKey) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setSelectedKey(null)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedKey(null)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedKey])

  const stateOf = (solution: OrbitSolution): OrbitNodeState => {
    if (!selected) {
      return 'idle'
    }
    if (solution.key === selected.key) {
      return 'selected'
    }
    return selected.related.includes(solution.key) ? 'related' : 'dimmed'
  }

  const titleOf = (key: SolutionKey) => t(`ecosystem.orbit.items.${key}.title`)

  const handlePointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') {
      setIsHovered(true)
    }
  }

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setHasFocusWithin(false)
    }
  }

  return (
    <Wrapper
      ref={wrapperRef}
      onBlur={handleBlur}
      onFocus={() => setHasFocusWithin(true)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovered(false)}
    >
      <Orbit
        ref={orbitRef}
        role="group"
        aria-label={t('ecosystem.orbit.label')}
        onClick={(event) => {
          // Clique no fundo da órbita (fora dos nós) fecha, como no original.
          if (event.target === event.currentTarget) {
            setSelectedKey(null)
          }
        }}
      >
        <Ring aria-hidden="true" />
        <BrandSymbol src={SYMBOL_SRC} alt="" aria-hidden="true" data-hidden={Boolean(selected)} />

        {SOLUTIONS.map((solution, index) => {
          const state = stateOf(solution)

          return (
            <Node
              key={solution.key}
              $angle={baseAngle(index)}
              $accent={solution.accent}
              $state={state}
            >
              <NodeButton
                type="button"
                aria-controls={DETAIL_ID}
                aria-expanded={state === 'selected'}
                onClick={() =>
                  setSelectedKey((current) => (current === solution.key ? null : solution.key))
                }
              >
                <Disc $accent={solution.accent} $state={state}>
                  <solution.Icon strokeWidth={2.2} />
                </Disc>
                <Label>{titleOf(solution.key)}</Label>
              </NodeButton>
            </Node>
          )
        })}
      </Orbit>

      <Detail
        id={DETAIL_ID}
        role="region"
        aria-live="polite"
        aria-label={selected ? titleOf(selected.key) : undefined}
        data-open={Boolean(selected)}
      >
        {selected && (
          <>
            <CloseButton
              type="button"
              aria-label={t('ecosystem.orbit.close')}
              onClick={() => setSelectedKey(null)}
            >
              <CloseIcon width={16} height={16} />
            </CloseButton>
            <DetailTitle>{titleOf(selected.key)}</DetailTitle>
            <DetailText>{t(`ecosystem.orbit.items.${selected.key}.description`)}</DetailText>
            <RelatedLabel>{t('ecosystem.orbit.related')}</RelatedLabel>
            <RelatedList>
              {selected.related.map((key) => (
                <li key={key}>
                  <RelatedChip
                    type="button"
                    $accent={accentOf(key)}
                    onClick={() => setSelectedKey(key)}
                  >
                    {titleOf(key)}
                  </RelatedChip>
                </li>
              ))}
            </RelatedList>
          </>
        )}
      </Detail>
    </Wrapper>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const accentColor = (accent: BrandAccent) => `var(--color-${accent})`

/** Onda que sai do anel das soluções relacionadas à que está aberta. */
const relatedPulse = keyframes`
  from {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--pulse-color) 55%, transparent);
  }

  to {
    box-shadow: 0 0 0 14px transparent;
  }
`

const detailIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

/*
 * Container de consulta do detalhe: é a largura disponível para a órbita que
 * decide se o detalhe cabe no miolo do anel ou desce para baixo dela.
 */
const Wrapper = styled.div`
  container-type: inline-size;
  position: relative;
  width: 100%;
`

/*
 * A órbita é um container de consulta: raio, tamanho dos nós e das fontes são
 * medidos em cqi (% da largura dela), então a composição do layout se mantém
 * igual do celular ao desktop. Proporções medidas no mock: anel de 78% da
 * largura, nós de 11%, símbolo central de 22% de altura.
 */
const Orbit = styled.div`
  --orbit-angle: 0deg;
  --radius: 39cqi;
  --node-size: clamp(2.75rem, 11cqi, 4rem);

  aspect-ratio: 1;
  container-type: inline-size;
  margin: 0 auto 1.5rem;
  max-width: 36rem;
  position: relative;
  width: 100%;
`

const Ring = styled.span`
  border: 2px solid var(--color-border);
  border-radius: 50%;
  height: calc(var(--radius) * 2);
  left: 50%;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: calc(var(--radius) * 2);
`

const BrandSymbol = styled.img`
  height: 22cqi;
  left: 50%;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  width: auto;

  &[data-hidden='true'] {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.85);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

/*
 * Posiciona o nó no anel e o "desgira" em seguida: gira até o ângulo, anda o
 * raio e desfaz o giro — o nó vai para o lugar, mas o rótulo continua de pé.
 */
const Node = styled.div<OrbitNodeStyleProps>`
  --node-turn: calc(${({ $angle }) => $angle}deg + var(--orbit-angle));

  height: var(--node-size);
  left: 50%;
  margin: calc(var(--node-size) / -2) 0 0 calc(var(--node-size) / -2);
  opacity: ${({ $state }) => ($state === 'dimmed' ? 0.4 : 1)};
  position: absolute;
  top: 50%;
  transform: rotate(var(--node-turn)) translateX(var(--radius)) rotate(calc(-1 * var(--node-turn)));
  transition: opacity 0.3s ease;
  width: var(--node-size);
  z-index: ${({ $state }) => ($state === 'selected' ? 3 : 1)};
`

const NodeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: block;
  height: 100%;
  padding: 0;
  position: relative;
  width: 100%;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: none;
  }
`

const Disc = styled.span<Pick<OrbitNodeStyleProps, '$accent' | '$state'>>`
  --pulse-color: ${({ $accent }) => accentColor($accent)};

  align-items: center;
  background-color: var(--color-text);
  border: 3px solid ${({ $accent }) => accentColor($accent)};
  border-radius: 50%;
  box-shadow: 0 4px 12px color-mix(in srgb, var(--color-text) 25%, transparent);
  color: var(--color-surface);
  display: flex;
  height: 100%;
  justify-content: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 100%;

  svg {
    height: 46%;
    width: 46%;
  }

  ${NodeButton}:hover & {
    transform: scale(1.07);
  }

  ${NodeButton}:focus-visible & {
    outline: 3px solid var(--color-blue);
    outline-offset: 3px;
  }

  ${({ $state, $accent }) =>
    $state === 'selected' &&
    css`
      box-shadow:
        0 0 0 6px color-mix(in srgb, ${accentColor($accent)} 22%, transparent),
        0 8px 18px color-mix(in srgb, var(--color-text) 30%, transparent);
      transform: scale(1.14);

      ${NodeButton}:hover & {
        transform: scale(1.14);
      }
    `}

  ${({ $state }) =>
    $state === 'related' &&
    css`
      animation: ${relatedPulse} 1.6s ease-out infinite;
    `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`

const Label = styled.span`
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: clamp(0.8125rem, 3.2cqi, 1.125rem);
  font-weight: 600;
  left: 50%;
  line-height: 1.2;
  position: absolute;
  text-transform: lowercase;
  top: calc(100% + 0.5rem);
  transform: translateX(-50%);
  white-space: nowrap;
`

/*
 * Estreito (celular): o detalhe entra abaixo da órbita, no fluxo da página, e
 * fechado não ocupa espaço. Com espaço: fica no miolo do anel, um pouco abaixo
 * do centro — a solução aberta vai para o topo, e o rótulo dela fica logo
 * acima deste cartão. A largura (42% da órbita) foi escolhida para o cartão
 * não encostar nos rótulos dos nós laterais.
 */
const Detail = styled.div`
  background-color: var(--color-surface);
  border: 1.5px solid var(--color-border-warm);
  border-radius: 1rem;
  box-shadow: 0 12px 32px color-mix(in srgb, var(--color-text-strong) 14%, transparent);
  display: none;
  margin: 1.5rem auto 0;
  max-width: 22rem;
  padding: 1rem 1.125rem;
  position: relative;
  text-align: center;

  &[data-open='true'] {
    animation: ${detailIn} 0.25s ease-out;
    display: block;
  }

  @container (min-width: 30rem) {
    --orbit-size: min(100cqi, 36rem);

    display: block;
    left: 50%;
    max-width: none;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: calc(var(--orbit-size) * 0.56);
    transform: translate(-50%, -50%) scale(0.92);
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
    width: calc(var(--orbit-size) * 0.42);
    z-index: 4;

    &[data-open='true'] {
      animation: none;
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &[data-open='true'] {
      animation: none;
    }
  }
`

const CloseButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  border-radius: 50%;
  color: var(--color-text);
  cursor: pointer;
  display: inline-flex;
  height: 1.75rem;
  justify-content: center;
  position: absolute;
  right: 0.375rem;
  top: 0.375rem;
  width: 1.75rem;

  &:hover {
    background-color: var(--color-surface-muted);
  }

  &:focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 1px;
  }
`

const DetailTitle = styled.h3`
  color: var(--color-text-strong);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
  margin: 0 1.5rem 0.375rem;
`

const DetailText = styled.p`
  font-size: 0.875rem;
  line-height: 1.45;
  margin: 0 0 0.75rem;
`

const RelatedLabel = styled.p`
  color: var(--color-text);
  font-size: 0.75rem;
  font-weight: 600;
  margin: 0 0 0.375rem;
`

const RelatedList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
`

const RelatedChip = styled.button<AccentStyleProps>`
  background-color: color-mix(
    in srgb,
    ${({ $accent }) => accentColor($accent)} 10%,
    var(--color-surface)
  );
  border: 1.5px solid ${({ $accent }) => accentColor($accent)};
  border-radius: 999px;
  color: var(--color-text-strong);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.625rem;

  &:hover {
    background-color: color-mix(
      in srgb,
      ${({ $accent }) => accentColor($accent)} 22%,
      var(--color-surface)
    );
  }

  &:focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 2px;
  }
`
