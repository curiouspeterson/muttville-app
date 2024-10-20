export interface Dog {
  id: string;
  name: string;
  age: number;
  breed: string;
  health_status: string;
  status: string;
  temperament: string; // Added
  notes: string;
  created_at: string;
}

export interface Activity {
  id: string;
  dog_id: string;
  walker_id: string;
  activity_type: 'Walk' | 'Feeding' | 'Temperament Notes'; // Updated to enum
  notes: string;
  temperament_notes?: string; // Optional, based on usage
  created_at: string;
}

// --- Added Interfaces for New Tables ---

export interface Medication {
  id: string;
  dog_id: string;
  type: string;
  dose: string;
  frequency: string;
  last_administered_at?: string;
  created_at: string;
}

export interface HealthStatusUpdate {
  id: string;
  dog_id: string;
  symptoms?: string;
  behavior_changes?: string;
  concerns?: string;
  updated_at: string;
}

export interface VeterinaryAppointment {
  id: string;
  dog_id: string;
  reason: string;
  appointment_date: string;
  vetName: string;
  vet_recommendations?: string;
  follow_up_instructions?: string;
  created_at: string;
}

export interface ChronicCondition {
  id: string;
  dog_id: string;
  condition_name: string;
  diagnosis_date?: string;
  management_plan?: string;
  description?: string;
  created_at: string;
}

export interface EmergencyAlert {
  id: string;
  dog_id: string;
  alert_message: string;
  alert_date: string;
  resolved: boolean;
  created_at: string;
}
