import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import type {
  AccentStyleProps,
  ActiveStyleProps,
  BrandAccent,
  JourneyShowcaseProps,
} from '../../types'

/**
 * Painel da jornada "Da migração à IA": um card por etapa, com a foto da
 * etapa ao fundo, empilhados — só o da etapa em foco aparece.
 *
 * Quem decide a etapa em foco (e onde o painel fica fixo) é `SolutionsGrid`;
 * aqui fica só a aparência. O painel repete o conteúdo das etapas de forma
 * visual, por isso quem o usa deve escondê-lo dos leitores de tela.
 */
export function JourneyShowcase({ stages, activeIndex }: JourneyShowcaseProps) {
  const { t } = useTranslation()

  return (
    <Showcase>
      {stages.map(({ key, products, Icon, accent, image }, index) => (
        <Slide key={key} $isActive={index === activeIndex}>
          <SlideImage src={image} alt="" loading="lazy" decoding="async" />
          <SlideStep>
            {t('solutions.stepOf', { number: index + 1, total: stages.length })}
          </SlideStep>
          <SlideHead>
            <SlideIcon $accent={accent}>
              <Icon />
            </SlideIcon>
            <SlideTitle>{t(`solutions.stages.${key}.title`)}</SlideTitle>
          </SlideHead>
          <SlideProducts>
            {products.map((product) => (
              <li key={product}>{product}</li>
            ))}
          </SlideProducts>
        </Slide>
      ))}

      <Progress>
        {stages.map(({ key, accent }, index) => (
          <ProgressDot
            key={key}
            $accent={accent}
            $isActive={index === activeIndex}
            data-reached={index <= activeIndex}
          />
        ))}
      </Progress>
    </Showcase>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const accentColor = (accent: BrandAccent) => `var(--color-${accent})`

/*
 * Centralizado na tela, onde fica a linha de leitura de `SolutionsGrid`. O
 * mínimo de 9rem mantém o painel abaixo do cabeçalho fixo, que quebra em duas
 * linhas abaixo de ~1200px.
 */
const Showcase = styled.div`
  --showcase-height: clamp(24rem, 62vh, 31rem);
  background-color: var(--color-navy);
  border-radius: 1.5rem;
  box-shadow: 0 24px 48px color-mix(in srgb, var(--color-navy) 28%, transparent);
  display: grid;
  min-height: var(--showcase-height);
  overflow: hidden;
  position: sticky;
  top: max(9rem, calc(50vh - var(--showcase-height) / 2));
`

/*
 * Os cards ficam na mesma célula do grid (o painel fica com a altura do maior)
 * e trocam com crossfade. A foto fica ao fundo, e um degradê azul-marinho
 * (a cor do logo) sobe da base para o texto ficar legível sobre qualquer foto.
 */
const Slide = styled.div<ActiveStyleProps>`
  display: flex;
  flex-direction: column;
  grid-area: 1 / 1;
  isolation: isolate;
  justify-content: flex-end;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  padding: 2.25rem 2.25rem 4.25rem;
  position: relative;
  transform: translateY(${({ $isActive }) => ($isActive ? '0' : '12px')});
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;

  &::before {
    background: linear-gradient(
      to top,
      var(--color-navy) 22%,
      color-mix(in srgb, var(--color-navy) 70%, transparent) 55%,
      color-mix(in srgb, var(--color-navy) 5%, transparent)
    );
    content: '';
    inset: 0;
    position: absolute;
    z-index: -1;
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    transition: none;
  }
`

const SlideImage = styled.img`
  height: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
  width: 100%;
  z-index: -2;
`

const SlideStep = styled.p`
  color: color-mix(in srgb, var(--color-surface) 75%, transparent);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  margin: 0 0 1rem;
  text-transform: uppercase;
`

const SlideHead = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
  margin-bottom: 1.25rem;
`

const SlideIcon = styled.span<AccentStyleProps>`
  align-items: center;
  background-color: color-mix(in srgb, var(--color-navy) 60%, transparent);
  border: 2px solid ${({ $accent }) => accentColor($accent)};
  border-radius: 50%;
  color: ${({ $accent }) => accentColor($accent)};
  display: inline-flex;
  flex-shrink: 0;
  height: 3.5rem;
  justify-content: center;
  width: 3.5rem;

  svg {
    height: 50%;
    width: 50%;
  }
`

const SlideTitle = styled.p`
  color: var(--color-surface);
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 2.6vw, 2.25rem);
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
`

const SlideProducts = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    backdrop-filter: blur(6px);
    background-color: color-mix(in srgb, var(--color-surface) 12%, transparent);
    border: 1px solid color-mix(in srgb, var(--color-surface) 25%, transparent);
    border-radius: 999px;
    color: var(--color-surface);
    font-size: 0.8125rem;
    font-weight: 600;
    padding: 0.3125rem 0.75rem;
    white-space: nowrap;
  }
`

/** Pontos de progresso: etapas já percorridas acesas, a atual maior e na cor dela. */
const Progress = styled.div`
  align-items: center;
  bottom: 1.75rem;
  display: flex;
  gap: 0.625rem;
  left: 2.25rem;
  position: absolute;
`

const ProgressDot = styled.span<AccentStyleProps & ActiveStyleProps>`
  background-color: color-mix(in srgb, var(--color-surface) 25%, transparent);
  border-radius: 999px;
  height: 0.5rem;
  transition:
    background-color 0.35s ease,
    width 0.35s ease;
  width: ${({ $isActive }) => ($isActive ? '1.75rem' : '0.5rem')};

  &[data-reached='true'] {
    background-color: ${({ $accent }) => accentColor($accent)};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
