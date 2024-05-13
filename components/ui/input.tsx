import * as React from "react"

import { cn } from "@/lib/utils"
import {useState} from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
      const [lineWidth,setLineWidth] = useState(0);
    return (<div onFocus={(event)=>setLineWidth(event.target.offsetWidth)}
                 onBlur={(e)=>setLineWidth(0)}>
            <input type={type}
                className={cn(
                    "flex h-10 w-full  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
            <div className="h-px w-0 mx-auto ease-out duration-700 bg-line shadow-2xl" style={{width:`${lineWidth}px`}}/>
    </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
