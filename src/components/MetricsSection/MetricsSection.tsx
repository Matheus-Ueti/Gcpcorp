import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

/**
 * ┌───────────────────────────────────────────────────────────────────────┐
 * │ VALORES PROVISÓRIOS — CONFIRMAR COM A GCP CORP ANTES DE PUBLICAR.     │
 * │                                                                       │
 * │ Os números abaixo são de exemplo, só para dar forma à seção. Nenhum   │
 * │ foi verificado. Em especial, evite afirmar um nível de parceria       │
 * │ (Premier, Specialization) sem confirmar no Partner Advantage: é uma   │
 * │ alegação pública sobre a empresa.                                     │
 * └───────────────────────────────────────────────────────────────────────┘
 */
const PLACEHOLDER_METRICS = [
  { key: 'projects', value: '500+' },
  { key: 'years', value: '10' },
  { key: 'clients', value: '120+' },
  { key: 'support', value: '24/7' },
] as const

/**
 * Números da empresa.
 *
 * A seção é deliberadamente contida: a de soluções, logo acima, carrega a cor
 * e o movimento. Aqui o contraste de silêncio é que faz os números pesarem —
 * tipografia, espaço e fios de 1px, sem grafismo de apoio.
 */
export function MetricsSection() {
  const { t } = useTranslation()

  return (
    <Section id="numeros">
      <Container>
        <Statement>
          <Trans i18nKey="metrics.statement" components={{ highlight: <Highlight /> }} />
        </Statement>

        <Metrics>
          {PLACEHOLDER_METRICS.map(({ key, value }) => (
            <Item key={key}>
              <Label>{t(`metrics.items.${key}`)}</Label>
              <Value>{value}</Value>
            </Item>
          ))}
        </Metrics>
      </Container>
    </Section>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const Section = styled.section`
  padding: 6rem 0;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0 var(--layout-gutter);
`

/* Frase de destaque: usa a fonte dos títulos, não a do texto corrido. */
const Statement = styled.p`
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 1.1rem + 1.8vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.25;
  margin: 0 0 4rem;
  max-width: 30ch;
  text-wrap: balance;
`

const Highlight = styled.span`
  color: var(--color-blue);
`

const Metrics = styled.dl`
  border-top: 1px solid var(--color-border);
  display: grid;
  gap: 0;
  grid-template-columns: repeat(2, 1fr);
  margin: 0;

  @media (min-width: 720px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

/**
 * Os fios entre as colunas usam a borda de 1px do sistema. O primeiro item de
 * cada linha não recebe fio à esquerda, senão ele encostaria na margem.
 */
const Item = styled.div`
  border-bottom: 1px solid var(--color-border);
  padding: 1.75rem 1.25rem 1.75rem 0;

  & + & {
    border-left: 1px solid var(--color-border);
    padding-left: 1.25rem;
  }

  @media (max-width: 719px) {
    &:nth-child(odd) {
      border-left: none;
      padding-left: 0;
    }
  }
`

const Label = styled.dt`
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.625rem;
`

/**
 * `tabular-nums` mantém os dígitos na mesma largura, então os números ficam
 * alinhados entre as colunas em vez de dançarem conforme os algarismos.
 *
 * Os números usam a Poppins, não a Qurova: a versão DEMO da Qurova troca os
 * algarismos por um carimbo "PERSONAL USE ONLY". Com a Qurova licenciada, dá
 * para voltar para var(--font-display) se quiser.
 */
const Value = styled.dd`
  color: var(--color-text-strong);
  font-family: var(--font-body);
  font-size: clamp(2.25rem, 1.6rem + 2.4vw, 3.25rem);
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0;
`
