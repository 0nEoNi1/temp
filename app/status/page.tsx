"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, AlertTriangle, Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Footer } from "@/components/footer"

// Mock data for system status
const services = [
  {
    name: "API",
    status: "operational",
    uptime: 99.98,
    responseTime: "42ms",
    lastIncident: "14 days ago",
  },
  {
    name: "Website",
    status: "operational",
    uptime: 99.95,
    responseTime: "89ms",
    lastIncident: "3 days ago",
  },
  {
    name: "Database",
    status: "operational",
    uptime: 99.99,
    responseTime: "12ms",
    lastIncident: "30 days ago",
  },
  {
    name: "Authentication",
    status: "degraded",
    uptime: 98.72,
    responseTime: "210ms",
    lastIncident: "2 hours ago",
  },
  {
    name: "Payment Processing",
    status: "operational",
    uptime: 99.9,
    responseTime: "65ms",
    lastIncident: "7 days ago",
  },
  {
    name: "Discord Bot",
    status: "operational",
    uptime: 99.85,
    responseTime: "120ms",
    lastIncident: "5 days ago",
  },
]

// Mock data for incidents
const incidents = [
  {
    id: "INC-001",
    title: "Authentication Service Degradation",
    status: "investigating",
    date: "May 18, 2025",
    time: "11:30 AM",
    description:
      "We are currently investigating issues with the authentication service. Some users may experience slower login times or intermittent failures.",
    updates: [
      {
        timestamp: "May 18, 2025 11:30 AM",
        message: "We are investigating reports of authentication issues.",
      },
      {
        timestamp: "May 18, 2025 11:45 AM",
        message: "The issue has been identified as increased latency in our authentication database.",
      },
      {
        timestamp: "May 18, 2025 12:15 PM",
        message: "We are implementing a fix to address the database latency issues.",
      },
    ],
  },
  {
    id: "INC-002",
    title: "Website Performance Issues",
    status: "resolved",
    date: "May 15, 2025",
    time: "3:45 PM",
    description: "Some users experienced slow page loads and timeouts when accessing the website.",
    updates: [
      {
        timestamp: "May 15, 2025 3:45 PM",
        message: "We are investigating reports of website performance issues.",
      },
      {
        timestamp: "May 15, 2025 4:00 PM",
        message: "The issue has been identified as a problem with our CDN provider.",
      },
      {
        timestamp: "May 15, 2025 4:30 PM",
        message: "We have switched to a backup CDN and performance is returning to normal.",
      },
      {
        timestamp: "May 15, 2025 5:15 PM",
        message: "The issue has been fully resolved and all systems are operating normally.",
      },
    ],
  },
  {
    id: "INC-003",
    title: "Payment Processing Outage",
    status: "resolved",
    date: "May 11, 2025",
    time: "9:20 AM",
    description: "Payment processing was unavailable for approximately 45 minutes.",
    updates: [
      {
        timestamp: "May 11, 2025 9:20 AM",
        message: "We are investigating an issue with payment processing.",
      },
      {
        timestamp: "May 11, 2025 9:35 AM",
        message: "The issue has been identified as a problem with our payment gateway provider.",
      },
      {
        timestamp: "May 11, 2025 10:05 AM",
        message: "The payment gateway provider has resolved the issue and payments are now processing normally.",
      },
    ],
  },
]

// Mock data for uptime history
const uptimeHistory = [
  { date: "May 18", uptime: 99.72 },
  { date: "May 17", uptime: 100.0 },
  { date: "May 16", uptime: 100.0 },
  { date: "May 15", uptime: 99.85 },
  { date: "May 14", uptime: 100.0 },
  { date: "May 13", uptime: 100.0 },
  { date: "May 12", uptime: 100.0 },
  { date: "May 11", uptime: 99.62 },
  { date: "May 10", uptime: 100.0 },
  { date: "May 9", uptime: 100.0 },
  { date: "May 8", uptime: 100.0 },
  { date: "May 7", uptime: 99.95 },
  { date: "May 6", uptime: 100.0 },
  { date: "May 5", uptime: 100.0 },
]

