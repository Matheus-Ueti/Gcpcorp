import { useState } from 'react'
import styled from 'styled-components'
import logoGcpcorp from '../../assets/logo-gcpcorp.svg'
import {
  HomeIcon,
  InstagramIcon,
  LayersIcon,
  LinkedInIcon,
  MailIcon,
  StoreIcon,
  UsersIcon,
} from '../icons/Icons'

/** Itens do menu, na ordem em que aparecem. */
const NAV_ITEMS = [
  { label: 'Início', href: '#inicio', Icon: HomeIcon },
  { label: 'Sobre nós', href: '#sobre', Icon: UsersIcon },
  { label: 'Soluções', href: '#solucoes', Icon: LayersIcon },
  { label: 'Marketplace', href: '#marketplace', Icon: StoreIcon },
  { label: 'Contato', href: '#contato', Icon: MailIcon },
] as const

const SOCIAL_LINKS = [
  { label: 'LinkedIn da GCP Corp.', href: 'https://www.linkedin.com/', Icon: LinkedInIcon },
  { label: 'Instagram da GCP Corp.', href: 'https://www.instagram.com/', Icon: InstagramIcon },
] as const

const LANGUAGES = ['PT', 'EN', 'ES'] as const

type Language = (typeof LANGUAGES)[number]

/**
 * Cabeçalho fixo: logo, menu principal, redes sociais e troca de idioma.
 *
 * A troca de idioma hoje só guarda o estado visual — a tradução em si entra
 * quando o i18n for ligado.
 */
export function Header() {
  const [language, setLanguage] = useState<Language>('PT')

  return (
    <Wrapper>
      <Container>
        <Brand href="#inicio">
          <Logo src={logoGcpcorp} alt="GCP Corp." />
        </Brand>

        <Nav aria-label="Menu principal">
          <NavList>
            {NAV_ITEMS.map(({ label, href, Icon }) => (
              <li key={href}>
                <NavLink href={href}>
                  <Icon />
                  {label}
                </NavLink>
              </li>
            ))}
          </NavList>
        </Nav>

        <Actions>
          <SocialList>
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <li key={href}>
                <SocialLink
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                >
                  <Icon />
                </SocialLink>
              </li>
            ))}
          </SocialList>

          <LanguageSwitcher role="group" aria-label="Idioma do site">
            {LANGUAGES.map((option) => (
              <LanguageButton
                key={option}
                type="button"
                $isActive={option === language}
                aria-pressed={option === language}
                onClick={() => setLanguage(option)}
              >
                {option}
              </LanguageButton>
            ))}
          </LanguageSwitcher>
        </Actions>
      </Container>
    </Wrapper>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const Wrapper = styled.header`
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 10;
`

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  justify-content: space-between;
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 0.75rem var(--layout-gutter);
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
  height: 2rem;
  width: auto;
`

const Nav = styled.nav`
  /* Em telas estreitas o menu rola na horizontal em vez de quebrar a linha. */
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const NavList = styled.ul`
  background-color: var(--color-yellow);
  border-radius: 999px;
  display: flex;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0.375rem;
  width: max-content;
`

const NavLink = styled.a`
  align-items: center;
  border-radius: 999px;
  color: var(--color-surface);
  display: inline-flex;
  font-size: 0.9375rem;
  font-weight: 600;
  gap: 0.4rem;
  padding: 0.5rem 0.875rem;
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

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: 0.75rem;
`

const SocialList = styled.ul`
  display: flex;
  gap: 0.375rem;
  list-style: none;
  margin: 0;
  padding: 0;
`

const SocialLink = styled.a`
  align-items: center;
  background-color: var(--color-blue);
  border-radius: 50%;
  color: var(--color-surface);
  display: inline-flex;
  height: 2.25rem;
  justify-content: center;
  transition: background-color 0.2s ease;
  width: 2.25rem;

  &:hover {
    background-color: var(--color-blue-dark);
  }

  &:focus-visible {
    outline: 3px solid var(--color-text-strong);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const LanguageSwitcher = styled.div`
  background-color: var(--color-muted);
  border-radius: 999px;
  display: flex;
  gap: 0.125rem;
  padding: 0.1875rem;
`

const LanguageButton = styled.button<{ $isActive: boolean }>`
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
