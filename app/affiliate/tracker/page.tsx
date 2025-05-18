"use client"

import { useState } from "react"
import { ArrowUpRight, Copy, DollarSign, Download, Link, LineChart, Share2, TrendingUp, Users } from "lucide-react"
import { NumberCounter } from "@/components/number-counter"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Mock data for the affiliate tracker
const affiliateStats = {
  totalReferrals: 124,
  activeReferrals: 87,
  totalEarnings: 1250.75,
  pendingPayouts: 320.5,
  conversionRate: 32.5,
  clickCount: 384,
}

const referralHistory = [
  { id: 1, user: "john_doe", date: "2025-05-12", status: "active", earnings: 45.0 },
  { id: 2, user: "alice_smith", date: "2025-05-10", status: "active", earnings: 32.5 },
  { id: 3, user: "robert_johnson", date: "2025-05-08", status: "inactive", earnings: 18.25 },
  { id: 4, user: "emma_wilson", date: "2025-05-05", status: "active", earnings: 56.75 },
  { id: 5, user: "michael_brown", date: "2025-05-01", status: "active", earnings: 29.0 },
  { id: 6, user: "sophia_miller", date: "2025-04-28", status: "inactive", earnings: 0.0 },
  { id: 7, user: "william_davis", date: "2025-04-25", status: "active", earnings: 41.25 },
  { id: 8, user: "olivia_garcia", date: "2025-04-22", status: "pending", earnings: 15.5 },
]

const payoutHistory = [
  { id: 101, amount: 250.0, date: "2025-05-01", status: "completed", method: "PayPal" },
  { id: 102, amount: 175.5, date: "2025-04-01", status: "completed", method: "Bank Transfer" },
  { id: 103, amount: 320.25, date: "2025-03-01", status: "completed", method: "PayPal" },
  { id: 104, amount: 195.0, date: "2025-02-01", status: "completed", method: "Crypto" },
]

export default function AffiliateTrackerPage() {
  const [affiliateLink, setAffiliateLink] = useState("https://vouches.app/ref/user123")
  const [timeframe, setTimeframe] = useState("30d")
  const { toast } = useToast()

  const copyAffiliateLink = () => {
    navigator.clipboard.writeText(affiliateLink)
    toast({
      title: "Link copied!",
      description: "Your affiliate link has been copied to clipboard.",
    })
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Affiliate Tracker</h1>
          <p className="text-muted-foreground">Monitor your referrals, earnings, and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Affiliate Link Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Link className="mr-2 h-5 w-5" />
            Your Affiliate Link
          </CardTitle>
          <CardDescription>Share this link to earn commissions on referrals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <Input value={affiliateLink} onChange={(e) => setAffiliateLink(e.target.value)} className="pr-10" />
            </div>
            <div className="flex gap-2">
              <Button onClick={copyAffiliateLink} className="flex-shrink-0">
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" className="flex-shrink-0">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <Badge variant="outline" className="bg-primary/5">
            10% commission on all referrals
          </Badge>
          <Badge variant="outline" className="bg-primary/5">
            30-day cookie duration
          </Badge>
          <Badge variant="outline" className="bg-primary/5">
            Instant tracking
          </Badge>
        </CardFooter>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Referrals</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="flex items-baseline">
              <div className="text-3xl font-bold">
                <NumberCounter end={affiliateStats.totalReferrals} />
              </div>
              <Badge className="ml-2 bg-green-500/10 text-green-500 hover:bg-green-500/20">
                <TrendingUp className="mr-1 h-3 w-3" />
                12%
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <p className="text-xs text-muted-foreground flex items-center">
              <Users className="mr-1 h-3 w-3" />
              <span className="font-medium text-foreground">{affiliateStats.activeReferrals}</span> active users
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="flex items-baseline">
              <div className="text-3xl font-bold">
                $<NumberCounter end={affiliateStats.totalEarnings} decimals={2} />
              </div>
              <Badge className="ml-2 bg-green-500/10 text-green-500 hover:bg-green-500/20">
                <TrendingUp className="mr-1 h-3 w-3" />
                8.5%
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <p className="text-xs text-muted-foreground flex items-center">
              <DollarSign className="mr-1 h-3 w-3" />
              <span className="font-medium text-foreground">${affiliateStats.pendingPayouts.toFixed(2)}</span> pending
              payout
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent className="py-0">
            <div className="flex items-baseline">
              <div className="text-3xl font-bold">
                <NumberCounter end={affiliateStats.conversionRate} decimals={1} />%
              </div>
              <Badge className="ml-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                <TrendingUp className="mr-1 h-3 w-3" />
                2.1%
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span className="font-medium text-foreground">{affiliateStats.clickCount}</span> total clicks
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Track your referrals and earnings over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="flex flex-col items-center text-muted-foreground">
            <LineChart className="h-16 w-16 mb-2" />
            <p>Performance chart visualization</p>
            <p className="text-sm">(Interactive chart would be implemented here)</p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Referrals and Payouts */}
      <Tabs defaultValue="referrals">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="referrals">Referral History</TabsTrigger>
          <TabsTrigger value="payouts">Payout History</TabsTrigger>
        </TabsList>

        <TabsContent value="referrals">
          <Card>
            <CardHeader>
              <CardTitle>Referral History</CardTitle>
              <CardDescription>Track all your referred users and their activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Earnings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referralHistory.map((referral) => (
                      <TableRow key={referral.id}>
                        <TableCell className="font-medium">{referral.user}</TableCell>
                        <TableCell>{referral.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              referral.status === "active"
                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                : referral.status === "pending"
                                  ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                                  : "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
                            }
                          >
                            {referral.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${referral.earnings.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payouts">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>Track all your earnings and payment status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payoutHistory.map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell className="font-medium">#{payout.id}</TableCell>
                        <TableCell>{payout.date}</TableCell>
                        <TableCell>{payout.method}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              payout.status === "completed"
                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                : payout.status === "pending"
                                  ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                                  : "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
                            }
                          >
                            {payout.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">${payout.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Marketing Materials */}
      <Card>
        <CardHeader>
          <CardTitle>Marketing Materials</CardTitle>
          <CardDescription>Promotional assets to help boost your referrals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4 flex flex-col">
                <div className="bg-muted h-32 rounded-md mb-4 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Banner {i}</p>
                </div>
                <div className="mt-auto flex justify-between">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button size="sm">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
