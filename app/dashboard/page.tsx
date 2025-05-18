"use client"

import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { UserDashboardReviews } from "@/components/user-dashboard-reviews"
import { UserDashboardStats } from "@/components/user-dashboard-stats"

export default function DashboardPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Manage your reviews and view your activity.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Suspense fallback={<StatsGridSkeleton />}>
            <UserDashboardStats />
          </Suspense>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>Your most recent reviews and vouches.</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense
                  fallback={
                    <div className="space-y-4">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2 flex-1">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-3 w-full" />
                            </div>
                          </div>
                        ))}
                    </div>
                  }
                >
                  <UserDashboardReviews limit={3} />
                </Suspense>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => document.querySelector('[data-value="reviews"]')?.click()}
                >
                  View All Reviews
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Tickets</CardTitle>
                <CardDescription>Your most recent support tickets.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div
                          className={`h-2 w-2 mt-2 rounded-full ${i % 3 === 0 ? "bg-green-500" : i % 3 === 1 ? "bg-yellow-500" : "bg-gray-500"}`}
                        />
                        <div className="space-y-1 flex-1">
                          <p className="font-medium">
                            {i % 3 === 0 ? "Login Issue" : i % 3 === 1 ? "Payment Failed" : "Feature Request"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Ticket #{1234 + i} • {i % 3 === 0 ? "Open" : i % 3 === 1 ? "Pending" : "Closed"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {i % 3 === 0 ? "2 days ago" : i % 3 === 1 ? "1 week ago" : "2 weeks ago"}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => document.querySelector('[data-value="tickets"]')?.click()}
                >
                  View All Tickets
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>My Reviews</CardTitle>
              <CardDescription>Manage all your reviews and vouches.</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense
                fallback={
                  <div className="space-y-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-full" />
                            <div className="flex gap-2">
                              <Skeleton className="h-8 w-20" />
                              <Skeleton className="h-8 w-20" />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                }
              >
                <UserDashboardReviews />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>My Tickets</CardTitle>
              <CardDescription>View and manage your support tickets.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-3 w-3 rounded-full ${i % 3 === 0 ? "bg-green-500" : i % 3 === 1 ? "bg-yellow-500" : "bg-gray-500"}`}
                          />
                          <div>
                            <h4 className="font-medium">
                              {i % 5 === 0
                                ? "Login Issue"
                                : i % 5 === 1
                                  ? "Payment Failed"
                                  : i % 5 === 2
                                    ? "Feature Request"
                                    : i % 5 === 3
                                      ? "Account Verification"
                                      : "Billing Question"}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Ticket #{1234 + i} • Created {i + 1} days ago
                            </p>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                              i % 3 === 0
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : i % 3 === 1
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                          >
                            {i % 3 === 0 ? "Open" : i % 3 === 1 ? "Pending" : "Closed"}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {i % 5 === 0
                          ? "I'm having trouble logging into my account. I've tried resetting my password but it's not working."
                          : i % 5 === 1
                            ? "My payment for the premium subscription failed. Can you help me resolve this issue?"
                            : i % 5 === 2
                              ? "Would it be possible to add dark mode to the application? It would be much easier on the eyes."
                              : i % 5 === 3
                                ? "I need help verifying my account. I've submitted all the required documents."
                                : "I have a question about my recent invoice. There seems to be a discrepancy in the charges."}
                      </p>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {i % 3 !== 2 && <Button size="sm">Reply</Button>}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}

function StatsGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="mt-1 h-3 w-20" />
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
