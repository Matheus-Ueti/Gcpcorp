import type { ContactLink } from '../types'

/**
 * Dados de contato provisórios — substituir pelos oficiais da GCP Corp.
 * Ficam num lugar só porque aparecem no rodapé e na chamada final: ao trocar
 * aqui, o texto e o link (`href`) mudam nos dois.
 */
export const CONTACT_EMAIL: ContactLink = {
  text: 'contato@gcpcorp.com.br',
  href: 'mailto:contato@gcpcorp.com.br',
}

export const CONTACT_PHONE: ContactLink = {
  text: '+55 11 0000-0000',
  href: 'tel:+551100000000',
}
