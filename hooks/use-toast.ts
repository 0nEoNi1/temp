// This is a wrapper around the toast component from shadcn/ui
// It's already included in the project, so we're just re-exporting it

import { useToast as useToastOriginal } from "@/components/ui/use-toast"

export const useToast = useToastOriginal
