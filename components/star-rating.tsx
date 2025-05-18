import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  max?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function StarRating({ rating, max = 5, size = "md", className }: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5
  const emptyStars = max - fullStars - (halfStar ? 1 : 0)

  const sizeClass = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className={cn("fill-yellow-500 text-yellow-500", sizeClass[size])} />
      ))}

      {halfStar && (
        <span className="relative">
          <Star className={cn("text-muted-foreground", sizeClass[size])} />
          <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
            <Star className={cn("fill-yellow-500 text-yellow-500", sizeClass[size])} />
          </span>
        </span>
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={cn("text-muted-foreground", sizeClass[size])} />
      ))}
    </div>
  )
}
