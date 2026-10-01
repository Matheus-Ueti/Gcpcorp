import styled from 'styled-components'
import { AboutSection } from '../../components/AboutSection/AboutSection'
import { ContactSection } from '../../components/ContactSection/ContactSection'
import { EcosystemSection } from '../../components/EcosystemSection/EcosystemSection'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { Hero } from '../../components/Hero/Hero'
import { SolutionsGrid } from '../../components/SolutionsGrid/SolutionsGrid'
import { TestimonialsSection } from '../../components/TestimonialsSection/TestimonialsSection'

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

/**
 * `clip` (e não `hidden`) corta a sobra do anel sem transformar o <main> num
 * container de rolagem.
 */
const Main = styled.main`
  overflow-x: clip;
`
