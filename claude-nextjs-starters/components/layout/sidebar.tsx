"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// 사이드바 열림/닫힘 상태 관리 컨텍스트
interface SidebarContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar는 <SidebarProvider> 내부에서 사용해야 합니다.")
  }
  return context
}

interface SidebarProviderProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean
}

function SidebarProvider({
  defaultOpen = true,
  className,
  children,
  ...props
}: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  const toggle = React.useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggle }}>
      <div
        data-slot="sidebar-provider"
        className={cn("flex min-h-svh w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({ className, children, ...props }: React.ComponentProps<"aside">) {
  const { open } = useSidebar()

  return (
    <aside
      data-slot="sidebar"
      data-state={open ? "open" : "closed"}
      className={cn(
        "flex h-svh flex-col bg-sidebar text-sidebar-foreground",
        "transition-[width] duration-300 ease-in-out",
        "border-r border-sidebar-border",
        open ? "w-64" : "w-0 overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn("flex items-center gap-2 px-4 py-3 border-b border-sidebar-border", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("flex-1 overflow-y-auto px-2 py-3", className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("mt-auto px-4 py-3 border-t border-sidebar-border", className)}
      {...props}
    />
  )
}

export {
  useSidebar,
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
}
