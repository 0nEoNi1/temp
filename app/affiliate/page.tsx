"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, ArrowRight, DollarSign, Users, Gift, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/footer"

export default function AffiliatePage() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const affiliateLink = "https://discordvouches.com/ref/user123"

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                  Earn While You Share
                </span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Join our affiliate program and earn commissions by referring users to our platform. Share your unique
                link and get rewarded for every new user who signs up.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-full max-w-md mb-6">
                <Input value={affiliateLink} readOnly className="pr-12 bg-zinc-900 border-zinc-800 text-white" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <Button size="lg" className="bg-white text-black hover:bg-white/90 group">
                <span>Start Earning Now</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our affiliate program is designed to be simple and rewarding. Follow these steps to start earning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <div className="mb-4 rounded-full bg-white/10 p-3 w-12 h-12 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create your account and get your unique affiliate link instantly.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <div className="mb-4 rounded-full bg-white/10 p-3 w-12 h-12 flex items-center justify-center">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Share Your Link</CardTitle>
                <CardDescription>
                  Share your unique affiliate link with friends, on social media, or your website.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <div className="mb-4 rounded-full bg-white/10 p-3 w-12 h-12 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Earn Rewards</CardTitle>
                <CardDescription>Earn up to 30% commission on every purchase made by users you refer.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-16 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Commission Structure</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We offer competitive commission rates that increase as you refer more users.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tiers">Commission Tiers</TabsTrigger>
                <TabsTrigger value="payouts">Payouts</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
                <h3 className="text-xl font-bold mb-4">Program Overview</h3>
                <p className="text-gray-400 mb-4">
                  Our affiliate program offers a tiered commission structure, with rates starting at 15% and going up to
                  30% based on your performance.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-white" />
                    Commissions on all purchases made by your referrals
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-white" />
                    30-day cookie duration
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-white" />
                    Monthly payouts via PayPal or crypto
                  </li>
                  <li className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-white" />
                    Detailed analytics and reporting
                  </li>
                </ul>
              </TabsContent>

              <TabsContent value="tiers" className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
                <h3 className="text-xl font-bold mb-4">Commission Tiers</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border border-zinc-800 rounded-lg">
                    <div>
                      <p className="font-medium">Starter</p>
                      <p className="text-sm text-gray-400">1-10 referrals per month</p>
                    </div>
                    <div className="text-xl font-bold">15%</div>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-zinc-800 rounded-lg">
                    <div>
                      <p className="font-medium">Pro</p>
                      <p className="text-sm text-gray-400">11-30 referrals per month</p>
                    </div>
                    <div className="text-xl font-bold">20%</div>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-zinc-800 rounded-lg">
                    <div>
                      <p className="font-medium">Elite</p>
                      <p className="text-sm text-gray-400">31-50 referrals per month</p>
                    </div>
                    <div className="text-xl font-bold">25%</div>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-zinc-800 rounded-lg bg-white/5">
                    <div>
                      <p className="font-medium">Diamond</p>
                      <p className="text-sm text-gray-400">51+ referrals per month</p>
                    </div>
                    <div className="text-xl font-bold">30%</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payouts" className="bg-zinc-900/50 rounded-lg p-6 border border-zinc-800">
                <h3 className="text-xl font-bold mb-4">Payout Information</h3>
                <p className="text-gray-400 mb-4">
                  We process payouts on the 1st of every month for the previous month's earnings.
                </p>
                <div className="space-y-4">
                  <div className="p-3 border border-zinc-800 rounded-lg">
                    <p className="font-medium mb-1">Minimum Payout</p>
                    <p className="text-gray-400">$50 USD</p>
                  </div>
                  <div className="p-3 border border-zinc-800 rounded-lg">
                    <p className="font-medium mb-1">Payment Methods</p>
                    <p className="text-gray-400">PayPal, Bitcoin, Ethereum</p>
                  </div>
                  <div className="p-3 border border-zinc-800 rounded-lg">
                    <p className="font-medium mb-1">Payment Schedule</p>
                    <p className="text-gray-400">Monthly (1st of each month)</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about our affiliate program.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-4 border border-zinc-800 rounded-lg">
              <h3 className="font-bold mb-2">How do I join the affiliate program?</h3>
              <p className="text-gray-400">
                Simply create an account on our platform and navigate to the Affiliate section in your dashboard. Accept
                the terms and conditions, and you'll receive your unique affiliate link.
              </p>
            </div>
            <div className="p-4 border border-zinc-800 rounded-lg">
              <h3 className="font-bold mb-2">How are referrals tracked?</h3>
              <p className="text-gray-400">
                We use cookies to track referrals. When someone clicks on your affiliate link, a cookie is placed in
                their browser that lasts for 30 days. If they make a purchase within that time, you'll receive credit.
              </p>
            </div>
            <div className="p-4 border border-zinc-800 rounded-lg">
              <h3 className="font-bold mb-2">When and how will I get paid?</h3>
              <p className="text-gray-400">
                Payments are processed on the 1st of each month for the previous month's earnings. You can choose to
                receive payments via PayPal or cryptocurrency, with a minimum payout threshold of $50.
              </p>
            </div>
            <div className="p-4 border border-zinc-800 rounded-lg">
              <h3 className="font-bold mb-2">Can I promote the affiliate program on social media?</h3>
              <p className="text-gray-400">
                Yes, you can promote your affiliate link on social media, your website, blog, or through email. However,
                please ensure you comply with our terms and conditions regarding promotional methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-zinc-900 to-black rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Join our affiliate program today and start earning commissions on every referral. It's free to join and
              easy to get started.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              Become an Affiliate
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
