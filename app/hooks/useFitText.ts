import { useEffect, useRef, useState, useCallback } from 'react'

interface UseFitTextOptions {
  minFontSize?: number
  maxFontSize?: number
  resolution?: number
  compressor?: number
}

export function useFitText(text: string, options: UseFitTextOptions = {}) {
  const { minFontSize = 8, maxFontSize = 200, resolution = 5, compressor = 1 } = options

  const [fontSize, setFontSize] = useState<number>(16)
  const containerRef = useRef<HTMLElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)

  const calculateFontSize = useCallback(() => {
    if (!containerRef.current || !measureRef.current) return

    const container = containerRef.current
    const measurer = measureRef.current

    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight

    if (containerWidth === 0) return

    // Binary search for optimal font size
    let low = minFontSize
    let high = maxFontSize
    let optimalSize = minFontSize

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)

      // Apply font size to measurer
      measurer.style.fontSize = `${mid}px`
      measurer.textContent = text

      const textWidth = measurer.offsetWidth
      const textHeight = measurer.offsetHeight

      // Check if text fits within container
      const fitsWidth = textWidth <= containerWidth * compressor
      const fitsHeight = textHeight <= containerHeight

      if (fitsWidth && fitsHeight) {
        optimalSize = mid
        low = mid + resolution
      } else {
        high = mid - resolution
      }
    }

    setFontSize(optimalSize)
  }, [text, minFontSize, maxFontSize, resolution, compressor])

  // Create invisible measurer element
  useEffect(() => {
    if (!measureRef.current) {
      const measurer = document.createElement('span')
      measurer.style.cssText = `
        position: absolute;
        top: -9999px;
        left: -9999px;
        visibility: hidden;
        white-space: nowrap;
        font-family: inherit;
        font-weight: inherit;
        font-style: inherit;
        letter-spacing: inherit;
        text-transform: inherit;
      `
      document.body.appendChild(measurer)
      measureRef.current = measurer
    }

    return () => {
      if (measureRef.current && document.body.contains(measureRef.current)) {
        document.body.removeChild(measureRef.current)
      }
    }
  }, [])

  // Observe container size changes
  useEffect(() => {
    if (!containerRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      calculateFontSize()
    })

    resizeObserver.observe(containerRef.current)

    // Initial calculation
    calculateFontSize()

    return () => {
      resizeObserver.disconnect()
    }
  }, [calculateFontSize])

  // Recalculate when text changes
  useEffect(() => {
    calculateFontSize()
  }, [text, calculateFontSize])

  return {
    fontSize,
    ref: containerRef,
    style: { fontSize: `${fontSize}px` }
  }
}

// Alternative simpler version using compressor ratio (like original FitText.js)
export function useFitTextSimple(compressor: number = 1) {
  const [fontSize, setFontSize] = useState<number>(16)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const updateFontSize = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.offsetWidth
      const newFontSize = containerWidth / compressor
      setFontSize(Math.max(newFontSize, 8)) // Minimum 8px
    }

    const resizeObserver = new ResizeObserver(updateFontSize)
    resizeObserver.observe(containerRef.current)

    updateFontSize() // Initial calculation

    return () => resizeObserver.disconnect()
  }, [compressor])

  return {
    fontSize,
    ref: containerRef,
    style: { fontSize: `${fontSize}px` }
  }
}
