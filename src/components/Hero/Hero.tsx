import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { HeroRings } from '../HeroRings/HeroRings'
import { CtaButton } from '../21stdev/CtaButton/CtaButton'
import { above, below, DESKTOP, TABLET } from '../../styles/breakpoints'

export function Hero() {
  const { t } = useTranslation()

  return (
    <Section id="inicio">
      <Container>
        <Title>
          <Trans i18nKey="hero.title" components={{ highlight: <Highlight /> }} />
        </Title>

        <Description>
          <Trans i18nKey="hero.description" components={{ strong: <strong /> }} />
        </Description>

        <Lead>{t('hero.lead')}</Lead>

        <CtaButton href="#contato">{t('hero.cta')}</CtaButton>
      </Container>

      <Artwork>
        <HeroRings />
      </Artwork>
    </Section>
  )
}

/** Proporções medidas no layout aprovado, relativas a --ring-size. */
const RING_BLEED = 0.062
const CARD_LINE = 0.89
const TITLE_OFFSET = 0.105

/**
 * Onde o anel começa, em fração da largura do container. É isso que impede o
 * anel de alcançar o título entre ~980px e ~1700px, como acontecia quando ele
 * crescia com a largura da tela (vw).
 */
const RING_START = 0.6

const Section = styled.section`
  --ring-size: min(100vw, 32rem);
  --ring-top: 1rem;

  padding-top: 2.5rem;
  position: relative;
  z-index: 1;

  @media ${below(TABLET)} {
    padding-bottom: 3rem;
  }

  @media ${above(DESKTOP)} {
    --ring-size: min(
      56rem,
      calc(
        (
            100vw - var(--layout-gutter) - max(0px, (100vw - var(--layout-max-width)) / 2) -
              ${RING_START} *
              min(
                100vw - var(--layout-gutter) * 2,
                var(--layout-max-width) - var(--layout-gutter) * 2
              )
          ) /
          ${1 - RING_BLEED}
      )
    );

    min-height: calc(var(--ring-top) + var(--ring-size) * ${CARD_LINE});
    padding-top: calc(var(--ring-top) + var(--ring-size) * ${TITLE_OFFSET});
  }
`

const Container = styled.div`
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0 var(--layout-gutter);
  position: relative;
  z-index: 1;
`

const Title = styled.h1`
  color: var(--color-text);
  font-size: clamp(2rem, 3.57vw, 3.25rem);
  font-weight: 600;
  line-height: 1.23;
  margin: 0 0 clamp(1.25rem, 2.6vw, 2.25rem);
  max-width: 15.5em;
  text-wrap: balance;
`

const Highlight = styled.span`
  color: var(--color-blue);
`

const Description = styled.p`
  font-size: clamp(1.0625rem, 1.99vw, 1.625rem);
  line-height: 1.4;
  margin: 0 0 clamp(1.25rem, 2.5vw, 2rem);
  max-width: 21.5em;

  strong {
    font-weight: 600;
  }
`

const Lead = styled.p`
  font-size: clamp(1.0625rem, 1.99vw, 1.625rem);
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 clamp(1.5rem, 3vw, 2.5rem);
`

const Artwork = styled.div`
  margin: 2.5rem calc(var(--ring-size) * -${RING_BLEED}) calc(var(--ring-size) * (${CARD_LINE} - 1))
    auto;
  pointer-events: none;
  width: var(--ring-size);

  @media ${below(TABLET)} {
    display: none;
  }

  @media ${above(DESKTOP)} {
    margin: 0;
    position: absolute;
    right: calc(var(--ring-size) * -${RING_BLEED});
    top: var(--ring-top);
  }
`
