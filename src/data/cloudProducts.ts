import type { CloudProductKey } from '../types'

/** Nome de produto é marca e não se traduz: por isso fica aqui, e não no i18n. */
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
