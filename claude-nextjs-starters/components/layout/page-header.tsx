import * as React from "react"

import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.ComponentProps<"div"> {
  title: string
  description?: string
  actions?: React.ReactNode
}

function PageHeader({
  className,
  title,
  description,
  actions,
  ...props
}: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      )}
    </div>
  )
}

export { PageHeader }
