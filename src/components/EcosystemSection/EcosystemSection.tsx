import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import appsheetIcon from '../../assets/workspace/appsheet.svg'
import calendarIcon from '../../assets/workspace/calendar.svg'
import chatIcon from '../../assets/workspace/chat.svg'
import docsIcon from '../../assets/workspace/docs.svg'
import driveIcon from '../../assets/workspace/drive.svg'
import formsIcon from '../../assets/workspace/forms.svg'
import geminiIcon from '../../assets/workspace/gemini.png'
import gmailIcon from '../../assets/workspace/gmail.svg'
import keepIcon from '../../assets/workspace/keep.svg'
import meetIcon from '../../assets/workspace/meet.svg'
import sheetsIcon from '../../assets/workspace/sheets.svg'
import sitesIcon from '../../assets/workspace/sites.svg'
import slidesIcon from '../../assets/workspace/slides.svg'
import { CardFrame } from '../CardFrame/CardFrame'
import type { WorkspaceProduct } from '../../types'

/**
 * Produtos do Google Workspace, na ordem do layout. Os ícones são os oficiais
 * atuais, baixados do CDN do próprio Google (os mesmos de workspace.google.com).
 * O do Gemini é um PNG porque o SVG oficial embute uma imagem de 250 KB.
 */
const WORKSPACE_PRODUCTS: WorkspaceProduct[] = [
  { key: 'gmail', icon: gmailIcon },
  { key: 'drive', icon: driveIcon },
  { key: 'calendar', icon: calendarIcon },
  { key: 'meet', icon: meetIcon },
  { key: 'docs', icon: docsIcon },
  { key: 'sheets', icon: sheetsIcon },
  { key: 'slides', icon: slidesIcon },
  { key: 'gemini', icon: geminiIcon },
  { key: 'forms', icon: formsIcon },
  { key: 'keep', icon: keepIcon },
  { key: 'sites', icon: sitesIcon },
  { key: 'appsheet', icon: appsheetIcon },
  { key: 'chat', icon: chatIcon },
]

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
 * "Ecossistema": a faixa cinza de ponta a ponta que corta o card ao meio, e a
 * parte de baixo desse card, com os produtos do Google Workspace.
 */
export function EcosystemSection() {
  const { t } = useTranslation()

  return (
    <Section id="ecossistema" aria-labelledby="ecossistema-titulo">
      <Band>
        <BandContent>
          <Title id="ecossistema-titulo">
            <Trans i18nKey="ecosystem.title" components={{ highlight: <Highlight /> }} />
          </Title>
          <Lead>{t('ecosystem.lead')}</Lead>
        </BandContent>
      </Band>

      <Container>
        <Card $openEdge="top">
          <WorkspaceLogo />
          <Products aria-label={t('ecosystem.workspace.label')}>
            {WORKSPACE_PRODUCTS.map(({ key, icon }) => {
              const name = t(`ecosystem.workspace.products.${key}`)

              return (
                <li key={key}>
                  <ProductIcon src={icon} alt={name} title={name} loading="lazy" />
                </li>
              )
            })}
          </Products>
        </Card>
      </Container>
    </Section>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const Section = styled.section`
  padding: 0 0 clamp(3.5rem, 7vw, 6rem);
`

/*
 * A faixa ocupa a largura toda da página. A parte de cima do card (no "Sobre
 * nós") termina encostada nela, e a de baixo recomeça logo depois — por isso as
 * bordas laterais parecem atravessar a faixa.
 */
const Band = styled.div`
  background-color: var(--color-surface-band);
  padding: clamp(2.5rem, 5.8vw, 4.75rem) var(--layout-gutter);
`

/* Largura do container: no desktop, o título cabe numa linha só, como no layout. */
const BandContent = styled.div`
  margin: 0 auto;
  max-width: var(--layout-max-width);
  text-align: center;
`

/* Mesma escala dos outros títulos do layout (Qurova 600). */
const Title = styled.h2`
  color: var(--color-text);
  font-size: clamp(1.75rem, 3.57vw, 3.25rem);
  font-weight: 600;
  line-height: 1.23;
  margin: 0 0 clamp(1rem, 2.2vw, 1.75rem);
  text-wrap: balance;
`

const Highlight = styled.span`
  color: var(--color-blue);
`

const Lead = styled.p`
  font-size: clamp(1.0625rem, 1.99vw, 1.625rem);
  line-height: 1.4;
  margin: 0 auto;
  max-width: 34em;
  text-wrap: balance;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0 var(--layout-gutter);
`

const Card = styled(CardFrame)`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2.25rem);
  padding: clamp(2rem, 5.3vw, 4.25rem) clamp(1rem, 4vw, 3rem) clamp(2rem, 4.2vw, 3.5rem);
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

/**
 * Fileira de ícones centralizada. No celular ela quebra em duas linhas; os
 * mínimos de tamanho e espaço foram escolhidos para caberem 7 ícones por linha
 * a partir de 360px (7 + 6), sem deixar um ícone órfão numa terceira linha.
 */
const Products = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.625rem, 2.4vw, 1.75rem);
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
`

const ProductIcon = styled.img`
  display: block;
  height: clamp(1.875rem, 3.6vw, 2.875rem);
  width: clamp(1.875rem, 3.6vw, 2.875rem);
`
