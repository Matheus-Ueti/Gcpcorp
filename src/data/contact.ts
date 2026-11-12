import type { ContactLink } from '../types'

/** Dados de contato provisórios — substituir pelos oficiais da GCP Corp. */
export const CONTACT_EMAIL: ContactLink = {
  text: 'contato@gcpcorp.com.br',
  href: 'mailto:contato@gcpcorp.com.br',
}

export const CONTACT_PHONE: ContactLink = {
  text: '(45) 3099-6897',
  href: 'tel:+554530996897',
}

export const CONTACT_ADDRESS: ContactLink = {
  text: 'Rua Presidente Juscelino Kubitschek, 861 - Sala 31, Cascavel - PR, 85807-440',
  href: 'https://www.google.com/maps/search/?api=1&query=Rua+Presidente+Juscelino+Kubitschek+861+Cascavel+PR+85807-440',
}
