"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Users,
  Plus,
  MoreHorizontal,
  Crown,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  X,
  Info,
  Calendar,
  Mail,
  MapPin,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

// Mock data for tickets
const ticketsData = [
  {
    id: "1234",
    subject: "Login Issue",
    status: "open",
    priority: "medium",
    ownerUsername: "Hamad",
    ownerAvatar: "https://placehold.co/40x40/78909C/FFFFFF?text=H",
    createdDatetime: "5/14/2025, 10:30:00 AM",
    ownerIsPremium: false,
    lastMessage: "I've tried resetting the password but it doesn't work.",
    unread: true,
    totalMessages: 14,
    avgMessagesPerUser: 4.67,
    avgResponseTime: "Not calculated",
    participants: [
      { name: "im4ri", messages: 5, isPremium: true },
      { name: "Ticket Bot", messages: 6, isPremium: false },
      { name: "hamada212", messages: 3, isPremium: false },
    ],
    shopSpending: [
      {
        user: "im4ri",
        amount: "$25.00",
        isPremium: true,
        items: ["Premium Support Tier 1", "Custom Bot Avatar"],
      },
      {
        user: "anotherUser",
        amount: "$10.00",
        isPremium: false,
        items: ["Basic Theme Pack"],
      },
    ],
  },
  {
    id: "5678",
    subject: "Payment Failed",
    status: "open",
    priority: "high",
    ownerUsername: "Sarah",
    ownerAvatar: "https://placehold.co/40x40/00CFE8/FFFFFF?text=S",
    createdDatetime: "Tue May 13 2025 15:45:00 GMT+0100 (Western European Standard Time)",
    ownerIsPremium: true,
    lastMessage: "My payment for the premium subscription failed.",
    unread: false,
    totalMessages: 8,
    avgMessagesPerUser: 2.67,
    avgResponseTime: "5m",
    participants: [
      { name: "Sarah", messages: 3, isPremium: true },
      { name: "Ticket Bot", messages: 2, isPremium: false },
      { name: "BillingTeam", messages: 3, isPremium: false },
    ],
    shopSpending: [
      {
        user: "Sarah",
        amount: "$50.00",
        isPremium: true,
        items: ["Premium Support Tier 2", "Custom Server Theme"],
      },
    ],
  },
  {
    id: "9012",
    subject: "Feature Request",
    status: "closed",
    priority: "low",
    ownerUsername: "Alex",
    ownerAvatar: "https://placehold.co/40x40/4CAF50/FFFFFF?text=A",
    createdDatetime: "Mon May 12 2025 09:15:00 GMT+0100 (Western European Standard Time)",
    ownerIsPremium: false,
    lastMessage: "Would it be possible to add dark mode to the app?",
    unread: false,
    totalMessages: 6,
    avgMessagesPerUser: 2,
    avgResponseTime: "30m",
    participants: [
      { name: "Alex", messages: 2, isPremium: false },
      { name: "Ticket Bot", messages: 1, isPremium: false },
      { name: "DevTeam", messages: 3, isPremium: false },
    ],
    shopSpending: [],
  },
  {
    id: "3456",
    subject: "Account Verification",
    status: "open",
    priority: "high",
    ownerUsername: "Jordan",
    ownerAvatar: "https://placehold.co/40x40/FF5722/FFFFFF?text=J",
    createdDatetime: "Sun May 11 2025 14:20:00 GMT+0100 (Western European Standard Time)",
    ownerIsPremium: true,
    lastMessage: "I need help verifying my account.",
    unread: true,
    totalMessages: 10,
    avgMessagesPerUser: 3.33,
    avgResponseTime: "15m",
    participants: [
      { name: "Jordan", messages: 4, isPremium: true },
      { name: "Ticket Bot", messages: 2, isPremium: false },
      { name: "SupportTeam", messages: 4, isPremium: false },
    ],
    shopSpending: [
      {
        user: "Jordan",
        amount: "$35.00",
        isPremium: true,
        items: ["Premium Support Tier 1", "Priority Queue"],
      },
    ],
  },
  {
    id: "7890",
    subject: "Billing Question",
    status: "pending",
    priority: "medium",
    ownerUsername: "Taylor",
    ownerAvatar: "https://placehold.co/40x40/9C27B0/FFFFFF?text=T",
    createdDatetime: "Sat May 10 2025 11:05:00 GMT+0100 (Western European Standard Time)",
    ownerIsPremium: false,
    lastMessage: "I have a question about my recent invoice.",
    unread: false,
    totalMessages: 7,
    avgMessagesPerUser: 2.33,
    avgResponseTime: "45m",
    participants: [
      { name: "Taylor", messages: 3, isPremium: false },
      { name: "Ticket Bot", messages: 1, isPremium: false },
      { name: "BillingTeam", messages: 3, isPremium: false },
    ],
    shopSpending: [
      {
        user: "Taylor",
        amount: "$15.00",
        isPremium: false,
        items: ["Basic Support Package"],
      },
    ],
  },
]

