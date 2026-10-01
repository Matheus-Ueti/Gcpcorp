import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CardFrame } from '../CardFrame/CardFrame'
import { CtaButton } from '../21stdev/CtaButton/CtaButton'
import { SolutionsOrbit } from '../21stdev/SolutionsOrbit/SolutionsOrbit'
import { WorkspaceApps } from '../WorkspaceApps/WorkspaceApps'
import { above, DESKTOP } from '../../styles/breakpoints'
import type { BrandLogoProps, BrandLogoStyleProps } from '../../types'

/**
 * Logotipos oficiais: salve os SVGs em `public/`. Até lá, o nome aparece em
 * texto — as diretrizes do Google proíbem logo montado à mão.
 */
const BRAND_LOGOS = {
  workspace: { src: '/google-workspace.svg', label: 'Google Workspace' },
  gemini: { src: '/gemini.svg', label: 'Gemini' },
  cloud: { src: '/google-cloud.svg', label: 'Google Cloud' },
} as const

function BrandLogo({ src, label, size = 'lg' }: BrandLogoProps) {
  const [isAvailable, setIsAvailable] = useState(true)

  if (!isAvailable) {
    return <LogoFallback $size={size}>{label}</LogoFallback>
  }

  return (
    <LogoImage
      $size={size}
      src={src}
      alt={label}
      onError={() => setIsAvailable(false)}
    />
  )
}

export function EcosystemSection() {
  const { t } = useTranslation()

  return (
    <Section id="ecossistema" aria-labelledby="ecossistema-titulo">
      <Container>
        <Intro>
          <div>
            <Eyebrow>{t('ecosystem.eyebrow')}</Eyebrow>
            <Title id="ecossistema-titulo">
              <Trans i18nKey="ecosystem.title" components={{ highlight: <Highlight /> }} />
            </Title>
            <Lead>{t('ecosystem.lead')}</Lead>
            <Action>
              <CtaButton href="#contato">{t('ecosystem.cta')}</CtaButton>
            </Action>
          </div>

          <SolutionsOrbit />
        </Intro>

        <WorkspaceCard>
          <BrandLogo {...BRAND_LOGOS.workspace} />
          <WorkspaceApps />

          <BrandRow>
            <BrandLogo {...BRAND_LOGOS.gemini} size="md" />
            <BrandLogo {...BRAND_LOGOS.cloud} size="md" />
          </BrandRow>
        </WorkspaceCard>
      </Container>
    </Section>
  )
}

const Section = styled.section`
  padding: clamp(4rem, 8vw, 6.5rem) 0 clamp(3.5rem, 7vw, 6rem);
`

const Container = styled.div`
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0 var(--layout-gutter);
`

const Intro = styled.div`
  align-items: center;
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
  grid-template-columns: minmax(0, 1fr);

  @media ${above(DESKTOP)} {
    gap: 2rem;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  }
`

const Eyebrow = styled.p`
  color: var(--color-text);
  font-size: clamp(0.875rem, 1.45vw, 1.1875rem);
  font-weight: 500;
  letter-spacing: 0.04em;
  margin: 0 0 clamp(1.25rem, 2.6vw, 2rem);
  text-transform: uppercase;
`

const Title = styled.h2`
  color: var(--color-text);
  font-size: clamp(1.75rem, 3.57vw, 3.25rem);
  font-weight: 600;
  line-height: 1.23;
  margin: 0 0 clamp(1.25rem, 2.6vw, 2rem);
  max-width: 13.5em;
`

const Highlight = styled.span`
  color: var(--color-blue);
`

const Lead = styled.p`
  font-size: clamp(1.0625rem, 1.99vw, 1.625rem);
  line-height: 1.4;
  margin: 0;
  max-width: 21.75em;
`

const Action = styled.div`
  margin-top: clamp(2rem, 6.5vw, 5.25rem);
`

const WorkspaceCard = styled(CardFrame)`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2.25rem);
  margin-top: clamp(3.5rem, 7vw, 6rem);
  padding: clamp(2rem, 5.3vw, 4.25rem) clamp(1rem, 4vw, 3rem) clamp(3.25rem, 4.6vw, 3.75rem);
`

/* Gemini e Google Cloud ficam isolados abaixo da fileira do Workspace. */
const BrandRow = styled.div`
  align-items: center;
  column-gap: clamp(2rem, 6vw, 4.5rem);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: clamp(1rem, 2.4vw, 2rem);
  row-gap: clamp(1.25rem, 2.4vw, 1.75rem);
`

const LogoImage = styled.img<BrandLogoStyleProps>`
  display: block;
  height: ${({ $size }) =>
    $size === 'md' ? 'clamp(1.5rem, 2.9vw, 2.25rem)' : 'clamp(1.75rem, 3.6vw, 2.875rem)'};
  width: auto;
`

const LogoFallback = styled.p<BrandLogoStyleProps>`
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: ${({ $size }) =>
    $size === 'md' ? 'clamp(1.25rem, 2.4vw, 1.75rem)' : 'clamp(1.5rem, 3vw, 2.25rem)'};
  font-weight: 500;
  margin: 0;
`
