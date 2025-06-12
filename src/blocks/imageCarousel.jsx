// Carousel.jsx
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const images = [
  "/toolsOne.jpg",
  "/tools2.jpg",
  "/toolsThree.jpg",
  "/toolsFour.jpg",
  "/tools5.jpg",
]

export default function Carousel() {
  const containerRef = useRef(null)
  const [scrollX, setScrollX] = useState(0)
  const imageWidth = 264 // image width + gap (w-64 + gap)
  const delay = 2000 // in ms

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        setScrollX(prev => {
          const next = prev + imageWidth
          if (next >= imageWidth * images.length) return 0
          return next
        })
      }
    }, delay)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: scrollX, behavior: "smooth" })
    }
  }, [scrollX])

  return (
    <motion.div
      ref={containerRef}
      className="flex gap-2 items-center w-full overflow-x-auto scrollbar-hide"
      style={{ scrollBehavior: "smooth" }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
    >
      {images.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          alt="tools"
          className="rounded-sm object-cover w-64"
          whileTap={{ scale: 0.95 }}
        />
      ))}
    </motion.div>
  )
}
