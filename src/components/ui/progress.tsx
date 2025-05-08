
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all duration-200"
      style={{ 
        transform: `translateX(-${100 - (value || 0)}%)`,
        transition: 'transform 0.3s ease, width 0.3s ease'
      }}
    />
    
    {/* Modified percentage indicator to be inside the progress bar for better visibility */}
    {value !== undefined && value > 0 && (
      <div className="absolute inset-0 flex items-center justify-end pr-2">
        <span 
          className="text-xs font-semibold text-white drop-shadow-md"
          style={{opacity: value < 10 ? 0 : 1}}
        >
          {Math.round(value)}%
        </span>
      </div>
    )}
    
    {/* Add animated pulse effect on the indicator edge */}
    {value !== undefined && value > 0 && value < 100 && (
      <span 
        className="absolute h-full w-1.5 bg-white/30 animate-pulse" 
        style={{ 
          left: `${value}%`, 
          transform: 'translateX(-50%)',
          animationDuration: '1.5s'
        }}
      />
    )}
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
