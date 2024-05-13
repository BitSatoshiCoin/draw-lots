import * as React from "react"
import {useRef, useState} from "react"

import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";
import {cn} from "@/lib/utils";
import { BigNumber } from "bignumber.js";


export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}
const bigNum = BigNumber.clone();
bigNum.config({DECIMAL_PLACES:9});

const NumberInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, ...props}, ref) => {
        const {disabled,onChange ,value } = props;
        const val = value as number;
        const [lineWidth, setLineWidth] = useState(0);
        const containerRef = useRef<HTMLDivElement>(null);
        return (<div ref={containerRef}
                     className={`${disabled?"cursor-not-allowed opacity-50":""} hover:shadow-line ease-out duration-700`}
                     onMouseMove={() => setLineWidth(containerRef!.current.offsetWidth)}
                     onMouseLeave={() => setLineWidth(0)}>
                <div className="w-full pb-4 flex ">
                    <Button type="button"
                            disabled={disabled}
                            onClick={()=>{
                                const res = bigNum.sum(val,-0.1).abs().toNumber();
                                onChange?.(res);
                            }}
                            className="w-10 bg-transparent p-0 hover:bg-transparent" >
                        <Minus className={"stroke-red-600 hover:stroke-red-400 hover:drop-shadow-red ease-linear duration-700 "} fontSize="50px" color="red" strokeWidth="1" size="50"/>
                    </Button>
                    <input type="number"
                           className={cn(
                               "flex h-10 w-full text-center px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
                               className
                           )}
                           ref={ref}
                           {...props}/>
                    <Button type="button"
                            disabled={disabled}
                            onClick={()=>{
                                const res = bigNum.sum(val,0.1).abs().toNumber();
                                onChange?.(res);
                            }}
                            className="w-10 bg-transparent p-0 hover:bg-transparent" >
                        <Plus  className="stroke-green-600 hover:stroke-green-400 hover:drop-shadow-green ease-linear duration-700 " fontSize="50px" strokeWidth="1" size="50"/>
                    </Button>
                </div>
                <div className="h-px w-0 mx-auto ease-out duration-700 bg-line "
                     style={{width: `${lineWidth}px`}}/>
            </div>
        )
    }
)
NumberInput.displayName = "NumberInput"

export {NumberInput}
