import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import type {
  AccentStyleProps,
  ActiveStyleProps,
  BrandAccent,
  FadingTextProps,
  ShowNameProps,
  Testimonial,
  TestimonialButtonProps,
} from '../../types'

/**
 * ⚠️ CONTEÚDO DE EXEMPLO — NÃO SÃO CLIENTES REAIS.
 *
 * Os nomes ("Indústria Exemplo") e as falas foram escritos só para mostrar o
 * formato da seção. O "Exemplo" no nome de cada empresa é o que impede que
 * sejam lidos como clientes de verdade: depoimento inventado apresentado como
 * real é propaganda enganosa (CDC, art. 37). Não troque por nomes plausíveis
 * de empresas que não deram depoimento.
 *
 * Ao entrar depoimento real, é preciso autorização por escrito do cliente para
 * usar o nome e a fala.
 */
const TESTIMONIALS: Testimonial[] = [
  { key: 'industry', initials: 'IE', accent: 'blue' },
  { key: 'retail', initials: 'VE', accent: 'green' },
  { key: 'services', initials: 'SE', accent: 'yellow' },
]

/** Quanto o texto antigo leva para sumir antes de o novo entrar, em ms. */
const FADE_OUT_MS = 200

/**
 * Depoimentos: uma fala grande em destaque e, embaixo, a fileira de clientes.
 * Ao escolher outro, o texto desfoca e some, troca, e volta — um de cada vez,
 * para a leitura não competir com a animação.
 */
export function TestimonialsSection() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [shownIndex, setShownIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const timeoutRef = useRef<number>(undefined)

  /* A troca fica pendente num timeout: cancela se a pessoa sair da página. */
  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  const select = (index: number) => {
    if (index === activeIndex) {
      return
    }
    setActiveIndex(index)
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setShownIndex(index), FADE_OUT_MS)
  }

  const shown = TESTIMONIALS[shownIndex]
  /* Enquanto o escolhido não é o que está na tela, o texto está sumindo. */
  const isFading = activeIndex !== shownIndex

  return (
    <Section aria-labelledby="depoimentos-titulo">
      <Container>
        <Eyebrow id="depoimentos-titulo">{t('testimonials.eyebrow')}</Eyebrow>

        <QuoteBlock>
          <Quote $isFading={isFading}>{t(`testimonials.items.${shown.key}.quote`)}</Quote>
          <Role $isFading={isFading}>{t(`testimonials.items.${shown.key}.role`)}</Role>
        </QuoteBlock>

        <ClientList aria-label={t('testimonials.label')}>
          {TESTIMONIALS.map(({ key, initials, accent }, index) => {
            const isActive = index === activeIndex
            return (
              <li key={key}>
                <ClientButton
                  type="button"
                  $accent={accent}
                  $isActive={isActive}
                  $showName={isActive || hoveredIndex === index}
                  aria-pressed={isActive}
                  onClick={() => select(index)}
                  onPointerEnter={() => setHoveredIndex(index)}
                  onPointerLeave={() => setHoveredIndex(null)}
                >
                  <Initials $accent={accent} aria-hidden="true">
                    {initials}
                  </Initials>
                  <NameSlot $showName={isActive || hoveredIndex === index}>
                    <Name $isActive={isActive}>{t(`testimonials.items.${key}.company`)}</Name>
                  </NameSlot>
                </ClientButton>
              </li>
            )
          })}
        </ClientList>
      </Container>
    </Section>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const accentColor = (accent: BrandAccent) => `var(--color-${accent})`

const Section = styled.section`
  background-color: var(--color-surface-muted);
  padding: clamp(3.5rem, 7vw, 5.5rem) 0;
`

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0 var(--layout-gutter);
  text-align: center;
`

const Eyebrow = styled.h2`
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: clamp(0.8125rem, 1.2vw, 0.9375rem);
  font-weight: 500;
  letter-spacing: 0.16em;
  margin: 0 0 clamp(1.75rem, 3.5vw, 2.75rem);
  text-transform: uppercase;
`

/*
 * As aspas decorativas ficam nos cantos, bem apagadas: dão a moldura de
 * citação sem disputar com o texto. Ficam fora da leitura por serem enfeite —
 * o <blockquote> já diz que é uma citação.
 */
const QuoteBlock = styled.blockquote`
  margin: 0 0 clamp(2rem, 4vw, 3rem);
  max-width: 34rem;
  position: relative;

  &::before,
  &::after {
    color: color-mix(in srgb, var(--color-text) 12%, transparent);
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 5rem;
    line-height: 1;
    pointer-events: none;
    position: absolute;
    user-select: none;
  }

  &::before {
    content: '\\201C';
    left: -1.5rem;
    top: -1.5rem;
  }

  &::after {
    bottom: -2.75rem;
    content: '\\201D';
    right: -1.5rem;
  }

  @media (max-width: 479px) {
    &::before,
    &::after {
      display: none;
    }
  }
`

/* Some com um leve desfoque e encolhe um tiquinho, como no efeito original. */
const Quote = styled.p<FadingTextProps>`
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: clamp(1.375rem, 1rem + 1.6vw, 2rem);
  font-weight: 500;
  line-height: 1.35;
  margin: 0 0 1.5rem;
  text-wrap: balance;
  transition:
    filter 0.4s ease,
    opacity 0.4s ease,
    transform 0.4s ease;

  ${({ $isFading }) =>
    $isFading
      ? `filter: blur(4px); opacity: 0; transform: scale(0.98);`
      : `filter: blur(0); opacity: 1; transform: scale(1);`}

  @media (prefers-reduced-motion: reduce) {
    filter: none;
    transform: none;
    transition: opacity 0.2s ease;
  }
`

const Role = styled.p<FadingTextProps>`
  color: var(--color-slate);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  margin: 0;
  text-transform: uppercase;
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;

  ${({ $isFading }) =>
    $isFading ? `opacity: 0; transform: translateY(0.5rem);` : `opacity: 1; transform: none;`}

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    transition: opacity 0.2s ease;
  }