export default function StatusPage() {
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Calculate overall system status
  const overallStatus = services.every((service) => service.status === "operational")
    ? "operational"
    : services.some((service) => service.status === "outage")
      ? "outage"
      : "degraded"

  // Calculate average uptime
  const averageUptime = services.reduce((acc, service) => acc + service.uptime, 0) / services.length

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setLastUpdated(new Date())
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "outage":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Operational</Badge>
      case "degraded":
        return <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">Degraded</Badge>
      case "outage":
        return <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30">Outage</Badge>
      case "investigating":
        return <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30">Investigating</Badge>
      case "resolved":
        return <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Resolved</Badge>
      default:
        return <Badge>Unknown</Badge>
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
                  System Status
                </span>
              </h1>
              <div className="flex items-center justify-center mb-4">
                {getStatusIcon(overallStatus)}
                <span className="ml-2 text-xl font-medium">
                  {overallStatus === "operational"
                    ? "All Systems Operational"
                    : overallStatus === "degraded"
                      ? "Some Systems Degraded"
                      : "System Outage Detected"}
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Current uptime: {averageUptime.toFixed(2)}% • Last checked:{" "}
                {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={refreshing}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing..." : "Refresh Status"}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="current">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="current">Current Status</TabsTrigger>
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
              <TabsTrigger value="uptime">Uptime</TabsTrigger>
            </TabsList>

            <TabsContent value="current">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <Card key={service.name} className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        {getStatusBadge(service.status)}
                      </div>
                      <CardDescription>Last incident: {service.lastIncident}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Uptime</span>
                          <span className="text-sm font-medium">{service.uptime}%</span>
                        </div>
                        <Progress value={service.uptime} className="h-1" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Response Time</span>
                          <span className="text-sm font-medium">{service.responseTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="incidents">
              <div className="space-y-6">
                {incidents.map((incident) => (
                  <Card key={incident.id} className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{incident.title}</CardTitle>
                          <CardDescription>
                            {incident.date} at {incident.time} • ID: {incident.id}
                          </CardDescription>
                        </div>
                        {getStatusBadge(incident.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 mb-4">{incident.description}</p>
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">Updates</h4>
                        <div className="space-y-3">
                          {incident.updates.map((update, index) => (
                            <div key={index} className="relative pl-5 pb-4">
                              {index !== incident.updates.length - 1 && (
                                <div className="absolute left-[9px] top-2 h-full w-px bg-zinc-800" />
                              )}
                              <div className="flex items-start">
                                <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-white" />
                                <div className="ml-2">
                                  <p className="text-xs text-gray-500">{update.timestamp}</p>
                                  <p className="text-sm">{update.message}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="uptime">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle>Uptime History</CardTitle>
                  <CardDescription>Last 14 days system uptime</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end gap-2">
                    {uptimeHistory.map((day, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="w-full relative">
                          <div
                            className={`w-full rounded-t-sm ${
                              day.uptime >= 99.9 ? "bg-green-500" : day.uptime >= 99.0 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ height: `${(day.uptime / 100) * 250}px` }}
                          ></div>
                          <div className="absolute bottom-1 left-0 right-0 text-center text-xs font-medium text-white">
                            {day.uptime.toFixed(1)}%
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 rotate-45 origin-left">{day.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">30-Day Uptime</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">99.95%</div>
                    <p className="text-sm text-gray-400">3h 39m of downtime</p>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">90-Day Uptime</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">99.98%</div>
                    <p className="text-sm text-gray-400">4h 22m of downtime</p>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-900/50 border-zinc-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">12-Month Uptime</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">99.92%</div>
                    <p className="text-sm text-gray-400">7h 12m of downtime</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-zinc-900 to-black rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-6">Subscribe to receive notifications about system status and incidents.</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-white"
              />
              <Button className="bg-white text-black hover:bg-white/90">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
