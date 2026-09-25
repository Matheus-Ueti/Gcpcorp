import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import logoGcpcorp from '../../assets/logo-gcpcorp.svg'
import { InstagramIcon, LinkedInIcon, MailIcon, MapPinIcon, PhoneIcon } from '../icons/Icons'
import type { IconComponent } from '../../types'

const LINK_GROUPS = [
  {
    key: 'company',
    links: [
      { key: 'home', href: '#inicio' },
      { key: 'about', href: '#sobre' },
      { key: 'marketplace', href: '#marketplace' },
    ],
  },
  {
    key: 'solutions',
    links: [
      { key: 'migration', href: '#solucoes' },
      { key: 'dataAnalytics', href: '#solucoes' },
      { key: 'ai', href: '#solucoes' },
      { key: 'security', href: '#solucoes' },
    ],
  },
] as const

const SOCIAL_ICONS = [
  { key: 'linkedin', href: 'https://www.linkedin.com/', Icon: LinkedInIcon },
  { key: 'instagram', href: 'https://www.instagram.com/', Icon: InstagramIcon },
] as const

/**
 * Dados de contato provisórios — substituir pelos oficiais da GCP Corp.
 * Os `href` de e-mail e telefone precisam acompanhar a troca.
 */
interface ContactDetail {
  Icon: IconComponent
  key: string
  text: string | null
  href: string | null
}

const CONTACT_DETAILS: ContactDetail[] = [
  {
    Icon: MailIcon,
    key: 'email',
    text: 'contato@gcpcorp.com.br',
    href: 'mailto:contato@gcpcorp.com.br',
  },
  { Icon: PhoneIcon, key: 'phone', text: '+55 11 0000-0000', href: 'tel:+551100000000' },
  { Icon: MapPinIcon, key: 'location', text: null, href: null },
]

/** Rodapé institucional: marca, navegação, contato e direitos. */
export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <Wrapper id="contato">
      <Container>
        <Top>
          <BrandColumn>
            <Logo src={logoGcpcorp} alt={t('footer.logoAlt')} />
            <BrandText>{t('footer.brandText')}</BrandText>
            <SocialList>
              {SOCIAL_ICONS.map(({ key, href, Icon }) => (
                <li key={href}>
                  <SocialLinkItem
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={t(`footer.social.${key}`)}
                  >
                    <Icon />
                  </SocialLinkItem>
                </li>
              ))}
            </SocialList>
          </BrandColumn>

          {LINK_GROUPS.map(({ key: groupKey, links }) => (
            <Column key={groupKey}>
              <ColumnTitle>{t(`footer.columns.${groupKey}.title`)}</ColumnTitle>
              <LinkList>
                {links.map(({ key: linkKey, href }) => (
                  <li key={linkKey}>
                    <FooterLink href={href}>
                      {t(`footer.columns.${groupKey}.${linkKey}`)}
                    </FooterLink>
                  </li>
                ))}
              </LinkList>
            </Column>
          ))}

          <Column>
            <ColumnTitle>{t('footer.columns.contact.title')}</ColumnTitle>
            <LinkList>
              {CONTACT_DETAILS.map(({ Icon, text, key, href }) => {
                const content = text ?? t(`footer.columns.contact.${key}`)
                return (
                  <li key={key}>
                    <ContactRow>
                      <Icon width={16} height={16} />
                      {href ? (
                        <FooterLink href={href}>{content}</FooterLink>
                      ) : (
                        <span>{content}</span>
                      )}
                    </ContactRow>
                  </li>
                )
              })}
            </LinkList>
          </Column>
        </Top>

        <Bottom>
          <Copyright>{t('footer.copyright', { year: currentYear })}</Copyright>
          <BottomLinks>
            <FooterLink href="#privacidade">{t('footer.privacyPolicy')}</FooterLink>
            <FooterLink href="#termos">{t('footer.termsOfUse')}</FooterLink>
          </BottomLinks>
        </Bottom>
      </Container>

      {/* Fio nas cores da marca, fechando a página com a identidade Google. */}
      <BrandStripe aria-hidden="true" />
    </Wrapper>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

const Wrapper = styled.footer`
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
`

const Container = styled.div`
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: 4rem var(--layout-gutter) 2rem;
`

const Top = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));

  @media (min-width: 900px) {
    /* A coluna da marca ganha mais espaço que as de links. */
    grid-template-columns: 1.6fr 1fr 1fr 1fr;
  }
`

const BrandColumn = styled.div`
  max-width: 22rem;
`

const Logo = styled.img`
  display: block;
  height: 1.875rem;
  margin-bottom: 1rem;
  width: auto;
`

const BrandText = styled.p`
  font-size: 0.9375rem;
  margin: 0 0 1.25rem;
`

const SocialList = styled.ul`
  display: flex;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
`

const SocialLinkItem = styled.a`
  align-items: center;
  background-color: var(--color-blue);
  border-radius: 50%;
  color: var(--color-surface);
  display: inline-flex;
  height: 2.125rem;
  justify-content: center;
  transition: background-color 0.2s ease;
  width: 2.125rem;

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

const Column = styled.div``

const ColumnTitle = styled.h2`
  color: var(--color-text-strong);
  font-size: 0.9375rem;
  font-weight: 700;
  margin: 0 0 1rem;
`

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  list-style: none;
  margin: 0;
  padding: 0;
`

const FooterLink = styled.a`
  color: var(--color-text);
  font-size: 0.9375rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-blue);
  }

  &:focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const ContactRow = styled.div`
  align-items: center;
  color: var(--color-text);
  display: flex;
  font-size: 0.9375rem;
  gap: 0.5rem;
`

const Bottom = styled.div`
  align-items: center;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 1.5rem;
`

const Copyright = styled.p`
  font-size: 0.875rem;
  margin: 0;
`

const BottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`

const BrandStripe = styled.div`
  display: flex;
  height: 4px;

  /* Quatro faixas iguais, uma por cor da marca. */
  background: linear-gradient(
    to right,
    var(--color-blue) 0 25%,
    var(--color-red) 25% 50%,
    var(--color-yellow) 50% 75%,
    var(--color-green) 75% 100%
  );
`
