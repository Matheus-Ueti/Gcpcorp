import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import type {
  AccentStyleProps,
  ContactWord,
  RotatingWordState,
  RotatingWordStyleProps,
} from '../../types'

const WORDS: ContactWord[] = [
  { key: 'connected', accent: 'blue' },
  { key: 'intelligent', accent: 'yellow' },
  { key: 'productive', accent: 'green' },
  { key: 'secure', accent: 'red' },
]

const WORD_DURATION_MS = 2600

function wordState(index: number, activeIndex: number): RotatingWordState {
  if (index === activeIndex) {
    return 'active'
  }
  const previousIndex = (activeIndex - 1 + WORDS.length) % WORDS.length
  return index === previousIndex ? 'leaving' : 'waiting'
}

export function ContactSection() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % WORDS.length)
    }, WORD_DURATION_MS)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <Section id="contato" aria-labelledby="contato-titulo">
      <Container>
        <Eyebrow>{t('contact.eyebrow')}</Eyebrow>

        <Title id="contato-titulo">
          <VisuallyHidden>{t('contact.titleFull')}</VisuallyHidden>
          <span aria-hidden="true">
            {t('contact.titleLead')}
            <WordSlot>
              {WORDS.map(({ key }, index) => (
                <Word key={key} $state={wordState(index, activeIndex)}>
                  {t(`contact.words.${key}`)}
                </Word>
              ))}
            </WordSlot>
            <WordBar $accent={WORDS[activeIndex].accent} />
          </span>
        </Title>

        <Lead>{t('contact.lead')}</Lead>
      </Container>
    </Section>
  )
}

const Section = styled.section`
  padding: clamp(4.5rem, 9vw, 7rem) 0;
`

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0 var(--layout-gutter);
  text-align: center;
`

const Eyebrow = styled.p`
  color: var(--color-text);
  font-size: clamp(0.875rem, 1.45vw, 1.1875rem);
  font-weight: 500;
  letter-spacing: 0.04em;
  margin: 0 0 clamp(1rem, 2vw, 1.5rem);
  text-transform: uppercase;
`

const Title = styled.h2`
  color: var(--color-text-strong);
  font-size: clamp(2.25rem, 1.5rem + 3.2vw, 4rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0 0 1.5rem;
`

const VisuallyHidden = styled.span`
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const WordSlot = styled.span`
  color: var(--color-blue);
  display: block;
  height: 1.3em;
  overflow: hidden;
  position: relative;
`

const WORD_STATES = {
  active: css`
    opacity: 1;
    transform: translateY(0);
  `,
  leaving: css`
    opacity: 0;
    transform: translateY(-110%);
  `,
  waiting: css`
    opacity: 0;
    transform: translateY(110%);
    transition: none;
  `,
}

const Word = styled.span<RotatingWordStyleProps>`
  inset: 0;
  position: absolute;
  transition:
    opacity 0.45s ease,
    transform 0.75s cubic-bezier(0.34, 1.45, 0.64, 1);
  white-space: nowrap;

  ${({ $state }) => WORD_STATES[$state]}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const WordBar = styled.span<AccentStyleProps>`
  background-color: ${({ $accent }) => `var(--color-${$accent})`};
  border-radius: 999px;
  display: block;
  height: 0.3rem;
  margin: 0.35rem auto 0;
  transition: background-color 0.45s ease;
  width: 3.5rem;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Lead = styled.p`
  font-size: clamp(1rem, 0.9rem + 0.4vw, 1.1875rem);
  margin: 0;
  max-width: 38rem;
  text-wrap: pretty;
`
