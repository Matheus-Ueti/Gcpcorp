import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import logoGcpcorp from '../../assets/logo-gcpcorp.svg'
import { CardFrame } from '../CardFrame/CardFrame'
import { AnalysisIcon, TechnologyIcon, UsersIcon } from '../icons/Icons'
import { PartnerBadge } from '../PartnerBadge/PartnerBadge'
import { above, below, PILLAR_COLUMNS } from '../../styles/breakpoints'
import { accentColor } from '../../utils/style'
import type { PillarStyleProps } from '../../types'

const PILLARS = [
  { key: 'analysis', Icon: AnalysisIcon, accent: 'blue' },
  { key: 'technology', Icon: TechnologyIcon, accent: 'green' },
  { key: 'proximity', Icon: UsersIcon, accent: 'yellow' },
] as const

const LOCKUP_HEIGHT = 'clamp(1.625rem, 3.3vw, 2.625rem)'

const PILLAR_GAP = 'clamp(1rem, 2vw, 1.5rem)'

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

const Section = styled.section`
  padding: 0;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0 var(--layout-gutter);
`

const Card = styled(CardFrame)`
  padding: clamp(1.25rem, 5.5vw, 4.5rem);
`

const Lockup = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.75rem, 1.3vw, 1rem);
  margin-bottom: clamp(1.5rem, 3.2vw, 2.5rem);
`

const Logo = styled.img`
  display: block;
  height: ${LOCKUP_HEIGHT};
  width: auto;
`

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

  @media ${above(PILLAR_COLUMNS)} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const Pillar = styled.li`
  @media ${below(PILLAR_COLUMNS)} {
    column-gap: 1rem;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
  }
`

const PillarHead = styled.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;

  @media ${below(PILLAR_COLUMNS)} {
    display: contents;
  }
`

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

  @media ${below(PILLAR_COLUMNS)} {
    grid-row: span 2;
  }
`

const PillarTitle = styled.h3`
  color: var(--color-text);
  font-size: clamp(1.125rem, 1.9vw, 1.5rem);
  font-weight: 500;
  line-height: 1.25;
  margin: 0;
  white-space: nowrap;

  @media ${below(PILLAR_COLUMNS)} {
    align-self: end;
  }
`

const Connector = styled.span<PillarStyleProps>`
  display: none;

  @media ${above(PILLAR_COLUMNS)} {
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

const PillarText = styled.p`
  font-size: clamp(0.9375rem, 1.3vw, 1.0625rem);
  line-height: 1.45;
  margin: 0.875rem 0 0;
  max-width: 12em;
  text-wrap: balance;

  @media ${below(PILLAR_COLUMNS)} {
    margin-top: 0.25rem;
    max-width: 24rem;
  }
`

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
