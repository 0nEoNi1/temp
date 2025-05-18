"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const calculateTransform = () => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const moveX = (mousePosition.x - centerX) / 50
    const moveY = (mousePosition.y - centerY) / 50
    return `translate(${moveX}px, ${moveY}px)`
  }

  return (
    <section className="relative mx-auto max-w-5xl py-20 px-4 text-center mt-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-white/5 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="space-y-8">
        {/* Animated stars */}
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Star className="h-6 w-6 text-white fill-white" />
            </motion.div>
          ))}
        </div>

        {/* Main heading with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ transform: isHovering ? calculateTransform() : "none" }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              What our customers says about us
            </span>
          </h1>
        </motion.div>

        {/* Tagline with animation */}
        <motion.p
          className="mx-auto max-w-2xl text-lg text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          For shop only - there is only one seller owner
        </motion.p>

        {/* Interactive CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8"
        >
          <Button size="lg" className="bg-white text-black hover:bg-white/90 group">
            <span>Explore Reviews</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Stats counter */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              500+
            </motion.div>
            <div className="text-sm text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              4.9
            </motion.div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </div>
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              98%
            </motion.div>
            <div className="text-sm text-gray-400">Satisfaction Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
