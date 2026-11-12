import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import logoGcpcorp from '../../assets/logo-gcpcorp.svg'
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE } from '../../data/contact'
import { MailIcon, MapPinIcon, PhoneIcon } from '../icons/Icons'
import { PartnerBadge } from '../PartnerBadge/PartnerBadge'
import { SocialLinks } from '../SocialLinks/SocialLinks'
import { above, FOOTER_COLUMNS } from '../../styles/breakpoints'
import type { IconComponent } from '../../types'

const LINK_GROUPS = [
  {
    key: 'company',
    links: [
      { key: 'home', href: '#inicio' },
      { key: 'about', href: '#sobre' },
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

interface ContactDetail {
  Icon: IconComponent
  key: string
  text: string | null
  href: string | null
}

const CONTACT_DETAILS: ContactDetail[] = [
  { Icon: MailIcon, key: 'email', ...CONTACT_EMAIL },
  { Icon: PhoneIcon, key: 'phone', ...CONTACT_PHONE },
  { Icon: MapPinIcon, key: 'location', ...CONTACT_ADDRESS },
]

export function Footer() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <Wrapper>
      <Container>
        <Top>
          <BrandColumn>
            <Lockup>
              <Logo src={logoGcpcorp} alt={t('footer.logoAlt')} />
              <PartnerBadge height="1.875rem" />
            </Lockup>
            <BrandText>{t('footer.brandText')}</BrandText>
            <SocialLinks size="2.125rem" />
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

      <BrandStripe aria-hidden="true" />
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
`

const Container = styled.div`
  margin: 0 auto;
  max-width: var(--layout-max-width);
  padding: clamp(3rem, 7vw, 4rem) var(--layout-gutter) 2rem;
`

const Top = styled.div`
  display: grid;
  gap: 2rem 1.5rem;
  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);

  > :first-child,
  > :last-child {
    grid-column: 1 / -1;
  }

  @media ${above(FOOTER_COLUMNS)} {
    gap: 2.5rem;

    > :first-child,
    > :last-child {
      grid-column: auto;
    }

    grid-template-columns: 1.6fr 1fr 1fr 1fr;
  }
`

const BrandColumn = styled.div`
  max-width: 22rem;
`

const Lockup = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
  margin-bottom: 1rem;
`

const Logo = styled.img`
  display: block;
  height: 1.875rem;
  width: auto;
`

const BrandText = styled.p`
  font-size: 0.9375rem;
  margin: 0 0 1.25rem;
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

  background: linear-gradient(
    to right,
    var(--color-blue) 0 25%,
    var(--color-red) 25% 50%,
    var(--color-yellow) 50% 75%,
    var(--color-green) 75% 100%
  );
`
