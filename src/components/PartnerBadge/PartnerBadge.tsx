import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import type { PartnerBadgeProps, PartnerBadgeStyleProps } from '../../types'

/**
 * Selo oficial "Google Cloud Partner".
 *
 * O arquivo não está no repositório porque o Google distribui esse selo apenas
 * pelo portal Partner Advantage (login de parceiro) — ele não é publicado
 * abertamente. Basta salvar o SVG em `public/google-cloud-partner.svg` que o
 * selo aparece sozinho em todos os lugares que usam este componente.
 */
const PARTNER_BADGE_SRC = '/google-cloud-partner.svg'

/**
 * Selo precedido do divisor que o separa do logo da GCP Corp.
 *
 * Enquanto o arquivo do selo não existir, esconde o slot inteiro (divisor
 * incluído) em vez de deixar o ícone de imagem quebrada.
 */
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

/* ── Estilos ─────────────────────────────────────────────────────────────── */

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
