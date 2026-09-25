import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { Hero } from '../../components/Hero/Hero'
import { MetricsSection } from '../../components/MetricsSection/MetricsSection'
import { SolutionsGrid } from '../../components/SolutionsGrid/SolutionsGrid'

/** Landing page da GCP Corp, na ordem em que as seções aparecem no site. */
export function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SolutionsGrid />
        <MetricsSection />
      </main>
      <Footer />
    </>
  )
}
