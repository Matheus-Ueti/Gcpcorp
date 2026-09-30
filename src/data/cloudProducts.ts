import type { CloudProductKey } from '../types'

/**
 * Nomes dos produtos do Google Cloud citados na jornada.
 *
 * Ficam aqui, e não nas traduções, porque nome de produto é marca e não muda
 * de idioma — o que muda é a explicação (`solutions.products.<chave>`).
 */
export const CLOUD_PRODUCT_NAMES: Record<CloudProductKey, string> = {
  computeEngine: 'Compute Engine',
  gke: 'Google Kubernetes Engine',
  cloudStorage: 'Cloud Storage',
  bigQuery: 'BigQuery',
  dataflow: 'Dataflow',
  looker: 'Looker',
  vertexAi: 'Vertex AI',
  gemini: 'Gemini',
  documentAi: 'Document AI',
  securityCommandCenter: 'Security Command Center',
  cloudIam: 'Cloud IAM',
  cloudMonitoring: 'Cloud Monitoring',
}
