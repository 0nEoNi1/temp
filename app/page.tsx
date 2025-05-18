"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, MessageSquare, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                    Discord Community Reviews & Support
                  </span>
                </h1>
              </motion.div>

              <motion.p
                className="max-w-lg text-lg text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                The trusted platform for Discord server reviews, vouches, and support tickets. Connect with reliable
                sellers and services in the Discord community.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link href="/vouches">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span>Explore Vouches</span>
                    <ArrowRight
                      className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                    />
                  </Button>
                </Link>
                <Link href="/tickets">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    View Tickets
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                className="flex items-center gap-2 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Trusted by over 10,000 Discord users</span>
              </motion.div>
            </div>

            <motion.div
              className="relative mx-auto aspect-video max-w-lg rounded-xl border border-white/10 bg-black/50 p-2 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Discord+Reviews+Platform"
                  alt="Discord Reviews Platform"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-zinc-900/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">Why Choose Our Platform</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              We provide the most reliable and transparent review system for Discord communities
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border border-white/10 bg-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-black/30">
              <div className="mb-4 rounded-full bg-white/10 p-3 w-12 h-12 flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Verified Reviews</h3>
              <p className="text-gray-400">
                All reviews are verified from actual transactions, ensuring authenticity and trust.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg border border-white/10 bg-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-black/30">
              <div className="mb-4 rounded-full bg-white/10 p-3 w-12 h-12 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Support Tickets</h3>
              <p className="text-gray-400">
                Dedicated support system with fast response times and issue resolution tracking.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg border border-white/10 bg-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-black/30">
              <div className="mb-4 rounded-full bg-white/10 p-3 w-12 h-12 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Secure Transactions</h3>
              <p className="text-gray-400">
                Our platform ensures secure interactions between buyers and sellers in the Discord community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">10K+</div>
              <div className="mt-2 text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">50K+</div>
              <div className="mt-2 text-gray-400">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">98%</div>
              <div className="mt-2 text-gray-400">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">24/7</div>
              <div className="mt-2 text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-zinc-900 to-black p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">Ready to get started?</h2>
              <p className="mx-auto mt-4 max-w-md text-gray-400">
                Join thousands of Discord users who trust our platform for reviews and support.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/auth/login">
                  <Button size="lg" className="bg-white text-black hover:bg-white/90">
                    Create Account
                  </Button>
                </Link>
                <Link href="/vouches">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Browse Reviews
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