// Mock data for messages
const messagesData = {
  "1234": [
    {
      user: "Hamad",
      avatar: "https://placehold.co/40x40/78909C/FFFFFF?text=H",
      text: "Hey, I'm having an issue with logging into my account. I've tried resetting the password but it doesn't seem to work.",
      time: "10:30 AM",
      date: "May 14, 2025",
    },
    {
      user: "Ticket Bot",
      avatar: "https://placehold.co/40x40/A0AEC0/FFFFFF?text=TB",
      text: "I understand you're having trouble logging in. Have you ensured CAPS LOCK is off and tried clearing your browser cache?",
      time: "10:32 AM",
      date: "May 14, 2025",
    },
    {
      user: "Hamad",
      avatar: "https://placehold.co/40x40/78909C/FFFFFF?text=H",
      text: "Yes, I've tried both of those. Still no luck. It says 'Invalid credentials' every time.",
      time: "10:35 AM",
      date: "May 14, 2025",
    },
    {
      user: "im4ri",
      avatar: "https://placehold.co/40x40/00CFE8/FFFFFF?text=iM",
      text: "Hi Hamad, I'm looking into this for you. Can you confirm the email address you're using to log in?",
      time: "10:40 AM",
      date: "May 14, 2025",
    },
    {
      user: "Hamad",
      avatar: "https://placehold.co/40x40/78909C/FFFFFF?text=H",
      text: "It's hamad@example.com",
      time: "10:41 AM",
      date: "May 14, 2025",
    },
    {
      user: "im4ri",
      avatar: "https://placehold.co/40x40/00CFE8/FFFFFF?text=iM",
      text: "Thanks. I'm checking our database now. One moment please.",
      time: "10:43 AM",
      date: "May 14, 2025",
    },
    {
      user: "im4ri",
      avatar: "https://placehold.co/40x40/00CFE8/FFFFFF?text=iM",
      text: "I found the issue. Your account was temporarily locked due to multiple failed login attempts. I've unlocked it now. Please try again and let me know if it works.",
      time: "10:47 AM",
      date: "May 14, 2025",
    },
    {
      user: "Hamad",
      avatar: "https://placehold.co/40x40/78909C/FFFFFF?text=H",
      text: "That worked! Thank you so much for your help.",
      time: "10:50 AM",
      date: "May 14, 2025",
    },
    {
      user: "im4ri",
      avatar: "https://placehold.co/40x40/00CFE8/FFFFFF?text=iM",
      text: "You're welcome! Is there anything else you need help with today?",
      time: "10:52 AM",
      date: "May 14, 2025",
    },
    {
      user: "Hamad",
      avatar: "https://placehold.co/40x40/78909C/FFFFFF?text=H",
      text: "No, that's all. Thanks again!",
      time: "10:53 AM",
      date: "May 14, 2025",
    },
    {
      user: "Ticket Bot",
      avatar: "https://placehold.co/40x40/A0AEC0/FFFFFF?text=TB",
      text: "This ticket will be automatically closed in 24 hours if there's no further activity. You can reopen it at any time if you need more assistance.",
      time: "10:55 AM",
      date: "May 14, 2025",
    },
    {
      user: "hamada212",
      avatar: "https://placehold.co/40x40/FFC107/FFFFFF?text=h2",
      text: "Just following up - is everything working correctly with your login now?",
      time: "2:30 PM",
      date: "May 14, 2025",
    },
    {
      user: "Hamad",
      avatar: "https://placehold.co/40x40/78909C/FFFFFF?text=H",
      text: "Yes, everything is working great now. Thanks for checking!",
      time: "3:15 PM",
      date: "May 14, 2025",
    },
    {
      user: "hamada212",
      avatar: "https://placehold.co/40x40/FFC107/FFFFFF?text=h2",
      text: "Excellent! I'll mark this ticket as resolved then. Have a great day!",
      time: "3:20 PM",
      date: "May 14, 2025",
    },
  ],
  "5678": [
    {
      user: "Sarah",
      avatar: "https://placehold.co/40x40/00CFE8/FFFFFF?text=S",
      text: "My payment for the premium subscription failed. Can you check what's wrong?",
      time: "15:45 PM",
      date: "May 13, 2025",
    },
    {
      user: "Ticket Bot",
      avatar: "https://placehold.co/40x40/A0AEC0/FFFFFF?text=TB",
      text: "Sorry to hear about the payment issue, Sarah. I'll notify a staff member to assist you shortly.",
      time: "15:46 PM",
      date: "May 13, 2025",
    },
    {
      user: "BillingTeam",
      avatar: "https://placehold.co/40x40/ECC94B/2A2A33?text=BT",
      text: "Hi Sarah, thanks for reaching out. Could you please provide the last 4 digits of the card you used?",
      time: "15:50 PM",
      date: "May 13, 2025",
    },
  ],
}

