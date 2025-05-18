"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

// Mock data for vouches
const vouchesData = [
  {
    id: "789012",
    username: "TechGuru1",
    date: "2025-05-10",
    time: "14:30",
    text: "Great support, fast and efficient!",
  },
  { id: "123456", username: "HappyUserX", date: "2025-05-09", time: "09:15", text: "Best ticket system I've used." },
  { id: "654321", username: "DevWizard", date: "2025-05-08", time: "18:00", text: "Amazing features and easy to use." },
  {
    id: "987654",
    username: "CommunityMod",
    date: "2025-05-07",
    time: "11:45",
    text: "The support team is very helpful.",
  },
  { id: "135790", username: "GamerGirl", date: "2025-05-06", time: "20:20", text: "Highly recommended!" },
  { id: "246801", username: "ServerAdmin", date: "2025-05-05", time: "12:00", text: "Made managing tickets a breeze." },
  { id: "112233", username: "NewbieDev", date: "2025-05-04", time: "16:50", text: "User-friendly and powerful." },
  { id: "445566", username: "SupportStaff", date: "2025-05-03", time: "10:10", text: "Excellent tool for our team." },
  {
    id: "778899",
    username: "ContentCreator",
    date: "2025-05-02",
    time: "22:30",
    text: "Love the customization options.",
  },
  {
    id: "101112",
    username: "EarlyAdopter",
    date: "2025-05-01",
    time: "08:00",
    text: "Been using it since beta, keeps getting better!",
  },
  { id: "131415", username: "PowerUser", date: "2025-04-30", time: "17:35", text: "Indispensable for my server." },
  { id: "161718", username: "CasualUser", date: "2025-04-29", time: "13:20", text: "Simple and effective." },
]

const VOUCHES_PER_PAGE = 6

export function TicketVouches() {
  const [allVouchesShown, setAllVouchesShown] = useState(false)

  const vouchesToDisplay = allVouchesShown ? vouchesData : vouchesData.slice(0, VOUCHES_PER_PAGE)
  const showPagination = vouchesData.length > VOUCHES_PER_PAGE

  return (
    <div className="space-y-6">
      {vouchesToDisplay.length === 0 ? (
        <p className="text-muted-foreground text-center">No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vouchesToDisplay.map((vouch) => (
            <div
              key={vouch.id}
              className="rounded-lg border border-border/50 bg-card p-4 transition-all duration-200 hover:shadow-md dark:hover:shadow-primary/5"
            >
              <p className="mb-2 text-sm italic text-light-gray">"{vouch.text}"</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2">
                <span className="text-xs text-muted-foreground">
                  By: <span className="text-primary font-medium">{vouch.username}</span> (ID: {vouch.id})
                </span>
                <span className="text-xs text-muted-foreground">
                  {vouch.date} at {vouch.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showPagination && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => setAllVouchesShown(!allVouchesShown)}
            className="bg-accent-gray hover:bg-accent-gray-dark text-white"
          >
            {allVouchesShown ? "Show Less Vouches" : "Show More Vouches"}
          </Button>
        </div>
      )}
    </div>
  )
}
