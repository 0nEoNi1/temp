import { Hero } from "@/components/hero"
import { VouchGrid } from "@/components/vouch-grid"
import { FilterBar } from "@/components/filter-bar"
import { RatingSidebar } from "@/components/rating-sidebar"
import { SubmitVouchButton } from "@/components/submit-vouch-button"
import { Footer } from "@/components/footer"

export default function VouchesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <FilterBar />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <VouchGrid />
          </div>
          <div className="hidden lg:block">
            <RatingSidebar />
          </div>
        </div>
      </div>
      <SubmitVouchButton />
      <Footer />
    </main>
  )
}
