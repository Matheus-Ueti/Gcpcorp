import styled from 'styled-components'
import { AboutSection } from '../../components/AboutSection/AboutSection'
import { ContactSection } from '../../components/ContactSection/ContactSection'
import { EcosystemSection } from '../../components/EcosystemSection/EcosystemSection'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { Hero } from '../../components/Hero/Hero'
import { SolutionsGrid } from '../../components/SolutionsGrid/SolutionsGrid'
import { TestimonialsSection } from '../../components/TestimonialsSection/TestimonialsSection'

/** Landing page da GCP Corp, na ordem em que as seções aparecem no site. */
export function Home() {
  return (
    <>
      <Header />
      <Main>
        <Hero />
        <AboutSection />
        <EcosystemSection />
        <SolutionsGrid />
        <TestimonialsSection />
        <ContactSection />
      </Main>
      <Footer />
    </>
  )
}

/* ── Estilos ─────────────────────────────────────────────────────────────── */

/**
 * O anel do hero vaza pela borda direita da página. `clip` (e não `hidden`)
 * corta essa sobra sem transformar o <main> num container de rolagem: não
 * surge barra horizontal e o anel continua livre para vazar para baixo, por
 * cima do card da seção "Sobre".
 */
const Main = styled.main`
  overflow-x: clip;
`
