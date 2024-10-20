import create from 'zustand'
import { Dog, Activity, Medication, HealthStatusUpdate, VeterinaryAppointment, ChronicCondition, EmergencyAlert } from '@/types/Dog'

type State = {
  dogs: Dog[]
  setDogs: (dogs: Dog[]) => void
  activities: Activity[]
  setActivities: (activities: Activity[]) => void
  filter: string
  setFilter: (filter: string) => void
  // --- Added State for New Tables ---
  medications: Medication[]
  setMedications: (medications: Medication[]) => void
  healthStatusUpdates: HealthStatusUpdate[]
  setHealthStatusUpdates: (updates: HealthStatusUpdate[]) => void
  veterinaryAppointments: VeterinaryAppointment[]
  setVeterinaryAppointments: (appointments: VeterinaryAppointment[]) => void
  chronicConditions: ChronicCondition[]
  setChronicConditions: (conditions: ChronicCondition[]) => void
  emergencyAlerts: EmergencyAlert[]
  setEmergencyAlerts: (alerts: EmergencyAlert[]) => void
  // --- End of Added State ---
  // --- Added CRUD Functions ---
  addMedication: (medication: Medication) => void
  updateMedication: (updated: Medication) => void
  deleteMedication: (id: string) => void

  addHealthStatusUpdate: (update: HealthStatusUpdate) => void
  updateHealthStatusUpdate: (updated: HealthStatusUpdate) => void
  deleteHealthStatusUpdate: (id: string) => void

  addVeterinaryAppointment: (appointment: VeterinaryAppointment) => void
  updateVeterinaryAppointment: (updated: VeterinaryAppointment) => void
  deleteVeterinaryAppointment: (id: string) => void

  addChronicCondition: (condition: ChronicCondition) => void
  updateChronicCondition: (updated: ChronicCondition) => void
  deleteChronicCondition: (id: string) => void

  addEmergencyAlert: (alert: EmergencyAlert) => void
  updateEmergencyAlert: (updated: EmergencyAlert) => void
  deleteEmergencyAlert: (id: string) => void

  addActivity: (activity: Activity) => void
  updateActivity: (updated: Activity) => void
  deleteActivity: (id: string) => void
  // --- End of CRUD Functions ---
}

export const useStore = create<State>((set) => ({
  dogs: [],
  setDogs: (dogs) => set({ dogs }),
  activities: [],
  setActivities: (activities) => set({ activities }),
  filter: '',
  setFilter: (filter) => set({ filter }),
  // --- Added State Setters ---
  medications: [],
  setMedications: (medications) => set({ medications }),
  healthStatusUpdates: [],
  setHealthStatusUpdates: (updates) => set({ healthStatusUpdates: updates }),
  veterinaryAppointments: [],
  setVeterinaryAppointments: (appointments) => set({ veterinaryAppointments: appointments }),
  chronicConditions: [],
  setChronicConditions: (conditions) => set({ chronicConditions: conditions }),
  emergencyAlerts: [],
  setEmergencyAlerts: (alerts) => set({ emergencyAlerts: alerts }),
  // --- End of Added State Setters ---
  // --- Added CRUD Functions ---
  addMedication: (medication: Medication) => set((state) => ({ medications: [...state.medications, medication] })),
  updateMedication: (updated: Medication) => set((state) => ({
    medications: state.medications.map(med => med.id === updated.id ? updated : med)
  })),
  deleteMedication: (id: string) => set((state) => ({
    medications: state.medications.filter(med => med.id !== id)
  })),

  addHealthStatusUpdate: (update: HealthStatusUpdate) => set((state) => ({ healthStatusUpdates: [...state.healthStatusUpdates, update] })),
  updateHealthStatusUpdate: (updated: HealthStatusUpdate) => set((state) => ({
    healthStatusUpdates: state.healthStatusUpdates.map(up => up.id === updated.id ? updated : up)
  })),
  deleteHealthStatusUpdate: (id: string) => set((state) => ({
    healthStatusUpdates: state.healthStatusUpdates.filter(up => up.id !== id)
  })),

  addVeterinaryAppointment: (appointment: VeterinaryAppointment) => set((state) => ({ veterinaryAppointments: [...state.veterinaryAppointments, appointment] })),
  updateVeterinaryAppointment: (updated: VeterinaryAppointment) => set((state) => ({
    veterinaryAppointments: state.veterinaryAppointments.map(app => app.id === updated.id ? updated : app)
  })),
  deleteVeterinaryAppointment: (id: string) => set((state) => ({
    veterinaryAppointments: state.veterinaryAppointments.filter(app => app.id !== id)
  })),

  addChronicCondition: (condition: ChronicCondition) => set((state) => ({ chronicConditions: [...state.chronicConditions, condition] })),
  updateChronicCondition: (updated: ChronicCondition) => set((state) => ({
    chronicConditions: state.chronicConditions.map(cond => cond.id === updated.id ? updated : cond)
  })),
  deleteChronicCondition: (id: string) => set((state) => ({
    chronicConditions: state.chronicConditions.filter(cond => cond.id !== id)
  })),

  addEmergencyAlert: (alert: EmergencyAlert) => set((state) => ({ emergencyAlerts: [...state.emergencyAlerts, alert] })),
  updateEmergencyAlert: (updated: EmergencyAlert) => set((state) => ({
    emergencyAlerts: state.emergencyAlerts.map(al => al.id === updated.id ? updated : al)
  })),
  deleteEmergencyAlert: (id: string) => set((state) => ({
    emergencyAlerts: state.emergencyAlerts.filter(al => al.id !== id)
  })),

  addActivity: (activity: Activity) => set((state) => ({ activities: [...state.activities, activity] })),
  updateActivity: (updated: Activity) => set((state) => ({
    activities: state.activities.map(act => act.id === updated.id ? updated : act)
  })),
  deleteActivity: (id: string) => set((state) => ({
    activities: state.activities.filter(act => act.id !== id)
  })),
  // --- End of CRUD Functions ---
}))
