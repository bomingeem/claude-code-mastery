import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva("mx-auto w-full px-4", {
  variants: {
    size: {
      sm: "max-w-3xl",
      default: "max-w-6xl",
      lg: "max-w-7xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function Container({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof containerVariants>) {
  return (
    <div
      data-slot="container"
      data-size={size}
      className={cn(containerVariants({ size, className }))}
      {...props}
    />
  )
}

export { Container, containerVariants }
