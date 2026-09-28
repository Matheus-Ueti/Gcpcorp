import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import logoGcpcorp from '../../assets/logo-gcpcorp.svg'
import { HomeIcon, LayersIcon, MailIcon, UsersIcon } from '../icons/Icons'
import { PartnerBadge } from '../PartnerBadge/PartnerBadge'
import { SocialLinks } from '../SocialLinks/SocialLinks'
import type { Language, LanguageButtonProps, MenuStyleProps } from '../../types'

const LANGUAGES: Language[] = ['pt', 'en', 'es']

const NAV_ICONS = [
  { key: 'home', href: '#inicio', Icon: HomeIcon },
  { key: 'about', href: '#sobre', Icon: UsersIcon },
  { key: 'solutions', href: '#solucoes', Icon: LayersIcon },
  { key: 'contact', href: '#contato', Icon: MailIcon },
] as const

const MENU_ID = 'menu-principal'

/** Mesmo corte do CSS (MOBILE): a partir daqui não existe menu hambúrguer. */
const DESKTOP_QUERY = '(min-width: 640px)'

/**
 * Cabeçalho fixo: logo, menu principal, redes sociais e troca de idioma.
 *
 * No celular, menu, redes e idiomas vão para um painel que abre pelo botão ☰,
 * logo abaixo do cabeçalho. O painel fecha ao escolher uma seção, ao tocar
 * fora, com Esc ou quando a tela passa a ter largura de desktop.
 */
export function Header() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage as Language
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const wrapperRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const closeOnDesktop = () => {
      if (desktop.matches) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOnOutsidePointer)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <Wrapper ref={wrapperRef}>
      <Container>
        <BrandArea>
          <Brand href="#inicio" onClick={closeMenu}>
            <Logo src={logoGcpcorp} alt={t('header.logoAlt')} />
          </Brand>
          <PartnerBadge height="var(--brand-height)" />
        </BrandArea>

        <MenuToggle
          ref={toggleRef}
          type="button"
          $isOpen={isMenuOpen}
          aria-expanded={isMenuOpen}
          aria-controls={MENU_ID}
          aria-label={t(isMenuOpen ? 'header.menu.close' : 'header.menu.open')}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </MenuToggle>

        <Menu id={MENU_ID} $isOpen={isMenuOpen}>
          <Nav aria-label={t('header.mainNav')}>
            <NavList>
              {NAV_ICONS.map(({ key, href, Icon }) => (
                <li key={href}>
                  <NavLink href={href} onClick={closeMenu}>
                    <Icon />
                    {t(`header.nav.${key}`)}
                  </NavLink>
                </li>
              ))}
            </NavList>
          </Nav>

          <Actions>
            <SocialLinks size="2.25rem" />

            <LanguageSwitcher role="group" aria-label={t('header.languageSwitcher')}>
              {LANGUAGES.map((option) => (
                <LanguageButton
                  key={option}
                  type="button"
                  $isActive={option === language}
                  aria-pressed={option === language}
                  onClick={() => void i18n.changeLanguage(option)}
                >
                  {option.toUpperCase()}
                </LanguageButton>
              ))}
            </LanguageSwitcher>
          </Actions>
        </Menu>
      </Container>
    </Wrapper>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const MOBILE = '(max-width: 639px)'

const Wrapper = styled.header`
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 10;
`

/*
 * Logo + selo Partner, menu e ações precisam caber numa linha só na largura de
 * design (container de 1152px), como no layout — em TODOS os idiomas. O mais
 * longo é o espanhol ("Sobre nosotros", "Soluciones", "Contacto"): ao mexer
 * nos espaços do menu e da marca ou nos rótulos, confira o espanhol.
 * Abaixo da largura de design, os grupos quebram linha.
 */
const Container = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0.75rem var(--layout-gutter);

  @media ${MOBILE} {
    flex-wrap: nowrap;
  }
`

/** A altura da marca vale para o logo e para o selo Partner ao lado. */
const BrandArea = styled.div`
  --brand-height: 2rem;
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: 0.75rem;

  @media ${MOBILE} {
    --brand-height: clamp(1.5rem, 6.8vw, 1.75rem);
    flex-shrink: 1;
    gap: 0.625rem;
    min-width: 0;
  }
`

const Brand = styled.a`
  display: inline-flex;
  flex-shrink: 0;

  &:focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 4px;
  }
`

/**
 * O SVG do logo foi recortado para a caixa real do desenho (viewBox
 * "127 161 863 197"), então a altura definida aqui é a altura visível da marca.
 */
const Logo = styled.img`
  display: block;
  height: var(--brand-height);
  width: auto;
