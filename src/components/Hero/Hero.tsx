import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { HeroRings } from '../HeroRings/HeroRings'
import { OriginLink } from '../OriginLink/OriginLink'

/**
 * Seção de abertura do site: proposta de valor à esquerda e o "Elemento Hero"
 * animado à direita, grande o bastante para vazar pela borda da página e por
 * cima do card da seção seguinte.
 */
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

        <CallToAction href="#contato">{t('hero.cta')}</CallToAction>
      </Container>

      <Artwork>
        <HeroRings />
      </Artwork>
    </Section>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

/*
 * Proporções medidas no layout aprovado, todas relativas ao tamanho do anel:
 * - RING_BLEED: quanto do anel passa da borda direita da página.
 * - CARD_LINE: altura (a partir do topo do anel) em que o fio do card
 *   seguinte cruza o anel — o que sobra abaixo disso é a parte que vaza.
 * - TITLE_OFFSET: onde o título começa em relação ao topo do anel.
 * Como tudo deriva de --ring-size, a composição é a mesma em qualquer largura.
 */
const RING_BLEED = 0.062
const CARD_LINE = 0.89
const TITLE_OFFSET = 0.105

const Section = styled.section`
  /* Mobile: o anel entra depois do texto, na largura da tela. */
  --ring-size: min(100vw, 32rem);
  --ring-top: 1rem;

  padding-top: 2.5rem;
  /* Acima da seção seguinte, para o anel vazar por cima do card "Sobre". */
  position: relative;
  z-index: 1;

  @media (min-width: 960px) {
    /* 61,4% da largura da página, como no layout — com teto para telas largas. */
    --ring-size: clamp(34rem, 61.4vw, 56rem);

    min-height: calc(var(--ring-top) + var(--ring-size) * ${CARD_LINE});
    padding-top: calc(var(--ring-top) + var(--ring-size) * ${TITLE_OFFSET});
  }
`

const Container = styled.div`
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0 var(--layout-gutter);
  /* O texto fica por cima quando algum arco do anel passa por trás dele. */
  position: relative;
  z-index: 1;
`

/*
 * Tamanhos calibrados medindo o layout aprovado no navegador: a 1280px de
 * largura, título em Qurova 600 a ~45,7px, texto em Poppins a ~25,5px e botão
 * em Qurova 700 a 24px. Os coeficientes em vw reproduzem essas medidas.
 */
const Title = styled.h1`
  color: var(--color-text);
  font-size: clamp(2rem, 3.57vw, 3.25rem);
  font-weight: 600;
  line-height: 1.23;
  margin: 0 0 clamp(1.25rem, 2.6vw, 2.25rem);
  /*
   * Largura em em, para acompanhar a fonte: cabe "vantagem para o seu negócio"
   * mas não "Transforme tecnologia em vantagem", então o título quebra em duas
   * linhas logo depois de "em", como no layout — tanto na Qurova quanto na
   * Quicksand substituta (medido nas duas).
   */
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
  /* Quebra nas mesmas quatro linhas do layout ("dados," / "para" / "mais"). */
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

/**
 * Amarelo com a borda inferior mais escura (sombra interna) e um brilho no
 * topo: o leve relevo de botão pressionável do layout.
 *
 * No hover, o OriginLink derrama o azul-marinho da marca a partir do ponto
 * onde o mouse entrou; o texto branco fica ainda mais legível sobre ele. No
 * clique, o botão afunda levemente, como no componente original.
 */
const CallToAction = styled(OriginLink)`
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

/**
 * Mobile: o anel entra depois do texto, encostado à direita, sangrando pela
 * borda da tela e por cima do card seguinte (margem inferior negativa).
 *
 * Desktop: sai do fluxo e fica ancorado à borda direita da página — é isso que
 * o faz vazar para fora em qualquer largura, como no layout. A sobra lateral é
 * cortada pelo overflow-x do <main>.
 */
const Artwork = styled.div`
  margin: 2.5rem calc(var(--ring-size) * -${RING_BLEED}) calc(var(--ring-size) * (${CARD_LINE} - 1))
    auto;
  pointer-events: none;
  width: var(--ring-size);

  @media (min-width: 960px) {
    margin: 0;
    position: absolute;
    right: calc(var(--ring-size) * -${RING_BLEED});
    top: var(--ring-top);
  }
`
