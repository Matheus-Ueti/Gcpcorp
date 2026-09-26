import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import logoGcpcorp from '../../assets/logo-gcpcorp.svg'
import { CardFrame } from '../CardFrame/CardFrame'
import { AnalysisIcon, TechnologyIcon, UsersIcon } from '../icons/Icons'
import { PartnerBadge } from '../PartnerBadge/PartnerBadge'
import type { BrandAccent, PillarStyleProps } from '../../types'

/**
 * Os três pilares da forma de trabalho, na ordem do layout. Cada um tem uma cor
 * da marca, e a linha entre dois pilares passa de uma cor para a outra.
 */
const PILLARS = [
  { key: 'analysis', Icon: AnalysisIcon, accent: 'blue' },
  { key: 'technology', Icon: TechnologyIcon, accent: 'green' },
  { key: 'proximity', Icon: UsersIcon, accent: 'yellow' },
] as const

/**
 * Altura do logo e do selo Partner, que ficam lado a lado no topo do card. O
 * mínimo é o que ainda cabe numa linha só dentro do card num celular de 360px.
 */
const LOCKUP_HEIGHT = 'clamp(1.625rem, 3.3vw, 2.625rem)'

/** Espaço entre as colunas dos pilares — a linha de ligação atravessa ele. */
const PILLAR_GAP = 'clamp(1rem, 2vw, 1.5rem)'

/**
 * "Sobre nós": quem é a GCP Corp e como trabalha.
 *
 * O card começa exatamente onde o hero termina: o anel do hero vaza por cima
 * do fio superior dele, costurando as duas seções numa composição só.
 */
