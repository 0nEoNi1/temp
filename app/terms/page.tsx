"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null)
    } else {
      setActiveSection(section)
    }
  }

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
                  Terms & Policies
                </span>
              </h1>
              <p className="text-gray-400 mb-8">
                Last updated: May 15, 2025. Please read these terms carefully before using our services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="terms" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            </TabsList>

            <TabsContent value="terms" className="bg-zinc-900/30 rounded-lg p-6 border border-zinc-800">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                <p className="text-gray-400 mb-6">
                  These Terms of Service ("Terms") govern your access to and use of DiscordVouches, including any
                  content, functionality, and services offered on or through our website (the "Service").
                </p>

                <div className="space-y-4">
                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("acceptance")}
                    >
                      <span>1. Acceptance of Terms</span>
                      {activeSection === "acceptance" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "acceptance" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">
                          By accessing or using the Service, you agree to be bound by these Terms. If you do not agree
                          to these Terms, you may not access or use the Service.
                        </p>
                        <p>
                          We may revise these Terms at any time by updating this page. You are expected to check this
                          page from time to time to take notice of any changes we made, as they are binding on you.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("account")}
                    >
                      <span>2. Account Registration</span>
                      {activeSection === "account" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "account" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">
                          To access certain features of the Service, you may be required to register for an account. You
                          agree to provide accurate, current, and complete information during the registration process
                          and to update such information to keep it accurate, current, and complete.
                        </p>
                        <p className="mb-4">
                          You are responsible for safeguarding your password and for all activities that occur under
                          your account. You agree not to disclose your password to any third party. You must notify us
                          immediately if you suspect any unauthorized use of your account or access to your password.
                        </p>
                        <p>
                          We reserve the right to terminate your account if you violate any provision of these Terms or
                          if you create risk or possible legal exposure for us.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("content")}
                    >
                      <span>3. User Content</span>
                      {activeSection === "content" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "content" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">
                          Our Service allows you to post, link, store, share and otherwise make available certain
                          information, text, graphics, videos, or other material ("Content"). You are responsible for
                          the Content that you post on or through the Service, including its legality, reliability, and
                          appropriateness.
                        </p>
                        <p className="mb-4">
                          By posting Content on or through the Service, you represent and warrant that: (i) the Content
                          is yours (you own it) and/or you have the right to use it and the right to grant us the rights
                          and license as provided in these Terms, and (ii) that the posting of your Content on or
                          through the Service does not violate the privacy rights, publicity rights, copyrights,
                          contract rights or any other rights of any person or entity.
                        </p>
                        <p>
                          We reserve the right to remove any Content from the Service at any time, for any reason
                          (including, but not limited to, if someone alleges you contributed that Content in violation
                          of these Terms), in our sole discretion, and without notice.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("reviews")}
                    >
                      <span>4. Reviews and Ratings</span>
                      {activeSection === "reviews" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "reviews" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">
                          The Service allows users to post reviews and ratings of Discord servers, services, and
                          sellers. All reviews and ratings must be honest, accurate, and based on personal experience.
                        </p>
                        <p className="mb-4">
                          You agree not to post fake or misleading reviews, or reviews that are intended to damage the
                          reputation of a seller or service without legitimate cause. You also agree not to post reviews
                          in exchange for payment or other incentives unless such relationship is clearly disclosed in
                          the review.
                        </p>
                        <p>
                          We reserve the right to remove any review that violates these Terms or our community
                          guidelines, at our sole discretion and without notice.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("prohibited")}
                    >
                      <span>5. Prohibited Uses</span>
                      {activeSection === "prohibited" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "prohibited" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">You agree not to use the Service:</p>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                          <li>In any way that violates any applicable federal, state, local, or international law</li>
                          <li>
                            To transmit, or procure the sending of, any advertising or promotional material, including
                            any "junk mail," "chain letter," "spam," or any other similar solicitation
                          </li>
                          <li>
                            To impersonate or attempt to impersonate DiscordVouches, a DiscordVouches employee, another
                            user, or any other person or entity
                          </li>
                          <li>
                            To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the
                            Service, or which, as determined by us, may harm DiscordVouches or users of the Service or
                            expose them to liability
                          </li>
                        </ul>
                        <p>
                          Additionally, you agree not to use the Service to post or transmit any content that is
                          unlawful, threatening, abusive, harassing, defamatory, vulgar, obscene, pornographic, or that
                          contains any material that could give rise to civil or criminal liability under applicable
                          laws.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("termination")}
                    >
                      <span>6. Termination</span>
                      {activeSection === "termination" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "termination" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">
                          We may terminate or suspend your account and bar access to the Service immediately, without
                          prior notice or liability, under our sole discretion, for any reason whatsoever and without
                          limitation, including but not limited to a breach of the Terms.
                        </p>
                        <p>
                          If you wish to terminate your account, you may simply discontinue using the Service, or
                          contact us to request account deletion.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("disclaimer")}
                    >
                      <span>7. Disclaimer</span>
                      {activeSection === "disclaimer" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "disclaimer" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">
                          THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. DISCORDVOUCHES AND ITS
                          AFFILIATES, SUBSIDIARIES, PARTNERS, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS EXPRESSLY
                          DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO
                          THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                          NON-INFRINGEMENT.
                        </p>
                        <p>
                          DISCORDVOUCHES MAKES NO WARRANTY THAT (I) THE SERVICE WILL MEET YOUR REQUIREMENTS, (II) THE
                          SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, (III) THE RESULTS THAT MAY BE
                          OBTAINED FROM THE USE OF THE SERVICE WILL BE ACCURATE OR RELIABLE, OR (IV) THE QUALITY OF ANY
                          PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE
                          SERVICE WILL MEET YOUR EXPECTATIONS.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("limitation")}
                    >
                      <span>8. Limitation of Liability</span>
                      {activeSection === "limitation" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "limitation" && (
                      <div className="py-4 text-gray-400">
                        <p>
                          IN NO EVENT SHALL DISCORDVOUCHES, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE TO
                          YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES
                          WHATSOEVER RESULTING FROM ANY (I) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT, (II) PERSONAL
                          INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF
                          OUR SERVICE, (III) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL
                          PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (IV) ANY INTERRUPTION OR
                          CESSATION OF TRANSMISSION TO OR FROM OUR SERVICE, (IV) ANY BUGS, VIRUSES, TROJAN HORSES, OR
                          THE LIKE, WHICH MAY BE TRANSMITTED TO OR THROUGH OUR SERVICE BY ANY THIRD PARTY, AND/OR (V)
                          ANY ERRORS OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A
                          RESULT OF YOUR USE OF ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE
                          VIA THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, AND
                          WHETHER OR NOT THE COMPANY IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("governing")}
                    >
                      <span>9. Governing Law</span>
                      {activeSection === "governing" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "governing" && (
                      <div className="py-4 text-gray-400">
                        <p>
                          These Terms shall be governed and construed in accordance with the laws of [Your
                          Jurisdiction], without regard to its conflict of law provisions. Our failure to enforce any
                          right or provision of these Terms will not be considered a waiver of those rights.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("changes")}
                    >
                      <span>10. Changes to Terms</span>
                      {activeSection === "changes" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "changes" && (
                      <div className="py-4 text-gray-400">
                        <p>
                          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If
                          a revision is material we will provide at least 30 days' notice prior to any new terms taking
                          effect. What constitutes a material change will be determined at our sole discretion. By
                          continuing to access or use our Service after any revisions become effective, you agree to be
                          bound by the revised terms.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("contact")}
                    >
                      <span>11. Contact Us</span>
                      {activeSection === "contact" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "contact" && (
                      <div className="py-4 text-gray-400">
                        <p>
                          If you have any questions about these Terms, please contact us at legal@discordvouches.com.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="bg-zinc-900/30 rounded-lg p-6 border border-zinc-800">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                <p className="text-gray-400 mb-6">
                  This Privacy Policy describes how DiscordVouches ("we", "our", or "us") collects, uses, and shares
                  your personal information when you use our website (the "Service").
                </p>

                <div className="space-y-4">
                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("information")}
                    >
                      <span>1. Information We Collect</span>
                      {activeSection === "information" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "information" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">
                          We collect several types of information from and about users of our Service, including:
                        </p>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                          <li>
                            <strong>Personal Information:</strong> This includes your name, email address, Discord
                            username, and profile picture.
                          </li>
                          <li>
                            <strong>Usage Data:</strong> Information about how you use our Service, including your
                            browsing history, search queries, and interaction with features.
                          </li>
                          <li>
                            <strong>Device Information:</strong> Information about the device you use to access our
                            Service, including IP address, browser type, and operating system.
                          </li>
                          <li>
                            <strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking
                            technologies to track activity on our Service and hold certain information.
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("use")}
                    >
                      <span>2. How We Use Your Information</span>
                      {activeSection === "use" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "use" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">We use the information we collect to:</p>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                          <li>Provide, maintain, and improve our Service</li>
                          <li>Process and complete transactions, and send related information</li>
                          <li>
                            Send transactional messages, including confirmations, technical notices, updates, security
                            alerts, and support messages
                          </li>
                          <li>Respond to comments, questions, and requests, and provide customer service</li>
                          <li>
                            Communicate with you about products, services, offers, promotions, and events, and provide
                            other news or information about us and our partners
                          </li>
                          <li>Monitor and analyze trends, usage, and activities in connection with our Service</li>
                          <li>
                            Detect, investigate, and prevent fraudulent transactions and other illegal activities and
                            protect the rights and property of DiscordVouches and others
                          </li>
                          <li>
                            Personalize and improve the Service and provide content or features that match user profiles
                            or interests
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("sharing")}
                    >
                      <span>3. Sharing Your Information</span>
                      {activeSection === "sharing" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "sharing" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">We may share your personal information in the following situations:</p>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                          <li>
                            <strong>With Service Providers:</strong> We may share your information with third-party
                            vendors, service providers, contractors, or agents who perform services for us.
                          </li>
                          <li>
                            <strong>With Business Partners:</strong> We may share your information with our business
                            partners to offer you certain products, services, or promotions.
                          </li>
                          <li>
                            <strong>With Other Users:</strong> When you share personal information or otherwise interact
                            in public areas with other users, such information may be viewed by all users and may be
                            publicly distributed.
                          </li>
                          <li>
                            <strong>With Your Consent:</strong> We may disclose your personal information for any other
                            purpose with your consent.
                          </li>
                          <li>
                            <strong>For Legal Reasons:</strong> We may disclose your information where required to do so
                            by law or in response to valid requests by public authorities.
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("cookies")}
                    >
                      <span>4. Cookies and Tracking Technologies</span>
                      {activeSection === "cookies" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "cookies" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">
                          We use cookies and similar tracking technologies to track activity on our Service and hold
                          certain information. Cookies are files with a small amount of data which may include an
                          anonymous unique identifier.
                        </p>
                        <p className="mb-4">
                          You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                          sent. However, if you do not accept cookies, you may not be able to use some portions of our
                          Service.
                        </p>
                        <p>We use the following types of cookies:</p>
                        <ul className="list-disc pl-5 mb-4 space-y-2 mt-2">
                          <li>
                            <strong>Essential Cookies:</strong> These cookies are necessary for the Service to function
                            properly and cannot be switched off in our systems.
                          </li>
                          <li>
                            <strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic
                            sources so we can measure and improve the performance of our Service.
                          </li>
                          <li>
                            <strong>Functional Cookies:</strong> These cookies enable the Service to provide enhanced
                            functionality and personalization.
                          </li>
                          <li>
                            <strong>Targeting Cookies:</strong> These cookies may be set through our Service by our
                            advertising partners to build a profile of your interests.
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("data-security")}
                    >
                      <span>5. Data Security</span>
                      {activeSection === "data-security" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "data-security" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">
                          The security of your personal information is important to us, but remember that no method of
                          transmission over the Internet or method of electronic storage is 100% secure.
                        </p>
                        <p className="mb-4">
                          We implement appropriate technical and organizational measures to protect your personal
                          information against unauthorized or unlawful processing, accidental loss, destruction, or
                          damage.
                        </p>
                        <p>
                          We limit access to your personal information to those employees, agents, contractors, and
                          other third parties who have a business need to know. They will only process your personal
                          information on our instructions, and they are subject to a duty of confidentiality.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("data-retention")}
                    >
                      <span>6. Data Retention</span>
                      {activeSection === "data-retention" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "data-retention" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">
                          We will retain your personal information only for as long as is necessary for the purposes set
                          out in this Privacy Policy. We will retain and use your information to the extent necessary to
                          comply with our legal obligations, resolve disputes, and enforce our policies.
                        </p>
                        <p>
                          If you request deletion of your account, we will delete your personal information from our
                          active databases. However, some information may be retained in our files to prevent fraud,
                          troubleshoot problems, assist with investigations, enforce our Terms of Service, or comply
                          with legal requirements.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("your-rights")}
                    >
                      <span>7. Your Rights</span>
                      {activeSection === "your-rights" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "your-rights" && (
                      <div className="py-4 text-gray-400">
                        <p className="mb-4">
                          Depending on your location, you may have certain rights regarding your personal information,
                          including:
                        </p>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                          <li>The right to access the personal information we have about you</li>
                          <li>The right to request correction of inaccurate personal information</li>
                          <li>The right to request deletion of your personal information</li>
                          <li>The right to object to processing of your personal information</li>
                          <li>The right to data portability</li>
                          <li>The right to withdraw consent</li>
                        </ul>
                        <p>
                          To exercise any of these rights, please contact us at privacy@discordvouches.com. We may ask
                          you to verify your identity before responding to such requests.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("children")}
                    >
                      <span>8. Children's Privacy</span>
                      {activeSection === "children" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "children" && (
                      <div className="py-4 text-gray-400">
                        <p>
                          Our Service is not intended for use by children under the age of 13. We do not knowingly
                          collect personally identifiable information from children under 13. If you are a parent or
                          guardian and you are aware that your child has provided us with personal information, please
                          contact us. If we become aware that we have collected personal information from children
                          without verification of parental consent, we take steps to remove that information from our
                          servers.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("changes-privacy")}
                    >
                      <span>9. Changes to This Privacy Policy</span>
                      {activeSection === "changes-privacy" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "changes-privacy" && (
                      <div className="py-4 text-gray-400">
                        <p>
                          We may update our Privacy Policy from time to time. We will notify you of any changes by
                          posting the new Privacy Policy on this page and updating the "Last updated" date at the top of
                          this Privacy Policy. You are advised to review this Privacy Policy periodically for any
                          changes. Changes to this Privacy Policy are effective when they are posted on this page.
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      className="flex w-full items-center justify-between text-left font-medium text-lg py-2 border-b border-zinc-800"
                      onClick={() => toggleSection("contact-privacy")}
                    >
                      <span>10. Contact Us</span>
                      {activeSection === "contact-privacy" ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === "contact-privacy" && (
                      <div className="py-4 text-gray-400">
                        <p>
                          If you have any questions about this Privacy Policy, please contact us at
                          privacy@discordvouches.com.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Print Version */}
      <section className="py-8">
        <div className="container mx-auto px-4 text-center">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Print Version
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
