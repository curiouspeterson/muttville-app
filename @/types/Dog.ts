/**
 * Represents a chronic condition for a dog.
 * This interface defines the structure of chronic condition data.
 */
export interface ChronicCondition {
  /** Unique identifier for the chronic condition */
  id: string;
  /** Name of the chronic condition */
  condition_name: string;
  /** Date when the condition was diagnosed (optional) */
  diagnosis_date?: string;
  /** Additional details or notes about the condition (optional) */
  description?: string;
  // ... other existing properties
}
