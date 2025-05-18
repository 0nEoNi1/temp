"use client"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import {
  MessageSquareText,
  User,
  Instagram,
  Youtube,
  ChevronDown,
  Star,
  MessageSquare,
  Activity,
  HelpCircle,
  Users,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Mock authentication state - in a real app, this would come from an auth provider
const isAuthenticated = true

export function Header() {
  const pathname = usePathname()
  const [showSocialDropdown, setShowSocialDropdown] = useState(false)
  const [currentIcon, setCurrentIcon] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const logoMenuRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { name: "Vouches", href: "/vouches", icon: <Star className="h-4 w-4" /> },
    { name: "Tickets", href: "/tickets", icon: <MessageSquare className="h-4 w-4" /> },
    { name: "Status", href: "/status", icon: <Activity className="h-4 w-4" /> },
    { name: "FAQ", href: "/help", icon: <HelpCircle className="h-4 w-4" /> },
    { name: "Affiliate", href: "/affiliate", icon: <Users className="h-4 w-4" /> },
    { name: "Terms of Service", href: "/terms", icon: <FileText className="h-4 w-4" /> },
  ]

  // Icons array
  const icons = [
    // Discord icon
    <svg key="discord" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>,
    // YouTube icon
    <Youtube key="youtube" className="h-5 w-5" />,
    // X (Twitter) icon
    <svg key="x" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>,
    // Instagram icon
    <Instagram key="instagram" className="h-5 w-5" />,
    // TikTok icon
    <svg key="tiktok" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>,
  ]

  // Effect to cycle through icons
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length)
    }, 1500) // Change icon every 1.5 seconds
    return () => clearInterval(interval)
  }, [icons.length])

  // Handle clicks outside the logo menu to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (logoMenuRef.current && !logoMenuRef.current.contains(event.target as Node)) {
        setIsLogoHovered(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const socialIconsStyle = `
  .icon-container {
    position: relative;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .social-icon {
    position: absolute;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .social-icon.active {
    opacity: 1;
    transform: scale(1);
  }

  .nav-item-hover {
    position: relative;
  }

  .nav-item-hover::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: white;
    transition: width 0.3s ease, transform 0.3s ease;
    transform-origin: left;
  }

  .nav-item-hover:hover::after {
    width: 100%;
  }

  .nav-item-active::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: white;
  }

  .logo-container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .logo-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    background-color: rgba(0, 0, 0, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 8px 0;
    min-width: 180px;
    z-index: 50;
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .logo-menu.active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .logo-menu-item {
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.8);
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .logo-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  .logo-menu-item.active {
    color: white;
    font-weight: 500;
  }
`

  return (
    <>
      <style jsx>{socialIconsStyle}</style>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md text-white mx-2 mt-2 rounded-full">
        <div className="container mx-auto flex h-16 items-center justify-between px-2">
          {/* Logo with hover menu */}
          <div className="logo-container" onMouseEnter={() => setIsLogoHovered(true)} ref={logoMenuRef}>
            <Link href="/" className="flex items-center gap-2">
              <MessageSquareText className="h-6 w-6 text-white" />
              <span className="font-medium">DiscordVouches</span>
              <ChevronDown className="h-4 w-4 md:hidden" />
            </Link>

            {/* Mobile Navigation Menu on Logo Hover */}
            <div className={`logo-menu md:hidden ${isLogoHovered ? "active" : ""}`}>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`logo-menu-item flex items-center gap-2 ${pathname === item.href ? "active" : ""}`}
                  onClick={() => setIsLogoHovered(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-white hover:scale-105 transition-transform duration-300 flex items-center gap-2",
                      pathname === item.href ? "nav-item-hover nav-item-active" : "nav-item-hover",
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media Dropdown and User Avatar */}
          <div className="flex items-center gap-4">
            {/* Social Media Animated Button */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setShowSocialDropdown(!showSocialDropdown)}
              >
                <div className="icon-container">
                  {icons.map((icon, index) => (
                    <div key={index} className={`social-icon ${index === currentIcon ? "active" : ""}`}>
                      {icon}
                    </div>
                  ))}
                </div>
              </Button>

              {showSocialDropdown && (
                <div className="absolute right-0 mt-2 w-auto rounded-md bg-black border border-zinc-800 shadow-lg z-50 px-2">
                  <div className="py-2 px-1 flex flex-row justify-center items-center gap-4">
                    <a
                      href="#"
                      className="flex items-center justify-center p-2 text-sm text-white hover:bg-zinc-900 rounded-full"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-center p-2 text-sm text-white hover:bg-zinc-900 rounded-full"
                    >
                      <Youtube className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-center p-2 text-sm text-white hover:bg-zinc-900 rounded-full"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-center p-2 text-sm text-white hover:bg-zinc-900 rounded-full"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-center p-2 text-sm text-white hover:bg-zinc-900 rounded-full"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-black border-zinc-800 text-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900">
                    <Link href="/dashboard" className="w-full flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Overview
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900">
                    <Link href="/dashboard?tab=reviews" className="w-full flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      My Vouches
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900">
                    <Link href="/tickets" className="w-full flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      My Tickets
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900">
                    <Link href="/affiliate/tracker" className="w-full flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Affiliate Tracker
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem className="hover:bg-zinc-900 focus:bg-zinc-900">Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-white text-black hover:bg-white/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu - Kept for backward compatibility but not used anymore */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-black/80" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-full max-w-xs bg-black p-6 shadow-xl">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <MessageSquareText className="h-6 w-6 text-white" />
                  <span className="font-medium">DiscordVouches</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </Button>
              </div>
              <nav className="flex-1">
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block py-2 text-base font-medium transition-colors hover:text-white/80",
                          pathname === item.href ? "text-white" : "text-white/70",
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
