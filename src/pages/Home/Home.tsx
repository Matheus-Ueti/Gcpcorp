import { Header } from '../../components/Header/Header'
import { Hero } from '../../components/Hero/Hero'

/**
 * Landing page da GCP Corp. As demais seções entram abaixo do hero,
 * na ordem em que aparecem no site.
 */
export function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
      </main>
    </>
  )
}
