import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export function RatingSidebar() {
  const ratings = [
    { stars: 5, count: 124, percentage: 65 },
    { stars: 4, count: 45, percentage: 23 },
    { stars: 3, count: 15, percentage: 8 },
    { stars: 2, count: 5, percentage: 3 },
    { stars: 1, count: 2, percentage: 1 },
  ]

  const totalReviews = ratings.reduce((acc, curr) => acc + curr.count, 0)
  const averageRating = ratings.reduce((acc, curr) => acc + curr.stars * curr.count, 0) / totalReviews

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Rating Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col items-center">
          <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
          <StarRating rating={averageRating} size="lg" className="mb-1 mt-2" />
          <div className="text-sm text-muted-foreground">{totalReviews} reviews</div>
        </div>

        <div className="space-y-2">
          {ratings.map((rating) => (
            <Button key={rating.stars} variant="ghost" className="h-auto w-full justify-start p-1 hover:bg-muted">
              <div className="flex w-full items-center gap-2">
                <div className="w-12 text-sm">{rating.stars} stars</div>
                <Progress value={rating.percentage} className="h-2 flex-1" />
                <div className="w-8 text-right text-xs text-muted-foreground">{rating.count}</div>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-medium">Filter by Rating</h4>
          <div className="flex flex-wrap gap-1">
            {[5, 4, 3, 2, 1].map((stars) => (
              <Button key={stars} variant="outline" size="sm" className="h-8 min-w-8 px-2">
                {stars}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