// Mock data for stats
const statsData = [
  {
    title: "Open Tickets",
    value: "3",
    change: "+2",
    changeType: "increase",
    icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Avg. Response Time",
    value: "1.2h",
    change: "-30m",
    changeType: "decrease",
    icon: <Clock className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Resolution Rate",
    value: "94%",
    change: "+2%",
    changeType: "increase",
    icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Active Users",
    value: "156",
    change: "+12",
    changeType: "increase",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
]

// Mock user profile data
const userProfiles = {
  Hamad: {
    username: "Hamad",
    displayName: "Hamad Al-Farsi",
    avatar: "https://placehold.co/40x40/78909C/FFFFFF?text=H",
    email: "hamad@example.com",
    joinDate: "January 15, 2024",
    location: "Dubai, UAE",
    website: "hamad.dev",
    bio: "Software developer and gaming enthusiast. I love solving problems and helping others.",
    role: "Member",
    status: "Active",
    totalTickets: 5,
    resolvedTickets: 4,
    openTickets: 1,
    responseRate: 95,
    avgResponseTime: "2h 15m",
    premium: false,
    badges: ["Early Adopter", "Bug Hunter", "Helpful"],
    recentActivity: [
      { type: "ticket", action: "opened", subject: "Login Issue", date: "May 14, 2025" },
      { type: "purchase", action: "bought", subject: "Basic Support Package", date: "May 10, 2025" },
      { type: "ticket", action: "closed", subject: "Account Deletion Request", date: "May 5, 2025" },
    ],
  },
  im4ri: {
    username: "im4ri",
    displayName: "Imari Chen",
    avatar: "https://placehold.co/40x40/00CFE8/FFFFFF?text=iM",
    email: "imari@example.com",
    joinDate: "March 3, 2023",
    location: "Tokyo, Japan",
    website: "imari.tech",
    bio: "Support specialist with 5+ years of experience. I'm here to help you with any issues you might have!",
    role: "Support Staff",
    status: "Active",
    totalTickets: 342,
    resolvedTickets: 335,
    openTickets: 7,
    responseRate: 99,
    avgResponseTime: "15m",
    premium: true,
    badges: ["Premium Supporter", "Problem Solver", "Quick Responder", "Top Contributor"],
    recentActivity: [
      { type: "ticket", action: "responded to", subject: "Login Issue", date: "May 14, 2025" },
      { type: "ticket", action: "resolved", subject: "Payment Failed", date: "May 13, 2025" },
      { type: "purchase", action: "renewed", subject: "Premium Support Tier 1", date: "May 1, 2025" },
    ],
  },
  Sarah: {
    username: "Sarah",
    displayName: "Sarah Johnson",
    avatar: "https://placehold.co/40x40/00CFE8/FFFFFF?text=S",
    email: "sarah@example.com",
    joinDate: "November 20, 2024",
    location: "London, UK",
    website: "sarahjohnson.me",
    bio: "Digital artist and community manager. I love creating and connecting with people.",
    role: "Premium Member",
    status: "Active",
    totalTickets: 3,
    resolvedTickets: 2,
    openTickets: 1,
    responseRate: 90,
    avgResponseTime: "4h 30m",
    premium: true,
    badges: ["Premium Supporter", "Content Creator"],
    recentActivity: [
      { type: "ticket", action: "opened", subject: "Payment Failed", date: "May 13, 2025" },
      { type: "purchase", action: "bought", subject: "Custom Server Theme", date: "May 10, 2025" },
      { type: "ticket", action: "closed", subject: "Feature Request", date: "May 5, 2025" },
    ],
  },
}

export function TicketDashboard() {
  const [activeTicket, setActiveTicket] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedTicket = activeTicket ? ticketsData.find((ticket) => ticket.id === activeTicket) : null
  const userProfile = selectedUser ? userProfiles[selectedUser as keyof typeof userProfiles] : null

  // Filter tickets based on active tab and search query
  const filteredTickets = ticketsData.filter((ticket) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "open" && ticket.status === "open") ||
      (activeTab === "pending" && ticket.status === "pending") ||
      (activeTab === "closed" && ticket.status === "closed")

    const matchesSearch =
      searchQuery === "" ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ownerUsername.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.includes(searchQuery)

    return matchesTab && matchesSearch
  })

  useEffect(() => {
    // Scroll to bottom of messages when viewing a ticket
    if (activeTicket && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeTicket])

  // Adjust sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Set initial state

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() === "") return
    // In a real app, this would send the message to the server
    setNewMessage("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "closed":
        return "bg-gray-500"
      default:
        return "bg-blue-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-blue-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">{status}</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">{status}</Badge>
      case "closed":
        return <Badge className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/30">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Ticket Dashboard</h1>
        <p className="text-muted-foreground font-sans">Manage and respond to support tickets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Ticket List */}
        <Card className="rounded-r-none md:col-span-4 lg:col-span-3">
          <CardHeader className="px-4 py-3 space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-heading">Tickets</CardTitle>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <Plus className="h-3.5 w-3.5" />
                <span>New</span>
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                className="pl-8 font-sans"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <ScrollArea className="h-[calc(130vh-20rem)]">
            <div className="px-2">
              {filteredTickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <AlertCircle className="h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium font-heading">No tickets found</h3>
                  <p className="mt-2 text-sm text-muted-foreground font-sans">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              ) : (
                filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={cn(
                      "flex cursor-pointer flex-col space-y-2 rounded-md p-3 transition-colors",
                      activeTicket === ticket.id ? "bg-muted/80" : "hover:bg-muted/50",
                    )}
                    onClick={() => setActiveTicket(ticket.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={ticket.ownerAvatar || "/placeholder.svg"} alt={ticket.ownerUsername} />
                            <AvatarFallback>{ticket.ownerUsername[0]}</AvatarFallback>
                          </Avatar>
                          <div
                            className={cn(
                              "absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-background",
                              getStatusColor(ticket.status),
                            )}
                          />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <p className="text-sm font-medium font-sans">{ticket.ownerUsername}</p>
                            {ticket.ownerIsPremium && <Crown className="ml-1 h-3 w-3 text-yellow-500" />}
                          </div>
                          <p className="text-xs text-muted-foreground font-sans">#{ticket.id}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-xs text-muted-foreground font-sans">
                          {new Date(ticket.createdDatetime).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        {ticket.unread && (
                          <Badge variant="default" className="mt-1 px-1.5 py-0">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium leading-none">{ticket.subject}</p>
                      <p className="mt-1 line-clamp-1 text-xs text-muted-foreground font-sans">{ticket.lastMessage}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-1.5 py-0 text-xs capitalize font-sans",
                          ticket.status === "open" && "border-green-500/20 bg-green-500/10 text-green-500",
                          ticket.status === "pending" && "border-yellow-500/20 bg-yellow-500/10 text-yellow-500",
                          ticket.status === "closed" && "border-muted bg-muted/50 text-muted-foreground",
                        )}
                      >
                        {ticket.status}
                      </Badge>
                      <span className={cn("text-xs font-medium font-sans", getPriorityColor(ticket.priority))}>
                        {ticket.priority} priority
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Ticket Content with Side Info Panel */}
        <div className="md:col-span-8 lg:col-span-9">
          {activeTicket ? (
            <div className="flex h-[calc(130vh-20rem)]">
              {/* Main Ticket Content - Now takes full width when sidebar is closed */}
              <Card className={cn("flex flex-1 flex-col", sidebarOpen ? "rounded-r-none border-r-0" : "")}>
                {/* Ticket Header */}
                <div className="flex items-center justify-between border-b px-6 py-3 bg-background/95">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={selectedTicket?.ownerAvatar || "/placeholder.svg"}
                        alt={selectedTicket?.ownerUsername}
                      />
                      <AvatarFallback>{selectedTicket?.ownerUsername[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <h2 className="text-lg font-semibold font-heading">{selectedTicket?.subject}</h2>
                        {selectedTicket && getStatusBadge(selectedTicket.status)}
                      </div>
                      <p className="text-sm text-muted-foreground font-sans">
                        Ticket #{selectedTicket?.id} • Opened{" "}
                        {new Date(selectedTicket?.createdDatetime || "").toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue={selectedTicket?.status}>
                      <SelectTrigger className="h-8 w-[130px] font-sans">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 lg:hidden"
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden h-8 w-8 lg:flex"
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                      {sidebarOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Assign to me</DropdownMenuItem>
                        <DropdownMenuItem>Transfer ticket</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">Close ticket</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-6 bg-[#0c0d10]">
                  <div className="space-y-6">
                    {activeTicket &&
                      messagesData[activeTicket].map((message, index) => {
                        const isOwner = message.user === selectedTicket?.ownerUsername
                        const isFirstOfDay = index === 0 || messagesData[activeTicket][index - 1].date !== message.date

                        return (
                          <div key={index} className="space-y-4">
                            {isFirstOfDay && (
                              <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                  <Separator />
                                </div>
                                <div className="relative flex justify-center">
                                  <div className="bg-[#0c0d10] px-2 text-xs text-muted-foreground font-sans">
                                    {message.date}
                                  </div>
                                </div>
                              </div>
                            )}
                            <div
                              className={cn("flex items-start space-x-4", isOwner ? "justify-start" : "justify-end")}
                            >
                              {isOwner && (
                                <Avatar
                                  className="h-9 w-9 cursor-pointer"
                                  onClick={() => setSelectedUser(message.user)}
                                >
                                  <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.user} />
                                  <AvatarFallback>{message.user[0]}</AvatarFallback>
                                </Avatar>
                              )}
                              <div
                                className={cn(
                                  "max-w-[70%] rounded-lg px-4 py-3",
                                  isOwner ? "bg-[#1e1f24]" : "bg-primary text-primary-foreground",
                                )}
                              >
                                <div className="mb-1 flex items-center justify-between">
                                  <span
                                    className="text-xs font-medium cursor-pointer hover:underline font-sans"
                                    onClick={() => setSelectedUser(message.user)}
                                  >
                                    {message.user}
                                  </span>
                                  <span className="text-xs opacity-70 font-sans">{message.time}</span>
                                </div>
                                <p className="text-sm font-sans">{message.text}</p>
                              </div>
                              {!isOwner && (
                                <Avatar
                                  className="h-9 w-9 cursor-pointer"
                                  onClick={() => setSelectedUser(message.user)}
                                >
                                  <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.user} />
                                  <AvatarFallback>{message.user[0]}</AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </Card>

              {/* Ticket Info Sidebar - Styled to match the ticket list */}
              {sidebarOpen && (
                <Card className="w-72 flex-shrink-0 overflow-hidden rounded-l-none border-l-0">
                  <ScrollArea className="h-[calc(130vh-20rem)]">
                    <div className="flex flex-col p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-medium font-heading">Ticket Info</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 lg:hidden"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {/* Subject */}
                        <div className="rounded-md p-3 border border-border/50 bg-card/50">
                          <p className="text-xs text-muted-foreground font-sans">Subject</p>
                          <p className="text-sm font-medium text-foreground font-sans">{selectedTicket?.subject}</p>
                        </div>

                        {/* Created by */}
                        <div className="rounded-md p-3 border border-border/50 bg-card/50">
                          <p className="text-xs text-muted-foreground font-sans">Created by</p>
                          <div className="mt-1 flex items-center">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Avatar className="mr-2 h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                                  <AvatarImage
                                    src={selectedTicket?.ownerAvatar || "/placeholder.svg"}
                                    alt={selectedTicket?.ownerUsername}
                                  />
                                  <AvatarFallback>{selectedTicket?.ownerUsername[0]}</AvatarFallback>
                                </Avatar>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px] bg-[#0c0d10] text-foreground border-border/20">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-semibold font-heading">User Profile</DialogTitle>
                                  <DialogDescription className="font-sans">
                                    Detailed information about {selectedTicket?.ownerUsername}
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedTicket &&
                                userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles] ? (
                                  <div className="py-4">
                                    <div className="flex items-start space-x-4">
                                      <Avatar className="h-16 w-16">
                                        <AvatarImage
                                          src={selectedTicket.ownerAvatar || "/placeholder.svg"}
                                          alt={selectedTicket.ownerUsername}
                                        />
                                        <AvatarFallback>{selectedTicket.ownerUsername[0]}</AvatarFallback>
                                      </Avatar>
                                      <div className="space-y-1">
                                        <h3 className="text-xl font-semibold flex items-center font-heading">
                                          {selectedTicket.ownerUsername}
                                          {selectedTicket.ownerIsPremium && (
                                            <Crown className="ml-2 h-4 w-4 text-yellow-500" />
                                          )}
                                        </h3>
                                        <p className="text-sm text-muted-foreground font-sans">
                                          {
                                            userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                              ?.displayName
                                          }
                                        </p>
                                        <div className="flex items-center space-x-2">
                                          <Badge variant="outline" className="text-xs font-sans">
                                            {
                                              userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                ?.role
                                            }
                                          </Badge>
                                          <Badge
                                            variant="outline"
                                            className="bg-green-500/10 text-green-500 text-xs border-green-500/20 font-sans"
                                          >
                                            {
                                              userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                ?.status
                                            }
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-xs text-muted-foreground font-sans">Email</p>
                                          <p className="text-sm flex items-center font-sans">
                                            <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
                                            {
                                              userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                ?.email
                                            }
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-muted-foreground font-sans">Joined</p>
                                          <p className="text-sm flex items-center font-sans">
                                            <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                                            {
                                              userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                ?.joinDate
                                            }
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-muted-foreground font-sans">Location</p>
                                          <p className="text-sm flex items-center font-sans">
                                            <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                            {
                                              userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                ?.location
                                            }
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-muted-foreground font-sans">Website</p>
                                          <p className="text-sm flex items-center font-sans">
                                            <Globe className="mr-1 h-3 w-3 text-muted-foreground" />
                                            {
                                              userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                ?.website
                                            }
                                          </p>
                                        </div>
                                      </div>

                                      <Separator className="bg-border/20" />

                                      <div>
                                        <p className="text-xs text-muted-foreground mb-2 font-sans">Bio</p>
                                        <p className="text-sm font-sans">
                                          {userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]?.bio}
                                        </p>
                                      </div>

                                      <Separator className="bg-border/20" />

                                      <div>
                                        <p className="text-xs text-muted-foreground mb-2 font-sans">Support Stats</p>
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <p className="text-xs text-muted-foreground font-sans">Total Tickets</p>
                                            <p className="text-sm font-medium font-sans">
                                              {
                                                userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                  ?.totalTickets
                                              }
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-xs text-muted-foreground font-sans">Resolved</p>
                                            <p className="text-sm font-medium font-sans">
                                              {
                                                userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                  ?.resolvedTickets
                                              }
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-xs text-muted-foreground font-sans">Response Rate</p>
                                            <p className="text-sm font-medium font-sans">
                                              {
                                                userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                  ?.responseRate
                                              }
                                              %
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-xs text-muted-foreground font-sans">Avg. Response</p>
                                            <p className="text-sm font-medium font-sans">
                                              {
                                                userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                  ?.avgResponseTime
                                              }
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      <Separator className="bg-border/20" />

                                      <div>
                                        <p className="text-xs text-muted-foreground mb-2 font-sans">Badges</p>
                                        <div className="flex flex-wrap gap-2">
                                          {userProfiles[
                                            selectedTicket.ownerUsername as keyof typeof userProfiles
                                          ]?.badges.map((badge, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs font-sans">
                                              {badge}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="py-4 text-center">
                                    <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
                                    <p className="mt-2 font-sans">User profile not found</p>
                                  </div>
                                )}
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline" className="w-full font-sans">
                                      Close
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <p className="text-sm font-medium text-foreground cursor-pointer hover:underline font-sans">
                                    {selectedTicket?.ownerUsername}
                                  </p>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-[#0c0d10] text-foreground border-border/20">
                                  <DialogHeader>
                                    <DialogTitle className="text-xl font-semibold font-heading">
                                      User Profile
                                    </DialogTitle>
                                    <DialogDescription className="font-sans">
                                      Detailed information about {selectedTicket?.ownerUsername}
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedTicket &&
                                  userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles] ? (
                                    <div className="py-4">
                                      <div className="flex items-start space-x-4">
                                        <Avatar className="h-16 w-16">
                                          <AvatarImage
                                            src={selectedTicket.ownerAvatar || "/placeholder.svg"}
                                            alt={selectedTicket.ownerUsername}
                                          />
                                          <AvatarFallback>{selectedTicket.ownerUsername[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                          <h3 className="text-xl font-semibold flex items-center font-heading">
                                            {selectedTicket.ownerUsername}
                                            {selectedTicket.ownerIsPremium && (
                                              <Crown className="ml-2 h-4 w-4 text-yellow-500" />
                                            )}
                                          </h3>
                                          <p className="text-sm text-muted-foreground font-sans">
                                            {
                                              userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                ?.displayName
                                            }
                                          </p>
                                          <div className="flex items-center space-x-2">
                                            <Badge variant="outline" className="text-xs font-sans">
                                              {
                                                userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                  ?.role
                                              }
                                            </Badge>
                                            <Badge
                                              variant="outline"
                                              className="bg-green-500/10 text-green-500 text-xs border-green-500/20 font-sans"
                                            >
                                              {
                                                userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                  ?.status
                                              }
                                            </Badge>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="mt-6 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <p className="text-xs text-muted-foreground font-sans">Email</p>
                                            <p className="text-sm flex items-center font-sans">
                                              <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
                                              {
                                                userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                  ?.email
                                              }
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-xs text-muted-foreground font-sans">Joined</p>
                                            <p className="text-sm flex items-center font-sans">
                                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                                              {
                                                userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                  ?.joinDate
                                              }
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-xs text-muted-foreground font-sans">Location</p>
                                            <p className="text-sm flex items-center font-sans">
                                              <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                              {
                                                userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                  ?.location
                                              }
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-xs text-muted-foreground font-sans">Website</p>
                                            <p className="text-sm flex items-center font-sans">
                                              <Globe className="mr-1 h-3 w-3 text-muted-foreground" />
                                              {
                                                userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                  ?.website
                                              }
                                            </p>
                                          </div>
                                        </div>

                                        <Separator className="bg-border/20" />

                                        <div>
                                          <p className="text-xs text-muted-foreground mb-2 font-sans">Bio</p>
                                          <p className="text-sm font-sans">
                                            {
                                              userProfiles[selectedTicket.ownerUsername as keyof typeof userProfiles]
                                                ?.bio
                                            }
                                          </p>
                                        </div>

                                        <Separator className="bg-border/20" />

                                        <div>
                                          <p className="text-xs text-muted-foreground mb-2 font-sans">Support Stats</p>
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <p className="text-xs text-muted-foreground font-sans">Total Tickets</p>
                                              <p className="text-sm font-medium font-sans">
                                                {
                                                  userProfiles[
                                                    selectedTicket.ownerUsername as keyof typeof userProfiles
                                                  ]?.totalTickets
                                                }
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-xs text-muted-foreground font-sans">Resolved</p>
                                              <p className="text-sm font-medium font-sans">
                                                {
                                                  userProfiles[
                                                    selectedTicket.ownerUsername as keyof typeof userProfiles
                                                  ]?.resolvedTickets
                                                }
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-xs text-muted-foreground font-sans">Response Rate</p>
                                              <p className="text-sm font-medium font-sans">
                                                {
                                                  userProfiles[
                                                    selectedTicket.ownerUsername as keyof typeof userProfiles
                                                  ]?.responseRate
                                                }
                                                %
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-xs text-muted-foreground font-sans">Avg. Response</p>
                                              <p className="text-sm font-medium font-sans">
                                                {
                                                  userProfiles[
                                                    selectedTicket.ownerUsername as keyof typeof userProfiles
                                                  ]?.avgResponseTime
                                                }
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        <Separator className="bg-border/20" />

                                        <div>
                                          <p className="text-xs text-muted-foreground mb-2 font-sans">Badges</p>
                                          <div className="flex flex-wrap gap-2">
                                            {userProfiles[
                                              selectedTicket.ownerUsername as keyof typeof userProfiles
                                            ]?.badges.map((badge, index) => (
                                              <Badge key={index} variant="secondary" className="text-xs font-sans">
                                                {badge}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="py-4 text-center">
                                      <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
                                      <p className="mt-2 font-sans">User profile not found</p>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline" className="w-full font-sans">
                                        Close
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <p className="text-xs text-muted-foreground font-sans">
                                {selectedTicket?.createdDatetime}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* User Shop Spending */}
                        <div className="rounded-md p-3 border border-border/50 bg-card/50">
                          <p className="text-xs text-muted-foreground font-sans">User Shop Spending</p>
                          <div className="mt-2 space-y-3">
                            {selectedTicket?.shopSpending.map((spending, index) => (
                              <div key={index}>
                                <div className="flex items-center justify-between">
                                  <span className="flex items-center text-sm font-medium text-foreground font-sans">
                                    {spending.user}
                                    {spending.isPremium && <DollarSign className="ml-1 h-3 w-3 text-green-500" />}
                                  </span>
                                  <span className="text-xs text-muted-foreground font-sans">{spending.amount}</span>
                                </div>
                                <ul className="ml-4 mt-1 list-disc space-y-1 pl-1 text-xs">
                                  {spending.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="text-primary font-sans">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                                {index < selectedTicket.shopSpending.length - 1 && (
                                  <Separator className="my-2 opacity-50 bg-border/20" />
                                )}
                              </div>
                            ))}
                            {selectedTicket?.shopSpending.length === 0 && (
                              <p className="text-xs text-muted-foreground font-sans">No shop spending</p>
                            )}
                          </div>
                        </div>

                        {/* Total Messages */}
                        <div className="rounded-md p-3 border border-border/50 bg-card/50">
                          <p className="text-xs text-muted-foreground font-sans">Total Messages</p>
                          <p className="text-sm font-medium text-foreground font-sans">
                            {selectedTicket?.totalMessages} messages
                          </p>
                        </div>

                        {/* Avg. Messages per User */}
                        <div className="rounded-md p-3 border border-border/50 bg-card/50">
                          <p className="text-xs text-muted-foreground font-sans">Avg. Messages per User</p>
                          <p className="text-sm font-medium text-foreground font-sans">
                            {selectedTicket?.avgMessagesPerUser} messages
                          </p>
                        </div>

                        {/* Avg. Response Time */}
                        <div className="rounded-md p-3 border border-border/50 bg-card/50">
                          <p className="text-xs text-muted-foreground font-sans">Avg. Response Time</p>
                          <p className="text-sm font-medium text-foreground font-sans">
                            {selectedTicket?.avgResponseTime}
                          </p>
                        </div>

                        {/* Participants */}
                        <div className="rounded-md p-3 border border-border/50 bg-card/50">
                          <p className="text-xs text-muted-foreground font-sans">Participants</p>
                          <div className="mt-2 space-y-1">
                            {selectedTicket?.participants.map((participant, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <span className="text-sm font-medium text-foreground cursor-pointer hover:underline font-sans">
                                      {participant.name}
                                    </span>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px] bg-[#0c0d10] text-foreground border-border/20">
                                    <DialogHeader>
                                      <DialogTitle className="text-xl font-semibold font-heading">
                                        User Profile
                                      </DialogTitle>
                                      <DialogDescription className="font-sans">
                                        Detailed information about {participant.name}
                                      </DialogDescription>
                                    </DialogHeader>
                                    {userProfiles[participant.name as keyof typeof userProfiles] ? (
                                      <div className="py-4">
                                        <div className="flex items-start space-x-4">
                                          <Avatar className="h-16 w-16">
                                            <AvatarImage
                                              src={
                                                userProfiles[participant.name as keyof typeof userProfiles]?.avatar ||
                                                "/placeholder.svg" ||
                                                "/placeholder.svg" ||
                                                "/placeholder.svg" ||
                                                "/placeholder.svg" ||
                                                "/placeholder.svg" ||
                                                "/placeholder.svg" ||
                                                "/placeholder.svg"
                                              }
                                              alt={participant.name}
                                            />
                                            <AvatarFallback>{participant.name[0]}</AvatarFallback>
                                          </Avatar>
                                          <div className="space-y-1">
                                            <h3 className="text-xl font-semibold flex items-center font-heading">
                                              {participant.name}
                                              {participant.isPremium && (
                                                <Crown className="ml-2 h-4 w-4 text-yellow-500" />
                                              )}
                                            </h3>
                                            <p className="text-sm text-muted-foreground font-sans">
                                              {userProfiles[participant.name as keyof typeof userProfiles]?.displayName}
                                            </p>
                                            <div className="flex items-center space-x-2">
                                              <Badge variant="outline" className="text-xs font-sans">
                                                {userProfiles[participant.name as keyof typeof userProfiles]?.role}
                                              </Badge>
                                              <Badge
                                                variant="outline"
                                                className="bg-green-500/10 text-green-500 text-xs border-green-500/20 font-sans"
                                              >
                                                {userProfiles[participant.name as keyof typeof userProfiles]?.status}
                                              </Badge>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="mt-6 space-y-4">
                                          <div className="grid grid-cols-2 gap-4">
                                            <div>
                                              <p className="text-xs text-muted-foreground font-sans">Email</p>
                                              <p className="text-sm flex items-center font-sans">
                                                <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
                                                {userProfiles[participant.name as keyof typeof userProfiles]?.email}
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-xs text-muted-foreground font-sans">Joined</p>
                                              <p className="text-sm flex items-center font-sans">
                                                <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                                                {userProfiles[participant.name as keyof typeof userProfiles]?.joinDate}
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-xs text-muted-foreground font-sans">Location</p>
                                              <p className="text-sm flex items-center font-sans">
                                                <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                                {userProfiles[participant.name as keyof typeof userProfiles]?.location}
                                              </p>
                                            </div>
                                            <div>
                                              <p className="text-xs text-muted-foreground font-sans">Website</p>
                                              <p className="text-sm flex items-center font-sans">
                                                <Globe className="mr-1 h-3 w-3 text-muted-foreground" />
                                                {userProfiles[participant.name as keyof typeof userProfiles]?.website}
                                              </p>
                                            </div>
                                          </div>

                                          <Separator className="bg-border/20" />

                                          <div>
                                            <p className="text-xs text-muted-foreground mb-2 font-sans">Bio</p>
                                            <p className="text-sm font-sans">
                                              {userProfiles[participant.name as keyof typeof userProfiles]?.bio}
                                            </p>
                                          </div>

                                          <Separator className="bg-border/20" />

                                          <div>
                                            <p className="text-xs text-muted-foreground mb-2 font-sans">
                                              Support Stats
                                            </p>
                                            <div className="grid grid-cols-2 gap-4">
                                              <div>
                                                <p className="text-xs text-muted-foreground font-sans">Total Tickets</p>
                                                <p className="text-sm font-medium font-sans">
                                                  {
                                                    userProfiles[participant.name as keyof typeof userProfiles]
                                                      ?.totalTickets
                                                  }
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-xs text-muted-foreground font-sans">Resolved</p>
                                                <p className="text-sm font-medium font-sans">
                                                  {
                                                    userProfiles[participant.name as keyof typeof userProfiles]
                                                      ?.resolvedTickets
                                                  }
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-xs text-muted-foreground font-sans">Response Rate</p>
                                                <p className="text-sm font-medium font-sans">
                                                  {
                                                    userProfiles[participant.name as keyof typeof userProfiles]
                                                      ?.responseRate
                                                  }
                                                  %
                                                </p>
                                              </div>
                                              <div>
                                                <p className="text-xs text-muted-foreground font-sans">Avg. Response</p>
                                                <p className="text-sm font-medium font-sans">
                                                  {
                                                    userProfiles[participant.name as keyof typeof userProfiles]
                                                      ?.avgResponseTime
                                                  }
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          <Separator className="bg-border/20" />

                                          <div>
                                            <p className="text-xs text-muted-foreground mb-2 font-sans">Badges</p>
                                            <div className="flex flex-wrap gap-2">
                                              {userProfiles[participant.name as keyof typeof userProfiles]?.badges.map(
                                                (badge, index) => (
                                                  <Badge key={index} variant="secondary" className="text-xs font-sans">
                                                    {badge}
                                                  </Badge>
                                                ),
                                              )}
                                            </div>
                                          </div>

                                          <Separator className="bg-border/20" />

                                          <div>
                                            <p className="text-xs text-muted-foreground mb-2 font-sans">
                                              Recent Activity
                                            </p>
                                            <div className="space-y-2">
                                              {userProfiles[
                                                participant.name as keyof typeof userProfiles
                                              ]?.recentActivity.map((activity, index) => (
                                                <div key={index} className="flex items-center justify-between">
                                                  <div className="flex items-center">
                                                    {activity.type === "ticket" && (
                                                      <MessageSquare className="mr-2 h-3 w-3 text-primary" />
                                                    )}
                                                    {activity.type === "purchase" && (
                                                      <DollarSign className="mr-2 h-3 w-3 text-green-500" />
                                                    )}
                                                    <span className="text-xs font-sans">
                                                      {activity.action} {activity.subject}
                                                    </span>
                                                  </div>
                                                  <span className="text-xs text-muted-foreground font-sans">
                                                    {activity.date}
                                                  </span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="py-4 text-center">
                                        <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
                                        <p className="mt-2 font-sans">User profile not found</p>
                                      </div>
                                    )}
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button variant="outline" className="w-full font-sans">
                                          Close
                                        </Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                <span className="text-xs text-muted-foreground font-sans">
                                  {participant.messages} msgs
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </Card>
              )}
            </div>
          ) : (
            <div className="flex h-[calc(150vh-20rem)] flex-col items-center justify-center rounded-lg border border-dashed">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-6">
                  <MessageSquare className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold font-heading">No ticket selected</h3>
                  <p className="max-w-sm text-sm text-muted-foreground font-sans">
                    Select a ticket from the list to view its details or create a new ticket to get started.
                  </p>
                </div>
                <Button className="mt-4 font-sans">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Ticket
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Profile Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="sm:max-w-[425px] bg-[#0c0d10] text-foreground border-border/20">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold font-heading">User Profile</DialogTitle>
            <DialogDescription className="font-sans">Detailed information about {selectedUser}</DialogDescription>
          </DialogHeader>
          {selectedUser && userProfile ? (
            <div className="py-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.username} />
                  <AvatarFallback>{userProfile.username[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold flex items-center font-heading">
                    {userProfile.username}
                    {userProfile.premium && <Crown className="ml-2 h-4 w-4 text-yellow-500" />}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans">{userProfile.displayName}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs font-sans">
                      {userProfile.role}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-500/10 text-green-500 text-xs border-green-500/20 font-sans"
                    >
                      {userProfile.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-sans">Email</p>
                    <p className="text-sm flex items-center font-sans">
                      <Mail className="mr-1 h-3 w-3 text-muted-foreground" />
                      {userProfile.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-sans">Joined</p>
                    <p className="text-sm flex items-center font-sans">
                      <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                      {userProfile.joinDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-sans">Location</p>
                    <p className="text-sm flex items-center font-sans">
                      <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                      {userProfile.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-sans">Website</p>
                    <p className="text-sm flex items-center font-sans">
                      <Globe className="mr-1 h-3 w-3 text-muted-foreground" />
                      {userProfile.website}
                    </p>
                  </div>
                </div>

                <Separator className="bg-border/20" />

                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-sans">Bio</p>
                  <p className="text-sm font-sans">{userProfile.bio}</p>
                </div>

                <Separator className="bg-border/20" />

                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-sans">Support Stats</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground font-sans">Total Tickets</p>
                      <p className="text-sm font-medium font-sans">{userProfile.totalTickets}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-sans">Resolved</p>
                      <p className="text-sm font-medium font-sans">{userProfile.resolvedTickets}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-sans">Response Rate</p>
                      <p className="text-sm font-medium font-sans">{userProfile.responseRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-sans">Avg. Response</p>
                      <p className="text-sm font-medium font-sans">{userProfile.avgResponseTime}</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-border/20" />

                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-sans">Badges</p>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.badges.map((badge, index) => (
                      <Badge key={index} variant="secondary" className="text-xs font-sans">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="bg-border/20" />

                <div>
                  <p className="text-xs text-muted-foreground mb-2 font-sans">Recent Activity</p>
                  <div className="space-y-2">
                    {userProfile.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          {activity.type === "ticket" && <MessageSquare className="mr-2 h-3 w-3 text-primary" />}
                          {activity.type === "purchase" && <DollarSign className="mr-2 h-3 w-3 text-green-500" />}
                          <span className="text-xs font-sans">
                            {activity.action} {activity.subject}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground font-sans">{activity.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center">
              <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 font-sans">User profile not found</p>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="w-full font-sans">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
