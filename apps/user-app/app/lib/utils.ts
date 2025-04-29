import { CreditCard, History, Home, Send, Settings, Wallet } from "lucide-react";

type SidebarNavItem = {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export const sidebarNavItems:SidebarNavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Add Money",
      href: "/add-money",
      icon: Wallet,
    },
    {
      title: "Send Money",
      href: "/send-p2p",
      icon: Send,
    },
    {
      title: "P2P History",
      href: "/p2p-history",
      icon: History,
    },
    {
      title: "Wallet History",
      href: "/wallet-history",
      icon: CreditCard,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]
  