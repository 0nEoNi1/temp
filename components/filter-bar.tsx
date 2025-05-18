"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Filter, Star, Search, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function FilterBar() {
  const [minRating, setMinRating] = useState(0)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilterSection, setActiveFilterSection] = useState<string | null>(null)

  const categories = ["Deliveries", "Keys", "Boosts", "Coaching", "Artwork", "Nitro", "Server Setup", "Bot Development"]

  const toggleCategory = (category: string) => {
    if (activeFilters.includes(category)) {
      setActiveFilters(activeFilters.filter((c) => c !== category))
    } else {
      setActiveFilters([...activeFilters, category])
    }
  }

  const clearAllFilters = () => {
    setMinRating(0)
    setVerifiedOnly(false)
    setActiveFilters([])
    setSearchQuery("")
  }

  return (
    <div className="mb-6 bg-black/90 py-3 px-5 flex items-center space-x-3 overflow-x-auto whitespace-nowrap rounded-lg border border-zinc-800 shadow-md backdrop-blur-sm">
      {/* Search Input */}
      <div className="relative min-w-[220px] max-w-[300px] flex-shrink">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search by username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-zinc-900/80 border-zinc-700 text-white h-10 rounded-md focus-visible:ring-zinc-500"
        />
      </div>

      {/* Rating Filter */}
      <Popover
        open={activeFilterSection === "rating"}
        onOpenChange={(open) => setActiveFilterSection(open ? "rating" : null)}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-10 gap-1 bg-zinc-900 border-zinc-800 text-white",
              activeFilterSection === "rating" && "bg-white text-black border-white",
            )}
          >
            <Star className="h-4 w-4" />
            <span>Rating: {minRating}+</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 p-4 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200 bg-black border-zinc-800"
          align="start"
        >
          <div className="space-y-4">
            <h4 className="font-medium">Minimum Rating</h4>
            <div className="flex items-center gap-4">
              <Slider
                value={[minRating]}
                min={0}
                max={5}
                step={0.5}
                onValueChange={(value) => setMinRating(value[0])}
              />
              <span className="w-12 text-center">{minRating}</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Category Filter */}
      <Popover
        open={activeFilterSection === "category"}
        onOpenChange={(open) => setActiveFilterSection(open ? "category" : null)}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-10 gap-1 bg-zinc-900 border-zinc-800 text-white",
              activeFilterSection === "category" && "bg-white text-black border-white",
            )}
          >
            <Filter className="h-4 w-4" />
            <span>Category</span>
            {activeFilters.length > 0 && (
              <Badge variant="secondary" className="ml-1 rounded-full px-1.5 py-0 text-xs bg-zinc-700">
                {activeFilters.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 p-4 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200 bg-black border-zinc-800"
          align="start"
        >
          <div className="space-y-4">
            <h4 className="font-medium">Product Categories</h4>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={activeFilters.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <label htmlFor={`category-${category}`} className="text-sm cursor-pointer text-gray-300">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Verified Only */}
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "h-10 gap-1",
          verifiedOnly ? "bg-white text-black border-white" : "bg-zinc-900 border-zinc-800 text-white",
        )}
        onClick={() => setVerifiedOnly(!verifiedOnly)}
      >
        {verifiedOnly && <Check className="h-3.5 w-3.5 mr-1" />}
        <span>Verified Only</span>
      </Button>

      {/* Clear All */}
      <Button
        variant="ghost"
        size="sm"
        onClick={clearAllFilters}
        className="h-10 text-white hover:bg-white/10 hover:text-zinc-200 transition-colors"
      >
        Clear All
      </Button>

      {/* Sort Dropdown - Pushed to the right */}
      <div className="ml-auto">
        <Select defaultValue="recent">
          <SelectTrigger className="h-10 w-[160px] bg-zinc-900/80 border-zinc-700 text-white rounded-md">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-black border-zinc-800 text-white">
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
            <SelectItem value="lowest">Lowest Rated</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
