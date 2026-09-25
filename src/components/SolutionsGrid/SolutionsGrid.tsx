import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ChartIcon, CloudIcon, ShieldIcon, SparkIcon } from '../icons/Icons'
import type { BrandAccent, IconComponent, SolutionMarkerProps } from '../../types'

interface JourneyStageMeta {
  key: string
  products: string[]
  Icon: IconComponent
  accent: BrandAccent
}

/**
 * As três etapas são uma sequência real: só há dado confiável depois que a
 * infraestrutura migra, e só há IA útil depois que o dado está organizado. Por
 * isso a seção é lida como percurso, e não como quatro serviços equivalentes.
 *
 * Segurança e suporte ficam fora da sequência de propósito: acontecem durante
 * todas as etapas, e a seção mostra isso como faixa contínua abaixo delas.
 */
const JOURNEY_STAGES: JourneyStageMeta[] = [
  {
    key: 'migrate',
    products: ['Compute Engine', 'Google Kubernetes Engine', 'Cloud Storage'],
    Icon: CloudIcon,
    accent: 'blue',
  },
  {
    key: 'organizeData',
    products: ['BigQuery', 'Dataflow', 'Looker'],
    Icon: ChartIcon,
    accent: 'green',
  },
  {
    key: 'applyAi',
    products: ['Vertex AI', 'Gemini', 'Document AI'],
    Icon: SparkIcon,
    accent: 'yellow',
  },
]

const CONTINUOUS_STAGE: JourneyStageMeta = {
  key: 'continuous',
  products: ['Security Command Center', 'Cloud IAM', 'Cloud Monitoring'],
  Icon: ShieldIcon,
  accent: 'red',
}

/** Seção de soluções, apresentada como a jornada de nuvem que a GCP Corp conduz. */
export function SolutionsGrid() {
  const { t } = useTranslation()

  return (
    <Section id="solucoes">
      <Container>
        <Intro>
          <Title>
            <Trans i18nKey="solutions.title" components={{ highlight: <Highlight /> }} />
          </Title>
          <Lead>{t('solutions.lead')}</Lead>
        </Intro>

        <Journey>
          {JOURNEY_STAGES.map(({ key, products, Icon, accent }, index) => (
            <Stage key={key}>
              <StageHead>
                <Marker $accent={accent}>
                  <Icon width={20} height={20} />
                </Marker>
                <StageStep>{t('solutions.step', { number: index + 1 })}</StageStep>
              </StageHead>
              <StageTitle>{t(`solutions.stages.${key}.title`)}</StageTitle>
              <StageText>{t(`solutions.stages.${key}.description`)}</StageText>
              <ProductList>
                {products.map((product) => (
                  <Product key={product}>{product}</Product>
                ))}
              </ProductList>
            </Stage>
          ))}
        </Journey>

        <Continuous>
          <ContinuousMain>
            <Marker $accent={CONTINUOUS_STAGE.accent}>
              <CONTINUOUS_STAGE.Icon width={20} height={20} />
            </Marker>
            <div>
              <StageTitle>{t('solutions.continuous.title')}</StageTitle>
              <StageText>{t('solutions.continuous.description')}</StageText>
            </div>
          </ContinuousMain>
          <ProductList>
            {CONTINUOUS_STAGE.products.map((product) => (
              <Product key={product}>{product}</Product>
            ))}
          </ProductList>
        </Continuous>
      </Container>
    </Section>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const accentColor = (accent: BrandAccent) => `var(--color-${accent})`

const Section = styled.section`
  background-color: var(--color-surface-muted);
  padding: 6rem 0;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0 var(--layout-gutter);
`

const Intro = styled.div`
  margin-bottom: 4rem;
  max-width: 36rem;
`

const Title = styled.h2`
  color: var(--color-text-strong);
  font-size: clamp(2rem, 1.4rem + 2.4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 1rem;
  text-wrap: balance;
`

const Highlight = styled.span`
  color: var(--color-blue);
`

const Lead = styled.p`
  font-size: 1.125rem;
  margin: 0;
  max-width: 34rem;
`

/**
 * A linha que atravessa as etapas é o percurso em si, não enfeite: ela nasce no
 * primeiro marcador e morre no último, passando pelas três cores da sequência.
 */
const Journey = styled.ol`
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr;
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
  position: relative;

  @media (min-width: 860px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;

    /*
     * A linha começa e termina no centro dos marcadores das pontas, não na
     * borda da grade. Marcador tem 3rem, logo seu centro fica a 1.5rem do
     * início da coluna; a folga à direita é a largura de uma coluna menos isso.
     */
    &::before {
      background: linear-gradient(
        to right,
        var(--color-blue),
        var(--color-green) 50%,
        var(--color-yellow)
      );
      content: '';
      height: 2px;
      left: 1.5rem;
      position: absolute;
      right: calc((100% - 4rem) / 3 - 1.5rem);
      top: 1.5rem;
    }
  }
`

const Stage = styled.li`
  position: relative;
`

const StageHead = styled.div`
  align-items: center;
  display: flex;
  gap: 0.875rem;
  margin-bottom: 1.25rem;
`

/**
 * Fundo opaco (e não translúcido) para o marcador cobrir a linha do percurso
 * que passa atrás dele.
 */
const Marker = styled.span<SolutionMarkerProps>`
  align-items: center;
  background-color: var(--color-surface);
  border: 2px solid ${({ $accent }) => accentColor($accent)};
  border-radius: 50%;
  color: ${({ $accent }) => accentColor($accent)};
  display: inline-flex;
  flex-shrink: 0;
  height: 3rem;
  justify-content: center;
  width: 3rem;
`

/**
 * O fundo opaco interrompe a linha do percurso atrás do rótulo, em vez de
 * deixá-la riscar o texto.
 */
const StageStep = styled.span`
  background-color: var(--color-surface-muted);
  color: var(--color-text);
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  padding: 0 0.5rem 0 0;
`

const StageTitle = styled.h3`
  color: var(--color-text-strong);
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.25;
  margin: 0 0 0.625rem;
`

const StageText = styled.p`
  font-size: 0.9375rem;
  margin: 0 0 1.25rem;
  max-width: 32rem;
`

const ProductList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  list-style: none;
  margin: 0;
  padding: 0;
`

/** Nomes de produtos reais do Google Cloud — a evidência concreta da etapa. */
const Product = styled.li`
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-text);
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.3125rem 0.75rem;
  white-space: nowrap;
`

/**
 * Faixa contínua: atravessa a largura toda para dizer, pela forma, que
 * segurança e suporte não são uma quarta etapa — acontecem durante as três.
 */
const Continuous = styled.div`
  align-items: center;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;
  padding: 1.75rem;

  ${StageTitle} {
    font-size: 1.125rem;
  }

  ${StageText} {
    margin-bottom: 0;
  }

  ${Product} {
    background-color: var(--color-surface-muted);
  }
`

const ContinuousMain = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 1.25rem;
`