`

const ClientList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
`

/**
 * Fechado, o botão é só o círculo com as iniciais. Ao ficar ativo — ou sob o
 * mouse — o nome do cliente desliza para fora, e a pílula cresce junto.
 */
const ClientButton = styled.button<TestimonialButtonProps>`
  align-items: center;
  background-color: ${({ $isActive }) => ($isActive ? 'var(--color-navy)' : 'transparent')};
  border: none;
  border-radius: 999px;
  box-shadow: ${({ $isActive }) =>
    $isActive ? '0 8px 20px color-mix(in srgb, var(--color-navy) 26%, transparent)' : 'none'};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  gap: ${({ $showName }) => ($showName ? '0.625rem' : '0')};
  padding: ${({ $showName }) => ($showName ? '0.375rem 1rem 0.375rem 0.375rem' : '0.1875rem')};
  transition:
    background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    gap 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? 'var(--color-navy)' : 'var(--color-surface)')};
  }

  &:focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

/** Círculo com as iniciais — não há foto, porque não há pessoa real. */
const Initials = styled.span<AccentStyleProps>`
  align-items: center;
  background-color: color-mix(
    in srgb,
    ${({ $accent }) => accentColor($accent)} 14%,
    var(--color-surface)
  );
  border: 2px solid ${({ $accent }) => accentColor($accent)};
  border-radius: 50%;
  color: color-mix(in srgb, ${({ $accent }) => accentColor($accent)} 82%, #000);
  display: inline-flex;
  flex-shrink: 0;
  font-size: 0.75rem;
  font-weight: 700;
  height: 2.25rem;
  justify-content: center;
  width: 2.25rem;
`

/*
 * O nome abre e fecha animando a coluna do grid de 0fr para 1fr: é o que
 * permite a transição suave de uma largura que depende do conteúdo.
 */
const NameSlot = styled.span<ShowNameProps>`
  display: grid;
  grid-template-columns: ${({ $showName }) => ($showName ? '1fr' : '0fr')};
  opacity: ${({ $showName }) => ($showName ? 1 : 0)};
  overflow: hidden;
  transition:
    grid-template-columns 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

/* Sobre a pílula escura do ativo, o nome fica claro; fora dela, escuro. */
const Name = styled.span<ActiveStyleProps>`
  color: ${({ $isActive }) => ($isActive ? 'var(--color-surface)' : 'var(--color-text-strong)')};
  font-size: 0.875rem;
  font-weight: 600;
  overflow: hidden;
  transition: color 0.3s ease;
  white-space: nowrap;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
