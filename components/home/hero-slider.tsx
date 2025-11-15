"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Slide {
  id: number
  title: string
  description: string
  ctaText: string
  ctaLink: string
  backgroundImage: string
  backgroundVideo?: string
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    title: "Outsource Smarter",
    description:
      "Transform your business operations with intelligent outsourcing solutions. Access world-class talent and AI-powered tools that drive efficiency.",
    ctaText: "Explore Our Services",
    ctaLink: "/services",
    backgroundImage: "/hero-outsource-smart.jpg",
  },
  {
    id: 2,
    title: "Operate Leaner",
    description:
      "Reduce operational costs by up to 60% without compromising quality. Streamline your processes with our expert teams and proven methodologies.",
    ctaText: "See Cost Savings",
    ctaLink: "/about",
    backgroundImage: "/hero-operate-lean.jpg",
  },
  {
    id: 3,
    title: "Grow Faster",
    description:
      "Scale your business with confidence. Our flexible solutions grow with you, providing the support you need at every stage of your journey.",
    ctaText: "Start Your Growth",
    ctaLink: "/contact",
    backgroundImage: "/hero-grow-fast.jpg",
  },
]

interface HeroSliderProps {
  slides?: Slide[]
  showDevWarning?: boolean
}

export function HeroSlider({ slides = defaultSlides, showDevWarning = false }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Preload all images when component mounts
  useEffect(() => {
    const imagePromises = slides.map((slide) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.src = slide.backgroundImage
        img.onload = () => resolve()
        img.onerror = () => reject()
      })
    })

    Promise.all(imagePromises)
      .then(() => {
        setImagesLoaded(true)
      })
      .catch((err) => {
        console.warn("Some images failed to preload:", err)
        setImagesLoaded(true) // Continue anyway
      })
  }, [slides])

  useEffect(() => {
    if (!isAutoPlaying || !imagesLoaded) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length, imagesLoaded])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  // Show loading state while images preload
  if (!imagesLoaded) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </section>
    )
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide].backgroundImage || "/placeholder.svg?height=1080&width=1920"}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="space-y-8"
                >
                  <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white text-balance leading-tight">
                    {slides[currentSlide].title}
                  </h1>

                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed text-pretty max-w-2xl">
                    {slides[currentSlide].description}
                  </p>

                  <div className="pt-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-10 py-7 rounded-xl shadow-2xl hover:shadow-accent/50 transition-all hover:scale-105 group"
                    >
                      <Link href={slides[currentSlide].ctaLink} className="flex items-center gap-3">
                        {slides[currentSlide].ctaText}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 left-0 right-0 z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-16 bg-accent shadow-lg shadow-accent/50"
                      : "w-10 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 border border-white/30"
                aria-label="Previous slide"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={nextSlide}
                className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 border border-white/30"
                aria-label="Next slide"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}