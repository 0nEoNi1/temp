"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/star-rating"
import { VerifiedBadge } from "@/components/verified-badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface VouchCardProps {
  vouch: {
    id: string
    title: string
    content: string
    rating: number
    date: string
    tags: string[]
    likes: number
    user: {
      name: string
      avatar: string
      verified: boolean
    }
    sellerId?: string
  }
}

export function VouchCard({ vouch }: VouchCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(vouch.likes)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const { toast } = useToast()

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleReport = () => {
    setReportDialogOpen(false)

    toast({
      title: "Report submitted",
      description: "Thank you for your report. We'll review it shortly.",
    })

    setReportReason("")
  }

  const isLongContent = vouch.content.length > 150
  const displayContent = expanded || !isLongContent ? vouch.content : `${vouch.content.substring(0, 150)}...`

  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-md dark:hover:shadow-primary/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Image
                src={vouch.user.avatar || "/placeholder.svg"}
                alt={vouch.user.name}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium font-sans">{vouch.user.name}</span>
              {vouch.user.verified && <VerifiedBadge />}
            </div>
          </div>
          <StarRating rating={vouch.rating} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <h3 className="mb-1 font-heading text-base font-bold">{vouch.title}</h3>
        <p className="text-sm text-muted-foreground font-sans">
          {displayContent}
          {isLongContent && !expanded && (
            <Button
              variant="link"
              className="h-auto p-0 text-xs font-medium text-primary"
              onClick={() => setExpanded(true)}
            >
              Read more
            </Button>
          )}
          {isLongContent && expanded && (
            <Button
              variant="link"
              className="h-auto p-0 text-xs font-medium text-primary"
              onClick={() => setExpanded(false)}
            >
              Show less
            </Button>
          )}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {vouch.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full px-2 py-0 text-xs font-sans">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Review</DialogTitle>
            <DialogDescription>
              Please let us know why you're reporting this review. We take reports seriously and will review it
              promptly.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Please explain why you're reporting this review..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="min-h-[100px] font-sans"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReport} disabled={!reportReason.trim()}>
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
