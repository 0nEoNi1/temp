import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface VerifiedBadgeProps {
  className?: string
}

export function VerifiedBadge({ className }: VerifiedBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <CheckCircle className={cn("h-4 w-4 fill-green-500 text-background", className)} />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Verified Buyer</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
