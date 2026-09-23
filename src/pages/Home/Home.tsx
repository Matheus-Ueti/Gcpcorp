import styled from 'styled-components'

export function Home() {
  return (
    <Container>
      <Title>Gcpcorp</Title>
      <Subtitle>Aplicação web em React + TypeScript pronta para começar.</Subtitle>
    </Container>
  )
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
`

const Title = styled.h1`
  margin: 0 0 0.5rem;
`

const Subtitle = styled.p`
  margin: 0;
`
