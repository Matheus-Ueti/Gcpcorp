import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CardFrame } from '../CardFrame/CardFrame'
import { CtaButton } from '../21stdev/CtaButton/CtaButton'
import { SolutionsOrbit } from '../21stdev/SolutionsOrbit/SolutionsOrbit'
import { WorkspaceApps } from '../WorkspaceApps/WorkspaceApps'

/**
 * Logotipo oficial "Google Workspace". Como o selo Partner, o arquivo vem de
 * fora: basta salvar o SVG oficial em `public/google-workspace.svg`. Até lá,
 * o nome aparece em texto — nunca um logotipo montado à mão, que as diretrizes
 * de marca do Google proíbem.
 */
const WORKSPACE_LOGO_SRC = '/google-workspace.svg'

function WorkspaceLogo() {
  const [isAvailable, setIsAvailable] = useState(true)

  if (!isAvailable) {
    return <LogoFallback>Google Workspace</LogoFallback>
  }

  return (
    <LogoImage
      src={WORKSPACE_LOGO_SRC}
      alt="Google Workspace"
      onError={() => setIsAvailable(false)}
    />
  )
}

/**
 * "Nossas soluções": a proposta do ecossistema à esquerda e a órbita de
 * soluções em volta do símbolo da marca à direita; abaixo, os produtos do
 * Google Workspace.
 */
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
          <WorkspaceLogo />
          <WorkspaceApps />
        </WorkspaceCard>
      </Container>
    </Section>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const Section = styled.section`
  padding: clamp(4rem, 8vw, 6.5rem) 0 clamp(3.5rem, 7vw, 6rem);
`

const Container = styled.div`
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0 var(--layout-gutter);
`

/*
 * No desktop a coluna de texto fica um pouco mais larga: o título precisa de
 * ~570px para quebrar em duas linhas, como no layout.
 */
const Intro = styled.div`
  align-items: center;
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: 960px) {
    gap: 2rem;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  }
`

/* O rótulo acima do título, em caixa alta, como no layout. */
const Eyebrow = styled.p`
  color: var(--color-text);
  font-size: clamp(0.875rem, 1.45vw, 1.1875rem);
  font-weight: 500;
  letter-spacing: 0.04em;
  margin: 0 0 clamp(1.25rem, 2.6vw, 2rem);
  text-transform: uppercase;
`

/*
 * Mesma escala dos outros títulos (Qurova 600). A largura em em faz a quebra
 * cair depois de "Tudo", como no layout.
 */
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

/* Medida que reproduz as quatro linhas do layout ("reunimos" / "que" / "produtividade,"). */
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
  /* Embaixo, espaço de sobra para o balão com o nome do aplicativo não cruzar a borda. */
  padding: clamp(2rem, 5.3vw, 4.25rem) clamp(1rem, 4vw, 3rem) clamp(3.25rem, 4.6vw, 3.75rem);
`

const LogoImage = styled.img`
  display: block;
  height: clamp(1.75rem, 3.6vw, 2.875rem);
  width: auto;
`

const LogoFallback = styled.p`
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 500;
  margin: 0;
`
