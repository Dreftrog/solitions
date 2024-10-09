'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Briefcase, FileText, Settings, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Briefcase, label: 'Proyectos', href: '/projects' },
  { icon: FileText, label: 'Solicitudes', href: '/requests' },
  { icon: Settings, label: 'Configuración', href: '/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  const SidebarContent = (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Simple CRM
        </h2>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", {
                  'bg-secondary': pathname === item.href,
                })}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="hidden border-r bg-background lg:block">
        {SidebarContent}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden fixed left-4 top-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[280px]">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Sidebar