"use client"
import Image from "next/image"
import { X, User, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { StarRating } from "@/components/star-rating"
import { cn } from "@/lib/utils"

interface SellerProfileCardProps {
  seller: {
    id: string
    name: string
    avatar: string
    banner: string
    rating: number
    totalVouches: number
    joinedDate: string
  }
  isOpen: boolean
  onClose: () => void
}

export function SellerProfileCard({ seller, isOpen, onClose }: SellerProfileCardProps) {
  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-80 transform overflow-hidden bg-background shadow-xl transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <Card className="h-full rounded-none border-l">
        <CardHeader className="relative p-0">
          <div className="relative h-32 w-full">
            <Image src={seller.banner || "/placeholder.svg"} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <div className="absolute -bottom-10 left-4 h-20 w-20 overflow-hidden rounded-full border-4 border-background">
            <Image src={seller.avatar || "/placeholder.svg"} alt={seller.name} fill className="object-cover" />
          </div>
        </CardHeader>
        <CardContent className="mt-12 space-y-4 p-4">
          <div>
            <h3 className="text-xl font-bold">{seller.name}</h3>
            <div className="flex items-center gap-2">
              <StarRating rating={seller.rating} size="sm" />
              <span className="text-sm text-muted-foreground">({seller.totalVouches} vouches)</span>
            </div>
          </div>

          <div className="space-y-2 rounded-lg bg-muted p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Member since</span>
              <span>{seller.joinedDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total vouches</span>
              <span>{seller.totalVouches}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Average rating</span>
              <span>{seller.rating.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 p-4">
          <Button className="flex-1 gap-1">
            <MessageSquare className="h-4 w-4" />
            Message
          </Button>
          <Button variant="outline" className="flex-1 gap-1">
            <User className="h-4 w-4" />
            Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
