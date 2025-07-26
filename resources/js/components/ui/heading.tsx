import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva("scroll-m-20 text-foreground", {
  variants: {
    size: {
      h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "text-3xl font-semibold tracking-tight pb-2 border-b",
      h3: "text-2xl font-semibold tracking-tight",
      h4: "text-xl font-semibold",
      h5: "text-lg font-medium",
      h6: "text-base font-medium",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    muted: {
      true: "text-muted-foreground",
      false: "",
    },
  },
  defaultVariants: {
    size: "h1",
    align: "left",
    muted: false,
  },
})

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean
  as?: HeadingTag
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, align, muted, asChild = false, as, ...props }, ref) => {
    const Component = asChild ? Slot : (as ?? size ?? "h1")

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ size, align, muted }), className)}
        {...props}
      />
    )
  }
)

Heading.displayName = "Heading"

export { Heading, headingVariants }
