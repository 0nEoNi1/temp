"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock reviews data - in a real app, this would come from a database
const reviewsData = [
  {
    id: "1",
    seller: {
      id: "nitro-boost-service",
      name: "Nitro Boost Service",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    rating: 5,
    title: "Excellent Nitro Boost Service",
    content:
      "I purchased a Nitro boost for my server and it was delivered within minutes. The seller was very professional and kept me updated throughout the process. Would definitely recommend to anyone looking for a quick and reliable service.",
    date: "2 days ago",
    status: "published",
  },
  {
    id: "2",
    seller: {
      id: "custom-artwork",
      name: "Custom Artwork Studio",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    rating: 4.5,
    title: "Amazing Custom Artwork",
    content:
      "The artist created an incredible banner for my server. They were patient with my revisions and delivered exactly what I wanted. The quality exceeded my expectations!",
    date: "1 week ago",
    status: "published",
  },
  {
    id: "3",
    seller: {
      id: "gaming-coach",
      name: "Pro Gaming Coach",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    rating: 4,
    title: "Helpful Coaching Session",
    content:
      "Had a 1-hour coaching session for Valorant. The coach was knowledgeable and pointed out mistakes I didn't even notice. Already seeing improvement in my gameplay.",
    date: "2 weeks ago",
    status: "published",
  },
  {
    id: "4",
    seller: {
      id: "server-setup",
      name: "Discord Server Setup",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    rating: 4.5,
    title: "Great Server Setup",
    content:
      "Hired someone to set up my Discord server with roles, channels, and bots. They did a fantastic job organizing everything and explaining how to manage it going forward.",
    date: "3 weeks ago",
    status: "pending",
  },
]

interface UserDashboardReviewsProps {
  limit?: number
}

export function UserDashboardReviews({ limit }: UserDashboardReviewsProps) {
  const [reviews, setReviews] = useState(reviewsData)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null)

  const displayedReviews = limit ? reviews.slice(0, limit) : reviews

  const handleDeleteReview = () => {
    if (reviewToDelete) {
      setReviews(reviews.filter((review) => review.id !== reviewToDelete))
      setReviewToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <div className="space-y-4">
        {displayedReviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You haven't submitted any reviews yet.</p>
          </div>
        ) : (
          displayedReviews.map((review) => (
            <div key={review.id} className="flex flex-col space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.seller.avatar || "/placeholder.svg"} alt={review.seller.name} />
                    <AvatarFallback>{review.seller.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{review.seller.name}</h4>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {review.status === "pending" && (
                    <Badge
                      variant="outline"
                      className="text-yellow-500 border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800"
                    >
                      Pending
                    </Badge>
                  )}
                  <StarRating rating={review.rating} size="sm" />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Review
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center text-destructive focus:text-destructive"
                        onClick={() => {
                          setReviewToDelete(review.id)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Review
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div>
                <h3 className="font-medium">{review.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{review.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your review. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteReview} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
