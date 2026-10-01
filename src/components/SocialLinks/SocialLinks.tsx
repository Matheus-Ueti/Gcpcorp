import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { InstagramIcon, LinkedInIcon } from '../icons/Icons'
import type {
  SocialFillStyleProps,
  SocialLinksProps,
  SocialLinkStyleProps,
  SocialNetwork,
} from '../../types'

const SOCIAL_NETWORKS: SocialNetwork[] = [
  {
    key: 'linkedin',
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    Icon: LinkedInIcon,
    fill: '#0a66c2',
  },
  {
    key: 'instagram',
    name: 'Instagram',
    href: 'https://www.instagram.com/',
    Icon: InstagramIcon,
    fill: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
  },
]

export function SocialLinks({ size }: SocialLinksProps) {
  const { t } = useTranslation()

  return (
    <List>
      {SOCIAL_NETWORKS.map(({ key, name, href, Icon, fill }) => (
        <Item key={key}>
          <Link
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={t(`brand.social.${key}`)}
            $size={size}
          >
            <Fill $fill={fill} />
            <Icon />
          </Link>
          <Tooltip $fill={fill} aria-hidden="true">
            {name}
          </Tooltip>
        </Item>
      ))}
    </List>
  )
}

const EASING = '0.3s ease-in-out'

const List = styled.ul`
  display: flex;
  gap: 0.375rem;
  list-style: none;
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  position: relative;
`

const Fill = styled.span<SocialFillStyleProps>`
  background: ${({ $fill }) => $fill};
  inset: 0;
  position: absolute;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform ${EASING};
`

const Link = styled.a<SocialLinkStyleProps>`
  align-items: center;
  background-color: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text-strong);
  display: inline-flex;
  height: ${({ $size }) => $size};
  isolation: isolate;
  justify-content: center;
  overflow: hidden;
  position: relative;
  transition:
    border-color ${EASING},
    box-shadow ${EASING},
    color ${EASING};
  width: ${({ $size }) => $size};

  svg {
    position: relative;
  }

  &:hover,
  &:focus-visible {
    border-color: transparent;
    box-shadow: 0 6px 14px color-mix(in srgb, var(--color-text-strong) 22%, transparent);
    color: var(--color-surface);

    ${Fill} {
      transform: scaleY(1);
    }
  }

  &:focus-visible {
    outline: 3px solid var(--color-blue);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${Fill} {
      transition: none;
    }
  }
`

const Tooltip = styled.span<SocialFillStyleProps>`
  background: ${({ $fill }) => $fill};
  border-radius: 0.375rem;
  color: var(--color-surface);
  font-size: 0.8125rem;
  font-weight: 600;
  left: 50%;
  opacity: 0;
  padding: 0.3125rem 0.625rem;
  pointer-events: none;
  position: absolute;
  top: calc(100% + 0.25rem);
  transform: translateX(-50%);
  transition:
    opacity ${EASING},
    top ${EASING},
    visibility ${EASING};
  visibility: hidden;
  white-space: nowrap;
  z-index: 20;

  ${Link}:hover + &,
  ${Link}:focus-visible + & {
    opacity: 1;
    top: calc(100% + 0.625rem);
    visibility: visible;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
