import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { HeroRings } from '../HeroRings/HeroRings'

/**
 * Seção de abertura do site: proposta de valor à esquerda e o "Elemento Hero"
 * animado à direita.
 */
export function Hero() {
  const { t } = useTranslation()

  return (
    <Section id="inicio">
      <Container>
        <Content>
          <Title>
            <Trans i18nKey="hero.title" components={{ highlight: <Highlight /> }} />
          </Title>

          <Description>
            <Trans i18nKey="hero.description" components={{ strong: <strong /> }} />
          </Description>

          <Lead>{t('hero.lead')}</Lead>

          <CallToAction href="#contato">{t('hero.cta')}</CallToAction>
        </Content>

        <Artwork>
          <HeroRings />
        </Artwork>
      </Container>
    </Section>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const Section = styled.section`
  padding: 4rem 0;
`

const Container = styled.div`
  display: grid;
  align-items: center;
  gap: 3rem;
  grid-template-columns: 1fr;
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0 var(--layout-gutter);

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`

const Content = styled.div`
  max-width: 34rem;
`

const Title = styled.h1`
  color: var(--color-text-strong);
  font-size: clamp(2rem, 1.2rem + 3.2vw, 3.25rem);
  font-weight: 700;
  line-height: 1.15;
  margin: 0 0 1.75rem;
`

const Highlight = styled.span`
  color: var(--color-blue);
`

const Description = styled.p`
  font-size: clamp(1rem, 0.94rem + 0.3vw, 1.25rem);
  margin: 0 0 1.75rem;

  strong {
    color: var(--color-text-strong);
    font-weight: 700;
  }
`

const Lead = styled.p`
  color: var(--color-text-strong);
  font-size: clamp(1rem, 0.94rem + 0.3vw, 1.25rem);
  font-weight: 700;
  margin: 0 0 2rem;
`

const CallToAction = styled.a`
  background-color: var(--color-cta-background);
  border-radius: 999px;
  color: var(--color-cta-text);
  display: inline-block;
  font-size: 1.0625rem;
  font-weight: 700;
  padding: 1rem 2rem;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: var(--color-cta-background-hover);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`

const Artwork = styled.div`
  justify-self: center;
  max-width: 34rem;
  width: 100%;
`
