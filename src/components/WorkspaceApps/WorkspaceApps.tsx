import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { useTranslation } from 'react-i18next'
import styled, { keyframes } from 'styled-components'
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
import type { WorkspaceAppProps, WorkspaceProduct, WorkspaceProductKey } from '../../types'

/**
 * Ícones oficiais do CDN do Google. O do Gemini é PNG porque o SVG oficial
 * embute uma imagem de 250 KB.
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

const VIEWPORT_MARGIN = 8

export function WorkspaceApps() {
  const { t } = useTranslation()
  const listRef = useRef<HTMLUListElement>(null)
  const [openKey, setOpenKey] = useState<WorkspaceProductKey | null>(null)

  useEffect(() => {
    if (!openKey) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!listRef.current?.contains(event.target as Node)) {
        setOpenKey(null)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenKey(null)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openKey])

  return (
    <List ref={listRef} aria-label={t('ecosystem.workspace.label')}>
      {WORKSPACE_PRODUCTS.map((product) => (
        <WorkspaceApp
          key={product.key}
          product={product}
          name={t(`ecosystem.workspace.products.${product.key}`)}
          isOpen={openKey === product.key}
          onOpen={() => setOpenKey(product.key)}
          onClose={() => setOpenKey((current) => (current === product.key ? null : current))}
          onToggle={() => setOpenKey((current) => (current === product.key ? null : product.key))}
        />
      ))}
    </List>
  )
}

function WorkspaceApp({ product, name, isOpen, onOpen, onClose, onToggle }: WorkspaceAppProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const bubbleRef = useRef<HTMLSpanElement>(null)
  const lastPointerType = useRef<string>('')

  const handlePointerEnter = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse') {
      onOpen()
    }
  }

  const handlePointerLeave = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse') {
      onClose()
    }
  }

  const handleClick = () => {
    if (lastPointerType.current === 'mouse') {
      onOpen()
    } else {
      onToggle()
    }
  }

  const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
    if (event.currentTarget.matches(':focus-visible')) {
      onOpen()
    }
  }

  useLayoutEffect(() => {
    const button = buttonRef.current
    const bubble = bubbleRef.current
    if (!isOpen || !button || !bubble) {
      return
    }

    const buttonRect = button.getBoundingClientRect()
    const center = buttonRect.left + buttonRect.width / 2
    const half = bubble.offsetWidth / 2
    const viewportWidth = document.documentElement.clientWidth
    const overflowLeft = Math.max(VIEWPORT_MARGIN - (center - half), 0)
    const overflowRight = Math.max(center + half - (viewportWidth - VIEWPORT_MARGIN), 0)

    bubble.style.setProperty('--edge-shift', `${overflowLeft - overflowRight}px`)
  }, [isOpen])

  return (
    <Item>
      <AppButton
        ref={buttonRef}
        type="button"
        data-open={isOpen}
        onBlur={onClose}
        onClick={handleClick}
        onFocus={handleFocus}
        onPointerDown={(event) => {
          lastPointerType.current = event.pointerType
        }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <AppIcon src={product.icon} alt={name} loading="lazy" />
      </AppButton>
      {isOpen && (
        <Bubble ref={bubbleRef} aria-hidden="true">
          {name}
        </Bubble>
      )}
    </Item>
  )
}

const pop = keyframes`
  0% {
    transform: translateY(0) scale(1);
  }

  35% {
    transform: translateY(-6px) scale(1.2);
  }

  65% {
    transform: translateY(0) scale(0.94);
  }

  100% {
    transform: translateY(0) scale(1);
  }
`

const bubbleIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.625rem, 2.4vw, 1.75rem);
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  position: relative;
`

const AppButton = styled.button`
  background: none;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  display: block;
  padding: 0;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 4px;
  }
`

const AppIcon = styled.img`
  display: block;
  height: clamp(1.875rem, 3.6vw, 2.875rem);
  transition: transform 0.2s ease;
  width: clamp(1.875rem, 3.6vw, 2.875rem);

  ${AppButton}:hover & {
    transform: translateY(-3px);
  }

  ${AppButton}[data-open='true'] & {
    animation: ${pop} 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${AppButton}:hover &,
    ${AppButton}[data-open='true'] & {
      animation: none;
      transform: none;
    }
  }
`

/*
 * Centralizado via "translate" (separado de "transform") para a animação de
 * entrada usar o transform sem desfazer a centralização.
 */
const Bubble = styled.span`
  animation: ${bubbleIn} 0.22s ease-out;
  background-color: var(--color-navy);
  border-radius: 999px;
  box-shadow: 0 6px 16px color-mix(in srgb, var(--color-navy) 28%, transparent);
  color: var(--color-surface);
  font-size: 0.8125rem;
  font-weight: 600;
  left: 50%;
  line-height: 1.2;
  padding: 0.4375rem 0.75rem;
  pointer-events: none;
  position: absolute;
  top: calc(100% + 0.75rem);
  translate: calc(-50% + var(--edge-shift, 0px)) 0;
  white-space: nowrap;
  z-index: 5;

  &::before {
    background-color: inherit;
    border-radius: 2px;
    content: '';
    height: 0.625rem;
    left: calc(50% - var(--edge-shift, 0px));
    position: absolute;
    top: 0;
    transform: translate(-50%, -40%) rotate(45deg);
    width: 0.625rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
