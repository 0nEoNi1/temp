import { TicketDashboard } from "@/components/ticket-dashboard"

export default function TicketsPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-white text-center mb-10">TICKET DASHBOARD</h1>
      <TicketDashboard />
    </main>
  )
}
