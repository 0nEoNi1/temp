import { ArrowDown, ArrowUp, Star, MessageSquare, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { NumberCounter } from "@/components/number-counter"

// Mock stats data - in a real app, this would come from a database
const statsData = [
  {
    title: "Total Reviews",
    value: "12",
    change: "+2",
    changeType: "increase",
    icon: <Star className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Open Tickets",
    value: "3",
    change: "+1",
    changeType: "increase",
    icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Resolved Tickets",
    value: "8",
    change: "+3",
    changeType: "increase",
    icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Avg. Response Time",
    value: "2.5h",
    change: "-30m",
    changeType: "decrease",
    icon: <Clock className="h-4 w-4 text-muted-foreground" />,
  },
]

export function UserDashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <NumberCounter end={Number.parseFloat(stat.value)} suffix={stat.value.includes("h") ? "h" : ""} />
            </div>
            <p
              className={cn(
                "text-xs flex items-center",
                stat.changeType === "increase" ? "text-green-500" : "text-red-500",
              )}
            >
              {stat.changeType === "increase" ? (
                <ArrowUp className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3" />
              )}
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
