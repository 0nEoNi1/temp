import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function AffiliateTrackerLoading() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>

      {/* Affiliate Link Card */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2">
            <Skeleton className="h-10 flex-grow" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-32" />
        </CardFooter>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent className="py-0">
              <div className="flex items-baseline">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-5 w-16 ml-2" />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Skeleton className="h-4 w-28" />
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>

      {/* Tabs Skeleton */}
      <div>
        <Skeleton className="h-10 w-full mb-4" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
