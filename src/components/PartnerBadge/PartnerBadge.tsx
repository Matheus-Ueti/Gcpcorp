import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import type { PartnerBadgeProps, PartnerBadgeStyleProps } from '../../types'

/**
 * O selo não está no repositório: o Google o distribui só pelo portal Partner
 * Advantage. Salve o SVG em `public/google-cloud-partner.svg` e ele aparece.
 */
const PARTNER_BADGE_SRC = '/google-cloud-partner.svg'

export function PartnerBadge({ height }: PartnerBadgeProps) {
  const { t } = useTranslation()
  const [isAvailable, setIsAvailable] = useState(true)

  if (!isAvailable) {
    return null
  }

  return (
    <>
      <Divider $height={height} aria-hidden="true" />
      <Badge
        $height={height}
        src={PARTNER_BADGE_SRC}
        alt={t('brand.partnerBadgeAlt')}
        onError={() => setIsAvailable(false)}
      />
    </>
  )
}

const Divider = styled.span<PartnerBadgeStyleProps>`
  align-self: center;
  background-color: var(--color-border);
  flex-shrink: 0;
  height: ${({ $height }) => $height};
  width: 1px;
`

const Badge = styled.img<PartnerBadgeStyleProps>`
  display: block;
  height: ${({ $height }) => $height};
  width: auto;
`
