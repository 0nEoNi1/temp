"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarRating } from "@/components/star-rating"
import { useToast } from "@/hooks/use-toast"

export function SubmitVouchButton() {
  const [rating, setRating] = useState(5)
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = () => {
    setUploading(true)

    // Simulate file upload
    setTimeout(() => {
      setUploadedFiles([
        ...uploadedFiles,
        `/placeholder.svg?height=200&width=300&text=Screenshot ${uploadedFiles.length + 1}`,
      ])
      setUploading(false)
    }, 1500)
  }

  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles]
    newFiles.splice(index, 1)
    setUploadedFiles(newFiles)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setOpen(false)

      toast({
        title: "Review submitted",
        description: "Your review has been submitted successfully and is pending approval.",
      })

      // Reset form
      setRating(5)
      setUploadedFiles([])
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Removed the floating action button that was here */}
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Submit a Review</DialogTitle>
            <DialogDescription>Share your experience with a seller or service.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="seller">Seller / Service</Label>
              <Select required>
                <SelectTrigger id="seller">
                  <SelectValue placeholder="Select a seller or service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nitro-boost">Nitro Boost Service</SelectItem>
                  <SelectItem value="game-keys">Game Keys Shop</SelectItem>
                  <SelectItem value="artwork">Custom Artwork</SelectItem>
                  <SelectItem value="coaching">Gaming Coaching</SelectItem>
                  <SelectItem value="server-setup">Server Setup Service</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Rating</Label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setRating(star)}
                    >
                      <StarRating rating={rating >= star ? 1 : 0} max={1} size="lg" />
                    </Button>
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating} star{rating !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Review Title</Label>
              <Input id="title" placeholder="Summarize your experience" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="review">Review Details</Label>
              <Textarea
                id="review"
                placeholder="Share details of your experience with this seller or service..."
                className="min-h-[100px]"
                required
              />
              <p className="text-xs text-muted-foreground">Minimum 50 characters required</p>
            </div>

            <div className="grid gap-2">
              <Label>Screenshots (Optional)</Label>
              {uploadedFiles.length > 0 && (
                <div className="mb-2 grid grid-cols-3 gap-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative rounded-md border">
                      <img
                        src={file || "/placeholder.svg"}
                        alt={`Screenshot ${index + 1}`}
                        className="h-20 w-full rounded-md object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                        onClick={() => removeFile(index)}
                        type="button"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-border bg-muted/50">
                <Button
                  variant="ghost"
                  className="h-full"
                  type="button"
                  onClick={handleFileUpload}
                  disabled={uploading}
                >
                  {uploading ? (
                    "Uploading..."
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Click to upload screenshots
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
