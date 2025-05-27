import { clsx, type ClassValue } from "clsx"
import { BarChart3, DollarSign, History, Home, QrCode, Settings, Store } from "lucide-react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
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
    title: "Generate QR",
    href: "/dashboard/generate-qr",
    icon: QrCode,
  },
  {
    title: "Transactions",
    href: "/dashboard/transactions",
    icon: History,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Payouts",
    href: "/dashboard/payouts",
    icon: DollarSign,
  },
  {
    title: "Store Settings",
    href: "/dashboard/store",
    icon: Store,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
