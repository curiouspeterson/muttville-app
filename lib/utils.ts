// Import necessary functions and types from external libraries
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge and deduplicate class names
 * 
 * @param {...ClassValue[]} inputs - An array of class values to be merged
 * @returns {string} A string of merged and deduplicated class names
 * 
 * This function combines the functionality of clsx and twMerge:
 * 1. clsx: Constructs className strings conditionally
 * 2. twMerge: Efficiently merges Tailwind CSS classes without style conflicts
 * 
 * It's particularly useful for combining dynamic classes with Tailwind CSS classes
 * while avoiding duplications and conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
