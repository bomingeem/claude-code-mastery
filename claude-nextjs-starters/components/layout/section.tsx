import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      sm: "py-12",
      default: "py-16",
      lg: "py-24",
    },
  },
  defaultVariants: {
    spacing: "default",
  },
})

function Section({
  className,
  spacing = "default",
  ...props
}: React.ComponentProps<"section"> & VariantProps<typeof sectionVariants>) {
  return (
    <section
      data-slot="section"
      data-spacing={spacing}
      className={cn(sectionVariants({ spacing, className }))}
      {...props}
    />
  )
}

export { Section, sectionVariants }