`

/* ── Botão ☰ (só no celular) ─────────────────────────────────────────────── */

/*
 * Três barras de 2px com 4px entre elas (6px de centro a centro). Aberto, a do
 * meio some e as outras duas vão ao centro e giram, formando o X.
 */
const MenuToggle = styled.button<MenuStyleProps>`
  display: none;

  @media ${MOBILE} {
    align-items: center;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.75rem;
    color: var(--color-text-strong);
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 4px;
    height: 2.75rem;
    justify-content: center;
    padding: 0;
    width: 2.75rem;
  }

  span {
    background-color: currentColor;
    border-radius: 2px;
    height: 2px;
    transition:
      opacity 0.2s ease,
      transform 0.25s ease;
    width: 1.25rem;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      span:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
      }
    `}

  &:focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    span {
      transition: none;
    }
  }
`

/* ── Menu: linha do cabeçalho no desktop, painel no celular ──────────────── */

/*
 * No desktop o invólucro não existe para o layout (display: contents): menu e
 * ações continuam lado a lado no cabeçalho. No celular vira um painel que
 * desce por cima da página, logo abaixo do cabeçalho — por cima, e não
 * empurrando, para a página não "pular" ao abrir.
 */
const Menu = styled.div<MenuStyleProps>`
  display: contents;

  @media ${MOBILE} {
    background-color: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    box-shadow: 0 18px 32px color-mix(in srgb, var(--color-text-strong) 14%, transparent);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    left: 0;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    padding: 0.5rem var(--layout-gutter) 1.25rem;
    position: absolute;
    right: 0;
    top: 100%;
    transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-0.5rem')});
    transition:
      opacity 0.2s ease,
      transform 0.2s ease,
      visibility 0.2s;
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  }

  @media ${MOBILE} and (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Nav = styled.nav`
  /*
   * Em telas intermediárias o menu rola na horizontal em vez de quebrar a
   * linha. O min-width zerado é obrigatório: como item de flex, o padrão
   * (min-width auto) impediria o encolhimento e o menu empurraria a largura da
   * página inteira, criando rolagem horizontal no site todo.
   */
  max-width: 100%;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${MOBILE} {
    overflow: visible;
  }
`

/**
 * Pílula com relevo, como no layout: brilho claro no topo e borda funda
 * embaixo. O relevo é todo interno (degradê + sombras inset) porque o <Nav>
 * rola na horizontal, e o overflow cortaria uma sombra externa. O padding de
 * baixo é maior para o texto continuar centrado acima da borda.
 *
 * No painel do celular, vira uma lista simples, um item por linha.
 */
const NavList = styled.ul`
  background: linear-gradient(var(--color-cta-highlight), var(--color-cta-background) 30%);
  border-radius: 999px;
  box-shadow:
    inset 0 -3px 0 var(--color-cta-shade),
    inset 0 -5px 3px color-mix(in srgb, var(--color-cta-edge) 70%, transparent),
    inset 0 1px 0 color-mix(in srgb, var(--color-surface) 45%, transparent);
  display: flex;
  gap: 0.125rem;
  list-style: none;
  margin: 0;
  padding: 0.375rem 0.375rem 0.5rem;
  width: max-content;

  @media ${MOBILE} {
    background: none;
    border-radius: 0;
    box-shadow: none;
    flex-direction: column;
    padding: 0;
    width: auto;
  }
`

const NavLink = styled.a`
  align-items: center;
  border-radius: 999px;
  color: var(--color-surface);
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: 600;
  gap: 0.3125rem;
  padding: 0.5rem 0.5625rem;
  text-decoration: none;
  transition: background-color 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }

  &:focus-visible {
    outline: 3px solid var(--color-text-strong);
    outline-offset: -3px;
  }

  /* No painel: linhas altas (fáceis de tocar), ícone no amarelo da marca. */
  @media ${MOBILE} {
    border-radius: 0.75rem;
    color: var(--color-text-strong);
    display: flex;
    font-size: 1rem;
    gap: 0.75rem;
    padding: 0.875rem 0.75rem;

    svg {
      color: var(--color-cta-edge);
      height: 1.25rem;
      width: 1.25rem;
    }

    &:hover {
      background-color: var(--color-surface-muted);
    }

    &:focus-visible {
      outline-color: var(--color-blue);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: 0.75rem;

  @media ${MOBILE} {
    border-top: 1px solid var(--color-border);
    justify-content: space-between;
    padding: 1rem 0.75rem 0;
  }
`

const LanguageSwitcher = styled.div`
  background-color: var(--color-muted);
  border-radius: 999px;
  display: flex;
  gap: 0.125rem;
  padding: 0.1875rem;
`

const LanguageButton = styled.button<LanguageButtonProps>`
  background-color: ${({ $isActive }) => ($isActive ? 'var(--color-surface)' : 'transparent')};
  border: none;
  border-radius: 999px;
  color: ${({ $isActive }) => ($isActive ? 'var(--color-text-strong)' : 'var(--color-surface)')};
  cursor: pointer;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.3125rem 0.5625rem;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