export function AboutSection() {
  const { t } = useTranslation()

  return (
    <Section id="sobre" aria-labelledby="sobre-titulo">
      <Container>
        <Card>
          <Lockup>
            <Logo src={logoGcpcorp} alt={t('brand.logoAlt')} />
            <PartnerBadge height={LOCKUP_HEIGHT} />
          </Lockup>

          <Title id="sobre-titulo">
            <Trans i18nKey="about.title" components={{ highlight: <Highlight /> }} />
          </Title>

          <Body>
            <p>
              <Trans i18nKey="about.paragraphs.intro" components={{ strong: <strong /> }} />
            </p>
            <p>
              <Trans i18nKey="about.paragraphs.approach" components={{ strong: <strong /> }} />
            </p>
          </Body>

          <Pillars>
            {PILLARS.map(({ key, Icon, accent }, index) => {
              const nextAccent = PILLARS[index + 1]?.accent

              return (
                <Pillar key={key}>
                  <PillarHead>
                    <PillarIcon $accent={accent}>
                      <Icon />
                    </PillarIcon>
                    <PillarTitle>{t(`about.pillars.${key}.title`)}</PillarTitle>
                    {nextAccent && (
                      <Connector $accent={accent} $nextAccent={nextAccent} aria-hidden="true" />
                    )}
                  </PillarHead>
                  <PillarText>{t(`about.pillars.${key}.description`)}</PillarText>
                </Pillar>
              )
            })}
          </Pillars>

          <Closing>
            <span>
              <Trans i18nKey="about.closing.lead" components={{ strong: <strong /> }} />
            </span>
            <span>{t('about.closing.text')}</span>
          </Closing>
        </Card>
      </Container>
    </Section>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const accentColor = (accent: BrandAccent) => `var(--color-${accent})`

/* Sem respiro no topo: o card encosta no hero para o anel cruzar o fio. */
const Section = styled.section`
  padding: 0;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0 var(--layout-gutter);
`

const Card = styled(CardFrame)`
  padding: clamp(1.75rem, 5.5vw, 4.5rem);
`

const Lockup = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.75rem, 1.3vw, 1rem);
  margin-bottom: clamp(1.5rem, 3.2vw, 2.5rem);
`

/** O SVG do logo já vem recortado na caixa do desenho: altura = altura visível. */
const Logo = styled.img`
  display: block;
  height: ${LOCKUP_HEIGHT};
  width: auto;
`

/*
 * Mesma escala do hero: no layout, título e texto do card têm os mesmos
 * tamanhos. Em Qurova 600 o título cabe numa linha só na largura do card.
 */
const Title = styled.h2`
  color: var(--color-text);
  font-size: clamp(1.75rem, 3.57vw, 3.25rem);
  font-weight: 600;
  line-height: 1.23;
  margin: 0 0 clamp(1.25rem, 2.6vw, 2.25rem);
  text-wrap: balance;
`

const Highlight = styled.span`
  color: var(--color-blue);
`

const Body = styled.div`
  font-size: clamp(1.0625rem, 1.99vw, 1.625rem);
  line-height: 1.4;
  /* A medida de texto do layout: as linhas quebram nas mesmas palavras. */
  max-width: 35.3em;

  p {
    margin: 0 0 0.75rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  strong {
    font-weight: 600;
  }
`

const Pillars = styled.ul`
  display: grid;
  gap: 2rem ${PILLAR_GAP};
  grid-template-columns: 1fr;
  list-style: none;
  margin: clamp(2rem, 4.6vw, 3.75rem) 0 0;
  padding: 0;

  @media (min-width: 860px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const Pillar = styled.li``

const PillarHead = styled.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
`

/**
 * Anel na cor do pilar e ícone num tom um pouco mais fundo da mesma cor — no
 * amarelo, isso é o que mantém o traço fino visível sobre o branco.
 */
const PillarIcon = styled.span<PillarStyleProps>`
  align-items: center;
  background-color: color-mix(
    in srgb,
    ${({ $accent }) => accentColor($accent)} 8%,
    var(--color-surface)
  );
  border: 2px solid ${({ $accent }) => accentColor($accent)};
  border-radius: 50%;
  color: color-mix(in srgb, ${({ $accent }) => accentColor($accent)} 82%, #000);
  display: inline-flex;
  flex-shrink: 0;
  height: clamp(3rem, 4.9vw, 4rem);
  justify-content: center;
  width: clamp(3rem, 4.9vw, 4rem);

  svg {
    height: 48%;
    width: 48%;
  }
`

const PillarTitle = styled.h3`
  color: var(--color-text);
  font-size: clamp(1.125rem, 1.9vw, 1.5rem);
  font-weight: 500;
  line-height: 1.25;
  margin: 0;
  white-space: nowrap;
`

/**
 * Linha que liga um pilar ao seguinte: nasce depois do título, atravessa o
 * espaço entre as colunas (margem negativa) e encosta no ícone do próximo,
 * passando da cor de um para a do outro. Só existe com os pilares lado a lado.
 */
const Connector = styled.span<PillarStyleProps>`
  display: none;

  @media (min-width: 860px) {
    background: linear-gradient(
      to right,
      ${({ $accent }) => accentColor($accent)},
      ${({ $nextAccent }) => ($nextAccent ? accentColor($nextAccent) : 'transparent')}
    );
    display: block;
    flex: 1;
    height: 2px;
    margin-right: calc(-1 * ${PILLAR_GAP});
    min-width: 1.5rem;
  }
`

/* Medida curta e linhas equilibradas: quebra como no layout ("antes de pensar / na solução."). */
const PillarText = styled.p`
  font-size: clamp(0.9375rem, 1.3vw, 1.0625rem);
  line-height: 1.45;
  margin: 0.875rem 0 0;
  max-width: 12em;
  text-wrap: balance;
`

/** Fecho do card: duas linhas, a primeira com a frase em destaque. */
const Closing = styled.p`
  font-size: clamp(1.0625rem, 1.99vw, 1.625rem);
  line-height: 1.4;
  margin: clamp(2rem, 3.6vw, 3rem) 0 0;

  span {
    display: block;
  }

  strong {
    color: var(--color-text-strong);
    font-weight: 600;
  }
`
