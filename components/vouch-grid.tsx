"use client"

import { useState, useEffect } from "react"
import { VouchCard } from "@/components/vouch-card"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for vouches
const MOCK_VOUCHES = [
  {
    id: "1",
    title: "Excellent Nitro Boost Service",
    content:
      "I purchased a Nitro boost for my server and it was delivered within minutes. The seller was very professional and kept me updated throughout the process. Would definitely recommend to anyone looking for a quick and reliable service.",
    rating: 5,
    date: "2 days ago",
    tags: ["Fast Delivery", "Great Communication"],
    likes: 24,
    user: {
      name: "DiscordUser123",
      avatar: "/placeholder.svg?height=80&width=80",
      verified: true,
    },
    sellerId: "nitro-boost-service",
  },
  {
    id: "2",
    title: "Good Value Game Keys",
    content:
      "Bought a few game keys, all worked perfectly. Prices were better than most other places I checked. Delivery was quick too.",
    rating: 4.5,
    date: "1 week ago",
    tags: ["Game Keys", "Good Value"],
    likes: 18,
    user: {
      name: "GamerPro99",
      avatar: "/placeholder.svg?height=80&width=80",
      verified: true,
    },
    sellerId: "game-keys",
  },
  {
    id: "3",
    title: "Amazing Custom Artwork",
    content:
      "The artist created an incredible banner for my server. They were patient with my revisions and delivered exactly what I wanted. The quality exceeded my expectations!",
    rating: 5,
    date: "3 days ago",
    tags: ["Artwork", "Custom Design"],
    likes: 32,
    user: {
      name: "CreativeMinds",
      avatar: "/placeholder.svg?height=80&width=80",
      verified: true,
    },
    sellerId: "custom-artwork",
  },
  {
    id: "4",
    title: "Coaching Session Was Helpful",
    content:
      "Had a 1-hour coaching session for Valorant. The coach was knowledgeable and pointed out mistakes I didn't even notice. Already seeing improvement in my gameplay.",
    rating: 4,
    date: "5 days ago",
    tags: ["Coaching", "Gaming"],
    likes: 15,
    user: {
      name: "ValorantNewbie",
      avatar: "/placeholder.svg?height=80&width=80",
      verified: false,
    },
    sellerId: "gaming-coach",
  },
  {
    id: "5",
    title: "Server Setup Service",
    content:
      "Hired someone to set up my Discord server with roles, channels, and bots. They did a fantastic job organizing everything and explaining how to manage it going forward.",
    rating: 4.5,
    date: "2 weeks ago",
    tags: ["Server Setup", "Professional"],
    likes: 27,
    user: {
      name: "ServerOwner22",
      avatar: "/placeholder.svg?height=80&width=80",
      verified: true,
    },
    sellerId: "server-setup",
  },
  {
    id: "6",
    title: "Decent Bot Development",
    content:
      "Commissioned a custom bot for my server. It works as expected, though there were some delays in delivery. The developer was responsive to bug fixes after delivery.",
    rating: 3.5,
    date: "1 month ago",
    tags: ["Bot Development", "Custom Code"],
    likes: 9,
    user: {
      name: "BotEnthusiast",
      avatar: "/placeholder.svg?height=80&width=80",
      verified: true,
    },
    sellerId: "bot-developer",
  },
]

interface VouchGridProps {
  sellerId?: string
}

export function VouchGrid({ sellerId }: VouchGridProps) {
  const [infiniteScroll, setInfiniteScroll] = useState(false)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [vouches, setVouches] = useState<typeof MOCK_VOUCHES>([])

  const ITEMS_PER_PAGE = 6

  useEffect(() => {
    // Simulate loading data
    setLoading(true)

    setTimeout(() => {
      let filteredVouches = [...MOCK_VOUCHES]

      // Filter by seller if sellerId is provided
      if (sellerId) {
        filteredVouches = filteredVouches.filter((vouch) => vouch.sellerId === sellerId)
      }

      setVouches(filteredVouches)
      setLoading(false)
    }, 1000)
  }, [sellerId])

  // Pagination logic
  const totalPages = Math.ceil(vouches.length / ITEMS_PER_PAGE)
  const paginatedVouches = infiniteScroll
    ? vouches.slice(0, page * ITEMS_PER_PAGE)
    : vouches.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-3 w-16" />
                </div>
                <div className="ml-auto">
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <div className="mt-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-2/3" />
              </div>
              <div className="mt-3 flex gap-1">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {vouches.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-medium">No reviews found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {sellerId ? "This seller doesn't have any reviews yet." : "There are no reviews matching your filters."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paginatedVouches.map((vouch) => (
              <VouchCard key={vouch.id} vouch={vouch} />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={infiniteScroll ? "bg-primary text-primary-foreground" : ""}
                onClick={() => {
                  setInfiniteScroll(true)
                  setPage(1)
                }}
              >
                Infinite Scroll
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={!infiniteScroll ? "bg-primary text-primary-foreground" : ""}
                onClick={() => {
                  setInfiniteScroll(false)
                  setPage(1)
                }}
              >
                Pagination
              </Button>
            </div>

            {!infiniteScroll && totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
                    </PaginationItem>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink isActive={page === pageNum} onClick={() => handlePageChange(pageNum)}>
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationNext onClick={() => handlePageChange(page + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}

            {infiniteScroll && page < totalPages && (
              <Button variant="outline" size="sm" onClick={handleLoadMore}>
                Load More
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
