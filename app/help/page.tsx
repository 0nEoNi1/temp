"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ChevronDown, ChevronUp, MessageSquare, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/footer"

// FAQ data structure
const faqData = {
  general: [
    {
      question: "What is DiscordVouches?",
      answer:
        "DiscordVouches is a platform that allows users to review and vouch for Discord servers, services, and sellers. It provides a trusted space for the Discord community to share experiences and find reliable services.",
    },
    {
      question: "Is DiscordVouches free to use?",
      answer:
        "Yes, basic features of DiscordVouches are free to use. We also offer premium plans with additional features for sellers and server owners who want to enhance their presence on the platform.",
    },
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking the 'Sign Up' button in the top right corner of the page. We offer Discord authentication for a seamless sign-up process.",
    },
    {
      question: "Can I delete my account?",
      answer:
        "Yes, you can delete your account from your account settings. Please note that your reviews and vouches will be anonymized but will remain on the platform to maintain the integrity of our review system.",
    },
  ],
  reviews: [
    {
      question: "How do I submit a review?",
      answer:
        "To submit a review, navigate to the seller or service page you want to review and click the 'Submit Review' button. You'll need to be logged in to submit a review.",
    },
    {
      question: "Can I edit or delete my review?",
      answer:
        "Yes, you can edit or delete your review within 48 hours of posting. After that, you'll need to contact support to make changes.",
    },
    {
      question: "Are all reviews verified?",
      answer:
        "We have a verification system in place to ensure the authenticity of reviews. Reviews from verified purchases are marked with a 'Verified' badge.",
    },
    {
      question: "What is the star rating system based on?",
      answer:
        "Our star rating system ranges from 1 to 5 stars, with 5 being the highest. Ratings are based on overall satisfaction, communication, value for money, and service quality.",
    },
    {
      question: "Why was my review rejected?",
      answer:
        "Reviews may be rejected if they violate our community guidelines, contain inappropriate content, or appear to be spam or fake. You'll receive a notification explaining why your review was rejected.",
    },
  ],
  tickets: [
    {
      question: "How do I create a support ticket?",
      answer:
        "To create a support ticket, go to the Tickets page and click the 'New Ticket' button. Fill out the required information and submit your request.",
    },
    {
      question: "What is the average response time for tickets?",
      answer:
        "Our average response time is 2-4 hours during business hours. Premium users receive priority support with faster response times.",
    },
    {
      question: "Can I track the status of my ticket?",
      answer:
        "Yes, you can track the status of your ticket in the Tickets section of your dashboard. You'll also receive email notifications when there are updates to your ticket.",
    },
    {
      question: "How do I close a ticket?",
      answer:
        "You can close a ticket by clicking the 'Close Ticket' button in the ticket details page. If your issue is resolved, we appreciate you closing the ticket to help us maintain an efficient support system.",
    },
  ],
  account: [
    {
      question: "How do I change my username or profile picture?",
      answer:
        "You can change your username or profile picture in your account settings. Go to your profile and click the 'Edit Profile' button.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "If you're logged in, you can change your password in your account settings. If you're locked out, use the 'Forgot Password' link on the login page to reset your password via email.",
    },
    {
      question: "What happens if I connect my Discord account?",
      answer:
        "Connecting your Discord account allows for seamless authentication and enables features like automatic verification of purchases made through Discord.",
    },
    {
      question: "Can I have multiple accounts?",
      answer:
        "No, our terms of service prohibit users from having multiple accounts. This policy helps maintain the integrity of our review system.",
    },
  ],
  affiliate: [
    {
      question: "How does the affiliate program work?",
      answer:
        "Our affiliate program allows you to earn commissions by referring new users to DiscordVouches. You'll receive a percentage of the revenue generated from users you refer who purchase premium plans.",
    },
    {
      question: "How much can I earn as an affiliate?",
      answer:
        "Commission rates start at 15% and can go up to 30% based on your performance. The more users you refer, the higher your commission rate.",
    },
    {
      question: "When and how do I get paid?",
      answer:
        "Payments are processed on the 1st of each month for the previous month's earnings. You can choose to receive payments via PayPal or cryptocurrency, with a minimum payout threshold of $50.",
    },
    {
      question: "Are there any restrictions on how I can promote my affiliate link?",
      answer:
        "You can promote your affiliate link on social media, your website, blog, or through email. However, spam, misleading advertising, and purchasing ads with our brand name are prohibited.",
    },
  ],
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({})
  const [activeCategory, setActiveCategory] = useState("general")

  // Toggle question open/closed state
  const toggleQuestion = (category: string, index: number) => {
    const key = `${category}-${index}`
    setOpenQuestions({
      ...openQuestions,
      [key]: !openQuestions[key],
    })
  }

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? Object.entries(faqData).reduce(
        (acc, [category, questions]) => {
          const filtered = questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          if (filtered.length > 0) {
            acc[category] = filtered
          }
          return acc
        },
        {} as Record<string, typeof faqData.general>,
      )
    : faqData

  // Check if there are any results after filtering
  const hasResults = Object.values(filteredFAQs).some((questions) => questions.length > 0)

  return (
    <main className="min-h-screen bg-black">
      {/* Header Section */}
      <section className="relative pt-24 pb-12">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h1>
              <p className="text-gray-400 mb-8">
                Find answers to common questions about DiscordVouches. Can't find what you're looking for? Contact our
                support team.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative max-w-md mx-auto mb-12"
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search for answers..."
                className="pl-10 bg-zinc-900 border-zinc-800 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {searchQuery && !hasResults ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No results found</h3>
              <p className="text-gray-400 mb-6">
                We couldn't find any FAQs matching "{searchQuery}". Try a different search term or browse our
                categories.
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")} className="border-white/20 text-white">
                Clear Search
              </Button>
            </div>
          ) : (
            <Tabs defaultValue={activeCategory} value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid max-w-2xl mx-auto grid-cols-3 md:grid-cols-5 mb-8">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="affiliate">Affiliate</TabsTrigger>
              </TabsList>

              {Object.entries(filteredFAQs).map(([category, questions]) => (
                <TabsContent key={category} value={category} className="max-w-3xl mx-auto">
                  <div className="space-y-4">
                    {questions.map((faq, index) => (
                      <Card
                        key={index}
                        className={`bg-zinc-900/50 border-zinc-800 transition-all duration-200 ${
                          openQuestions[`${category}-${index}`] ? "shadow-lg shadow-white/5" : ""
                        }`}
                      >
                        <button
                          className="w-full text-left px-6 py-4 flex items-center justify-between"
                          onClick={() => toggleQuestion(category, index)}
                        >
                          <h3 className="font-medium text-lg">{faq.question}</h3>
                          {openQuestions[`${category}-${index}`] ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                        {openQuestions[`${category}-${index}`] && (
                          <CardContent className="pt-0 pb-4">
                            <p className="text-gray-400">{faq.answer}</p>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-400">
              If you couldn't find the answer to your question, our support team is here to help.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <div className="mb-4 rounded-full bg-white/10 p-3 w-12 h-12 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Open a Support Ticket</CardTitle>
                <CardDescription>Get personalized help from our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Create a support ticket and our team will get back to you as soon as possible.
                </p>
                <Button className="w-full">
                  Create Ticket
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <div className="mb-4 rounded-full bg-white/10 p-3 w-12 h-12 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Send us an email with your question</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">Email our support team directly and we'll respond within 24 hours.</p>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  support@discordvouches.com
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
