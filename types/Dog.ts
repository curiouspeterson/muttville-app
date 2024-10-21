// Interface representing a dog's basic information and status
export interface Dog {
  id: string;                // Unique identifier for the dog
  name: string;              // Name of the dog
  age: number;               // Age of the dog
  breed: string;             // Breed of the dog
  health_status: string;     // Current health status of the dog
  status: string;            // General status of the dog (e.g., available, adopted)
  temperament: string;       // Dog's temperament or personality traits
  notes: string;             // Additional notes about the dog
  created_at: string;        // Timestamp of when the dog record was created
}

// Interface representing an activity related to a dog
export interface Activity {
  id: string;                // Unique identifier for the activity
  dog_id: string;            // ID of the dog associated with this activity
  walker_id: string;         // ID of the person who performed the activity
  activity_type: 'Walk' | 'Feeding' | 'Temperament Notes'; // Type of activity performed
  notes: string;             // General notes about the activity
  temperament_notes?: string; // Optional notes specifically about the dog's temperament during the activity
  created_at: string;        // Timestamp of when the activity record was created
}

// --- Interfaces for Health-Related Tables ---

// Interface representing medication information for a dog
export interface Medication {
  id: string;                // Unique identifier for the medication record
  dog_id: string;            // ID of the dog receiving the medication
  type: string;              // Type or name of the medication
  dose: string;              // Dosage of the medication
  frequency: string;         // How often the medication should be administered
  last_administered_at?: string; // Optional timestamp of when the medication was last given
  created_at: string;        // Timestamp of when the medication record was created
}

// Interface representing updates to a dog's health status
export interface HealthStatusUpdate {
  id: string;                // Unique identifier for the health status update
  dog_id: string;            // ID of the dog this update is for
  symptoms?: string;         // Optional description of any symptoms observed
  behavior_changes?: string; // Optional notes on any changes in the dog's behavior
  concerns?: string;         // Optional notes on any health concerns
  updated_at: string;        // Timestamp of when this health status was updated
}

// Interface representing a veterinary appointment for a dog
export interface VeterinaryAppointment {
  id: string;                // Unique identifier for the appointment
  dog_id: string;            // ID of the dog the appointment is for
  reason: string;            // Reason for the veterinary appointment
  appointment_date: string;  // Date and time of the appointment
  vetName: string;           // Name of the veterinarian
  vet_recommendations?: string; // Optional recommendations from the vet
  follow_up_instructions?: string; // Optional follow-up instructions after the appointment
  created_at: string;        // Timestamp of when the appointment record was created
}

// Interface representing a chronic condition a dog may have
export interface ChronicCondition {
  id: string;                // Unique identifier for the chronic condition record
  dog_id: string;            // ID of the dog with the chronic condition
  condition_name: string;    // Name or type of the chronic condition
  diagnosis_date?: string;   // Optional date when the condition was diagnosed
  management_plan?: string;  // Optional plan for managing the condition
  description?: string;      // Optional detailed description of the condition
  created_at: string;        // Timestamp of when the condition record was created
}

// Interface representing an emergency alert for a dog
export interface EmergencyAlert {
  id: string;                // Unique identifier for the emergency alert
  dog_id: string;            // ID of the dog the alert is about
  alert_message: string;     // Message describing the emergency situation
  alert_date: string;        // Date and time when the alert was issued
  resolved: boolean;         // Whether the emergency situation has been resolved
  created_at: string;        // Timestamp of when the alert record was created
}
