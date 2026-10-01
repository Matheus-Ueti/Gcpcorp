import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import type { SparkParticle } from '../../../types'

const SPAWN_DISTANCE = 18
const SPARKS_PER_SPAWN = 1
const MAX_SPARKS = 40
const FRICTION = 0.88
const MIN_SPEED = 0.05
const SPARK_RADIUS = 2.5

const BRAND_COLOR_TOKENS = ['--color-blue', '--color-red', '--color-yellow', '--color-green']

export function MouseSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!canvas || !context || !hasFinePointer || prefersReducedMotion) {
      return
    }

    const rootStyle = getComputedStyle(document.documentElement)
    const colors = BRAND_COLOR_TOKENS.map((token) => rootStyle.getPropertyValue(token).trim())

    let particles: SparkParticle[] = []
    let frameId = 0
    let lastSpawn: { x: number; y: number } | null = null

    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)

      particles = particles.filter((particle) => {
        particle.x += particle.dx
        particle.y += particle.dy
        particle.dx *= FRICTION
        particle.dy *= FRICTION

        context.fillStyle = particle.color
        context.beginPath()
        context.arc(particle.x, particle.y, SPARK_RADIUS, 0, Math.PI * 2)
        context.fill()

        return Math.abs(particle.dx) >= MIN_SPEED || Math.abs(particle.dy) >= MIN_SPEED
      })

      if (particles.length > 0) {
        frameId = requestAnimationFrame(draw)
      } else {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        frameId = 0
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        return
      }

      const distance = lastSpawn
        ? Math.hypot(event.clientX - lastSpawn.x, event.clientY - lastSpawn.y)
        : Infinity
      if (distance < SPAWN_DISTANCE) {
        return
      }
      lastSpawn = { x: event.clientX, y: event.clientY }

      for (let i = 0; i < SPARKS_PER_SPAWN && particles.length < MAX_SPARKS; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 3 + 0.5
        particles.push({
          x: event.clientX,
          y: event.clientY,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }

      if (!frameId) {
        frameId = requestAnimationFrame(draw)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return <Canvas ref={canvasRef} aria-hidden="true" />
}

const Canvas = styled.canvas`
  height: 100vh;
  inset: 0;
  pointer-events: none;
  position: fixed;
  width: 100vw;
  z-index: 50;
`
