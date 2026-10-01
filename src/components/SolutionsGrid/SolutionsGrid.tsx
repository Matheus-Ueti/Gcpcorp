import { useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import applyAiImage from '../../assets/journey/applyAi.webp'
import migrateImage from '../../assets/journey/migrate.webp'
import organizeDataImage from '../../assets/journey/organizeData.webp'
import { AiChipIcon, DatabaseIcon, ServerCloudIcon, ShieldIcon } from '../icons/Icons'
import { JourneyShowcase } from '../JourneyShowcase/JourneyShowcase'
import { ProductChips } from '../21stdev/ProductChips/ProductChips'
import { above, below, DESKTOP, TABLET } from '../../styles/breakpoints'
import { accentColor } from '../../utils/style'
import type {
  AccentStyleProps,
  ActiveStyleProps,
  IllustratedJourneyStage,
  JourneyStage,
} from '../../types'

/**
 * Fotos do Unsplash (uso comercial livre, sem atribuição obrigatória): Homa
 * Appliances (aG7obD4_EVI), Luke Chesser (JKUTrJ4vK00), Growtika (nGoCBxiaRO0).
 */
const JOURNEY_STAGES: IllustratedJourneyStage[] = [
  {
    key: 'migrate',
    products: ['computeEngine', 'gke', 'cloudStorage'],
    Icon: ServerCloudIcon,
    accent: 'blue',
    image: migrateImage,
  },
  {
    key: 'organizeData',
    products: ['bigQuery', 'dataflow', 'looker'],
    Icon: DatabaseIcon,
    accent: 'green',
    image: organizeDataImage,
  },
  {
    key: 'applyAi',
    products: ['vertexAi', 'gemini', 'documentAi'],
    Icon: AiChipIcon,
    accent: 'yellow',
    image: applyAiImage,
  },
]

const CONTINUOUS_STAGE: JourneyStage = {
  key: 'continuous',
  products: ['securityCommandCenter', 'cloudIam', 'cloudMonitoring'],
  Icon: ShieldIcon,
  accent: 'red',
}

/** rootMargin que reduz o viewport a uma linha no meio da tela. */
const READING_LINE = '-50% 0px -50% 0px'

export function SolutionsGrid() {
  const { t } = useTranslation()
  const stageRefs = useRef<Array<HTMLLIElement | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(Number((entry.target as HTMLElement).dataset.index))
          }
        }
      },
      { rootMargin: READING_LINE },
    )

    for (const stage of stageRefs.current) {
      if (stage) {
        observer.observe(stage)
      }
    }
    return () => observer.disconnect()
  }, [])

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
          <Stages>
            {JOURNEY_STAGES.map(({ key, products, Icon, accent, image }, index) => (
              <Stage
                key={key}
                ref={(element) => {
                  stageRefs.current[index] = element
                }}
                data-index={index}
                $isActive={index === activeIndex}
              >
                <StageImage src={image} alt="" loading="lazy" decoding="async" />
                <StageHead>
                  <Marker $accent={accent}>
                    <Icon width={20} height={20} />
                  </Marker>
                  <StageStep>{t('solutions.step', { number: index + 1 })}</StageStep>
                </StageHead>
                <StageTitle>{t(`solutions.stages.${key}.title`)}</StageTitle>
                <StageText>{t(`solutions.stages.${key}.description`)}</StageText>
                <ProductChips products={products} accent={accent} />
              </Stage>
            ))}
          </Stages>

          <ShowcaseColumn aria-hidden="true">
            <JourneyShowcase stages={JOURNEY_STAGES} activeIndex={activeIndex} />
          </ShowcaseColumn>
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
          <ProductChips products={CONTINUOUS_STAGE.products} accent={CONTINUOUS_STAGE.accent} />
        </Continuous>
      </Container>
    </Section>
  )
}

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
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
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

const Journey = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);

  @media ${above(DESKTOP)} {
    gap: 4rem;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
`

const Stages = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media ${above(DESKTOP)} {
    gap: 0;
  }
`

const Stage = styled.li<ActiveStyleProps>`
  @media ${above(DESKTOP)} {
    min-height: 55vh;
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0.35)};
    padding-bottom: 2rem;
    transition: opacity 0.35s ease;

    &:last-child {
      min-height: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const StageImage = styled.img`
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  display: block;
  margin-bottom: 1.25rem;
  object-fit: cover;
  width: 100%;

  @media ${above(DESKTOP)} {
    display: none;
  }
`

const StageHead = styled.div`
  align-items: center;
  display: flex;
  gap: 0.875rem;
  margin-bottom: 1.25rem;
`

const Marker = styled.span<AccentStyleProps>`
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

const StageStep = styled.span`
  color: var(--color-text);
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
  font-weight: 600;
`

const StageTitle = styled.h3`
  color: var(--color-text-strong);
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.25;
  margin: 0 0 0.625rem;
`

const StageText = styled.p`
  font-size: 0.9375rem;
  margin: 0 0 1.25rem;
  max-width: 32rem;
`

const ShowcaseColumn = styled.div`
  display: none;

  @media ${above(DESKTOP)} {
    display: block;
  }
`

const Continuous = styled.div`
  align-items: center;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;
  margin-top: 3rem;
  padding: 1.75rem;

  @media ${below(TABLET)} {
    gap: 1.25rem;
    padding: 1.5rem;
  }

  ${StageTitle} {
    font-size: 1.125rem;
  }

  ${StageText} {
    margin-bottom: 0;
  }

  --chip-background: var(--color-surface-muted);
`

const ContinuousMain = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 1.25rem;

  @media ${below(TABLET)} {
    flex-direction: column;
    gap: 1rem;
  }
`
