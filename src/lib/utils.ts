// import clsx and ClassValue type from clsx library
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

//define a function to merge class names
export function cn(...inputs: ClassValue[]) {
//combine class names using clsx and tailwind merge 
  return twMerge(clsx(inputs))
}

